mkdir temp
mv training/object_detection.pbtxt temp
mv training/ssd_mobilenet_v1_coco.config temp
rm -rf training
mv temp training