# /usr/bin/env python
# Download the twilio-python library from twilio.com/docs/libraries/python
import os
from twilio.rest import Client
from locationParser import ZipCodeParser, CoordinateParser
from flask import Flask, request
import twilio
import json

locationDataFile = "locationData2.json"

ACCOUNT_SID = "ACa26b69ce1d979d57ea33832cced5be93" #  AC76017154f49ee9f08fd11087be5d3b2d
AUTH_TOKEN = "f006b982847714fd19871ef5eaaf7392" #  bd67711513540e92649af42bd24f15c0
TWILIO_NUMBER = "+18339863290" #  18449373803
client = Client(ACCOUNT_SID, AUTH_TOKEN)

AVAIL_RESOURCES = ["food", "water", "shelter", "medical"]


app = Flask(__name__)

def sendMessage(number, message):
    client.api.account.messages.create(
        to = number,
        from_=TWILIO_NUMBER,
        body = message)

def setUp(number):
    # Send set-up message
    setUpMsg = "Enter your zip code, followed by the resource(s) you are interested in. \nResources available: \nfood, water, shelter, or medical."
    sendMessage(number, setUpMsg)
    direction_directions = "For directions to the nearest resource, enter your location coordinates (can be found in Google Maps offline), the resource you wish to get to, and the word 'directions'."
    sendMessage(number, direction_directions)
    print("Set up complete")

def usage_error(number):
    error_msg = "Usage Error: send 'Help' for instructions"
    sendMessage(number, error_msg)
    print("Sending Usage Error Msg")


def get_resources(zip_code, resources, number):
    parser = ZipCodeParser(zip_code)

    for resource_wanted in resources:
        resource_name = resource_wanted.lower().capitalize()
        resource_msg = resource_name + ":\n"
        resource_list = parser.getData(resource_wanted)
        for resource in resource_list:
            resource_msg += ("-> " + resource['locationName'] + "\n")
        sendMessage(number, resource_msg)

def get_directions(coords, number, resource):
    parser = CoordinateParser(coords, True)
    path = parser.getDirections(resource)
    steps = path[0]
    hazard = path[1]

    direction_msg = " Directions to nearest " + resource + ":\n"
    for i in range(len(steps)):
        direction_msg += (str(i+1) + ": " + steps[i] + "\n")

    if hazard:
        direction_msg += ("\nRouting around known hazard:\n")
        direction_msg += (str(hazard['hazardType'].lower().capitalize()) + " located at " + str(hazard['center']))
    sendMessage(number, direction_msg)


@app.route('/sms', methods=['POST'])
def sms():
    number = request.form['From']
    message_body = request.form['Body']

    message_body = message_body.replace(",", "")
    message_body = message_body.replace("(", "")
    message_body = message_body.replace(")", "")

    message_tokens = message_body.split()
    zip_code = None
    directions = False
    resources = []

    for token in message_tokens:
        if token.lower() == "help":
            setUp(number)
            return(str(message_body))
        
        # Find if coordinate
        token = token.replace(",", "")

        
        if token.isdigit() and len(token) == 5:
            zip_code = token

        if token in AVAIL_RESOURCES:
            resources.append(token)
        
        if token.lower() == "directions":
            directions = True
    
    if zip_code == None and not directions:
        usage_error(number)
        return(str(message_body))

    if directions:
        coords = (float(message_tokens[0]), float(message_tokens[1]))

        get_directions(coords, number, resources[0])
        return(str(message_body))

    get_resources(zip_code, resources, number)

    return(str(message_body))

@app.route('/', methods = ['POST'])
def post():
    request_data = request.get_json()

    locationData = json.load(locationDataFile)
    

    

if __name__ == '__main__':
    app.run()

print("done")