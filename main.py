import os
import numpy as np
from dataProcessing import dataProcessing



if __name__ == "__main__":
    dir_path= "D:/Fashion_Data"
    label_path= os.path.join(dir_path, "instances_attributes_train2020.json")
    data_path= os.path.join(dir_path, "train")
    dataProcess= dataProcessing(data_path, label_path, (64,64), 50)
    data= dataProcess.getData()
    label= dataProcess.getLabel()