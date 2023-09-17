# /usr/bin/env python
# Download the twilio-python library from twilio.com/docs/libraries/python
import os
from twilio.rest import Client
from locationParser import ZipCodeParser
from flask import Flask, request
import twilio


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


@app.route('/sms', methods=['POST'])
def sms():
    number = request.form['From']
    message_body = request.form['Body']

    message_tokens = message_body.split()
    zip_code = None
    resources = []

    for token in message_tokens:
        if token.lower() == "help":
            setUp(number)
            return
        
        if token.isdigit() and len(token) == 5:
            zip_code = token

        if token in AVAIL_RESOURCES:
            resources.append(token)
    
    if zip_code == None:
        usage_error(number)

    get_resources(zip_code, resources, number)

    return(str(message_body))


if __name__ == '__main__':
    app.run()

print("done")