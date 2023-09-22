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
    <title>Portfolio</title>
  </head>
  <body>
    <header id="header" style="border-radius: 10px;">
      <h1>My Portfolio</h1>
    </header>

    <div style="margin: 10px;"/>

    <section id="intro">
      <div class="icon-and-text">
          <h1><span class="emoji" style="font-size: 36px;">&#128075</span></h1>
          <h1 style="color: white">welcome to <span style="color: #0094FF; font-family: 'Source Code Pro', monospace;">rendr</span> - front-end engineering made easy.</h1>
      </div>
      <h3 style="margin-left: 3.25%; color: lightgray;"><i>Create</i>, <i>modify</i>, and <i>re-render</i> webpages by <u>directly interacting with components</u> and making creative changes with AI.</h3>

      <div style="margin:12px" />      
      
      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle">1</div>
        <h3 style="color: white; font-weight: normal; margin-top: 7px"> To use rendr, move your mouse <span class="emoji">&#x1f42d</span>around to target <span class="emoji">&#x1f3af</span>any component of this webpage you'd like to change. </h3>
      </div>

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle">2</div>
        <h3 style="color: white; font-weight: normal; margin-top: 7px"> Select any target component, and click on it to interact. </h3>
      </div>

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle">3</div>
        <h3 style="color: white; font-weight: normal; margin-top: 7px"> To make a simple UI change <span class="emoji">&#x1f3a8</span>, type a specific prompt <span class="emoji">&#x1f4dd</span> for the targeted component (ie. Add more material to this section about hackathons). </h3>
      </div>
        

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle">4</div>
        <h3 style="color: white; font-weight: normal; margin-top: 7px"> Hit enter to submit the changes! Wait up to 20-30 seconds for the change (we hope to optimize later! <span class="emoji">&#x1f4a8</span>). </h3>
      </div>
      

      <div class="icon-and-text" style="margin-bottom:12px">
        <div class="circle">5</div>
        <h3 style="color: white; font-weight: normal; margin-top: 7px"> Don't fret if you run into creator's block! You can also click on "Suggest Designs" <span class="emoji">&#x1f5bc</span> to recommend generated image and text suggestions.</h3>
      </div>

      <div class="icon-and-text" style="margin-bottom:12px">
      <div class="circle">6</div>
      <h3 style="color: white; font-weight: bold; margin-top: 7px">Key commands: [enter] - submit prompt for changing UI, [esc] - close toolbar, [command-x] - saves your changed UI design as HTML + CSS files</h3>
    </div>
    </section>

    <section id="about">
      <h2>About Me</h2>
      <section id="interest">
        <h3>Interest in Sports</h3>
        <p>Through my childhood and career, I have been interested in mainly basketball.</p>
      </section>
  
      <section id="work">
        <h3>Past Career</h3>
        <p>Over my career, I played professionally in the NBA for the Miami Heat for a few years, where I won the NBA Championships twice. I've also played for the Cleveland Cavaliers and Los Angeles Lakers.</p>
      </section>
  
      <section id="projects">
        <h2>Favorite Parks</h2>
        <div id="project-container">
          <div class="project">
            <h3>Mount Rainier National Park</h3>
            <p>Nestled in the Cascade Range of Washington state, Mount Rainier National Park is a paradise for nature enthusiasts. Its centerpiece, Mount Rainier, is an active stratovolcano adorned with glaciers and subalpine meadows. Visitors can explore a network of hiking trails that lead to awe-inspiring vistas, pristine lakes, and waterfalls. The park is a haven for wildlife, including marmots, black bears, and elk.</p>
          </div>
          <div class="project">
            <h3>Yellowstone National Park</h3>
            <p>Yellowstone is a geological wonderland and the first national park in the world. Located primarily in Wyoming but extending into Montana and Idaho, it's famous for its geothermal features like Old Faithful geyser and the Grand Prismatic Spring. The park's diverse ecosystems support iconic wildlife, including bison, grizzly bears, and wolves. Visitors can marvel at dramatic canyons, lush forests, and the Yellowstone River.
            </p>
          </div>
          <div class="project">
            <h3>Yosemite National Park</h3>
            <p>Situated in California's Sierra Nevada mountains, Yosemite National Park is renowned for its breathtaking landscapes. Towering granite cliffs, such as El Capitan and Half Dome, dominate the park's skyline. Yosemite Valley boasts lush meadows, cascading waterfalls like Yosemite Falls, and the iconic Merced River. Hikers and climbers from around the world come to experience its natural beauty.</p>
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
        <input type="text" id="name" name="name" style="border-radius: 10px; border-color: black;">
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" style="border-radius: 10px; border-color: black;">
        
        <label for="message">Message:</label>
        <input type="message" id="message" name="message" style="border-radius: 10px; border-color: black;"></input>
        <div style="margin:10px"/>

        <input type="submit" value="Send" style="background-color: black; border-radius: 10px; border-color: black;">
      </form>
    </section>
  </body>
  </html>
  `;
  var cssString = `
  /* Header styles */
  #header {
    background-color: #0094FF;
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
    border-radius: 10px;
  }

  #intro {
    background-color: #282c34;
    padding: 20px;
    border-radius: 10px;
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
    border-radius: 10px;
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

  .circle {
    width: 30px;
    height: 30px;
    background-color: #007bff; /* Circle background color */
    color: #fff; /* Text color */
    border-radius: 50%; /* Makes it a circle */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    margin-left: 30px;
    margin-right:10px;
  }
  .emoji {
    padding-right: 5px;
    font-size: 18px;
  }

  .icon-and-text{
    flex: 1;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }

  .underline {
    text-decoration: underline;
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

        const analyzeButton = iframeDocument.getElementById("dynamicButton");
        if (analyzeButton) analyzeButton.remove();
        // Create analyze design button
        const analyzeDesigns = iframeDocument.createElement("button");
        analyzeDesigns.id = "dynamicButton";
        analyzeDesigns.innerHTML = "&#x1f50d Analyze UI/UX";
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
            })
            .catch((error) => {
              console.error("Error fetching result:", error);
            });
        }

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
                      } else if (statusData.status === "FAILURE") {
                        // Handle task failure, and stop polling
                        clearInterval(pollingInterval);
                        console.error("Task failed!");
                      }
                    })
                    .catch((error) => {
                      clearInterval(pollingInterval);
                      console.error("Error polling for status:", error);
                    });
                }, 2000); // Poll every 2 seconds
              })
              .catch((error) => {
                console.error("Error:", error);
              });
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
      <div>Input Value in React: {inputValue}</div>
    </div>
  );
};

export default App;
