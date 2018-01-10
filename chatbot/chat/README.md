#chat server sample

chat server using web socket

# Configuration

[Admin UI](/apps/chat/admin)

1. Navigate to botsui bot's add webhook form.
2. Fill form with you details, in "Outgoing Webhook URI" field put: https://bots-samples-nodejs:8889/apps/chat/bots/channel_id/messages and hit create button
3. Replace "channel_id" in "Outgoing Webhook URI" field with last parameter in url from "Webhook URL" field.
4. Open [Admin UI](/apps/chat/admin) and create new channel with "Secret Key" and "Webhook URL" from web hook form in botsui.

# Chat Client Integration

### Establishing websocket connection to the chat server




        ws://<host>:<port>/chat/ws?user=<userId>


The userId determines the "from" address of all messages from the client and the "to" address of all messages from the server. For now, the userId is an arbitrary, unique string (e.g. a UUID; a reasonably large random number; an email address) that is consistent across a particular user's conversations.

### Chat Client to Chat Server Messages

        {
          "to": {
            "type": <recipient type>,
            "id": <recipient id>
          },
          "userId": <sender id>,
          "messagePayload": {
            "type": "text",
            "text": "show my transactions"
          },
          "userProfile": {
            "firstName": <first name>,
            "lastName": <last name>,
            "age": <age>
          },
        }


* to.type (required)
    * The recipient type. Allowed values:"bot","user"
* to.id (required)
    * The recipient ID, appropriate to the recipient type.
* userId (optional)
    * Optional, but must match the WebSocket userId
* messagePayload (required)
    * The message payload in the Conversation Message Model format
* userProfile (optional)
    * user profile info

### Chat Server to Chat Client Messages

        {
          "to": {
            "type": <recipient type>,
            "id": <recipient id>
          },
          "body": {
            "messagePayload": {
              "actions": [{
                "label": "checking",
                "postback": {
                  "variables": {
                    accountType: "checking"
                  },
                  "state": "askTxnsAccountType"
                },
                "type": "postback"
              },{
                "label": "savings",
                "postback": {
                  "variables": {
                    accountType: "savings"
                  },
                  "state": "askTxnsAccountType"
                },
                "type": "postback"
              },{
                "label": "credit card",
                "postback": {
                  "variables": {
                    accountType: "credit card"
                  },
                  "state": "askTxnsAccountType"
                },
                "type": "postback"
              }],
              "text": "For which account do you want to see transactions?",
              "type": "text"
            },
            "userId": "hello"  
          },
          "error": {
            "code": <error code>,
            "message": <error message>
          }
        }


* from.type (required)
    * The sender type. Allowed values:"bot","user","system"
* from.id (optional)
    * The sender ID, appropriate to the sender type.
* body (required)
    * The message's body, as received from the Bots server. Typically, the message body will contain a "userId" and "messagePayload".
* body.messagePayload (required)
    * The message payload in the Conversation Message Model format
* body.userId (optional)
    * The WebSocket userId
* error (optional)
    * If an error is present, "from.type" must be "system".
* error.code (optional)
    * A numeric code that uniquely identifies the particular type of error.
* error.message (optional)
    * A textual description of the error.
