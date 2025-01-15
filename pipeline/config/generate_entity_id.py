import hashlib

def generate_entity_id(seed: str) -> int:
    """
    Generate a positive integer hash from a seed string.
    
    Args:
        seed (str): The input seed string.
        
    Returns:
        int: A positive integer hash value.
    """
    # Create a SHA-256 hash of the seed string
    hash_object = hashlib.sha256(seed.encode())
    
    # Convert the hash to an integer
    hash_int = int(hash_object.hexdigest(), 16)
    
    # Ensure the hash is positive
    positive_hash = hash_int % (2**31)  # Adjust the range if needed
    
    return positive_hash