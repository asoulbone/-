from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/process_image', methods=['POST'])
def process_image():
    # 获取上传的图片
    image_file = request.files.get('image')
    if not image_file:
        return jsonify({'error': 'no file found'})
    
    # 保存上传的图片到本地
    image_path = '/tmp/uploaded_image.png'
    image_file.save(image_path)

    # 执行命令，处理图片
    cmd = f"python -u tools/pixel2style2pixel.py \
           --input_image {image_path} \
           --output_path /tmp/output \
           --model_type ffhq-inversion \
           --seed 233 \
           --size 1024 \
           --style_dim 512 \
           --n_mlp 8 \
           --channel_multiplier 2"
    subprocess.run(cmd, shell=True)

    # 读取处理后的图片并返回
    output_path = '/tmp/output/yingbb2.png'
    with open(output_path, 'rb') as f:
        output_image = f.read()

    return jsonify({'image': output_image})

if __name__ == '__main__':
    app.run(debug=True)
