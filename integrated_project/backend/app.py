
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load .env
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    try:
        # Read PDF
        reader = PdfReader(file)
        raw_text = ""
        for page in reader.pages:
            raw_text += page.extract_text() + "\n"

        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=100)
        chunks = text_splitter.split_text(raw_text)
        paper_text = "\n".join(chunks)

        # Initialize Gemini
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-pro",
            temperature=0,
            google_api_key=api_key
        )

        # Ask Gemini for journal suggestions
        prompt = f"Based on the following paper content, suggest 3 suitable journals for submission:\n{paper_text}"
        response = llm.invoke(prompt)

        return jsonify({"suggestions": response.content if hasattr(response, 'content') else str(response)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
