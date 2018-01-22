printf "Creating train and test sets from object storage\n"
printf "________________________________________________\n\n"
python train_test_split.py

printf "\n\nGenerating tfrecord files from train and test sets\n"
printf "________________________________________________\n\n"
python generate_tfrecord.py

printf "\n\nTraining/evaluating model on train/test tfrecords\n"
printf "________________________________________________\n\n"
python train.py --logtostderr --train_dir=models/model/train --pipeline_config_path=models/model/ssd_mobilenet_v1_coco.config &
sleep 60; python eval.py --logtostderr --checkpoint_dir=models/model/train/ --eval_dir=models/model/eval/ --pipeline_config_path=models/model/ssd_mobilenet_v1_coco.config &
wait

printf "\n\nTraining complete, exporting inference graph\n"
printf "________________________________________________\n\n"
python export_inference_graph.py

printf "\n\nSending frozen_inference_graph to REST server\n"
printf "________________________________________________\n\n"
scp frozen_inference_graph.pb opc@129.146.81.61:~