let model = null;
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
canvas.style.display = "none";
const context = canvas.getContext("2d");
const resultDisplay = document.getElementById("resultado");
const changeCameraBtn = document.getElementById("change-camera");
let currentStream = null;
let useFrontCamera = true;

async function loadModel() {
  console.log("Loading model...");
  model = await tf.loadLayersModel("models/flowers_js_model/model.json");
  console.log("Model loaded.");
}

function startVideo() {
  if (currentStream) {
    currentStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  const constraints = {
    video: { facingMode: useFrontCamera ? "user" : "environment" },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      currentStream = stream;
      video.srcObject = currentStream;
    })
    .catch((error) => {
      console.error("Error accessing the camera: ", error);
      alert("Error accessing the camera, please check device settings.");
    });
}

changeCameraBtn.addEventListener("click", () => {
  useFrontCamera = !useFrontCamera;
  startVideo();
});

video.addEventListener("loadeddata", predictFlower);

function predictFlower() {
  if (!model) {
    console.log("Model not loaded yet.");
    return;
  }

  const tfImg = tf.browser.fromPixels(video);
  const smallImg = tf.image.resizeBilinear(tfImg, [244, 244]); // Correct size to match training
  const resized = tf.reshape(smallImg, [1, 244, 244, 3]); // Correct reshaping
  const prediction = model.predict(resized);
  prediction.array().then((array) => {
    const results = array[0];
    const classes = ["daisy", "dandelion", "rose", "sunflower", "tulip"];
    const highestIndex = results.indexOf(Math.max(...results));
    resultDisplay.innerHTML = `Detected: ${classes[highestIndex]}`;
    // Continuously predict by looping predictFlower function
    console.log(`Detected: ${classes[highestIndex]}`);
    requestAnimationFrame(predictFlower);
  });
}

loadModel();
startVideo();
