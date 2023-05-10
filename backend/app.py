from flask import Flask, request, jsonify,make_response

# flask_cors 允许跨域（跨域：不同ip之间访问即为跨域）
from flask_cors import CORS
import subprocess
from flask import send_file
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime,timedelta
from werkzeug.exceptions import BadRequest,Unauthorized
from flask_marshmallow import Marshmallow

app = Flask(__name__)

CORS(app,supports_credentials=True)


# 配置mysql
app.config["SQLALCHEMY_DATABASE_URI"] =  'mysql://root:Y713xch9@localhost/editm'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# 实例化数据库
db = SQLAlchemy(app)
# Marshmallow 数据序列化
ma = Marshmallow(app)

# 创建表


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId=db.Column(db.Integer)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    image_url = db.Column(db.String(300))
    date = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, userId,title, body, image_url):
        self.userId=userId
        self.title = title
        self.body = body
        self.image_url = image_url

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(100))
    email = db.Column(db.String(30))
    password = db.Column(db.String(100))
    tel = db.Column(db.String(11))
    introduce=db.Column(db.Text())

    def __init__(self,userName,email,password,tel,introduce):
        self.userName=userName
        self.email=email
        self.password=password
        self.tel=tel
        self.introduce=introduce

# 创建模式


class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'userId','title', 'body', 'image_url', 'date')


post_schema = PostSchema()
posts_schema = PostSchema(many=True)

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'userName', 'email', 'password', 'tel','introduce')


user_schema = UserSchema()
users_schema = UserSchema(many=True)

# 得到所有的已发布信息

@app.route('/', methods=['GET'])
def get_hello():
    return {"hello":"world"}

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
    userId = request.form.get('userId')
    title = request.form.get('title')
    body = request.form.get('body')
    image_url = request.form.get('image_url')

    print(userId,title,body,image_url)

    post = Post(userId,title, body, image_url)
    db.session.add(post)
    db.session.commit()
    return post_schema.jsonify(post)

# 根据id更新信息(PUT必须一次更新所有信息，不能单独更新某条信息)


@app.route('/update_post/<id>/', methods=['PUT'])
def update_postById(id):
    postById = Post.query.get(id)

    userId = request.json['userId']
    title = request.json['title']
    body = request.json['body']
    image_url = request.json['image_url']

# 必须设置所有的属性，不能空着不改
    postById.userId = userId
    postById.title = title
    postById.body = body
    postById.image_url = image_url

    db.session.commit()
    return post_schema.jsonify(postById)

# 根据id更新信息
@app.route('/delete_post/<id>/', methods=['DELETE'])
def delete_postById(id):
    postById = Post.query.get(id)
    db.session.delete(postById)
    db.session.commit()
    return post_schema.jsonify(postById)

# 创建新用户
@app.route('/create_user', methods=['POST'])
def create_user():
    userName = request.json['userName']
    email = request.json['email']
    password = request.json['password']
    tel = request.json['tel']
    introduce = request.json['introduce']

    user = User(userName, email, password,tel,introduce)
    db.session.add(user)
    db.session.commit()
    return user_schema.jsonify(user)

# 验证用户邮箱和密码，如果正确则返回该用户信息
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    user = User.query.filter_by(email=email).first()

    if not user:
         return jsonify({'message': '用户不存在'}), 404

    if user.password != password:
        return jsonify({'message': '密码错误！'}), 401
    
    return jsonify(user.id)

# 通过本地保存的用户id获取该用户的所有信息
@app.route('/user_info/<id>/',methods=['GET'])
def get_userInfo(id):
    userById = User.query.get(id)
    return user_schema.jsonify(userById)

# 通过id更新用户修改的数据
@app.route('/update_user/<id>/', methods=['PUT'])
def update_userById(id):
    userById = User.query.get(id)

    userName = request.json['userName']
    email = request.json['email']
    password = request.json['password']
    tel = request.json['tel']
    introduce = request.json['introduce']

# 必须设置所有的属性，不能空着不改
    userById.userName = userName
    userById.email = email
    userById.password = password
    userById.tel = tel
    userById.introduce = introduce

    db.session.commit()
    return user_schema.jsonify(userById)

# @app.route('/update_userinfo',methods=['PATCH'])


# # jwt身份验证，返回jwt令牌
# @app.route('/login', methods=['POST'])
# def login():
#     email = request.json['email']
#     password = request.json['password']

#     user = User.query.filter_by(email=email).first()

#     if not user:
#         return jsonify({'message': 'User not found'}), 404

#     if user.password != password:
#         return jsonify({'message': 'Incorrect password'}), 401

#     expiry = datetime.utcnow() + timedelta(days=7)

#     token = jwt.encode({
#         'user_id': user.id,
#         'exp': expiry,
#     }, app.config['SECRET_KEY'], algorithm='HS256')

#     return jsonify({'token': token})

# # 获取当前用户：
# def get_current_user():
#     # 从请求头获取Authorization的值
#     auth_header=request.headers.get('Authorization')

#     if not auth_header:
#         return Unauthorized('Missing authorization header')
    
#     #如果 Authorization 字段的值不是以 Bearer 开头，则认为它是无效的
#     parts=auth_header.split()

#     if len(parts)!=2 or parts[0].lower()!='bearer':
#         raise Unauthorized('Invalid authorization header')
    
#     token=parts[1]

#     try:
#         # 解码jwt令牌，获取用户id
#         payload=jwt.decode(token,app.config['SECRET_KEY'])
#         user_id=payload['user_id']
#     except jwt.ExpiredSignatureError:
#         raise Unauthorized('Token has expired')
#     except (jwt.DecodeError,jwt.InvalidTokenError):
#         raise Unauthorized('Invalid token')
    
#     # 获取当前用户信息
#     user =User.query.get(user_id)

#     if not user:
#         raise Unauthorized('User not found')
    
#     return user

# # 处理跨域请求
# @app.route('/user_info', methods=['OPTIONS'])
# def handle_options_request():
#     response = make_response()
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Methods', 'GET, OPTIONS')
#     response.headers.add('Access-Control-Allow-Headers', 'Authorization')
#     return response

# # 获取当前用户信息
# @app.route('/user_info',methods=['GET'])
# def get_userInfo():
#     try:
#         # 验证jwt，获取当前用户
#         current_user=get_current_user()

#         # 返回用户信息
#         return jsonify({
#             'id': current_user.id,
#             'userName': current_user.userName,
#             'email': current_user.email,
#             'tel': current_user.tel,
#             'introduce': current_user.introduce
#         })
#     except BadRequest as e:
#         # 处理错误请求
#         return jsonify({'message': str(e)}), 400
#     except Unauthorized as e:
#         # 处理未授权的请求
#         return jsonify({'message': str(e)}), 401
#     except Exception as e:
#         # 处理其他错误
#         return jsonify({'message': 'Internal server error'}), 500

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
