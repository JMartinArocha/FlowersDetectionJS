let model = null;
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
canvas.style.display = "none";
const context = canvas.getContext("2d");
const resultDisplay = document.getElementById("resultado");
const changeCameraBtn = document.getElementById("change-camera");
let currentStream = null;
let useFrontCamera = true;
/**
 * Asynchronously loads the pre-trained flower classification model.
 *
 * This function fetches a pre-trained TensorFlow.js model from the specified
 * directory path and assigns it to the global `model` variable. The model is
 * used for classifying live images captured via the webcam. Ensure that the
 * model's files are correctly placed in the given path before calling this function.
 *
 * @async
 * @function
 * @returns {Promise<void>} - Resolves once the model is successfully loaded.
 *
 * Example usage:
 * await loadModel();
 * // Now `model` contains the loaded TensorFlow.js model.
 */
async function loadModel() {
  console.log("Loading model...");
  model = await tf.loadLayersModel("flowers_js_model/model.json");
  console.log("Model loaded.");
}

/**
 * Initiates live video streaming from the user's webcam to the specified video element.
 *
 * This function switches the video stream based on the `useFrontCamera` variable to
 * determine whether the front or rear camera is to be used. If a current stream already
 * exists, it stops all associated tracks before starting the new stream. It sets the video
 * constraints using the specified `facingMode` (either "user" for front or "environment"
 * for rear camera) and uses the browser's MediaDevices API to fetch the user's camera
 * stream. If accessing the camera fails, an error message is displayed to the user.
 *
 * @function
 * @returns {void}
 *
 * Example usage:
 * startVideo();
 * // This will start streaming the webcam feed to the `video` element.
 */
function startVideo() {
  if (currentStream) {
    // Stop all tracks of the existing stream if present.
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  // Video constraints based on the selected camera (front or rear).
  const constraints = {
    video: { facingMode: useFrontCamera ? "user" : "environment" },
  };

  // Access the media devices to start streaming the webcam feed.
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      // Assign the new stream to the current stream and the video element.
      currentStream = stream;
      video.srcObject = currentStream;
    })
    .catch((error) => {
      console.error("Error accessing the camera: ", error);
      alert("Error accessing the camera, please check device settings.");
    });
}

/**
 * Toggles between the front and rear cameras and restarts video streaming.
 *
 * This event listener changes the value of `useFrontCamera` to its opposite state
 * each time the button is clicked. It then calls the `startVideo` function to
 * restart the video stream with the new camera configuration.
 *
 * @event click
 */
changeCameraBtn.addEventListener("click", () => {
  useFrontCamera = !useFrontCamera; // Switch the camera direction
  startVideo(); // Restart video streaming
});

/**
 * Starts flower prediction when the video stream is fully loaded.
 *
 * This event listener triggers the `predictFlower` function to commence flower
 * prediction once the webcam video stream is loaded and ready. The model should be
 * fully loaded before this function begins making predictions.
 *
 * @event loadeddata
 */
video.addEventListener("loadeddata", predictFlower);

/**
 * Predicts the type of flower in the webcam's video stream using the loaded model.
 *
 * This function captures an image frame from the webcam video, resizes it to the
 * appropriate dimensions, and reshapes it to match the input shape expected by
 * the model. The resized image is passed through the model for classification, and
 * the detected flower type is displayed on the webpage. The function continues
 * looping via `requestAnimationFrame` to update the predictions in real time.
 *
 * @function
 * @returns {void}
 */
function predictFlower() {
  // Ensure the model is loaded before making predictions.
  if (!model) {
    console.log("Model not loaded yet.");
    return;
  }

  // Capture the current frame from the video element.
  const tfImg = tf.browser.fromPixels(video);
  // Resize to match the dimensions expected by the model.
  const smallImg = tf.image.resizeBilinear(tfImg, [244, 244]);
  // Reshape to the 4D tensor expected by the model.
  const resized = tf.reshape(smallImg, [1, 244, 244, 3]);

  // Pass the image through the model to make predictions.
  const prediction = model.predict(resized);
  prediction.array().then((array) => {
    const results = array[0];
    // List of classes that the model is trained to recognize.
    const classes = ["daisy", "dandelion", "rose", "sunflower", "tulip"];
    // Determine the class with the highest prediction score.
    const highestIndex = results.indexOf(Math.max(...results));
    // Update the result display with the predicted flower type.
    resultDisplay.innerHTML = `Detected: ${classes[highestIndex]}`;
    console.log(`Detected: ${classes[highestIndex]}`);
    // Continuously predict the flower in real time.
    requestAnimationFrame(predictFlower);
  });
}

// Load the model and start video streaming when the application starts.
loadModel();
startVideo();
