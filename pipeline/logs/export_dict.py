import os
import json
from config import LOG_DIR

def serialize_bytes(obj):
    """
    Custom serializer for JSON to handle bytes objects.
    Converts bytes to string using UTF-8 decoding.
    """
    if isinstance(obj, (bytes, bytearray)):
        return obj.decode("utf-8")
    raise TypeError(f"Object of type {type(obj).__name__} is not JSON serializable")

def export_dict(data: dict, filename: str):

    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)
    
    with open(f'{LOG_DIR}/{filename}.dict', 'w') as file:
        json.dump(data, file, indent=4, default=serialize_bytes)

    return