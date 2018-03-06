import os, io, sys, base64
import urllib, tarfile, zipfile
import six.moves.urllib as urllib
import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask import Response, redirect, url_for, flash, send_file
from configparser import ConfigParser
from PIL import Image
#from matplotlib import pyplot as plt
import cv2
cap = cv2.VideoCapture(0)
# This is needed since the notebook is stored in the object_detection folder.
sys.path.append("..")
from utils import label_map_util
from utils import visualization_utils as vis_util

import products_api

DEBUG = False

if DEBUG:
    HOST = '0.0.0.0'
    PORT = 8080
else:
    parser = ConfigParser()
    pwd = os.path.dirname(__file__)
    parser.read(os.path.join(os.path.abspath(pwd), "../../", "settings.conf"))
    DEBUG = bool(parser.get("ENV", "DEBUG"))
    HOST = str(parser.get("ENV", "HOST"))
    PORT = int(parser.get("ENV", "PORT"))

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.debug = DEBUG
app.secret_key = 'super secret key'

# for CORS
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST') # Put any other methods you need here
    return response

@app.route('/')
def index():
    return Response('Tensor Flow object detection')

@app.route('/upload')
def upload_file():
    return render_template('upload_ssl.html', host=HOST)

@app.route('/stream.mjpg')
def stream():
    return render_template('webrtc.html', host=HOST)

@app.route("/detect", methods=['GET', 'POST'])
def detect_upload():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    ftype = file.filename.split(".")[-1]
    if file is None or ftype not in ALLOWED_EXTENSIONS:
        return jsonify({
            "success": False,
            "message": "File corrupted or file type not allowed."
        })
    """try:
        # Set an image confidence threshold value to limit returned data
        threshold = request.form.get('threshold')
        if threshold is None:
            threshold = 0.5
        else:
            threshold = float(threshold)

        # image processing
        image = Image.open(file)
        #products = products_api.get_products(image, threshold)
        products = products_api.get_products(image)
        return products
    except Exception as e:
        print('POST /image error: %e' % e)
        return e"""
    # image processing
    image = Image.open(file)
    #products = products_api.get_products(image, threshold)
    products = products_api.get_products(image)
    print('\n%s\n%s\n' % (type(products), products))
    return jsonify({
        "success": True,
        "data": products
    })

@app.route('/test')
def test():
    PATH_TO_TEST_IMAGES_DIR = 'object_detection/test_images'  # cwh
    TEST_IMAGE_PATHS = [os.path.join(PATH_TO_TEST_IMAGES_DIR, 'image{}.jpg'.format(i)) for i in range(1, 3)]
    image = Image.open(TEST_IMAGE_PATHS[0])
    products = products_api.get_objects(image)
    return products

@app.route('/local')
def local():
    return Response(open('./static/local.html').read(), mimetype="text/html")
 
@app.route('/video')
def remote():
    return Response(open('./static/video.html').read(), mimetype="text/html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT, debug=True, ssl_context=('ssl/server.crt', 'ssl/server.key'))