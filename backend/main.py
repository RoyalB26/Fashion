import io
import base64
import cv2
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ultralytics import YOLO
from fastapi.middleware.cors import CORSMiddleware
import os
import numpy as np
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "best.pt")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cho phép tất cả (dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    image: str  # Base64 encoded image string

model = None
@app.on_event("startup")
def load_model():
    global model
    model = YOLO(MODEL_PATH)

@app.post("/detect")
def detect(image_data: ImageData):

    # 🔥 Bỏ prefix "data:image/jpeg;base64,"
    base64_str = image_data.image.split(",")[1]

    # decode base64 → bytes
    img_bytes = base64.b64decode(base64_str)

    # bytes → numpy array
    np_arr = np.frombuffer(img_bytes, np.uint8)

    # numpy → image (OpenCV)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    results = model(img)

    outputs = []

    for result in results:
        # lấy ảnh dạng numpy
        img = result.plot()

        # convert sang base64
        _, buffer = cv2.imencode('.jpg', img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        # lấy text (bbox, class,...)
        boxes = result.boxes.xyxy.tolist()
        classes = result.boxes.cls.tolist()

        outputs.append({
            "image": img_base64,
            "boxes": boxes,
            "classes": classes
        })

    return outputs