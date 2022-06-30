import json
import re
import os
import glob
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# this is the backend for rico inspector
# please specify the path to UI Screenshots and View Hierarchies
# https://interactionmining.org/rico
dir_path = r"/path/to/combined"

def file_sorter(item):
    base_name = os.path.basename(os.path.normpath(item))
    p = re.compile('([0-9]+)')
    m = p.match(base_name)
    return int(m.group(1))

json_files = glob.glob(os.path.join(dir_path, "*.json"))
json_files = sorted(json_files, key=file_sorter, reverse=False)

dataset = []
for file in json_files:
    key = os.path.basename(file)
    dataset.append({
        "value":key,
        "label":r"%s"%file
    })

@app.route('/api/v1/get_data', methods=['GET'])
def get_app():
    return jsonify(dataset)


@app.route('/api/v1/get_one_data', methods=['GET'])
def get_app_data():
    json_path = request.args.get('data_id')
    jpeg_path = json_path.replace(".json", ".jpg")
    jpeg_path = r"%s" % jpeg_path
    with open(json_path, "r") as reader:
        json_string = reader.read()
    img = Image.open(jpeg_path, mode='r')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return jsonify({
        "json_data":json_string,
        "img_data":my_encoded_img
    })

if __name__ == '__main__':
    app.run("127.0.0.1", 8082, debug=True)