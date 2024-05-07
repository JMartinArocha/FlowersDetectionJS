# Flowers detection

![FlowersDetection](FlowersDetection.png)

## Overview

This project explores the integration of a convolutional neural network (CNN) model with a web application using TensorFlow.js. The model is trained to identify various flower species from images and then used in real-time via a web interface that accesses the user's webcam.

## Project Objectives:
- Model Training: Develop and train a CNN on a set of flower images to learn distinctive features of different species.

- Model Export: Export the trained model into TensorFlow.js format to enable integration with web technologies.

- Web Application Development: Implement a web application that interacts with the user's webcam to capture live images and utilize the exported model to predict and display the type of flower in real-time.

## Badges

![GitHub license](https://img.shields.io/github/license/JMartinArocha/FlowersDetectionJS.svg)
![Python version](https://img.shields.io/badge/python-3.x-blue.svg)
![last-commit](https://img.shields.io/github/last-commit/JMartinArocha/FlowersDetectionJS)
![issues](https://img.shields.io/github/issues/JMartinArocha/FlowersDetectionJS)
![commit-activity](https://img.shields.io/github/commit-activity/m/JMartinArocha/FlowersDetectionJS)
![repo-size](https://img.shields.io/github/repo-size/JMartinArocha/FlowersDetectionJS)

## Source of the Dataset

[Kaggle - Flowers dataset](https://www.kaggle.com/datasets/imsparsh/flowers-dataset?resource=download)


## Model Architecture

This model uses a **Convolutional Neural Network (CNN)** architecture built sequentially to classify flower images. The architecture comprises multiple blocks, each serving a specific purpose to extract and refine relevant features from the input images.

**Convolutional Blocks:**
1. **First Convolutional Block:** 
   - **Conv2D (32 filters, 3x3 kernel):** Extracts initial features from the images.
   - **Batch Normalization:** Normalizes outputs to stabilize and accelerate training.
   - **MaxPooling2D (2x2 pool size):** Reduces the spatial dimensions, focusing on the most significant features.

2. **Second Convolutional Block:** 
   - **Conv2D (64 filters, 3x3 kernel):** Increases the number of features captured.
   - **Batch Normalization:** Provides stable activations for deeper layers.
   - **MaxPooling2D (2x2 pool size):** Further reduces spatial dimensions.

3. **Third Convolutional Block:** 
   - **Conv2D (128 filters, 3x3 kernel):** Detects more complex patterns.
   - **Batch Normalization:** Ensures stable training for deeper layers.
   - **MaxPooling2D (2x2 pool size):** Compresses the feature maps further.

4. **Fourth Convolutional Block:** 
   - **Conv2D (128 filters, 3x3 kernel):** Focuses on highly detailed features.
   - **Batch Normalization:** Keeps data flow normalized through the deeper layers.
   - **MaxPooling2D (2x2 pool size):** Further reduces the size of the feature maps.

**Regularization:**
- **Dropout Layer (50%):** Reduces overfitting by randomly disabling half of the neurons during training.

**Dense Layers (Classification):**
- **Flatten Layer:** Converts the 2D feature maps into a single vector for the dense layers.
- **Dense Layer (512 units, ReLU activation):** A fully connected layer that learns to map the feature vector into a high-dimensional space for classification.
- **Batch Normalization:** Stabilizes and speeds up training of the fully connected layer.
- **Output Dense Layer (5 units, Softmax activation):** Final layer that outputs probabilities for the five flower classes.

**Optimization and Compilation:**
- **Optimizer (Adam, learning rate 0.001):** Efficiently minimizes the loss function.
- **Loss Function (Sparse Categorical Crossentropy):** Suitable for multi-class classification.
- **Metrics (Accuracy):** Tracks the accuracy of predictions during training and evaluation.

## Model Training and Validation

I trained the model using the training dataset, with 50 epochs to allow the model to learn the features necessary to classify different types of flowers. I monitored the training process through several metrics to track progress and ensure that the model was learning efficiently. The training history provided invaluable insights into how well the model generalized its learning.

**Training Process:**
- I used a cross-entropy loss function (specifically `sparse_categorical_crossentropy`) because it's suitable for multi-class classification problems like ours. This function measures the difference between the predicted probabilities and the true class labels, guiding the model's adjustments.
- The optimizer used was the Adam optimizer with a learning rate of 0.001. It combines the advantages of RMSProp and AdaGrad, making it effective for training deep neural networks.

**Validation During Training:**
- For validation, I held out 20% of the training data to serve as validation data. This ensured that the model wasn't overfitting to the training data by regularly checking its performance on unseen examples during training.
- The training history captured loss and accuracy for both training and validation data across each epoch.

**Metrics and Visualization:**
- I visualized the training and validation loss and accuracy to ensure consistent learning:
  - **Loss:** Loss decreased steadily over time for both training and validation, signaling that the model was learning.
  - **Accuracy:** Accuracy increased consistently across epochs, showing the model's improved ability to correctly classify flowers.

**Evaluation on Test Dataset:**
- I evaluated the model on a separate test dataset to measure its real-world performance after training.
- The model achieved satisfactory test accuracy and low test loss, indicating that it generalizes well to unseen data.

**Summary Graphs:**
- The loss and accuracy graphs helped me identify potential overfitting or underfitting issues early. By comparing training and validation metrics:
  - I saw no significant divergence between training and validation loss or accuracy, indicating that the model was well-generalized.

This comprehensive analysis during and after training ensured that the model was tuned correctly and provided insights into potential areas for improvement in future versions.

## Model Export and Web Implementation
The trained model is exported using TensorFlow.js, which allows the TensorFlow model to run directly in the web browser. The web application allows users to input temperatures in Fahrenheit and view the converted Celsius temperatures in real-time.

## How to Use

### Download the Repository
Download the repository to your preferred location on your computer.

### Start a Server in the Folder
This project uses a TensorFlow.js model, which requires http/https access to load.
You can use any server, but here is a way to do it:
- Download Python on your computer.
- Open a command line or terminal.
- Navigate to the folder `web` where you downloaded the repository.
- Run the command `python -m http.server 8000`.
- Open a browser and go to http://localhost:8000.


### Using It on a Mobile Device
To use this application on a mobile device, simply entering your computer's local IP address and port won't work because accessing the camera requires HTTPS. You can create an HTTPS tunnel by following these steps:

1. Download ngrok to your computer and unzip it.
2. Open a command prompt or terminal.
3. Navigate to the folder where you downloaded ngrok.
4. Run the command `ngrok http 8000`.
5. Ensure that both the Python server and ngrok tunnel are active.
6. In the command prompt, you will see an HTTPS link. Access this link from your mobile device, even if you're not on the local network.
7. The tunnel expires after about 2 hours; if that happens, simply restart ngrok.
8. Open a web browser on your mobile device and visit the HTTPS link provided.

## About virtual envs

Using a virtual environment in Python is a best practice for managing project dependencies. It allows you to create a self-contained directory that contains all the Python executable files and packages you need for your project. This way, you can avoid conflicts between package versions across different projects.

### Why Use a Virtual Environment?
- Dependency Management: Each project can have its dependencies without affecting other projects or the global Python installation.
- Reproducibility: Makes it easier to share and collaborate with others, ensuring that everyone has the same setup.
- Isolation: Prevents inadvertent changes to system files and configurations.

## Setting Up a Virtual Environment
Here’s how to set up a virtual environment for your clustering project:

1. Install Virtual Environment
First, you need to install the virtualenv package if it's not already installed. This package allows you to create virtual environments in Python. You can install it using pip:

```shell
pip install virtualenv
```

2. Create a Virtual Environment
Navigate to your project directory, or where you want to set up your project:

```shell
cd path/to/your/project
```

Now, create a virtual environment within this directory:

Here, venv is the name of the virtual environment directory. You can name it anything, but venv or .venv is typical.

``` shell
virtualenv venv
```

3. Activate the Virtual Environment
Before using the environment, you need to activate it:

```shell
venv\Scripts\activate # Windows
source venv/bin/activate # Linux/macOS
```

Deactivate the Environment
To stop using the virtual environment and go back to your global Python, you simply type:

```shell
deactivate
```

Keeping Track of Dependencies
To make it easier for others to set up the same environment, it’s good practice to save your dependencies in a requirements.txt file:

```shell
pip freeze > requirements.txt
```

This command writes a list of all installed packages and their versions to the requirements.txt file. Others can install all required packages using:

```shell
pip install -r requirements.txt
```

## Prerequisites

Before running the scripts, it's essential to install the necessary Python packages. The project has a `requirements.txt` file listing all the dependencies. You can install these using `pip`. 

Note: The commands below are intended to be run in a Jupyter notebook environment, where the `!` prefix executes shell commands. If you're setting up the project in a different environment, you may omit the `!` and run the commands directly in your terminal.

```bash
!pip3 install --upgrade pip
!pip3 install -r requirements.txt
```