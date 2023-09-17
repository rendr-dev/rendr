import React, { useEffect, useState } from 'react';

const App = () => {
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
        const { clientX, clientY } = e;
        const width = e.target.clientWidth;
        const height = e.target.clientHeight;
        const offLeft = e.target.offsetLeft;
        const offTop = e.target.offsetTop;

        // Remove any existing bounding boxes
        const existingBox = iframeDocument.querySelector('.boundingBox');
        if (existingBox) {
            existingBox.remove();
        }

        // Create a new bounding box
        const newBoundingBox = iframeDocument.createElement('div');
        newBoundingBox.classList.add('boundingBox'); // Added a class for easier querying
        newBoundingBox.style.position = 'absolute';
        newBoundingBox.style.border = '10px solid rgba(255, 0, 0, 0.3)';
        newBoundingBox.style.pointerEvents = 'none';
        newBoundingBox.style.left = `${offLeft}px`;
        newBoundingBox.style.top = `${offTop}px`;
        newBoundingBox.style.width = `${width}px`; // Adjust the width as needed
        newBoundingBox.style.height = `${height}px`; // Adjust the height as needed
        iframeDocument.body.appendChild(newBoundingBox);
        setBoundingBox(newBoundingBox);

        // Attach mouseout event to the hovered element
        e.target.addEventListener('mouseout', function() {
          newBoundingBox.remove();
        }, { once: true }); // This ensures the listener is removed after executing once
      });

      iframeDocument.addEventListener('click', function (e) {
        const { clientX, clientY } = e;

        // Remove existing text box if any
        const existingInput = iframeDocument.getElementById('dynamicInput');
        if (existingInput) existingInput.remove();

        // ... rest of your code from here remains the same ...
      });
    });
  }, [boundingBox]);

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