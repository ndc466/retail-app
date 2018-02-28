from __future__ import division
from __future__ import print_function
from __future__ import absolute_import

import os, io, shutil, json, threading
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split as split
import oci

from PIL import Image
from utils import dataset_util
from collections import namedtuple, OrderedDict

config = oci.config.from_file()
compartment_id = config['tenancy']
object_storage = oci.object_storage.ObjectStorageClient(config)
namespace = object_storage.get_namespace().data

def main():
    print('Cleaning "models/model/train" and "models/model/eval" directories ...')
    shutil.rmtree('./models/model/train')
    os.mkdir('./models/model/train')
    shutil.rmtree('./models/model/eval')
    os.mkdir('./models/model/eval')
    print('Cleaning config files')
    try:
        os.remove('./data/object_detection.pbtxt')
        os.remove('./models/model/ssd_mobilenet_v1_coco.config')
    except Exception as e: pass
    print('Cleaning "all_labels.csv" from the "images" bucket ...')
    try:
        object_storage.delete_object(namespace, 'images', 'image_labels.csv')
    except Exception as e:
        pass
    print('Cleaning "train_images" and "test_images" buckets ...\n')
    while True:
        for bucket in ['train_images', 'test_images']:
            objects = [f.name for f in object_storage.list_objects(namespace, bucket).data.objects]
            if bucket == 'train_images' and len(objects) == 0: return
            print('Cleaning %s objects from %s bucket ...' % (len(objects), bucket))
            for obj in objects:
                object_storage.delete_object(namespace, bucket, obj)

if __name__ == '__main__':
    main()