import React, { useEffect, useState, useCallback } from "react";
import { BeatLoader } from "react-spinners"; // Importing one of the spinners

const App = () => {
  var htmlString = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>Rendr Dev - Homepage Canvas</title>
</head>
<body style="background-color: #F5F5DC; margin: 20px;">
  <header id="header" style="background-color: #4169E1; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; border: 2px solid #333;">
    <div style="display: flex; align-items: center; margin: 10px;">
      <a style="font-weight: bold; font-size: larger; color: beige; font-family: 'Courier New', monospace;">  rendr dev - homepage canvas</a>
    </div>
    <a href="https://ohkq5aqkd1f.typeform.com/to/BuUm9pX2" target="_blank">
    <button style="background-color: orange; border: none; border-radius: 12px; padding: 10px 20px; color: white; font-weight: bold; margin-left: 10px;">Request the BETA</button>
    </a>
  </header>
  <hr>
  <section id="intro" style="background-color: beige; border-radius: 10px;">
      <div class="icon-and-text">
          <h1><span class="emoji" style="font-size: 36px; margin: 10px 0;">&#128075</span> welcome to <span style="color: #0094FF; font-family: 'Source Code Pro', monospace;">rendr</span> - front-end engineering made easy.</h1>
      </div>
      <h3 style="margin-left: 3.25%; color: darkgray;"><i>Create</i>, <i>modify</i>, and <i>re-render</i> webpages by <u>directly interacting with components</u> and making creative changes with AI.</h3>

      <div style="margin:12px" />      
      
      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle" style="background-color: navy; color: beige; font-weight: bold; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; text-align: center; display: inline-block; margin-right: 10px;">1</div>
        <h3 style="color: navy; font-weight: normal; margin-top: 7px; display: inline-block;"> To use rendr, move your mouse <span class="emoji">&#x1f42d</span>around to target <span class="emoji">&#x1f3af</span>any component of this webpage you'd like to change. </h3>
      </div>

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle" style="background-color: navy; color: beige; font-weight: bold; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; text-align: center; display: inline-block; margin-right: 10px;">2</div>
        <h3 style="color: navy; font-weight: normal; margin-top: 7px; display: inline-block;"> Select any target component, and click on it to interact. </h3>
      </div>

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle" style="background-color: navy; color: beige; font-weight: bold; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; text-align: center; display: inline-block; margin-right: 10px;">3</div>
        <h3 style="color: navy; font-weight: normal; margin-top: 7px; display: inline-block;"> To make a simple UI change <span class="emoji">&#x1f3a8</span>, type a specific prompt <span class="emoji">&#x1f4dd</span> for the targeted component (ie. Add more material to this section about hackathons). </h3>
      </div>
        

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle" style="background-color: navy; color: beige; font-weight: bold; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; text-align: center; display: inline-block; margin-right: 10px;">4</div>
        <h3 style="color: navy; font-weight: normal; margin-top: 7px; display: inline-block;"> Hit enter to submit the changes! Wait up to 20-30 seconds for the change (we hope to optimize later! <span class="emoji">&#x1f4a8</span>). </h3>
      </div>
      

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle" style="background-color: navy; color: beige; font-weight: bold; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; text-align: center; display: inline-block; margin-right: 10px;">5</div>
        <h3 style="color: navy; font-weight: normal; margin-top: 7px; display: inline-block;"> Don't fret if you run into creator's block! You can also click on "Suggest Designs" <span class="emoji">&#x1f5bc</span> to recommend generated image and text suggestions.</h3>
      </div>

      <div class="icon-and-text" style="margin-bottom:12px">
      <div class="circle" style="background-color: navy; color: beige; font-weight: bold; border: 1px solid #000; border-radius: 50%; width: 20px; height: 20px; text-align: center; display: inline-block; margin-right: 10px;">6</div>
      <h3 style="color: navy; font-weight: bold; margin-top: 7px; display: inline-block;">Key commands: [enter] - submit prompt for changing UI, [esc] - close toolbar, [command-x] - saves your changed UI design as HTML + CSS files</h3>
    </div>
    </section>
  <hr>
  <section id="about" style="background: linear-gradient(to right, yellow , orange);">
    <h2><span class="emoji">&#x1F4BB;</span> About <i>Rendr Dev</i></h2>
    <p style="color: navy;"> <i>Rendr Dev</i> is a <u>development tool</u> designed for fast, fluid <u>frontend engineering</u>. It provides a seamless experience for developers, enabling them to create dynamic, responsive, and high-performance web applications with ease. Our goal is to create a seamless, <u>no-code website maintenance engine</u>.</p>
  </section>
  <hr>
  <footer style="background-color: #4169E1; border-radius: 10px; padding: 20px; color: white; text-align: center; border: 2px solid #333;">
    <h2>Contact Us</h2>
    <p>Email: johnrho [at] college [dot] harvard [dot] edu</p>
    <p>Made with ❤️ using Rendr Dev!</p>
    <a href="https://www.linkedin.com" target="_blank"><img src="https://img.icons8.com/color/48/000000/linkedin.png"/></a>
    <a href="https://www.twitter.com" target="_blank"><img src="https://img.icons8.com/color/48/000000/twitter.png"/></a>
    <p>© 2024 Rendr Dev. All rights reserved.</p>
  </footer>
</body>
</html>

  `;
  var cssString = `
  /* Header styles */
#header {
  color: #fff;
  padding: 20px;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 20px;
}

#featured-flowers {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
}

