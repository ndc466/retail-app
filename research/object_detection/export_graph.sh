echo Most recent checkpoint: 
read ckpt
echo Output directory: 
read output_dir
python export_inference_graph.py \
    --input_type image_tensor \
    --pipeline_config_path training/ssd_mobilenet_v1_coco.config \
    --trained_checkpoint_prefix training/model.ckpt-$ckpt \
    --output_directory $output_dir
