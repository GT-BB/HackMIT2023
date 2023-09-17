import json
import googlemaps
import math
import re

class Parser():

    def __init__(self, location=None):

        self.gmaps = googlemaps.Client(key="AIzaSyCgly59Bpch-KF0q02LGota3Io3nSrFuzE")
        self.currentLocation = location
        self.resourceLocations = None
        self.dangerLocations = None
        self.jsonContent = None

        self.path = "locationData.json"

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

        super.__init__(location)

    def getData(self, zipCode, resourceType):

        data = self.jsonContent
        resource = data["resources"]

        defaultName = "resource"
        index = 0
        returnDict = {}

        for key in resource:

            finalName = defaultName + str(index)

            placeLocation = resource[key]
            dictZipCode = placeLocation["zipCode"]
            resource = placeLocation["resourceType"]

            if (zipCode == dictZipCode and resource == resourceType):
                returnDict[finalName] = placeLocation

            index += 1

        return returnDict

class CoordinateParser(Parser):

    def __init__(self, location=None):

        super.__init__(location)

    def getDirections(self):

        closestObject = self.getClosestLocation()
        destination = closestObject["position"]

        directionsResult = self.gmaps.directions(
            self.currentLocation,
            destination,
            mode="driving"
        )

        steps = []
        for step in directionsResult[0]["legs"][0]["steps"]:
            line = steps.append[step["html_instructions"]]
            output_string = re.sub(r'<[^>]*>', '', line)
            steps.append(output_string)

        return steps

    def getClosestLocation(self):

        data = self.getJSONData()
        data = data["resources"]

        distanceLocations = []

        for keys in data:
            placeLocation = data[keys]
            coords = placeLocation["position"]

            distance = self.haverSineDistanceCorrection(self.currentLocation, coords)
            distanceLocations.append(distance)

        closestDistanceIndex = distanceLocations.find(min(distanceLocations))

        closestObject = data[data.keys(closestDistanceIndex)]

        return closestObject

    def haverSineDistanceCorrection(self, origin, destination):
        # Radius of the Earth in kilometers
        R = 6371.0

        # Convert latitude and longitude from degrees to radians
        lat1 = math.radians(origin[0])
        lon1 = math.radians(origin[1])
        lat2 = math.radians(destination[0])
        lon2 = math.radians(destination[1])

        # Differences between coordinates
        dlat = lat2 - lat1
        dlon = lon2 - lon1

        # Haversine formula
        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        # Calculate the distance
        distance = R * c

        return distance















