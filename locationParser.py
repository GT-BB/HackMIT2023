import json
import googlemaps

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
            finalKey = keysList[-1]
            finalValue = int(finalKey[6:])
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
            finalKey = keysList[-1]
            finalValue = int(finalKey[5:])
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

class ZipCodeParser(Parser):

    def __init__(self, location=None):

        super.__init__(location)

    def getData(self, zipCode):

        data = self.jsonContent
        resource = data["resources"]

        defaultName = "resource"
        index = 0
        returnDict = {}

        for key in resource:

            finalName = defaultName + str(index)

            placeLocation = resource[key]
            dictZipCode = placeLocation["zipCode"]

            if (zipCode == dictZipCode):
                returnDict[finalName] = placeLocation

            index += 1

        return returnDict

class CoordinateParser(Parser):

    def __init__(self, location=None):

        super.__init__(location)










newObj = Parser(48, False)
newObj.addDataPoint(True, 23, "dsb", "asds")














