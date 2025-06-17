import subprocess
import os

commands = [
    r"backend\venv\Scripts\activate && python ingest_movies_data_to_pincone.py",
]

def run_commands():
    original_dir = os.getcwd()
    for cmd in commands:
        process = subprocess.Popen(cmd, shell=True)  # ✅ no `executable="/bin/bash"` on Windows
        process.wait()
        if process.returncode != 0:
            print(f"Command failed: {cmd}")
            break
    os.chdir(original_dir)

if __name__ == "__main__":
    run_commands()