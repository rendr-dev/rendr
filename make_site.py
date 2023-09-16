import requests
import json
import webbrowser
import os
import openai
from dotenv import load_dotenv
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
# openai.api_key = '

def get_html_from_gpt(description):
    # api_key = ''
    # url = 'https://api.openai.com/v1/engines/davinci-codex/completions'
    
    # headers = {
    #     'Content-Type': 'application/json',
    #     'Authorization': f'Bearer {api_key}'
    # }

    # data = {
    #     'prompt': f'Create an HTML website based on the following description: {description}. Only return the HTML code.',
    #     'max_tokens': 500
    # }

    # response = requests.post(url, headers=headers, json=data)
    
    # if response.status_code == 200:
    #     return json.loads(response.text)['choices'][0]['text']
    # else:
    #     return f'Error: {response.status_code}'
    print("here")
    html_code = ""
    css_code = ""
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Create an HTML website based on the following description: {description}. Return HTML code (with id's and className's) as well as a css file for the HTMl file."}
        ]
    )

    for i in completion.choices[0].message.content.split("```"):
        if (i[0:4] == "html"):
            html_code = i
        elif (i[0:3] == "css"):
            css_code = i
    return (html_code, css_code)
    # print(completion.choices[0].message.content.split("```"))
    # if len(completion.choices[0].message.content.split("```")) == 1:
    #     return completion.choices[0].message.content.split("```")[0]
    # else:
    #     print(completion.choices[0].message.content.split("```")[1])
    #     return completion.choices[0].message.content.split("```")[1]

def save_html_to_file(html_code, css_code, file_name):
    with open(file_name, "w") as f:
        print(html_code[4:])
        f.write(html_code[4:])
    with open("styles.css", "w") as f:
        print(css_code[3:])
        f.write(css_code[3:])

def open_html_in_browser(file_name):
    abs_path = os.path.abspath(file_name)
    webbrowser.open(f'file://{abs_path}')

if __name__ == "__main__":
    description = input()
    if description == "":
        description = "A simple portfolio website with a header, about section, and contact form."
    html_code, css_code = get_html_from_gpt(description)
    
    # Save the HTML code into a file
    file_name = "website.html"
    save_html_to_file(html_code, css_code, file_name)
    
    # Open the HTML file in the default web browser
    open_html_in_browser(file_name)
    
    print(f"HTML code has been saved to {file_name} and opened in the default web browser.")

