printf "Creating train and test sets from object storage ...\n"
python train_test_split.py

printf "\n\nGenerating tfrecord files from train and test sets ...\n"
python generate_tfrecord.py

printf "\n\nTraining new model on train and test tfrecords ...\n"
python train.py --logtostderr --train_dir=training/ --pipeline_config_path=training/ssd_mobilenet_v1_coco.config
