"""
"""
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

def clean():
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

def transfer_to_bucket(bucket, img_file):
    while True:
        try:
            img = object_storage.get_object(namespace, 'images', img_file).data.content
            res = object_storage.put_object(namespace, bucket, img_file, img)
            return
        except Exception as e:
            print('.', sep='', end='', flush=True)

def main():
    row_labels = {}
    pbtxt = ''
    df = pd.DataFrame()
    objects = [f.name for f in object_storage.list_objects(namespace, 'image_labels').data.objects]
    for i, labels in enumerate(objects):
        # Pull the csv from object storage
        obj = object_storage.get_object(namespace, 'image_labels', labels).data.content
        df = df.append(pd.read_csv(io.BytesIO(obj)))
        # Add object name to labels dict for config files
        obj_name = labels.replace('_labels.csv', '')
        
        row_labels[obj_name] = i+1
        #pbtxt += 'item {\n    id: '+str(i+1)+'\n    name: \"'+obj_name+'\"\n}\n\n'
    all_labels = df.to_csv(index=False).encode()

    # Update config files
    pbtxt = pbtxt[:-2].encode()
    num_classes = str(len(row_labels.keys())).encode()
    coco = cocoA + num_classes + cocoB
    row_labels = json.dumps(row_labels).encode()

    # Split csv into train and test csv files
    train, test = split(df, test_size=0.25)
    train_labels = train.to_csv(index=False).encode()
    test_labels = test.to_csv(index=False).encode()

    # Write files to object storage
    print('Writing "image_labels.csv" to each respective bucket ...')
    res = object_storage.put_object(namespace, 'images', 'image_labels.csv', all_labels)
    res = object_storage.put_object(namespace, 'train_images', 'image_labels.csv', train_labels)
    res = object_storage.put_object(namespace, 'test_images', 'image_labels.csv', test_labels)

    print('Writing config files to "training" bucket ...')
    res = object_storage.put_object(namespace, 'training', 'row_labels.json', row_labels)

    # Write the corresponding image files to the Train and Test buckets
    """print('Writing %s objects to "train_images" bucket ...' % (len(train)))
    for img_file in train['filename']:
        transfer_to_bucket('train_images', img_file)
    print('Writing %s objects to "test_images" bucket ...' % (len(test)))
    for img_file in test['filename']:
        transfer_to_bucket('test_images', img_file) """

    ## multithreading
    print('Writing %s objects to "train_images" bucket ...' % (len(train)))
    threads = []
    for img_file in train['filename']:
        thread = threading.Thread(target=transfer_to_bucket, args=('train_images', img_file,))
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()  
    threads = []   
    print('Writing %s objects to "test_images" bucket ...' % (len(test)))
    for img_file in test['filename']:
        thread = threading.Thread(target=transfer_to_bucket, args=('test_images', img_file,))
        threads.append(thread)
        thread.start()      
    for thread in threads:
        thread.join()

if __name__ == '__main__':
    clean()
    main()