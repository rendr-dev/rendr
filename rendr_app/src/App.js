import React, { useEffect, useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const iframe = document.getElementById('myIframe');

    const handleInput = (e) => {
      setInputValue(e.target.value);
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
        // buttonElement.addEventListener('click', handleButton);
        

        // Attach event to handle Enter key press
        inputElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            if (inputElement && suggestDesigns && inputElement.value.trim() === '') {
              // If input is empty on Enter, remove the input element
              inputElement.remove();
              suggestDesigns.remove();
              analyzeDesigns.remove()
            }
          }
        });

        iframeDocument.body.appendChild(inputElement);
        iframeDocument.body.appendChild(suggestDesigns);
        iframeDocument.body.appendChild(analyzeDesigns);

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
