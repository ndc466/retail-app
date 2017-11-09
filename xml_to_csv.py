#!/usr/bin/python

import os, sys, glob
import pandas as pd
import xml.etree.ElementTree as ET

def main(data_file):
    for directory in ['train', 'test']:
        xml_list = []
        for xml_file in glob.glob('./'+data_file+'/'+directory+'/'+'*.xml'):
            tree = ET.parse(xml_file)
            root = tree.getroot()
            for member in root.findall('object'):
                value = (root.find('filename').text,
                        int(root.find('size').find('width').text),
                        int(root.find('size').find('height').text),
                        member.find('name').text,
                        int(member.find('bndbox').find('xmin').text),
                        int(member.find('bndbox').find('ymin').text),
                        int(member.find('bndbox').find('xmax').text),
                        int(member.find('bndbox').find('ymax').text)
                        )
                xml_list.append(value)
        column_name = ['filename', 'width', 'height', 'class', 'xmin', 'ymin', 'xmax', 'ymax']
        xml_df = pd.DataFrame(xml_list, columns=column_name)
        xml_df.to_csv("./"+data_file+"/{}_labels.csv".format(directory), index=None)
        print('Successfully converted xml to csv')

if __name__ == "__main__":
    data_file = sys.argv[1] if sys.argv[1][-1] != "/" else sys.argv[1][:-1]
    main(data_file)