# /usr/bin/env python
# Download the twilio-python library from twilio.com/docs/libraries/python
import os
from twilio.rest import Client

# Find these values at https://twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = "AC76017154f49ee9f08fd11087be5d3b2d"
auth_token = "bd67711513540e92649af42bd24f15c0"

client = Client(account_sid, auth_token)

# Receiving Message Functions
from flask import Flask, request
from twilio import twiml

app = Flask(__name__)


# Sending Message Functions

def sendMenu():
    return "hey Hellooooowoooo, welcome to SMS Emergency Help Service.  First, we need to know your location.  Please enter the coordinates of your location."

def text_back(message, number):
    client.api.account.messages.create(
        to= number,
        from_="+18449373803",
        body=message)

def main():
    client.api.account.messages.create(
        to="+14045006378",
        from_="+18449373803",
        body=sendMenu())

# Main Body
# main();


@app.route('/sms', methods=['POST'])
def sms():
    # print(request)
    number = request.form['From']
    message_body = request.form['Body']
    print(number)
    print(message_body)

    # resp = MessagingResponse()
    # replyText = getReply(message_body)
    # resp.message('Hi\n\n' + replyText)
    # resp = twiml.Response()
    # resp.message('Hello {}, you said: {}'.format(number, message_body))
    text_back("urmom", number)
    return str(message_body)

if __name__ == '__main__':
    app.run()

print("done")

# Default code to send message
# client.api.account.messages.create(
#     to="+14045006378",
#     from_="+18449373803",
#     body=sendMenu())

