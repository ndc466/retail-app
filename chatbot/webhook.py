from flask import Flask, request, jsonify, abort
import hashlib

app = Flask(__name__)
#app.debug = True

@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello World!'

@app.route('/receive', methods=['POST'])
def receive():
    if request.method == 'POST':
        message = jsonify({
            'data': request.form['message']
        })
        print message
        return message
    else:
        abort(400)

@app.route('/send', methods=['POST'])
def send():
    if request.method == 'POST':
        print request.json
        return '', 200
    else:
        abort(400)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888)