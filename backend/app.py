from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from flask import send_file
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)
# 配置mysql
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:Y713xch9@localhost/editm'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# 实例化数据库
db = SQLAlchemy(app)
# Marshmallow 数据序列化
ma = Marshmallow(app)

# 创建表


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    image_path = db.Column(db.String(300))
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body, image_path):
        self.title = title
        self.body = body
        self.image_path = image_path

# 创建模式


class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'image_path', 'date')


post_schema = PostSchema()
posts_schema = PostSchema(many=True)

# 得到所有的已发布信息


@app.route('/get_post', methods=['GET'])
def get_post():
    all_posts = Post.query.all()
    results = posts_schema.dump(all_posts)
    return jsonify(results)

# 根据id查询发布信息


@app.route('/get_post/<id>/', methods=['GET'])
def get_postById(id):
    postById = Post.query.get(id)
    return post_schema.jsonify(postById)

# 创建一条新的发布信息


@app.route('/create_post', methods=['POST'])
def create_post():
    title = request.json['title']
    body = request.json['body']
    image_path = request.json['image_path']

    post = Post(title, body, image_path)
    db.session.add(post)
    db.session.commit()
    return post_schema.jsonify(post)

# 根据id更新信息


@app.route('/update_post/<id>/', methods=['PUT'])
def update_postById(id):
    postById = Post.query.get(id)

    title = request.json['title']
    body = request.json['body']
    image_path = request.json['image_path']

# 必须设置所有的属性，不能空着不改
    postById.title = title
    postById.body = body
    postById.image_path = image_path

    db.session.commit()
    return post_schema.jsonify(postById)

# 根据id更新信息
@app.route('/delete_post/<id>/', methods=['DELETE'])
def delete_postById(id):
    postById = Post.query.get(id)
    db.session.delete(postById)
    db.session.commit()
    return post_schema.jsonify(postById)


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

    # 加载处理后的图像
    result_path = "C:\Study_\\testData\out2_img\dst.editing.png"

    # 返回处理后的图像
    return send_file(result_path, mimetype='image/png')


if __name__ == '__main__':
    app.run(debug=True)
