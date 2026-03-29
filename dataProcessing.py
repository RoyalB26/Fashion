import json
import os
import cv2
import numpy as np

class dataProcessing:
    def __init__(self, data_path, label_path, size=(64,64), batches= -1):
        self.data_path= data_path
        self.label_path= label_path
        self.__data, self.__data_name= self.inputData(data_path, size, batches)
        self.__annotations= self.inputAnnotation(label_path)
        self.__label= self.inputLabel(self.__data_name, self.__annotations)
    
    def inputData(self, data_path, size, batches= -1) -> list:
        batch= 0
        data= []
        data_name= []
        for file in os.listdir(data_path):
            if batch == batches:
                return np.array(data), data_name
            image_path= os.path.join(data_path, file)
            image= cv2.imread(image_path)
            if image is None:
                continue
            image_resize= cv2.resize(image, size)
            image_gray= cv2.cvtColor(image_resize, cv2.COLOR_BGR2GRAY)
            image_gray= image_gray / 255.0
            data.append(image_gray)
            data_name.append(file)
            batch+= 1
        return np.array(data), data_name

    def inputAnnotation(self, label_path) -> dict:
        with open(label_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data

    def inputLabel(self, data_name, annotations) -> list:
        label= []
        for idx, name in enumerate(data_name):
            for image in annotations['images']:
                if image['file_name'] == name:
                    image_width= image['width']
                    image_height= image['height']

                    for annotation in annotations['annotations']:
                        if image['id'] == annotation['image_id']:
                            x_center= annotation['bbox'][0] 
                            y_center= annotation['bbox'][1]
                            w= annotation['bbox'][2]
                            h= annotation['bbox'][3]

                            # Normalization
                            x_center= (x_center + w / 2) / image_width
                            y_center= (y_center + h / 2) / image_height
                            w= w / image_width
                            h= h / image_height
                            category_id= annotation['category_id']
                            label.append([category_id, x_center, y_center, w, h])
                            break
                    break
        return label

    def getData(self):
        return self.__data
    
    def getLabel(self):
        return self.__label