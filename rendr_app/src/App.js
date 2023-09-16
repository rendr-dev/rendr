import React, { useEffect, useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const iframe = document.getElementById('myIframe');

    const handleInput = (e) => {
      setInputValue(e.target.value);
    };

    const handleButton = (e) => {

    };

    iframe.addEventListener('load', function () {
      const iframeDocument = iframe.contentWindow.document;

      iframeDocument.addEventListener('click', function (e) {
        const { clientX, clientY } = e;

        // Remove existing text box if any
        const existingInput = iframeDocument.getElementById('dynamicInput');
        if (existingInput) existingInput.remove();

        // Create new text box
        const inputElement = iframeDocument.createElement('input');
        inputElement.type = 'text';
        inputElement.style.position = 'absolute';
        inputElement.style.left = `${clientX}px`;
        inputElement.style.top = `${clientY}px`;
        inputElement.id = 'dynamicInput';
        inputElement.style.width = '150px'; // Adjust the width as needed
        inputElement.style.padding = '5px';
        inputElement.style.border = '2px solid #ccc';
        inputElement.style.borderRadius = '4px';

         // Create new button
         const buttonElement = iframeDocument.createElement('button');
         buttonElement.textContent = 'Say Hello';
         buttonElement.style.position = 'absolute';
         buttonElement.style.left = `${clientX + 180}px`; // Adjust the button position as needed
         buttonElement.style.top = `${clientY}px`;
         buttonElement.id = 'dynamicButton';

        // Attach event to handle input
        inputElement.addEventListener('input', handleInput);
        buttonElement.addEventListener('click', handleButton);

        // Attach event to handle Enter key press
        inputElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            if (inputElement.value.trim() === '') {
              // If input is empty on Enter, remove the input element
              inputElement.remove();
              buttonElement.remove();
            }
          }
        });
    
        iframeDocument.body.appendChild(inputElement);
        iframeDocument.body.appendChild(buttonElement);
        inputElement.focus();
      });

    });
  }, []);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        id="myIframe"
        src="website.html"
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
