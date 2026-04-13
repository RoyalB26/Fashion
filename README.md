# 👕 Fashion Object Detection System

End-to-end Computer Vision project for detecting fashion items using YOLO, deployed as a web app with FastAPI.

---

## 🚀 Overview

- Built a full pipeline: data → training → evaluation → deployment  
- Used Fashionpedia dataset for multi-class fashion detection  
- Deployed model with real-time inference via web interface  

---

## 🧠 Model

- YOLO-based object detection  
- Metrics: Precision, Recall, mAP  
- Optimized for speed and accuracy  

---

## 📊 Pipeline

1. Data preprocessing (annotation parsing, YOLO format)
2. Model training & hyperparameter tuning
3. Evaluation on validation/test sets
4. Deployment via API + web interface

---

## 🖥️ Tech Stack

- Python, PyTorch  
- YOLO  
- FastAPI  
- HTML, CSS, JavaScript  
- Git  
- Vercel (frontend), Railway (backend)  

---

## 📁 Structure
project/
├── Data_SetUp/
├── frontend/
├── backend/
├── requirements.txt
└── README.md

## Set up
```
git clone https://github.com/your-username/Fashion.git
cd Fashion
pip install -r requirements.txt
cd backend
uvicorn main:app --reload
```
## Deployment
Frontend: Vercel
Backend: Railway

## Future Work
Improve accuracy with more data
Add attribute classification
Optimize for mobile inference
