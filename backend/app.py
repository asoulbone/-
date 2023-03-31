from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from flask import send_file

app = Flask(__name__)
CORS(app)


@app.route('/api/process_image', methods=['POST'])
def process_image():
    # 获取上传的图像文件
    image_file = request.files['image']
    # 将图像保存到源文件中
    image_path = "C:\Study_\\testData\source_img\{image_file.name}"
    image_file.save(image_path)

    # 调用第一条命令来处理图像
    # output_path是latentcode存放地址
    output_path = "C:\Study_\\testData\out_img"
    cmd1 = f"python -u PaddleGAN/applications/tools/pixel2style2pixel.py --input_image={image_path} --output_path={output_path} --model_type=ffhq-inversion --seed=900 --size=1024 --style_dim=512 --n_mlp=8 --channel_multiplier=2"
    subprocess.run(cmd1, shell=True)

    # 调用第二条命令来编辑处理后的图像
    input_path = "C:\Study_\\testData\out_img\dst.npy"
    output_path2 = "C:\Study_\\testData\out2_img"
    cmd2 = f"python -u PaddleGAN/applications/tools/styleganv2editing.py --latent={input_path} --output_path={output_path2} --model_type=ffhq-config-f --size=1024 --style_dim=512 --n_mlp=8 --channel_multiplier=2 --direction_name=gender --direction_offset=-3"
    subprocess.run(cmd2, shell=True)

    # 加载处理后的图像并将其转换为Base64字符串
    result_path = "C:\Study_\\testData\out2_img\dst.editing.png"

    # 返回处理后的图像
    return send_file(result_path, mimetype='image/png')


if __name__ == '__main__':
    app.run()
