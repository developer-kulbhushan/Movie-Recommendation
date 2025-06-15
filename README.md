# Movie Recommendation System

This project is a movie recommendation system that uses a combination of Groq for natural language processing and Pinecone for vector similarity search to provide personalized movie recommendations. Users can describe the type of movie they're looking for, and the system will suggest relevant titles based on their input.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Python:** Version 3.7 or higher. You can download it from [python.org](https://www.python.org/downloads/).
*   **Node.js and npm:** Node.js (which includes npm) is required for the frontend. You can download it from [nodejs.org](https://nodejs.org/).
*   **Git:** For cloning the repository. You can download it from [git-scm.com](https://git-scm.com/downloads).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url> # Replace <repository-url> with the actual URL
    cd <repository-folder>
    ```

2.  **Set up project environments:**
    This script will create a virtual environment for the backend and install dependencies for both backend and frontend.
    ```bash
    python setup_project_env.py
    ```

3.  **Configure Backend Environment Variables:**
    The backend requires API keys for Groq and Pinecone.
    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Copy the example environment file:
        ```bash
        # For Windows
        copy .env.example .env
        # For macOS/Linux
        cp .env.example .env
        ```
    *   Open the `.env` file and add your API keys:
        ```
        GROQ_API_KEY="your_groq_api_key"
        PINECONE_API_KEY="your_pinecone_api_key"
        PINECONE_ENVIRONMENT="your_pinecone_environment"
        # e.g., "us-west1-gcp" or "us-east-1-aws" - find this in your Pinecone console
        PINECONE_INDEX_NAME="your_pinecone_index_name"
        # Choose a name for your index, e.g., "movie-recommendations"
        ```
    *   Return to the root directory:
        ```bash
        cd ..
        ```

4.  **Set up and populate the Pinecone Database:**
    This script will create the necessary index in your Pinecone account and populate it with movie data from `data/movies_data.csv`.
    *   **Important:** Ensure your Pinecone API key and environment are correctly set in `backend/.env` before running this script.
    *   Run the script from the root directory:
        ```bash
        python setup_pinecone_db.py
        ```
    This process might take a few minutes depending on the dataset size and network speed.

## Running the Project

Once the setup is complete, you can start the backend and frontend servers.

1.  **Ensure your backend virtual environment is active if you are running components separately.** If you used `setup_project_env.py`, the `start_project.py` script will handle activation.

2.  **Start both backend and frontend servers:**
    This script will open two new terminal windows, one for the backend server and one for the frontend development server.
    ```bash
    python start_project.py
    ```
    *   The backend will typically run on `http://127.0.0.1:8000`.
    *   The frontend will typically run on `http://localhost:5173`.

3.  **Access the application:**
    Open your web browser and navigate to the frontend URL (usually `http://localhost:5173`) to use the movie recommendation system.

## Project Structure

The project is organized as follows:

```
.
├── backend/            # Contains the FastAPI backend application
│   ├── .env.example    # Example environment variables for the backend
│   ├── .gitignore      # Git ignore file for backend specific files
│   ├── groq_manager.py # Manages interactions with the Groq API
│   ├── pinecone_manager.py # Manages interactions with Pinecone
│   ├── recommendation.py # Handles the recommendation logic
│   ├── requirements.txt # Python dependencies for the backend
│   └── server.py       # The main FastAPI server application
│
├── data/               # Contains the dataset
│   └── movies_data.csv # The movie dataset used for recommendations
│
├── frontend/           # Contains the React frontend application
│   ├── public/         # Public assets for the frontend
│   ├── src/            # Source files for the frontend (React components, hooks, etc.)
│   ├── .gitignore      # Git ignore file for frontend specific files
│   ├── package.json    # NPM package configuration and dependencies
│   └── ...             # Other frontend configuration files (vite, tailwind, etc.)
│
├── .gitignore          # Root .gitignore file
├── README.md           # This file: project overview and setup instructions
├── setup_pinecone_db.py # Script to set up and populate the Pinecone database
├── setup_project_env.py # Script to set up Python and Node.js environments
└── start_project.py     # Script to start both backend and frontend servers
```

### Key Components:

*   **`backend/`**: The Python FastAPI application that serves recommendations.
    *   `server.py`: Main API logic.
    *   `groq_manager.py`: Handles calls to the Groq API for understanding user queries.
    *   `pinecone_manager.py`: Handles vector embedding storage and similarity search with Pinecone.
    *   `recommendation.py`: Orchestrates the recommendation generation process.
*   **`frontend/`**: The React application (built with Vite) that provides the user interface.
*   **`data/`**: Contains the raw data used. `movies_data.csv` is the primary dataset.
*   **Root-level Python Scripts**:
    *   `setup_project_env.py`: Automates the initial environment setup (Python venv, npm install).
    *   `setup_pinecone_db.py`: Prepares the Pinecone vector database by creating an index and inserting movie data.
    *   `start_project.py`: A convenience script to launch both the backend and frontend servers concurrently.
