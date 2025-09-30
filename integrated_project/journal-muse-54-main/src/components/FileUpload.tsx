
import React, { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.suggestions) {
        setResult(data.suggestions);
      } else if (data.error) {
        setResult("Error: " + data.error);
      }
    } catch (err) {
      setResult("Error: " + err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-bold mb-2">Upload PDF for Journal Suggestions</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
      >
        Submit
      </button>
      {result && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="font-semibold">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
