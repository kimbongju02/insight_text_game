import os
import json

currnet_path = os.getcwd()

dataset_path = os.path.join(currnet_path, '../../../datasets')
novelData_path = os.path.join(dataset_path, 'novel_data.json')

def load_all_novel_data():
    with open(novelData_path, 'r', encoding="UTF-8") as f:
        return json.load(f)
    
def load_novel_data(idx):
    with open(novelData_path, 'r', encoding="UTF-8") as f:
        result =  json.load(f)
        return result[idx]