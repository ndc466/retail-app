"""
Usage: ** deprecated **
  # From tensorflow/object_storage.models/
  # Create train data:
  python generate_tfrecord.py --csv_input=data/train_labels.csv  --output_path=data/train.record
  # Create test data:
  python generate_tfrecord.py --csv_input=data/test_labels.csv  --output_path=data/test.record
"""
from __future__ import division
from __future__ import print_function
from __future__ import absolute_import

import os, io, shutil, json, threading
from time import gmtime, strftime
import pandas as pd
import numpy as np
import oci

from PIL import Image
from collections import namedtuple, OrderedDict

config = oci.config.from_file()
compartment_id = config['tenancy']
object_storage = oci.object_storage.ObjectStorageClient(config)
namespace = object_storage.get_namespace().data
models = oci.object_storage.models

row_labels = json.loads(object_storage.get_object(namespace, 'training', 'row_labels.json').data.content.decode())
img_id = 1
      
def add_to_json(split):
    data = {
        "info": {
            "contributor": "Oracle",
            "date_created": "2018/03/07",
            "description": "OCI Object Storage",
            "url": "http://oracle.com",
            "version": "1.0",
            "year": 2018
        },
        "images": [],
        "licenses": [
            {
                "id": 1,
                "name": "No known copyright restrictions",
                "url": "https://oracle.com"
            }
        ],
        "annotations": [],
        "categories": []   
    }
    writer = tf.python_io.TFRecordWriter('data/'+split+'.record')
    labels = object_storage.get_object(namespace, split+'_images', 'image_labels.csv').data.content
    df = pd.read_csv(io.BytesIO(labels))
    
    for index, row in df.iterrows():
        image, annotation, categories = {}
        image['coco_url'] = ""
        image['date_captured'] = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        image['file_name'] = row['filename']
        image['flickr_url'] = ""
        image['height'] = row['height']
        image['id'] = img_id
        image['license'] = 1
        image['width'] = row['width']

        annotation['area'] = row['width'] * row['height']
        annotation['bbox'] = [
            row['xmin'],
            row['ymin'],
            row['xmax'] - row['xmin'],
            row['ymax'] - row['ymin']
        ]
        annotation['category_id'] = row_labels[row['class']]
        annotation['id'] = img_id
        annotation['image_id'] = img_id
        annotation['iscrowd'] = 0

        data['images'].append(image)
        data['annotation'].append(annotation)
        encoded_img = object_storage.get_object(namespace, split+'_images', row['filename']).data.content
        with open('../lib/datasets/data/target/target_train/' + row['filename']) as f:
            f.write(encoded_img)
        img_id += 1
    
    for row in row_labels:
        category = {}
        category['name'] = row
        category['id'] = row_labels[row]
        category['supercategory'] = 'alcohol'
        data['categories'].append(category)

    with open('../lib/datasets/data/target/annotations/target_train.json', 'w') as f:
        json.dump(data, f)
    print('Successfully created the %s TFRecord' % (split))

def main():
    """try:
        os.remove('./data/test.record')
        os.remove('./data/train.record')
    except Exception as e: pass"""
    threads = []
    for split in ['train', 'test']:
        print('Generating %s.record file' % (split))
        add_to_json(split)

if __name__ == '__main__':
    main()