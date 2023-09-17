# /usr/bin/env python
# Download the twilio-python library from twilio.com/docs/libraries/python
import os
from twilio.rest import Client

ACCOUNT_SID = "ACa26b69ce1d979d57ea33832cced5be93" #  AC76017154f49ee9f08fd11087be5d3b2d
AUTH_TOKEN = "f006b982847714fd19871ef5eaaf7392" #  bd67711513540e92649af42bd24f15c0
TWILIO_NUMBER = "+18339863290" #  18449373803

# Find these values at https://twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = ACCOUNT_SID
auth_token = AUTH_TOKEN

client = Client(account_sid, auth_token)

# Receiving Message Functions
from flask import Flask, request
from twilio import twiml

app = Flask(__name__)

# Messages
location = 12345

# Sending Message Functions

def sendMessage(number, message):
    client.api.account.messages.create(
        to = number,
        from_=TWILIO_NUMBER,
        body = message)

def setUp(number):
    # print("Text message received")

    setUpMsg = "Enter your zip code, followed by the resource(s) you are interested in. \nResources available: \nfood, water, shelter, or medical."

    # Sent Menu
    sendMessage(number, setUpMsg)
    
    print("Set up complete")


def locationValidation(message_body):
    print("inside location validation: ")
    print(message_body)
    # Zip Code
    if (len(message_body) == 5):
        location = message_body[:5]

        print("zip code: ")
    elif "." in message_body:
        # Get first five characters for zip code
        openIndex = message_body.index("(")
        closeIndex = message_body(")")
        location = message_body[openIndex:closeIndex]

        print("coordinate points: ")
    else:
        location = 00000; # enter code to find the user's location
        print("location based off phone number: ")




@app.route('/sms', methods=['POST'])
def sms():
    number = request.form['From']
    message_body = request.form['Body']

    # Go to main function
    # main(number, message_body)
    if (location == 12345):
        setUp(number)

    message_body = message_body.split()
    for i in message_body:
        print(i)
    locationValidation(message_body[0])



    return str(message_body)

if __name__ == '__main__':
    app.run()

print("done")

# Default code to send message
# client.api.account.messages.create(
#     to="+14045006378",
#     from_="+18449373803",
#     body=sendMenu())

