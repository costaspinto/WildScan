# WildScan - Animal Image Classifier

WildScan is an **end-to-end deep learning application** for detecting and classifying wildlife species from images. It integrates a **PyTorch-powered backend** for inference with a **modern React + TypeScript frontend**, providing an intuitive user interface for image uploads, classification, and result visualization. The project is designed for **real-world deployment**, making it scalable, maintainable, and production-ready.


https://github.com/user-attachments/assets/9bf85ab4-ba83-4070-974d-aa350babcbce


---
<img width="1920" height="870" alt="capture_1757351451047" src="https://github.com/user-attachments/assets/349e1174-7f91-4d2e-a651-12dd9a50d7fe" />
<img width="1920" height="870" alt="capture_1757351446942" src="https://github.com/user-attachments/assets/fde1c06b-1166-4323-a9f8-d47fb1edbbfa" />
<img width="1920" height="870" alt="capture_1757351480505" src="https://github.com/user-attachments/assets/83bce405-591b-46f5-9ae2-2d346baf6511" />


## Features

### Core Functionalities

* **15-class animal detection** using a fine-tuned **ResNet50** model.
* **Transfer Learning** for high accuracy and optimized performance.
* **Real-time classification** with confidence scores.
* **Interactive heatmaps** to visualize model focus.
* **Fully automated pipeline** covering data preprocessing, training, evaluation, and deployment.

### Backend Features

* REST API built with **FastAPI/Flask** for efficient model serving.
* `.env` based environment configuration for sensitive credentials.
* Supports exporting models in multiple formats: `.pth`, TorchScript, and ONNX.
* Robust logging and exception handling.

### Frontend Features

* Built with **React + TypeScript** for scalability.
* TailwindCSS integration for modern, responsive design.
* Real-time display of classification results.
* Drag-and-drop **image upload** functionality.
* History page to review past scans.
* About page with project documentation.

### Deployment-Ready Assets

* Optimized builds for both backend and frontend.
* Docker-ready structure (future enhancement).
* Organized folder structure for CI/CD integration.

---

## Project Structure

```plaintext
wildscan/
├── backend/                     # Backend with model API and inference logic
│   ├── __pycache__/             # Python cache files (ignored)
│   ├── best_model/              # Saved final model files
│   ├── api.py                    # Main API entry point
│   ├── class_names.py            # Class name mappings
│   ├── model.py                   # PyTorch model and loading logic
│   ├── requirements.txt          # Python dependencies
│   └── species_info.py           # Metadata for each species
│
├── frontend/                    # React frontend
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── assets/               # Images and icons
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── ResultsPanel.tsx
│   │   ├── pages/                # Pages for routing
│   │   │   ├── AboutPage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   └── ScanPage.tsx
│   │   ├── App.tsx               # Main React component
│   │   ├── index.css              # Global styles
│   │   └── main.tsx               # Application entry point
│   │
│   ├── package.json              # Node.js dependencies
│   └── tailwind.config.js         # TailwindCSS configuration
│
├── models/                       # Class labels and metadata
│   └── classes.json               # Trackable JSON file
│
├── data/                         # Dataset (ignored in Git)
│
├── Recording 2025-09-08 155910.mp4   # Demo video (ignored in Git)
├── Screenshot 2025-09-08 004215.png  # Demo image (ignored in Git)
└── .gitignore                    # Git ignore rules
```

---

## Installation Guide

### Prerequisites

* **Python 3.8+** for backend development.
* **Node.js 18+** for frontend development.
* GPU with CUDA support recommended for model inference and retraining.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/wildscan.git
cd wildscan
```

### Step 2: Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Add your environment variables to a `.env` file:

   ```env
   SECRET_KEY=your_secret_key_here
   MODEL_PATH=best_model/model.pth
   ```

5. Start the API server:

   ```bash
   python api.py
   ```

### Step 3: Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## Running the Project

* **Backend API** will be available at: `http://localhost:8000`
* **Frontend App** will be available at: `http://localhost:5173`

You can now upload images through the UI and see classification results in real-time.

---

## Model Evaluation

| Metric    | Original Test | Augmented Test | Mixed Test |
| --------- | ------------- | -------------- | ---------- |
| Accuracy  | 94.8%         | 92.3%          | 93.5%      |
| Precision | 94.2%         | 91.8%          | 92.9%      |
| Recall    | 94.7%         | 92.1%          | 93.2%      |
| F1 Score  | 94.4%         | 91.9%          | 93.0%      |

> **Note:** Metrics vary based on training data and fine-tuning iterations.

---

## API Endpoints

| Endpoint        | Method | Description                         |
| --------------- | ------ | ----------------------------------- |
| `/predict`      | POST   | Upload an image for prediction      |
| `/species/{id}` | GET    | Get metadata for a specific species |
| `/healthcheck`  | GET    | Verify API health status            |

---

## Contribution Guidelines

1. **Fork the repository.**
2. Create a feature branch:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Commit changes:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your branch and create a Pull Request.

---

## Future Enhancements

* Real-time mobile application support.
* Docker containerization for backend and frontend.
* Cloud deployment using AWS or Azure.
* Additional datasets for broader species coverage.
* Implement an admin dashboard for analytics.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, feedback, or collaboration:

* **Email:** [costaspinto312@gmail.conm](costaspinto312@gamil.com)
