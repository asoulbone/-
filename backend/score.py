# encoding:utf-8
import base64
import json
import requests

class BaiduAI:
    def __init__(self, img):
        self.AK = "Mwjv3tvEVrWRKNvzMuuzPBPw"#你的应用API Key
        self.SK = "4t5yL1YTuCGocYnVHERMqlzzrX1Zhpxl"#你的应用Secret Key
        self.img_src = img
        self.headers = {
            "Content-Type": "application/json; charset=UTF-8"
        }

    def get_AccessToken(self):
        #获取Access Token
        host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + self.AK + '&client_secret=' + self.SK
        response = requests.get(host, headers=self.headers)
        json_result = json.loads(response.text)
        if response:
            return json_result['access_token']
        else:
            print(json_result)
            return 0

    def img_to_base64(slef, path):
        #图片转化为base64
        with open(path, 'rb') as f:
            image = f.read()
            image_base64 = str(base64.b64encode(image), encoding='utf-8')
        return image_base64

    def face_identification(self):
        # 人脸检测与属性分析
        img = self.img_to_base64(self.img_src)
        request_url = "https://aip.baidubce.com/rest/2.0/face/v3/detect"
        post_data = {
            "image": img,
            "image_type": "BASE64",
            "face_field": "gender,age,beauty,gender,race,emotion,face_shape,landmark",#包括age,beauty,expression,face_shape,gender,glasses,landmark,emotion,face_type,mask,spoofing信息
            "face_type": "LIVE"#人脸的类型。LIVE表示生活照，IDCARD表示身份证芯片照，WATERMARK表示带水印证件照，CERT表示证件照片，默认LIVE。
        }
        access_token = self.get_AccessToken()
        request_url = request_url + "?access_token=" + access_token
        response = requests.post(url=request_url, data=post_data, headers=self.headers)
        json_result = json.loads(response.text)
        print(json_result)
        if json_result['error_code'] == 0:
            print("人脸表情：", json_result['result']['face_list'][0]['emotion']['type'])
            print("人物年龄：", json_result['result']['face_list'][0]['age'])
            print("人物颜值评分：", json_result['result']['face_list'][0]['beauty'])
            print("人物性别：", json_result['result']['face_list'][0]['gender']['type'])
            print("人物种族：", json_result['result']['face_list'][0]['race']['type'])
            return json_result['result']['face_list'][0]['beauty']
            #print("人物特征点位置：", json_result['result']['face_list'][0]['landmark72'])
            
        else:
            print(json_result['error_code'])
            print(json_result['error_msg'])

if __name__ == '__main__':
    imglist=['1.png','2.jpg']
    for i in range(0,len(imglist)):
        print('第{}张图片：'.format(i+1))
        demo = BaiduAI(imglist[i])
        if(demo.get_AccessToken()):
            demo.face_identification()