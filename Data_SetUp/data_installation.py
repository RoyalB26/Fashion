import requests

url = "https://s3.amazonaws.com/ifashionist-dataset/annotations/instances_attributes_train2020.json"
filename = "instances_attributes_train2020.json"

print("Đang tải...")
response = requests.get(url)
with open(filename, "wb") as f:
    f.write(response.content)
print("Xong!")