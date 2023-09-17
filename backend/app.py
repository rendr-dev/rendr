from flask import Flask, request, jsonify
import openai

from dotenv import load_dotenv
import requests
import json
import os


# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"

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
    return jsonify({'html_code': html_code, 'css_code': css_code})



if __name__ == '__main__':
    app.run(debug=True)
