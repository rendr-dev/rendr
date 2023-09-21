from flask import Flask, request, jsonify
import openai

from dotenv import load_dotenv
import requests
import json
import os
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

from flask_cors import CORS

from celery import Celery
from tasks import get_html_from_gpt, edit_html

celery_app = Celery('tasks')
celery_app.config_from_object('celery_config')

app = Flask(__name__)
CORS(app)

@app.route("/get/orig-html", methods=["POST"])
def get_html_endpoint():
    description = request.json.get('description', '')
    result = get_html_from_gpt.apply_async(args=[description])
    html_code, css_code = result.get()
    return jsonify({'html_code': html_code, 'css_code': css_code})

@app.route("/get/edit", methods=["POST"])
def get_html_edit_endpoint():
    description = request.json.get('description', "")
    original_html_code = request.json.get("original_html_code", "")
    original_css_code = request.json.get("original_css_code", "")
    result = edit_html.apply_async(args=[original_html_code, original_css_code, description])
    html_code, css_code = result.get()
    html_code = html_code.strip()
    if (html_code[0:4] == "html"):
        html_code = html_code[4:]
    return jsonify({'html_code': html_code, 'css_code': css_code})


@app.route('/retrieve', methods=['POST'])
def retrieve_element():
    clicked_element = request.form.get('clickedElement')
    print('clicked element: \n')
    print(clicked_element) # TODO: split this up into cases of image vs text tag

    PROMPT = "Generate an image for the following description. Note that it is originally HTML, so convert it into regular text if applicable.\n\n" + clicked_element

    response = openai.Image.create(
        prompt=PROMPT,
        n=3,
        size="256x256",
        # response_format="b64_json", 
    ) # TODO: change to back to base64

    image_url1 = response['data'][0]['url']
    image_url2 = response['data'][1]['url']
    image_url3 = response['data'][2]['url']
    # image_url = response['data'][0]['b64_json']
    print(image_url1)

    PROMPT = "Generate alternative, improved phrasing for the following sentence(s).\n\n" + image_url1

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant who is an expert in web dev phrasing."},
            {"role": "user", "content": f"Generate alternative, improved phrasing for the following sentence(s). {clicked_element} \n \n These will go on a website, so make it match that style. Remove any hint of HTML formatting -- just parse the text."}
        ]
    )

    text_url = response['choices'][0]['message']['content']
    print(text_url)
    return jsonify({"image_url": image_url1, "image_url2": image_url2, "image_url3": image_url3, "text_url": text_url})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
