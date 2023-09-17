import json
import googlemaps
import math
import re

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

    def addDataPoint(self, isThreat, position, newType, name, zipCode):

        data = None
        finalValue = None

        if (isThreat):
            data = self.jsonContent["threats"]

            keysList = list(data.keys())
            finalValue = int(keysList[-1])
            finalValue += 1
            data["threat" + str(finalValue)] = {
                                                  "position": position,
                                                  "threatType": newType,
                                                  "locationName": name,
                                                  "zipCode": zipCode
                                                }
            self.jsonContent["threats"] = data

        else:
            data = self.jsonContent["resources"]
            keysList = list(data.keys())
            finalValue = int(keysList[-1])
            finalValue += 1

            data["threat" + str(finalValue)] = {
                                                  "position": position,
                                                  "resourceType": newType,
                                                  "locationName": name,
                                                  "zipCode": zipCode
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

    def getDirections(self, resourceType):

        directionResult = None

        if (self.truthMode == False):
            directionResult = self.falseGetDirections(resourceType)
        else:
            directionResult = self.getClosestLocation(resourceType)

        steps = []
        for step in directionResult[0]["legs"][0]["steps"]:
            line = step["html_instructions"]
            distance_value = step["distance"]["value"]
            output_string = re.sub(r'<[^>]*>', '', line)
            result = re.sub(r'([a-z])([A-Z])', r'\1 \2', output_string)
            steps.append(result + ": " + str(round(distance_value/5280, 2)) + " miles.")

        return steps

    """
        {"resources", "id, position, resouceType"}
    """


    def getClosestLocation(self, resourceType):

        wild = self.getJSONData()
        data = wild["resources"]

        distanceLocations = []
        distanceValues = []

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
                units="imperial"
            )

            if distanceResult == []:
                continue

            distanceValue = int(distanceResult[0]['legs'][0]['distance']['value'])

            distanceLocations.append(distanceResult)
            distanceValues.append(distanceValue)

        closestDistanceIndex = distanceValues.index(min(distanceValues))
        closestRoute = distanceLocations[closestDistanceIndex]


        #print (distanceValues)

        return closestRoute

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

blue = CoordinateParser((20.841327942643264, -156.51442769100743), True)
print(blue.getDirections("food"))













