# WildScan

## Wildlife Image Classification Platform

WildScan is an end-to-end deep learning application for detecting and classifying wildlife species from images.

The project combines a **PyTorch-based computer vision backend** with a modern **React + TypeScript frontend** to provide an interactive workflow for image upload, species classification, confidence visualization, and scan history.

WildScan is designed as a deployable AI application, connecting model inference, REST APIs, and a responsive web interface into a single system.

**Live Application:** https://wild-scan-vercel.vercel.app/

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [How It Works](#how-it-works)
- [Model](#model)
- [Model Evaluation](#model-evaluation)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Engineering Highlights](#engineering-highlights)
- [Interview Talking Points](#interview-talking-points)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)
- [Screenshots and Demo](#screenshots-and-demo)
- [Contributing](#contributing)
- [Security](#security)
- [Author](#author)
- [License](#license)

---

## Overview

Wildlife image classification is a computer vision problem where a model must identify the species represented in an input image.

WildScan provides an end-to-end implementation covering:

```text
Image Upload
     |
     v
Frontend Interface
     |
     v
REST API
     |
     v
PyTorch Model
     |
     v
Image Classification
     |
     v
Confidence Score
     |
     v
Species Information
     |
     v
Frontend Results
```

The application currently supports **15 animal classes** using a fine-tuned **ResNet50** model.

---

## Problem Statement

Wildlife images can be difficult to classify manually at scale.

A practical classification system needs to combine:

- Image preprocessing
- Deep learning inference
- Model serving
- API communication
- User-friendly visualization
- Species metadata
- Deployment-ready application structure

WildScan addresses these requirements by combining a computer vision model with a web application and REST API.

---

## Solution

WildScan uses transfer learning with a fine-tuned ResNet50 model for image classification.

The system is divided into two major application layers:

### Backend

The backend is responsible for:

- Loading the trained PyTorch model
- Processing incoming images
- Running inference
- Returning predictions
- Providing species metadata
- Exposing health status

### Frontend

The frontend is responsible for:

- Image uploads
- User interaction
- Displaying predictions
- Displaying confidence scores
- Visualizing model results
- Maintaining scan history
- Providing project information

---

# Key Features

## 15-Class Wildlife Classification

The system uses a fine-tuned ResNet50 model to classify images across 15 supported animal classes.

---

## Transfer Learning

WildScan uses **ResNet50** with transfer learning to adapt a pretrained image-classification architecture to the wildlife classification task.

This provides a practical approach for training a specialized classifier without designing a convolutional neural network architecture from scratch.

---

## Confidence Scores

The application displays the model's classification result together with its confidence information.

This provides users with additional context about the prediction.

---

## Interactive Heatmaps

WildScan includes interactive heatmap functionality intended to visualize where the model is focusing when making a classification.

This improves interpretability by giving users a visual indication of the image regions associated with the model's prediction.

---

## Image Upload

The frontend supports image upload through an interactive interface.

The project also provides drag-and-drop image upload functionality.

---

## Scan History

A history page allows users to review previous scans within the frontend application.

---

## Species Information

The backend includes species metadata that can be retrieved through the API.

---

## REST API

The backend exposes endpoints for:

- Image prediction
- Species information
- API health checks

---

## Multiple Model Export Formats

The project supports model artifacts in formats including:

- `.pth`
- TorchScript
- ONNX

---

## Responsive Frontend

The frontend is built using React, TypeScript, and TailwindCSS for a modern responsive interface.

---

# System Architecture

```text
                         WILDSCAN
                            |
             +--------------+--------------+
             |                             |
             v                             v
      React + TypeScript              PyTorch Backend
             |                             |
             |                             v
             |                       Model Loading
             |                             |
             |                             v
             |                       Image Inference
             |                             |
             |                             v
             |                       Classification
             |                             |
             +---------- REST API ---------+
                           |
                           v
                    Prediction Result
                           |
                           v
                 Confidence + Metadata
                           |
                           v
                    React Interface
```

---

# How It Works

## 1. Image Upload

The user selects or drops an image into the WildScan frontend.

```text
User
 |
 v
ImageUploader
 |
 v
Selected Image
```

---

## 2. API Request

The frontend sends the image to the backend prediction endpoint.

```text
Frontend
   |
   | POST /predict
   v
Backend API
```

---

## 3. Model Inference

The backend loads the configured PyTorch model and performs inference on the submitted image.

The model produces classification scores for the supported animal classes.

```text
Input Image
     |
     v
Preprocessing
     |
     v
ResNet50
     |
     v
Class Scores
     |
     v
Predicted Species
```

---

## 4. Result Processing

The backend processes the model output and returns the prediction information through the REST API.

The frontend then uses the response to display the classification result and confidence information.

---

## 5. Species Metadata

WildScan includes species information in the backend.

The API provides an endpoint for retrieving metadata for a specific species.

```text
Species ID
    |
    v
/ species/{id}
    |
    v
Species Metadata
```

---

# Model

## ResNet50

WildScan uses a fine-tuned **ResNet50** model for wildlife image classification.

ResNet50 is a deep convolutional neural network architecture commonly used for image recognition tasks.

The project applies transfer learning to adapt the architecture to the project's wildlife classification dataset.

### Model Workflow

```text
Training Dataset
      |
      v
Preprocessing
      |
      v
Transfer Learning
      |
      v
Fine-Tuned ResNet50
      |
      v
Model Evaluation
      |
      v
Saved Model
      |
      v
API Inference
```

---

## Supported Model Formats

The project supports model artifacts in:

```text
.pth
TorchScript
ONNX
```

The primary model implementation is based on PyTorch.

---

# Model Evaluation

The provided project evaluation reports the following results:

| Metric | Original Test | Augmented Test | Mixed Test |
|---|---:|---:|---:|
| Accuracy | 94.8% | 92.3% | 93.5% |
| Precision | 94.2% | 91.8% | 92.9% |
| Recall | 94.7% | 92.1% | 93.2% |
| F1 Score | 94.4% | 91.9% | 93.0% |

> **Note:** The reported metrics can vary depending on the training data, preprocessing configuration, and fine-tuning iterations.

---

# Technology Stack

| Technology | Purpose |
|---|---|
| **Python** | Backend and machine learning development |
| **PyTorch** | Deep learning model and inference |
| **ResNet50** | Wildlife image classification model |
| **FastAPI / Flask** | REST API and model serving |
| **React** | Frontend application |
| **TypeScript** | Frontend development |
| **TailwindCSS** | Responsive interface styling |
| **Node.js** | Frontend development environment |
| **ONNX / TorchScript** | Model export formats |

---

# Project Structure

```text
wildscan/
│
├── backend/
│   ├── best_model/
│   │   └── Saved model files
│   │
│   ├── api.py
│   ├── class_names.py
│   ├── model.py
│   ├── requirements.txt
│   └── species_info.py
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── ResultsPanel.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AboutPage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   └── ScanPage.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── tailwind.config.js
│
├── models/
│   └── classes.json
│
├── data/
│   └── Dataset files
│
├── .gitignore
└── README.md
```

---

# Installation

## Prerequisites

Install the following before setting up WildScan:

- Python 3.8+
- Node.js 18+
- npm
- Git
- GPU with CUDA support is recommended for model training or accelerated inference

---

# Backend Setup

## 1. Clone the Repository

```bash
git clone https://github.com/costaspinto/WildScan.git
cd WildScan
```

---

## 2. Navigate to the Backend

```bash
cd backend
```

---

## 3. Create a Virtual Environment

### Windows

```bash
python -m venv venv
.\venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your_secret_key_here
MODEL_PATH=best_model/model.pth
```

Replace the placeholder values with the appropriate configuration for your local environment.

---

## 6. Start the Backend

Run:

```bash
python api.py
```

The backend API is expected to be available at:

```text
http://localhost:8000
```

---

# Frontend Setup

Open a second terminal and navigate to the frontend:

```bash
cd frontend
```

Install the Node.js dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend is expected to be available at:

```text
http://localhost:5173
```

---

# Running the Application

Once both services are running:

```text
Backend
http://localhost:8000

Frontend
http://localhost:5173
```

Open the frontend URL in your browser.

The application workflow is:

```text
Open WildScan
      |
      v
Upload Wildlife Image
      |
      v
Send Image to Backend
      |
      v
ResNet50 Inference
      |
      v
Classification Result
      |
      v
Confidence + Species Information
      |
      v
Display Result
```

---

# API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/predict` | `POST` | Upload an image and receive a classification prediction |
| `/species/{id}` | `GET` | Retrieve metadata for a specific species |
| `/healthcheck` | `GET` | Check whether the API is operational |

---

## Prediction Request

The prediction endpoint accepts an image upload:

```http
POST /predict
```

The backend processes the image through the configured classification model and returns the prediction information.

---

## Species Metadata

Species information can be retrieved using:

```http
GET /species/{id}
```

---

## Health Check

The backend provides:

```http
GET /healthcheck
```

This endpoint can be used to verify API availability.

---

# Usage

## 1. Open WildScan

Open the deployed application:

https://wild-scan-vercel.vercel.app/

Or run the frontend locally:

```text
http://localhost:5173
```

## 2. Upload an Image

Select an animal image using the image uploader or drag-and-drop interface.

## 3. Submit the Scan

The image is sent to the backend inference API.

## 4. View the Prediction

The application displays the predicted species and confidence information.

## 5. Review Scan History

Use the History page to review previous scans available within the frontend application.

## 6. Explore Species Information

The application can provide additional species information through its metadata layer.

---

# Engineering Highlights

## Transfer Learning

WildScan uses a fine-tuned ResNet50 architecture rather than implementing a convolutional neural network from scratch.

This provides a practical approach to adapting an established computer vision architecture to a specialized wildlife classification problem.

---

## Model Serving

The project separates model inference from the frontend by exposing prediction functionality through a REST API.

```text
React Frontend
      |
      | HTTP Request
      v
REST API
      |
      v
PyTorch Model
      |
      v
Prediction
```

This separation allows the frontend and inference layer to evolve independently.

---

## Full-Stack AI Architecture

WildScan combines:

```text
Machine Learning
      +
Backend API
      +
React Frontend
      +
TypeScript
      +
TailwindCSS
      =
End-to-End AI Application
```

---

## Explainability

The project includes interactive heatmap functionality to visualize model focus during classification.

This provides an interpretability layer beyond simply displaying the predicted class.

---

## Model Export

The project supports model export to multiple formats, including:

```text
PyTorch (.pth)
TorchScript
ONNX
```

This creates flexibility for future inference and deployment environments.

---

## Modular Frontend

The React application is organized into reusable components and pages.

Examples include:

```text
ImageUploader
ResultsPanel
Header
Layout
ScanPage
HistoryPage
AboutPage
```

This component-based structure supports maintainability and future feature development.

---

# Interview Talking Points

WildScan demonstrates practical experience with:

- Computer vision
- Deep learning
- PyTorch
- Transfer learning
- ResNet50
- Image classification
- Model inference
- REST APIs
- FastAPI / Flask
- React
- TypeScript
- TailwindCSS
- Model serving
- Frontend/backend integration
- Model explainability
- ONNX
- TorchScript
- Full-stack AI application development

---

## 60-Second Interview Explanation

> WildScan is an end-to-end wildlife image classification application that I built using PyTorch, ResNet50, and a React TypeScript frontend. The model uses transfer learning and is fine-tuned for 15 wildlife classes. I separated the machine learning inference layer from the user interface by exposing the model through a REST API. The frontend allows users to upload images and displays the predicted species and confidence information, while the backend handles model loading and inference. I also incorporated heatmap visualization for model interpretability and structured the application so that model artifacts can be exported to formats such as PyTorch, TorchScript, and ONNX. The project demonstrates the complete path from a trained computer vision model to an interactive deployable AI application.

---

# Technical Design Considerations

## Why ResNet50?

ResNet50 provides an established deep convolutional architecture suitable for image classification and can be adapted to a specialized dataset using transfer learning.

## Why Transfer Learning?

Transfer learning allows an existing image representation learned from a large dataset to be adapted to the project's wildlife classification task.

## Why a REST API?

Separating model inference from the frontend provides a clean service boundary:

```text
Frontend
   |
HTTP
   |
Backend API
   |
Model
```

This makes the system easier to maintain and provides a foundation for independent backend and frontend deployment.

## Why React + TypeScript?

React provides component-based frontend development, while TypeScript improves type safety and maintainability for a larger frontend codebase.

## Why ONNX and TorchScript?

Supporting multiple model formats provides flexibility for different inference and deployment environments.

---

# Limitations

The current implementation has several limitations:

- Classification performance depends on the quality and diversity of the training data.
- The model is limited to the 15 supported animal classes.
- Images containing species outside the supported classes may produce an incorrect classification.
- Confidence scores should be interpreted as model output rather than guaranteed certainty.
- GPU acceleration is recommended for training and potentially for faster inference.
- The project is currently focused on image classification rather than object detection with bounding boxes.
- Production-scale deployment would require additional infrastructure, monitoring, and security controls.
- The documented setup uses development servers for local execution.

---

# Future Enhancements

Potential improvements include:

- [ ] Add more wildlife species
- [ ] Expand the training dataset
- [ ] Improve class balance and data augmentation
- [ ] Add object detection and bounding boxes
- [ ] Add real-time camera support
- [ ] Develop a mobile application
- [ ] Containerize the backend and frontend with Docker
- [ ] Deploy the inference service to AWS or Azure
- [ ] Add production API authentication
- [ ] Add model monitoring
- [ ] Add inference logging and analytics
- [ ] Add an administrative analytics dashboard
- [ ] Add automated model evaluation
- [ ] Add CI/CD pipelines
- [ ] Optimize inference using ONNX
- [ ] Add additional explainability techniques

---

# Screenshots and Demo

## Live Application

https://wild-scan-vercel.vercel.app/

## Demo Video

Add the project demo video to the repository if it is intended to be distributed with the project.

Recommended structure:

```text
docs/
└── demo/
    └── wildscan-demo.mp4
```

## Screenshots

Recommended screenshot structure:

```text
docs/
└── screenshots/
    ├── home.png
    ├── image-upload.png
    ├── prediction-result.png
    └── history.png
```

Example:

```markdown
![WildScan Interface](docs/screenshots/home.png)
```

---

# Security

Sensitive configuration should not be committed to the repository.

Store secrets in environment variables:

```env
SECRET_KEY=your_secret_key_here
MODEL_PATH=best_model/model.pth
```

Ensure `.env` is included in `.gitignore`.

Recommended entries:

```gitignore
.env
venv/
__pycache__/
*.pyc
node_modules/
dist/
```

Do not expose API secrets, authentication credentials, or private infrastructure configuration in frontend source code.

---

# Reproducibility

To reproduce WildScan locally:

```bash
git clone https://github.com/costaspinto/WildScan.git
cd WildScan
```

Set up the backend:

```bash
cd backend

python -m venv venv
```

Activate the environment.

### Windows

```bash
.\venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
python api.py
```

Open another terminal and set up the frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Skills Demonstrated

```text
Python
PyTorch
Computer Vision
Deep Learning
Transfer Learning
ResNet50
Image Classification
Model Inference
REST APIs
FastAPI / Flask
React
TypeScript
TailwindCSS
Model Explainability
TorchScript
ONNX
Frontend Development
Backend Development
Full-Stack AI Engineering
```

---

# Project Summary

WildScan demonstrates how a trained computer vision model can be integrated into a complete web-based AI application.

The end-to-end workflow is:

```text
Wildlife Image
      |
      v
React + TypeScript Interface
      |
      v
REST API
      |
      v
Image Processing
      |
      v
Fine-Tuned ResNet50
      |
      v
15-Class Classification
      |
      v
Confidence + Species Metadata
      |
      v
Interactive Results
```

The project combines **deep learning, model serving, REST API development, frontend engineering, and deployment-oriented architecture** into a single computer vision application.

---

# Author

**Costas Pinto**

MCA — Artificial Intelligence & Machine Learning

- GitHub: [Costas Pinto](https://github.com/costaspinto)
- Live Application: https://wild-scan-vercel.vercel.app/

---

# License

This project is licensed under the **MIT License**.

See the [LICENSE](https://github.com/costaspinto/WildScan/blob/main/LICENSE) file for details.
