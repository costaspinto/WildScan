import os
import torch
import torch.nn as nn
from torchvision import models
from fastapi import FastAPI, File, UploadFile, HTTPException
from PIL import Image
import torchvision.transforms as transforms
import io
import torch.nn.functional as F

# Import the class names you defined
from class_names import CLASS_NAMES 
# Import the species information data
from species_info import SPECIES_INFO_DATA

# ==============================
# FASTAPI APP INITIALIZATION
# ==============================
app = FastAPI()

# ==============================
# DEVICE CONFIGURATION
# ==============================
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# ==============================
# MODEL PATH SETUP
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "best_model")
MODEL_FILE = "best_fine_tuned_model.pth"
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_FILE)

# The number of classes must match the length of your CLASS_NAMES list
NUM_CLASSES = len(CLASS_NAMES)

# ==============================
# LOAD MODEL FUNCTION
# ==============================
def load_model():
    if not os.path.exists(MODEL_PATH):
        print(f"❌ Model file not found. Expected path: {MODEL_PATH}")
        return None

    try:
        model = models.resnet50(weights=None)
        model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)
        
        state_dict = torch.load(MODEL_PATH, map_location=DEVICE)
        model.load_state_dict(state_dict)

        model.to(DEVICE)
        model.eval()
        print(f"✅ Model loaded successfully from {MODEL_PATH}")
        return model
    except Exception as e:
        print(f"❌ An error occurred during model loading: {e}")
        return None

# ==============================
# INITIALIZE MODEL
# ==============================
model = load_model()

# ==============================
# IMAGE PREPROCESSING
# ==============================
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

# ==============================
# HEALTH CHECK ENDPOINT
# ==============================
@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "device": DEVICE
    }

# ==============================
# PREDICTION ENDPOINT
# ==============================
@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded on server. Please check server logs.")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        tensor = transform(image).unsqueeze(0).to(DEVICE)

        with torch.no_grad():
            outputs = model(tensor)
            probabilities = F.softmax(outputs, dim=1)
            
            # Get the top 5 predictions and their indices
            top5_prob, top5_indices = torch.topk(probabilities, 5)

        # Convert to lists of dictionaries
        top_5_predictions = []
        for i in range(top5_prob.size(1)):
            label = CLASS_NAMES[top5_indices[0, i].item()]
            confidence = top5_prob[0, i].item()
            top_5_predictions.append({"label": label, "confidence": confidence})

        top_prediction = top_5_predictions[0]
        
        # Get the detailed animal information using the top prediction label
        animal_info = SPECIES_INFO_DATA.get(top_prediction['label'], None)
        
        # Handle cases where species info isn't found
        if not animal_info:
            print(f"⚠️ Species info not found for: {top_prediction['label']}")
            animal_info = {
                "species": "N/A", "kingdom": "N/A", "class": "N/A", "subclass": "N/A", 
                "habitat": "N/A", "diet": "N/A", "lifespan": "N/A", "fact": "No additional information available."
            }

        return {
            "top_prediction": top_prediction,
            "top_5": top_5_predictions,
            "heatmap_data": None,
            "animal_info": animal_info # Add the animal info here
        }

    except Exception as e:
        print(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")