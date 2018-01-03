from flask import Flask, request, jsonify, abort
import requests, hashlib, json

app = Flask(__name__)
app.debug = True

APPLICATION_JSON_UTF8 = 'application/json; charset=utf-8'
SECRET_KEY = bytes('2mdkVeybquXB71Zgr3bqAzhVh61Lq6Yn', 'utf8')
USER_ID = '5E11F1BA-6C84-49AA-B717-895DF595DB0F'
BOT_URL = 'http://141.144.32.182:8080/connectors/v1/tenants/chatbot-tenant/listeners/webhook/channels/5E11F1BA-6C84-49AA-B717-895DF595DB0F'

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello World!'

@app.route('/receive', methods=['POST'])
def receive():
    data = request.data.decode('utf8')
    print(data)
    msg = json.loads(msg)
    return data

@app.route('/send', methods=['POST'])
def send():
    msg = request.data
    print(msg)
    sha256 = hashlib.sha256(SECRET_KEY)
    sha256.update(msg)
    signature = 'sha256=' + sha256.hexdigest()
    headers = {
        'Content-Type': APPLICATION_JSON_UTF8,
        'X-Hub-Signature': signature
    }
    r = requests.post(BOT_URL, data=msg, headers=headers)
    return r.text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, ssl_context='adhoc')