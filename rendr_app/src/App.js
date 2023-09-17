import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners"; // Importing one of the spinners

const App = () => {
  var htmlString = `
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
  var cssString = `
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

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
  `;
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null); // TODO: Remove this line
  const [imageUrl3, setImageUrl3] = useState(null); // TODO: Remove this line
  const [textSuggestions, setTextSuggestions] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [boundingBox, setBoundingBox] = useState(null);
  const [combinedString, setCombinedString] = useState(
    `${htmlString}<style>${cssString}</style>`
  );

  // Function to switch to the next image
  const nextImage = () => {
    if (currentImageIndex < 2) setCurrentImageIndex(currentImageIndex + 1);
  };

  // Function to switch to the previous image
  const prevImage = () => {
    if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1);
  };

  // Use the currentImageIndex to get the current image URL
  const getCurrentImageUrl = () => {
    switch (currentImageIndex) {
      case 0:
        return imageUrl;
      case 1:
        return imageUrl2;
      case 2:
        return imageUrl3;
      default:
        return null;
    }
  };

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
        setImageUrl2(data.image_url2); // TODO: Remove this line
        setImageUrl3(data.image_url3); // TODO: Remove this line
        setTextSuggestions(data.text_url);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    const iframe = document.getElementById("myIframe");
    const handleInput = (e) => {
      setInputValue(e.target.value);
    };

    iframe.addEventListener("load", function () {
      const iframeDocument = iframe.contentWindow.document;

      iframeDocument.addEventListener("mouseover", function (e) {
        if (
          ["dynamicInput", "dynamicButton", "dynamicButton2"].includes(
            e.target.id
          )
        ) {
          return;
        }

        const width = e.target.clientWidth;
        const height = e.target.clientHeight;
        const offLeft = e.target.offsetLeft;
        const offTop = e.target.offsetTop;

        // Update the bounding box
        const newBoundingBox = iframeDocument.createElement("div");
        newBoundingBox.style.position = "absolute";
        newBoundingBox.style.border = "5px solid rgba(0, 148, 255, 0.5)";
        newBoundingBox.style.backgroundColor = "rgba(0, 148, 255, 0.1)";
        newBoundingBox.style.pointerEvents = "none";
        newBoundingBox.style.left = `${offLeft - 10}px`;
        newBoundingBox.style.top = `${offTop - 10}px`;
        newBoundingBox.style.width = `${width + 10}px`; // Adjust the width as needed
        newBoundingBox.style.height = `${height + 10}px`; // Adjust the height as needed
        newBoundingBox.style.borderRadius = "10px";
        iframeDocument.body.appendChild(newBoundingBox);
        setBoundingBox(newBoundingBox);

        // Remove any existing bounding boxes
        const existingBox = iframeDocument.querySelector(".boundingBox");
        if (existingBox) {
          existingBox.remove();
        }
        // Attach mouseout event to the hovered element
        e.target.addEventListener(
          "mouseout",
          function () {
            newBoundingBox.remove();
          },
          { once: true }
        ); // This ensures the listener is removed after executing once
      });

      // Click
      iframeDocument.addEventListener("click", function (e) {
        const elementString = e.target.outerHTML;
        localStorage.setItem("clickedElement", elementString);

        const width = e.target.clientWidth;
        const height = e.target.clientHeight;
        const offLeft = e.target.offsetLeft;
        const offTop = e.target.offsetTop;

        if (
          ["dynamicInput", "dynamicButton", "dynamicButton2"].includes(
            e.target.id
          )
        ) {
          return;
        }

        // Remove existing elements if they exist
        // ["dynamicInput", "dynamicButton", "dynamicButton2"].forEach((id) => {
        //   const existingElement = iframeDocument.getElementById(id);
        //   if (existingElement) existingElement.remove();
        // });

        const existingInput = iframeDocument.getElementById("dynamicInput");
        if (existingInput) existingInput.remove();

        // Create new text box
        const inputElement = iframeDocument.createElement("input");
        inputElement.type = "text";
        inputElement.style.position = "absolute";
        inputElement.style.left = `${offLeft}px`;
        inputElement.style.top = `${
          offTop - 60 >= 0 ? offTop - 60 : offTop + height + 20
        }px`;
        inputElement.id = "dynamicInput";
        inputElement.style.width = "200px"; // Adjust the width as needed
        inputElement.style.padding = "10px";
        inputElement.style.border = "2px solid #FFC803";
        inputElement.style.borderRadius = "8px";
        inputElement.style.backgroundColor = "#FFC803";
        inputElement.style.color = "black";
        inputElement.placeholder = "📝 Type a design prompt here...";

        const existingButton = iframeDocument.getElementById("dynamicButton2");
        if (existingButton) existingButton.remove();

        // Create and configure suggestionsButton
        const suggestionsButton = iframeDocument.createElement("button");
        suggestionsButton.id = "dynamicButton2";
        suggestionsButton.innerHTML = "&#x1f3a8 Suggest Designs";
        suggestionsButton.style.position = "absolute";
        suggestionsButton.style.left = `${offLeft + 235}px`;
        suggestionsButton.style.top = `${
          offTop - 60 >= 0 ? offTop - 60 : offTop + height + 20
        }px`;
        suggestionsButton.style.border = "2px solid #C9FF55";
        suggestionsButton.style.padding = "10px 15px";
        suggestionsButton.style.borderRadius = "8px";
        suggestionsButton.style.backgroundColor = "#C9FF55";
        suggestionsButton.style.color = "black";
        suggestionsButton.style.cursor = "pointer";
        suggestionsButton.addEventListener("click", (event) => {
          event.stopPropagation();
          setShowPopup(true);
          sendToPython();
        });

        const analyzeButton = iframeDocument.getElementById("dynamicButton");
        if (analyzeButton) analyzeButton.remove();
        // Create analyze design button
        const analyzeDesigns = iframeDocument.createElement("button");
        analyzeDesigns.id = "dynamicButton";
        analyzeDesigns.innerHTML = "&#x1f50d Analyze UI/UX";
        analyzeDesigns.style.position = "absolute";
        analyzeDesigns.style.left = `${offLeft + 400}px`; // Adjusted the button's position to give space between buttons
        analyzeDesigns.style.top = `${
          offTop - 60 >= 0 ? offTop - 60 : offTop + height + 20
        }px`;
        analyzeDesigns.style.border = "2px solid #FF99EF";
        analyzeDesigns.style.padding = "10px 15px";
        analyzeDesigns.style.borderRadius = "8px";
        analyzeDesigns.style.backgroundColor = "#FFD1F7";
        analyzeDesigns.style.color = "black";
        analyzeDesigns.style.cursor = "pointer";

        // Attach event to handle Enter key press
        inputElement.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            if (
              inputElement &&
              suggestionsButton &&
              inputElement.value.trim() === ""
            ) {
              // If input is empty on Enter, remove the input element
              inputElement.remove();
              suggestionsButton.remove();
              analyzeDesigns.remove();
            }
            fetch("http://localhost:5000/get/edit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                description: inputElement.value.trim(),
                original_html_code: e.target.innerHTML,
                original_css_code: cssString,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("HTML Code:", data.html_code);
                console.log("CSS Code:", data.css_code);
                e.target.innerHTML = data.html_code;
                cssString = data.css_code.toString();
                console.log(iframeDocument.documentElement.outerHTML);
                let totalHtml = iframeDocument.documentElement.outerHTML;
                setCombinedString(`${totalHtml}<style>${cssString}</style>`);
                console.log(combinedString);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
            // e.target.innerHTML = "<h1>HELLO</h1>";
          } else if (event.key === "Escape") {
            if (inputElement && suggestionsButton && analyzeDesigns) {
              // If input is empty on Enter, remove the input element
              inputElement.remove();
              suggestionsButton.remove();
              analyzeDesigns.remove();
            }
          }
        });

        iframeDocument.body.appendChild(inputElement);
        iframeDocument.body.appendChild(suggestionsButton);
        iframeDocument.body.appendChild(analyzeDesigns);
        inputElement.focus();
      });
    });
  }, [boundingBox, showPopup, imageUrl, imageUrl2, imageUrl3]);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <iframe
        id="myIframe"
        // src="website.html"
        srcDoc={combinedString}
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
            right: "10px",
            bottom: "10px",
            width: "40vw",
            height: "90vh",
            backgroundColor: "#F1F3F4",
            padding: "20px",
            flexDirection: "column",
            justifyContent: "space-between",
            animation: "fadeIn 0.5s",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            overflow: "auto",
          }}
        >
          <div>
            <h1
              style={{
                color: "#333",
                marginBottom: "20px",
                textAlign: "center",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "28px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Image Suggestions
            </h1>
            <div>
              {/* Disable if we're at the first image */}
              {getCurrentImageUrl() === null ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <BeatLoader color="#333" />
                </div>
              ) : getCurrentImageUrl() !== "null" ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={getCurrentImageUrl()}
                    alt="Suggested"
                    style={{ width: "60%", objectFit: "cover" }}
                  />
                </div>
              ) : null}
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              
                <button
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#0094FF",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "20px",
                    marginRight: "10px",
                    transition: "opacity 0.3s, transform 0.3s",
                    cursor: currentImageIndex === 0 ? "not-allowed" : "pointer",
                  }}
                  onMouseOver={(e) => {
                    if (currentImageIndex !== 0) {
                      e.target.style.opacity = "0.7";
                      e.target.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  ←
                </button>{" "}
                <button
                  onClick={nextImage}
                  disabled={currentImageIndex === 2}
                  style={{
                    padding: "10px 15px",
                    backgroundColor: "#0094FF",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "20px",
                    marginLeft: "10px",
                    transition: "opacity 0.3s, transform 0.3s",
                    cursor: currentImageIndex === 2 ? "not-allowed" : "pointer",
                  }}
                  onMouseOver={(e) => {
                    if (currentImageIndex !== 2) {
                      e.target.style.opacity = "0.7";
                      e.target.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  →
                </button>{" "}
              </div>
              {/* Disable if we're at the last image */}
            </div>

            <h1
              style={{
                color: "#333",
                marginTop: "20px",
                textAlign: "center",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "28px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Text Suggestions
            </h1>
            <p
              style={{
                color: "#666",
                fontSize: "18px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {textSuggestions === null ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  {" "}
                  {/* Adjust height as necessary */}
                  <BeatLoader color="#333" />
                </div>
              ) : textSuggestions !== "null" ? (
                <p /*... styles ...*/>{textSuggestions}</p>
              ) : null}
            </p>
          </div>
          <button
            onClick={() => {
              setShowPopup(false);
              setImageUrl(null);
              setImageUrl2(null);
              setImageUrl3(null);
              setTextSuggestions(null);
            }}
            style={{
              display: "block",
              margin: "30px auto 0",
              padding: "10px 30px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#0094FF",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              transition: "opacity 0.3s, transform 0.3s",
              fontFamily: "'Roboto', sans-serif",
            }}
            onMouseOver={(e) => {
              e.target.style.opacity = "0.7";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = "1";
              e.target.style.transform = "scale(1)";
            }}
          >
            Close
          </button>
        </div>
      )}
      <div>Input Value in React: {inputValue}</div>
    </div>
  );
};

export default App;
