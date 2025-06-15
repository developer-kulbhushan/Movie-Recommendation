import uuid
import pandas as pd
from backend.pinecone_manager import PineconeManager
import time

def read_and_batch_movie_data(file_path: str, batch_size: int = 96):
    """
    Reads a cleaned movies CSV file and converts it into batches of records for Pinecone.
    
    Args:
        file_path (str): Path to the cleaned movies CSV file.
        batch_size (int): Number of records per batch.

    Returns:
        List[List[Dict]]: Batches of records.
    """
    df = pd.read_csv(file_path)

    records = []

    for _, row in df.iterrows():
        # Prepare movie description
        movie_data = (
            f"Title: {row.get('title', '')}\n"
            f"Genres: {row.get('genres', '')}\n"
            f"Overview: {row.get('overview', '')}\n"
            f"Tagline: {row.get('tagline', '')}\n"
            f"Release Date: {row.get('release_date', '')}\n"
            f"Runtime: {row.get('runtime', '')} minutes\n"
            f"Vote Average: {row.get('vote_average', '')}\n"
            f"Vote Count: {row.get('vote_count', '')}\n"
            f"Keywords: {row.get('keywords', '')}"
        )

        record = {
            "_id": str(uuid.uuid4()),  # Unique ID for Pinecone or similar DB
            "movie_data": movie_data
        }

        records.append(record)

    # Split into batches of `batch_size`
    batches = [records[i:i + batch_size] for i in range(0, len(records), batch_size)]

    return batches

pm = PineconeManager()
pm.create_index()

file_path = r'data\movies_data.csv'
movie_records_list = read_and_batch_movie_data(file_path)


print(f"Number of batches to insert: {len(movie_records_list)}")

count = 0

for movie_records in movie_records_list:
    print(f"Inserting batch {count + 1} with {len(movie_records)} records...")

    count += 1
    pm.insert_data(movie_records)

    if count % 10 == 0:
        print(f"Inserted {count} batches so far. Waiting for 5 seconds to avoid rate limits...")
        time.sleep(5)

print("All movie records have been inserted successfully.")