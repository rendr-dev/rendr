from celery import Celery
import openai

celery_app = Celery('tasks')
celery_app.config_from_object('celery_config')

@celery_app.task
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

@celery_app.task
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