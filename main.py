import json

# Mở file với mode 'r' (read) và encoding 'utf-8' để tránh lỗi font tiếng Việt
with open('instances_attributes_train2020.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Bây giờ 'data' đã là một Dictionary của Python
print(len(data['images']))