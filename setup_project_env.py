import subprocess
import os

setup_steps = {
    "backend": [
        "python -m venv venv",
        r"venv\Scripts\activate && pip install -r requirements.txt",
    ],
    "frontend": [
        "npm install",
    ]
}

def run_commands_in_dir(directory, commands):
    original_dir = os.getcwd()
    os.chdir(directory)
    for cmd in commands:
        print(f"Running in {directory}: {cmd}")
        process = subprocess.Popen(cmd, shell=True)  # ✅ no `executable="/bin/bash"` on Windows
        process.wait()
        if process.returncode != 0:
            print(f"Command failed: {cmd}")
            break
    os.chdir(original_dir)

if __name__ == "__main__":
    run_commands_in_dir("backend", setup_steps["backend"])
    run_commands_in_dir("frontend", setup_steps["frontend"])
    print("Project setup completed successfully.")