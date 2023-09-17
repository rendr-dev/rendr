from flask import Flask, request, jsonify
import openai

from dotenv import load_dotenv
import requests
import json
import os


# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "sk-leetV7lWdBxPds9EeteST3BlbkFJLlnHTxG4RRDlmFWOlqOb"

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_html_from_gpt(description):
    print("here")
    html_code = ""
    css_code = ""
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Only include code in your responses. HTML Code should be formatted as ```html <html code>``` and CSS code should be formatted as ```css <css code>```"},
            {"role": "user", "content": f"Create an HTML website based on the following description: {description}. Return HTML code (with id's and className's) as well as a css file for the HTMl file."}
        ]
    )

    for i in completion.choices[0].message.content.split("```"):
        if (i[0:4] == "html"):
            html_code = i
        elif (i[0:3] == "css"):
            css_code = i
    if (html_code == "" or css_code == ""):
        print(completion.choices[0].message.content.split("```"))
        html_code, css_code = get_html_from_gpt(description)
    return (html_code, css_code)

def edit_html(original_html_code, original_css_code, changes):
    print("here")
    html_code = ""
    css_code = ""
    prompt = "Original HTML: \n"
    prompt += original_html_code
    prompt += "\nOriginal CSS: \n"
    prompt += original_css_code
    prompt += "Please rewrite the html section and the css file with the following changes:"
    prompt += changes
    prompt += "\nReturn the part of the HTML given (with the changes reflected) and the entire CSS file, with any new parts you needed to add/change reflected."
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        # model="gpt-4",
        messages=[
            {"role": "system", "content": "Only include code in your responses. HTML Code should be formatted as ```html <html code>``` and CSS code should be formatted as ```css <css code>```"},
            {"role": "user", "content": prompt}
        ]
    )
    for i in completion.choices[0].message.content.split("```"):
        if (i[0:4] == "html"):
            html_code = i
        elif (i[0:3] == "css"):
            css_code = i
    if (html_code == "" or css_code == ""):
        print(completion.choices[0].message.content.split("```"))
        html_code, css_code = edit_html(original_html_code, original_css_code, changes)
    return (html_code, css_code)

@app.route("/get/orig-html", methods=["POST"])
def get_html_endpoint():
    description = request.json.get('description', '')
    html_code, css_code = get_html_from_gpt(description)
    return jsonify({'html_code': html_code, 'css_code': css_code})

@app.route("/get/edit", methods=["POST"])
def get_html_edit_endpoint():
    description = request.json.get('description', "")
    original_html_code = request.json.get("original_html_code", "")
    original_css_code = request.json.get("original_css_code", "")
    html_code, css_code = edit_html(original_html_code, original_css_code, description)
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
    app.run(debug=True)
