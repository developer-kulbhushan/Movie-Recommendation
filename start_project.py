import subprocess
import os

def start_backend():
    subprocess.Popen(
        r'start cmd /k "cd backend && venv\Scripts\activate && python server.py"',
        shell=True
    )

def start_frontend():
    subprocess.Popen(
        r'start cmd /k "cd frontend && npm run dev"',
        shell=True
    )

if __name__ == "__main__":
    print("🚀 Starting backend and frontend...")
    start_backend()
    start_frontend()
    print("✅ Both backend and frontend have been started in new terminal windows.")
