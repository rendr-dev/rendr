import React, { useEffect, useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [textSuggestions, setTextSuggestions] = useState(null);

  const sendToPython = () => {
    // setShowPopup(false);
    const clickedElement = localStorage.getItem("clickedElement");

    fetch("http://localhost:8000/retrieve", {
      // TODO: change this to the hosted backend
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `clickedElement=${clickedElement}`,
    })
      .then((response) => response.json()) // Assuming server responds with json
      .then((data) => {
        console.log(data);
        setImageUrl(data.image_url);
        setTextSuggestions(data.text_url);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    const iframe = document.getElementById("myIframe");
    let inputElement;
    let enterButton;
    let suggestionsButton;

    const handleInput = (e) => {
      setInputValue(e.target.value);
    };

    const handleEnterButton = (e) => {
      e.preventDefault();
      if (inputElement && inputElement.value.trim() === "") {
        inputElement.remove();
        enterButton.remove();
        suggestionsButton.remove();
      }
    };

    iframe.addEventListener("load", function () {
      const iframeDocument = iframe.contentWindow.document;

      iframeDocument.addEventListener("dblclick", function (e) {
        console.log(e.target); // TODO: Remove this line

        // TODO: change this to send it to the backend instead

        const elementString = e.target.outerHTML;
        localStorage.setItem("clickedElement", elementString);

        const { clientX, clientY } = e;
        // Remove existing elements if they exist
        [
          "dynamicInput",
          "dynamicEnterButton",
          "dynamicSuggestionsButton",
        ].forEach((id) => {
          const existingElement = iframeDocument.getElementById(id);
          if (existingElement) existingElement.remove();
        });

        // Create and configure inputElement
        inputElement = iframeDocument.createElement("input");
        inputElement.type = "text";
        inputElement.style.position = "absolute";
        inputElement.style.left = `${clientX}px`;
        inputElement.style.top = `${clientY - 50}px`;
        inputElement.id = "dynamicInput";
        inputElement.style.width = "150px";
        inputElement.style.padding = "10px";
        inputElement.style.border = "2px solid #ccc";
        inputElement.style.borderRadius = "4px";
        inputElement.placeholder = "Type a design prompt here...";
        inputElement.style.backgroundColor = "#FFC803";
        inputElement.style.color = "black";
        inputElement.placeholder = "Type a design prompt here...";
        inputElement.addEventListener("input", handleInput);

        // Create and configure suggestionsButton
        suggestionsButton = iframeDocument.createElement("button");
        suggestionsButton.id = "dynamicSuggestionsButton";
        suggestionsButton.textContent = "AI Suggestions";
        suggestionsButton.style.position = "absolute";
        suggestionsButton.style.left = `${clientX + 180}px`;
        suggestionsButton.style.top = `${clientY - 50}px`;
        suggestionsButton.style.border = "2px solid #ccc";
        suggestionsButton.style.padding = "10px";
        suggestionsButton.style.borderRadius = "5px";
        suggestionsButton.style.backgroundColor = "#C9FF55";
        suggestionsButton.style.color = "black";
        suggestionsButton.addEventListener("click", (event) => {
          event.stopPropagation();
          setShowPopup(true);
          sendToPython();
        });

        // Create and configure enterButton
        enterButton = iframeDocument.createElement("button");
        enterButton.id = "dynamicEnterButton";
        enterButton.textContent = "Enter";
        enterButton.style.position = "absolute";
        enterButton.style.left = `${clientX + 300}px`; // Adjust the button position as needed
        enterButton.style.top = `${clientY - 50}px`;
        enterButton.style.border = "2px solid #ccc";
        enterButton.style.padding = "10px";
        enterButton.style.borderRadius = "5px";
        enterButton.style.backgroundColor = "#FF99EF";
        enterButton.style.color = "black";
        enterButton.addEventListener("click", handleEnterButton);

        iframeDocument.body.appendChild(inputElement);
        iframeDocument.body.appendChild(enterButton);
        iframeDocument.body.appendChild(suggestionsButton);
        inputElement.focus();
      });
    });
  }, [showPopup, imageUrl]);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        id="myIframe"
        src="website.html"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          border: "none",
        }}
      ></iframe>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            right: "0%",
            bottom: "0%",
            width: "50vw",
            height: "100vh",
            backgroundColor: "rgba(0,148,255,0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.5s",
            borderRadius: "10px",
            display: "flex",
            flex: 1,
          }}
        >
          <div style={{ margin: "50px" }}>
            <h1
              style={{
                color: "white",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              Image Suggestions
            </h1>
            <img
              src={imageUrl !== "null" ? imageUrl : null}
              style={{ borderRadius: "10px", margin: "20px" }}
            />
            <h1
              style={{ color: "white", marginTop: "10px", textAlign: "center" }}
            >
              Text Suggestions
            </h1>
            <p style={{ color: "white", marginTop: "10px", fontSize: 18 }}>
              {textSuggestions !== "null" ? textSuggestions : null}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "2px solid #ccc",
                // backgroundColor: "#A2D2FF",
                color: "black",
                cursor: "pointer",
                transition: "0.3s",
                marginTop: "20px",
                alignItems: "center",
                textAlign: "center",
                alignContent: "center",
                alignSelf: "center",
                fontSize: 18,
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.7")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div>Input Value in React: {inputValue}</div>
    </div>
  );
};

export default App;
