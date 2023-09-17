import React, { useEffect, useState } from 'react';

const App = () => {

  const htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Portfolio</title>
  </head>
  <body>
    <header id="header">
      <h1>My Portfolio</h1>
    </header>
  
    <section id="about">
      <h2>About Me</h2>
      <section id="interest">
        <h3>Interest in Machine Learning</h3>
        <p>I have a strong passion for machine learning and enjoy exploring its various applications in different fields.</p>
      </section>
  
      <section id="work">
        <h3>Past Work at Google Research on Plate Reconstruction</h3>
        <p>During my time at Google Research, I had the opportunity to work on plate reconstruction techniques to improve the accuracy and efficiency of the process.</p>
      </section>
  
      <section id="projects">
        <h2>Projects</h2>
        <div id="project-container">
          <div class="project">
            <h3>Plate Reconstruction Algorithm</h3>
            <p>This project involved developing a plate reconstruction algorithm using Convolutional Neural Networks (CNNs) to enhance the accuracy and speed of the process.</p>
          </div>
          <div class="project">
            <h3>Lung Cancer Diagnosis Synthetic Data Generation</h3>
            <p>In this project, I utilized CTGANs to generate synthetic data for lung cancer diagnosis, enabling researchers to train and test machine learning models without compromising patient privacy.</p>
          </div>
          <div class="project">
            <h3>Calorie Tracker and Personalized Fitness Scheduler</h3>
            <p>For this project, I designed and implemented an ML-based application that tracks calorie intake, monitors fitness goals, and generates personalized workout schedules based on user preferences and progress.</p>
          </div>
        </div>
      </section>
  
      <section id="hobby">
        <h3>Hobby for University of Texas (Longhorn) Football</h3>
        <p>As a Longhorn fan, I always make sure to catch the football games and support the team.</p>
      </section>
    </section>
  
    <section id="contact">
      <h2>Contact Me</h2>
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        
        <label for="message">Message:</label>
        <textarea id="message" name="message"></textarea>
        
        <input type="submit" value="Send">
      </form>
    </section>
  </body>
  </html>
  `;
  const cssString = `<style>${`
  /* Header styles */
  #header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  
  h1 {
    margin: 0;
  }
  
  /* About section styles */
  #about {
    background-color: #f2f2f2;
    padding: 20px;
  }
  
  /* Subsection styles */
  section {
    margin-bottom: 20px;
  }
  
  h2 {
    margin: 0 0 10px;
  }
  
  h3 {
    margin: 0 0 10px;
  }
  
  /* Projects section styles */
  #projects {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  
  #project-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  
  .project {
    background-color: #fff;
    padding: 20px;
  }
  
  .project:nth-child(1) h3,
  .project:nth-child(2) h3,
  .project:nth-child(3) h3 {
    margin-top: 0;
  }
  
  /* Contact section styles */
  #contact {
    background-color: #e6e6e6;
    padding: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 16px;
  }
  
  input[type="submit"] {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  `}</style>`;
  const combinedString = `${htmlString}${cssString}`;

  const [inputValue, setInputValue] = useState('');
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    const iframe = document.getElementById('myIframe');

    const handleInput = (e) => {
      setInputValue(e.target.value);
    };

    iframe.addEventListener('load', function () {
      const iframeDocument = iframe.contentWindow.document;

      iframeDocument.addEventListener('mouseover', function(e) {
        const width = e.target.clientWidth;
        const height = e.target.clientHeight;
        const offLeft = e.target.offsetLeft;
        const offTop = e.target.offsetTop;

        // Update the bounding box
        const newBoundingBox = iframeDocument.createElement('div');
        newBoundingBox.style.position = 'absolute';
        newBoundingBox.style.border = '5px solid rgba(0, 148, 255, 0.3)';
        newBoundingBox.style.pointerEvents = 'none';
        newBoundingBox.style.left = `${offLeft}px`;
        newBoundingBox.style.top = `${offTop}px`;
        newBoundingBox.style.width = `${width}px`; // Adjust the width as needed
        newBoundingBox.style.height = `${height}px`; // Adjust the height as needed
        newBoundingBox.style.borderRadius = '10px';
        iframeDocument.body.appendChild(newBoundingBox);
        setBoundingBox(newBoundingBox);
      
        // Remove any existing bounding boxes
        const existingBox = iframeDocument.querySelector('.boundingBox');
        if (existingBox) {
            existingBox.remove();
        }
        // Attach mouseout event to the hovered element
        e.target.addEventListener('mouseout', function() {
          newBoundingBox.remove();
        }, { once: true }); // This ensures the listener is removed after executing once

      });

      iframeDocument.addEventListener('click', function (e) {
        const { clientX, clientY } = e;
        console.log(e.target);
        

        // Remove existing text box if any
        const existingInput = iframeDocument.getElementById('dynamicInput');
        if (existingInput) existingInput.remove();

        // Create new text box
        const inputElement = iframeDocument.createElement('input');
        inputElement.type = 'text';
        inputElement.style.position = 'absolute';
        inputElement.style.left = `${clientX}px`;
        inputElement.style.top = `${clientY - 50}px`;
        inputElement.id = 'dynamicInput';
        inputElement.style.width = '150px'; // Adjust the width as needed
        inputElement.style.padding = '10px';
        inputElement.style.border = '2px solid #ccc';
        inputElement.style.borderRadius = '4px';
        inputElement.style.backgroundColor = '#FFC803';
        inputElement.style.color = 'black';
        inputElement.placeholder = 'Type a design prompt here...';

        const existingButton = iframeDocument.getElementById('dynamicButton');
        if (existingButton) existingButton.remove();
        // Create suggest designs button
        const suggestDesigns = iframeDocument.createElement('button');
        suggestDesigns.id = 'dynamicButton';
        suggestDesigns.textContent = 'Suggest Designs';
        suggestDesigns.style.position = 'absolute';
        suggestDesigns.style.left = `${clientX + 180}px`; // Adjust the button position as needed
        suggestDesigns.style.top = `${clientY - 50}px`;
        suggestDesigns.style.border = '2px solid #ccc';
        suggestDesigns.style.padding = '10px';
        suggestDesigns.style.borderRadius = '5px';
        suggestDesigns.style.backgroundColor = '#C9FF55';
        suggestDesigns.style.color = 'black';

        const analyzeButton = iframeDocument.getElementById('dynamicButton');
        if (analyzeButton) analyzeButton.remove();
        // Create analyze design button
        const analyzeDesigns = iframeDocument.createElement('button');
        analyzeDesigns.id = 'dynamicButton';
        analyzeDesigns.textContent = 'Analyze UI/UX';
        analyzeDesigns.style.position = 'absolute';
        analyzeDesigns.style.left = `${clientX + 300}px`; // Adjust the button position as needed
        analyzeDesigns.style.top = `${clientY - 50 }px`;
        analyzeDesigns.style.border = '2px solid #ccc';
        analyzeDesigns.style.padding = '10px';
        analyzeDesigns.style.borderRadius = '5px';
        analyzeDesigns.style.backgroundColor = '#FF99EF';
        analyzeDesigns.style.color = 'black';

        // Attach event to handle input
        inputElement.addEventListener('input', handleInput);

        // Attach event to handle Enter key press
        inputElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            if (inputElement && suggestDesigns && inputElement.value.trim() === '') {
              // If input is empty on Enter, remove the input element
              inputElement.remove();
              suggestDesigns.remove();
              analyzeDesigns.remove()
            }
            fetch('http://localhost:5000/get/edit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ description: inputElement.value.trim() , original_html_code: e.target.innerHTML, original_css_code: cssString}),
            })
            .then((response) => response.json())
            .then((data) => {
              console.log('HTML Code:', data.html_code);
              console.log('CSS Code:', data.css_code);
              e.target.innerHTML = data.html_code;
              cssString = data.css_code
            })
            .catch((error) => {
              console.error('Error:', error);
            });

            // e.target.innerHTML = "<h1>HELLO</h1>";
          }
        });

        iframeDocument.body.appendChild(inputElement);
        iframeDocument.body.appendChild(suggestDesigns);
        iframeDocument.body.appendChild(analyzeDesigns);
        inputElement.focus();
      });

    });
  }, [boundingBox]);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        id="myIframe"
        // src="website.html"
        srcDoc={combinedString}
        style={{
          position: "relative",
          width: '100vw',
          height: '100vh',
          border: 'none',
        }}
      ></iframe>
      <div>Input Value in React: {inputValue}</div>
    </div>
  );
};

export default App;