#flower-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.flower-item {
  background-color: #fff;
  padding: 20px;
  text-align: center;
}

.flower-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;  /* This ensures the images maintain their aspect ratio while filling the size */
  border-radius: 10px;
}


.flower-item a {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  text-decoration: none;
}

#about, #contact {
  background-color: #e6e6e6;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input[type="text"],
input[type="email"],
textarea {
  width: 80%;
  padding: 10px;
  margin-bottom: 16px;
}

input[type="message"],
textarea {
  width: 80%;
  height: 100px;
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
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading animation

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

    fetch("https://hackmit-c56114350684.herokuapp.com/retrieve", {
      // fetch("http://localhost:8000/retrieve", {
      // TODO: change this to the hosted backend
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `clickedElement=${clickedElement}`,
    })
      .then((response) => response.json()) // Assuming server responds with json
      .then((data) => {
        // console.log(data);
        setImageUrl(data.image_url);
        setImageUrl2(data.image_url2); // TODO: Remove this line
        setImageUrl3(data.image_url3); // TODO: Remove this line
        setTextSuggestions(data.text_url);
      })
      .catch((error) => console.error("Error:", error));
  };
  const downloadFile = (content, filename, contentType) => {
    console.log("In download");
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleKeyPress = useCallback((event) => {
    // console.log(`Key pressed: ${event.key}`);
    console.log(event.ctrlKey);
    console.log(event.key);
    if (event.ctrlKey && event.key == "x") {
      downloadFile(
        document.getElementById("myIframe").contentWindow.document
          .documentElement.outerHTML,
        "website.html",
        "text/html"
      );
      downloadFile(cssString, "styles.css", "text/css");
    }
    if (event.key === "Escape") {
      setShowPopup(false);
    }
    // event.stopPropagation();
    // event.preventDefault();
  }, []);

  useEffect(() => {
    const iframe = document.getElementById("myIframe");

    const handleInput = (e) => {
      setInputValue(e.target.value);
    };

    iframe.addEventListener("load", function () {
      const iframeDocument = iframe.contentWindow.document;
      document.addEventListener("keydown", handleKeyPress);
      iframeDocument.addEventListener("keydown", handleKeyPress);
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

        var existingBox = iframeDocument.querySelector(".boundingBox");
        if (existingBox) {
          existingBox.remove();
        }
        // Update the bounding box
        const newBoundingBox = iframeDocument.createElement("div");
        newBoundingBox.style.position = "absolute";
        newBoundingBox.style.border = "5px solid rgba(0, 148, 255, 0.5)";
        newBoundingBox.style.backgroundColor = "rgba(0, 148, 255, 0)";
        newBoundingBox.style.pointerEvents = "none";
        newBoundingBox.style.left = `${offLeft - 10}px`;
        newBoundingBox.style.top = `${offTop - 10}px`;
        newBoundingBox.style.width = `${width + 10}px`; // Adjust the width as needed
        newBoundingBox.style.height = `${height + 10}px`; // Adjust the height as needed
        newBoundingBox.style.borderRadius = "10px";
        iframeDocument.body.appendChild(newBoundingBox);
        setBoundingBox(newBoundingBox);

        // Remove any existing bounding boxes
        existingBox = iframeDocument.querySelector(".boundingBox");
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

        // Make the bounding box disappear after 5 seconds
        setTimeout(() => {
          newBoundingBox.remove();
        }, 5000);
      });

      iframeDocument.addEventListener("click", function (e) {
        const { clientX, clientY } = e;
        // console.log(e.target);
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

        var existingBox = iframeDocument.querySelector(".boundingBox");
        if (existingBox) {
          existingBox.remove();
        }

        // // Update the bounding box
        const newBoundingBox = iframeDocument.createElement("div");
        newBoundingBox.style.position = "absolute";
        newBoundingBox.style.border = "5px solid rgba(0, 148, 255, 0.5)";
        newBoundingBox.style.backgroundColor = "rgba(0, 148, 255, 0)";
        newBoundingBox.style.pointerEvents = "none";
        newBoundingBox.style.left = `${offLeft - 10}px`;
        newBoundingBox.style.top = `${offTop - 10}px`;
        newBoundingBox.style.width = `${width + 10}px`; // Adjust the width as needed
        newBoundingBox.style.height = `${height + 10}px`; // Adjust the height as needed
        newBoundingBox.style.borderRadius = "10px";
        iframeDocument.body.appendChild(newBoundingBox);
        setBoundingBox(newBoundingBox);

        // Remove any existing bounding boxes
        existingBox = iframeDocument.querySelector(".boundingBox");
        if (existingBox) {
          existingBox.remove();
        }

        // Attach mouseout event to the hovered element
        iframeDocument.addEventListener(
          "mouseout",
          function () {
            newBoundingBox.remove();
          },
          { once: true }
        );

        // Make the bounding box disappear after 5 seconds
        setTimeout(() => {
          newBoundingBox.remove();
        }, 5000);

        iframeDocument.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            newBoundingBox.remove();
          }
        });
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

        const analyzeButton = iframeDocument.getElementById("dynamicButton");
        if (analyzeButton) analyzeButton.remove();
        // Create analyze design button
        const analyzeDesigns = iframeDocument.createElement("button");
        analyzeDesigns.id = "dynamicButton";
        analyzeDesigns.innerHTML = "&#x1f50d Community Designs (WIP)";
        analyzeDesigns.style.position = "absolute";
        analyzeDesigns.style.left = `${offLeft + 390}px`; // Adjusted the button's position to give space between buttons
        analyzeDesigns.style.top = `${
          offTop - 60 >= 0 ? offTop - 60 : offTop + height + 20
        }px`;
        analyzeDesigns.style.border = "2px solid #FF99EF";
        analyzeDesigns.style.padding = "10px 15px";
        analyzeDesigns.style.borderRadius = "8px";
        analyzeDesigns.style.backgroundColor = "#FFD1F7";
        analyzeDesigns.style.color = "black";
        analyzeDesigns.style.cursor = "pointer";

        const existingButton = iframeDocument.getElementById("dynamicButton2");
        if (existingButton) existingButton.remove();

        // Create and configure suggestionsButton
        const suggestionsButton = iframeDocument.createElement("button");
        suggestionsButton.id = "dynamicButton2";
        suggestionsButton.innerHTML = "&#x1f3a8 Suggest Designs";
        suggestionsButton.style.position = "absolute";
        suggestionsButton.style.left = `${offLeft + 232}px`;
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

        analyzeDesigns.style.transition = "all 0.3s ease"; // Add smooth transition effect
        analyzeDesigns.addEventListener("mouseover", function () {
          this.style.backgroundColor = "#FFB0E6";
          this.style.borderColor = "#FF66D9";
          this.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.2)"; // Adds a shadow effect
          this.style.transform = "scale(1.05)"; // Scale up the button slightly
        });
        analyzeDesigns.addEventListener("mouseout", function () {
          this.style.backgroundColor = "#FFD1F7";
          this.style.borderColor = "#FF99EF";
          this.style.boxShadow = "none"; // Remove the shadow effect
          this.style.transform = "scale(1)"; // Reset the scale to default
        });

        suggestionsButton.style.transition = "all 0.3s ease";
        suggestionsButton.addEventListener("mouseover", function () {
          this.style.backgroundColor = "#AFFF33";
          this.style.borderColor = "#9EDD00";
          this.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.2)";
          this.style.transform = "scale(1.05)";
        });
        suggestionsButton.addEventListener("mouseout", function () {
          this.style.backgroundColor = "#C9FF55";
          this.style.borderColor = "#C9FF55";
          this.style.boxShadow = "none";
          this.style.transform = "scale(1)";
        });

        function fetchResult(taskId) {
          fetch(
            `https://hackmit-c56114350684.herokuapp.com/get-result/${taskId}`
          )
            .then((response) => response.json())
            .then((resultData) => {
              e.target.innerHTML = resultData.html_code;
              cssString = resultData.css_code.toString();
              console.log(iframeDocument.documentElement.outerHTML);
              htmlString = iframeDocument.documentElement.outerHTML;
              setCombinedString(`${htmlString}<style>${cssString}</style>`);
              console.log(combinedString);
              if (inputElement) {
                inputElement.remove();
              }
              if (suggestionsButton) {
                suggestionsButton.remove();
              }
              if (analyzeDesigns) {
                analyzeDesigns.remove();
              }
              const existingBox = iframeDocument.querySelector(".boundingBox");
              if (existingBox) {
                existingBox.remove();
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching result:", error);
            });
        }

        // Attach event to handle Enter key press and Escape key press
        inputElement.addEventListener("keydown", (event) => {
          setBoundingBox(null);
          if (event.key === "Enter") {
            // Change cursor to loading animation
            setLoading(true);
            console.log("enter clicked");
            document.body.style.cursor = "wait";

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
            fetch("https://hackmit-c56114350684.herokuapp.com/get/edit", {
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
                const taskId = data.task_id;
                // Poll for the task result every 2 seconds
                const pollingInterval = setInterval(() => {
                  fetch(
                    `https://hackmit-c56114350684.herokuapp.com/task-status/${taskId}`
                  )
                    .then((response) => response.json())
                    .then((statusData) => {
                      if (statusData.status === "SUCCESS") {
                        // Once task is done, clear the polling interval and get the result
                        clearInterval(pollingInterval);
                        fetchResult(taskId);
                        // Reset cursor
                        document.body.style.cursor = "default";
                      } else if (statusData.status === "FAILURE") {
                        // Handle task failure, and stop polling
                        clearInterval(pollingInterval);
                        console.error("Task failed!");
                        // Reset cursor
                        document.body.style.cursor = "default";
                      }
                    })
                    .catch((error) => {
                      clearInterval(pollingInterval);
                      console.error("Error polling for status:", error);
                      // Reset cursor
                      document.body.style.cursor = "default";
                    });
                }, 2000); // Poll every 2 seconds
              })
              .catch((error) => {
                console.error("Error:", error);
                // Reset cursor
                document.body.style.cursor = "default";
              });
          } else if (event.key === "Escape") {
            // If Escape key is pressed, remove the input element, suggestionsButton, and analyzeDesigns
            if (inputElement) {
              inputElement.remove();
            }
            if (suggestionsButton) {
              suggestionsButton.remove();
            }
            if (analyzeDesigns) {
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

  const [loadingText, setLoadingText] = useState("Loading");
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) =>
        prevText === "Loading" ? "Loading..." : "Loading"
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      {/* <div>Input Value in React: {inputValue}</div> */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {loadingText}
        </div>
      )}
    </div>
  );
};

export default App;
