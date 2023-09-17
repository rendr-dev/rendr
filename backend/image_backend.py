from gensim.test.utils import common_texts
from gensim.models import Word2Vec
from flask import Flask, request, jsonify
import base64
from io import BytesIO
import os
import openai
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)  # Add CORS to Flask
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/retrieve', methods=['POST'])
def retrieve_element():
    clicked_element = request.form.get('clickedElement')
    print('clicked element: \n')
    print(clicked_element) # TODO: split this up into cases of image vs text tag
    
    # model = Word2Vec(sentences=common_texts, vector_size=100, window=5, min_count=1, workers=4)
    # model.save("word2vec.model")
    # model.train([["pip install tensorflow==2.0"]], total_examples=1, epochs=1)

    PROMPT = "Generate an image for the following description. Note that it is originally HTML, so convert it into regular text if applicable.\n\n" + clicked_element

    response = openai.Image.create(
        prompt=PROMPT,
        n=1,
        size="256x256",
        # response_format="b64_json", 
    ) # TODO: change to back to base64

    image_url = response['data'][0]['url']
    print(image_url)

    PROMPT = "Generate alternative, improved phrasing for the following sentence(s).\n\n" + image_url

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant who is an expert in web dev phrasing."},
            {"role": "user", "content": f"Generate alternative, improved phrasing for the following sentence(s). {clicked_element} \n \n These will go on a website, so make it match that style. Remove any hint of HTML formatting -- just parse the text."}
        ]
    )

    text_url = response['choices'][0]['message']['content']
    print(text_url)

    # print(response['data'][0])

    # curr = response["data"][0]["b64_json"]
    # img_bytes = base64.b64decode(curr)

    # Saving the image to a directory called 'images' on the server
    # file_path = os.path.join("images", "generated_image.png")

    # with open(file_path, "wb") as img_file:
    #     img_file.write(img_bytes)

    # # Assuming your server is at http://localhost:8000, provide a URL to the saved image
    # image_url = f"http://localhost:8000/{file_path}"

    return jsonify({"image_url": image_url, "text_url": text_url})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
