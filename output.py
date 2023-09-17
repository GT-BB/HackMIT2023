# /usr/bin/env python
# Download the twilio-python library from twilio.com/docs/libraries/python
import os
from twilio.rest import Client

ACCOUNT_SID = "AC76017154f49ee9f08fd11087be5d3b2d" # ACa26b69ce1d979d57ea33832cced5be93
AUTH_TOKEN = "bd67711513540e92649af42bd24f15c0" # f006b982847714fd19871ef5eaaf7392
TWILIO_NUMBER = "+18449373803" # 18339863290

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
location = 00000

# Sending Message Functions

def sendMenu():
    return "Hello, welcome message.  Location: "


def sendMessage(number, message):
    client.api.account.messages.create(
        to = number,
        from_=TWILIO_NUMBER,
        body = message)

def main(number, message_body):
    print("Text message received")

    print(number)
    print(message_body)

    # Sent Menu
    sendMessage(number, sendMenu())
    

    print("sent")
# Main Body
# main();

def locationValidation(location):
    # Zip Code
    if (location.contains(":")):
        print("zip code")
    elif (location.contains("(")):
        print("point")
    else:
        print("no location data")




@app.route('/sms', methods=['POST'])
def sms():
    number = request.form['From']
    message_body = request.form['Body']

    # Go to main function
    main(number, message_body)
    

    location(message_body);

    return str(message_body)

if __name__ == '__main__':
    app.run()

print("done")

# Default code to send message
# client.api.account.messages.create(
#     to="+14045006378",
#     from_="+18449373803",
#     body=sendMenu())

