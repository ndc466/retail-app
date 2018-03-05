import os, io, sys, base64, json
import urllib, tarfile, zipfile
import six.moves.urllib as urllib
import tensorflow as tf
import numpy as np
from configparser import ConfigParser
from PIL import Image
sys.path.append("..")
from utils import label_map_util

PATH_TO_CKPT = './output_graph/frozen_inference_graph.pb'
PATH_TO_LABELS = './data/object_detection.pbtxt'
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
NUM_CLASSES = len(label_map.ListFields()[0][1])
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

# Load a (frozen) Tensorflow model into memory.
detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.GraphDef()
    with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')

# Loading label map
label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
category_index = label_map_util.create_category_index(categories)

# Helper code
def load_image_into_numpy_array(image):
    (im_width, im_height) = image.size
    rgbValues = np.array(image.getdata())
    if rgbValues.shape[1] == 4: rgbValues = np.delete(rgbValues, 3, 1)
    return rgbValues.reshape((im_height, im_width, 3)).astype(np.uint8)

with detection_graph.as_default():
    with tf.Session(graph=detection_graph) as sess:
        image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
        detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
        detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
        detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')
        num_detections = detection_graph.get_tensor_by_name('num_detections:0')

# added to put object in JSON
class Product(object):
    def __init__(self):
        self.name="Product Detection REST API"

    def toJSON(self):
        return json.dumps(self.__dict__)

def get_products(image, threshold=0.1):
    image_np = load_image_into_numpy_array(image)
    # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
    image_np_expanded = np.expand_dims(image_np, axis=0)
    # Actual detection.
    (boxes, scores, classes, num) = sess.run(
        [detection_boxes, detection_scores, detection_classes, num_detections],
        feed_dict={image_tensor: image_np_expanded})


    
    img = Image.fromarray(image_np)
    width, height = img.size
    classes = classes[0]
    boxes = boxes[0]
    scores = scores[0]
    dclasses = [category_index.get(value) for index,value in enumerate(classes) if scores[index] > 0.3]
    boxes = boxes[:len(dclasses)]

    """classes = np.squeeze(classes).astype(np.int32)
    scores = np.squeeze(scores)
    boxes = np.squeeze(boxes)
    obj_above_thresh = sum(n > threshold for n in scores)
    print("detected %s objects in image above a %s score" % (obj_above_thresh, threshold))
    
    output = []
    for c in range(0, len(classes)):
        class_name = category_index[classes[c]]['name']
        if scores[c] >= threshold:      # only return confidences equal or greater than the threshold
            print(" object %s - score: %s, coordinates: %s" % (class_name, scores[c], boxes[c]))
            item = Product()
            item.name = 'Product'
            item.class_name = class_name
            item.score = str(scores[c])
            item.y = str(boxes[c][0])
            item.x = str(boxes[c][1])
            item.height = str(boxes[c][2])
            item.width = str(boxes[c][3])
            output.append(item)"""

    for i, box in enumerate(boxes):
        dclasses[i]['ymin'] = box[0]*height
        dclasses[i]['xmin'] = box[1]*width
        dclasses[i]['ymax'] = box[2]*height
        dclasses[i]['xmax'] = box[3]*width
        dclasses[i]['score'] = str(scores[i])

    # Add some metadata to the output
    item = Product()
    item.version = "0.0.1"
    item.numObjects = str(len(dclasses))
    item.threshold = str(threshold)
    dclasses.append(item.__dict__)

    #output = [ob.__dict__ for ob in output]
    print(dclasses)
    return dclasses