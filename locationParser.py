import json
import googlemaps
import math
import re
import geopandas
from geopandas.geoseries import *
from shapely import Point, Polygon, LineString
from shapely.ops import transform

"""




UNTIL YOU GUYS START DEMOING USE FALSE MODE ON THE COORDINATE PARSER




"""

class Parser():

    def __init__(self, location=None):

        self.gmaps = googlemaps.Client(key="AIzaSyCgly59Bpch-KF0q02LGota3Io3nSrFuzE")
        self.currentLocation = location
        self.resourceLocations = None
        self.dangerLocations = None
        self.jsonContent = None

        self.path = "locationData2.json"

        self.file = open(self.path, "r")
        self.jsonContent = json.load(self.file)

        self.file.close()

    def updateCurrentLocation(self, locationCoords):
        self.currentLocation = locationCoords

    def addDataPoint(self, isThreat, position=None, newType=None, name=None, radius=None, center=None, distance=None):

        data = None
        finalValue = None

        if (isThreat):
            data = self.jsonContent["hazard"]

            keysList = list(data.keys())
            finalValue = int(keysList[-1])
            finalValue += 1
            data["threat" + str(finalValue)] = {
                                                  "position": position,
                                                  "hazardType": newType,
                                                  "hazardName": name,
                                                  "center": center,
                                                  "radius": radius
                                                }
            self.jsonContent["threats"] = data

        else:
            data = self.jsonContent["resources"]
            keysList = list(data.keys())
            finalValue = int(keysList[-1])
            finalValue += 1

            data[str(finalValue)] = {
                                                  "position": position,
                                                  "resourceType": newType,
                                                  "locationName": name,
                                                  "zipCode": zipCode,
                                                }

            self.jsonContent["resources"] = data

        self.file = open(self.path, "w")
        json.dump(self.jsonContent, self.file, indent=4)
        self.file.close()

    def getJSONData(self):
        return self.jsonContent

class ZipCodeParser(Parser):

    def __init__(self, location=None):

        super().__init__(location)

    def getData(self, resourceType):

        data = self.jsonContent
        resources = data["resources"]

        defaultName = "resource"
        index = 0
        returnDict = []

        zipCode = self.currentLocation

        for key in resources:
            finalName = defaultName + str(index)

            placeLocation = resources[key]
            dictZipCode = placeLocation["zipCode"]
            resource = placeLocation["resourceType"]

            if (zipCode == dictZipCode and resource == resourceType):
                returnDict.append(placeLocation)
                index += 1

        return returnDict

class CoordinateParser(Parser):

    def __init__(self, location=None, truth=False):

        super().__init__(location)

        self.truthMode = truth
        self.hazardCircles = []
        self.routes = {}

    def getDirections(self, resourceType):

        directionResult = None

        if (self.truthMode == False):
            directionResult = self.falseGetDirections(resourceType)
        else:
            directionResult = self.getClosestLocation(resourceType)

        actualDirection = directionResult[0]
        hazard = directionResult[1]
        address = directionResult[2]

        steps = []
        length = len(actualDirection[0]["legs"][0]["steps"]) - 1
        index = 0
        for step in actualDirection[0]["legs"][0]["steps"]:
            line = step["html_instructions"]
            distance_value = step["distance"]["value"]
            output_string = re.sub(r'<[^>]*>', '', line)
            result = re.sub(r'([a-z])([A-Z])', r'\1 \2', output_string)

            if (index != length):
                steps.append(result + ": " + str(round(distance_value/5280, 2)) + " miles.")
            else:
                steps.append(result + " ({}): ".format(address) + str(round(distance_value/5280, 2)) + " miles.")

            index += 1

        return [steps, hazard]

    """
        {"resources", "id, position, resouceType"}
    """

    def getClosestLocation(self, resourceType):

        wild = self.getJSONData()
        data = wild["resources"]
        hazards = wild["hazards"]

        for keys in hazards:
            specificHarzardData = hazards[keys]
            center = specificHarzardData["center"]
            radius = specificHarzardData["radius"]
            print (center)
            print (radius)

            circle = Point(center).buffer(radius, resolution=32)
            self.hazardCircles.append(circle)

        hazard = self.hazardCircles[0]
        print(type(hazard))
        print ("area: " + str(hazard.area))

        routes = {}

        index = 0
        specializedData = {}

        for keys in data:
            placeLocation = data[keys]
            gotResource = placeLocation["resourceType"]

            if (resourceType == gotResource):
                specializedData[str(index)] = placeLocation
                index += 1

        for keys in specializedData:
            placeLocation = data[keys]
            coords = placeLocation["position"]

            distanceResult = self.gmaps.directions(
                self.currentLocation,
                coords,
                mode="walking",
                units="imperial",
                alternatives=True
            )

            if distanceResult == []:
                continue

            #print(type(distanceResult))
            #print(len(distanceResult))

            for i in range(len(distanceResult)):
                partRoute = distanceResult[i]
                distanceValue = self.distanceToTravel(partRoute)
                routes[distanceValue] = distanceResult

        routePlusHazard = self.filterHazards(routes)

        return routePlusHazard

    def distanceToTravel(self, passedRoute):
        return int(passedRoute['legs'][0]['distance']['value'])

    def distanceToTravel2(self, passedRoute):
        return int(passedRoute[0]['legs'][0]['distance']['value'])

    def filterHazards(self, routeDict):

        keys = list(routeDict.keys())
        keys.sort()
        sortedRoutes = {i: routeDict[i] for i in keys}
        blockedRoute = None
        print(len(keys))
        count = 0

        finalRoutes = {}

        for sortedKey in sortedRoutes:
            route = sortedRoutes[sortedKey]

            coordinates = []
            conflict = False
            path = None

            for step in route[0]["legs"][0]["steps"]:
                start_location = step['start_location']
                end_location = step['end_location']

                # Extract latitude and longitude
                start_lat = start_location['lat']
                start_lng = start_location['lng']
                end_lat = end_location['lat']
                end_lng = end_location['lng']

                coordinates.append((start_lat, start_lng))
                coordinates.append((end_lat, end_lng))

            path = LineString(coordinates)

            for harzard in self.hazardCircles:

                if (path.within(harzard)):
                    conflict = True
                    blockedRoute = harzard
                    count += 1

                if (conflict == False):
                    distance = self.distanceToTravel2(route)
                    finalRoutes[distance] = route

        print (count)
        keys = list(finalRoutes.keys())
        keys.sort()
        bestRoute = finalRoutes[keys[0]]
        bestAddress = bestRoute[0]['legs'][0]['end_address']
        actualHazard = self.matchUpHazard(blockedRoute)
        return [bestRoute, actualHazard, bestAddress]

    def matchUpHazard(self, selectedHazard):

        data = self.getJSONData()
        hazards = data["hazards"]

        for key in hazards:
            hazardSpecificData = hazards[key]
            coords = hazardSpecificData["center"]

            testPoint = Point(coords[0], coords[1])

            if (testPoint.within(selectedHazard)):
                x = hazards[key]
                direction = self.detectCardinalDirection(coords[0], coords[1])
                x["cardinal"] = direction
                return x

    def detectCardinalDirection(self, hazlat, hazlong):
        poslong = self.currentLocation[0]
        poslat = self.currentLocation[1]

        delta_lat = hazlat - poslat
        delta_lon = hazlong - poslong

        if abs(delta_lat) < 0.001 and abs(delta_lon) < 0.001:
            return "No movement"

        if abs(delta_lat) > abs(delta_lon):
            if delta_lat > 0:
                return "North"
            else:
                return "South"
        else:
            if delta_lon > 0:
                return "East"
            else:
                return "West"

    def falseGetDirections(self):

        data = self.getJSONData()
        resources = data["resources"]

        distances = []

        for keys in resources:
            placeLocation = resources[keys]
            distance = placeLocation["distance"]
            distances.append(distance)

        closestDistanceIndex = distances.index(min(distances))
        coords = resources[str(closestDistanceIndex)]["position"]
        distance = resources[str(closestDistanceIndex)]["distance"]
        print (distance)
        print (coords)

        distanceResult = self.gmaps.directions(
                self.currentLocation,
                coords,
                mode="walking",
                units="imperial"
            )

        return distanceResult

"""




UNTIL YOU GUYS START DEMOING USE FALSE MODE ON THE COORDINATE PARSER




"""

blue = CoordinateParser((20.846895275708786, -156.5055077097432), True)
print(blue.getDirections("food"))