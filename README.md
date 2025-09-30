# AI Journal Recommender for Researchers

## 📌 Problem Statement

Researchers often struggle to find the best journals for publishing their papers. Challenges include:

* Journals not covering the right topics
* Low acceptance chances
* Lack of awareness about relevant journals
* Hours wasted manually scouting

## 🎯 Goal

Build an AI-powered tool that recommends the **top 3 most suitable journals** for a research paper by analyzing its **title and abstract**.

## 🚀 Features

* **Content Analyzer**: Extracts key topics, themes, and keywords from the paper’s title and abstract.
* **Journal Matcher**: Matches papers against a curated journal database using semantic similarity scoring.
* **Smart Filtering**: Refine results by subject area, impact factor, or acceptance rate.
* **Simple I/O**: Paste title & abstract → Get ranked journal suggestions with rationale + direct submission links.
* **Bonus Insights**: Estimated acceptance odds + “underdog” journals with higher chances.

## 🛠️ System Architecture

1. **Input Layer** → Research title + abstract
2. **Content Analyzer** → Extracts keywords & context
3. **Journal Matcher** → Compares with journal database (using semantic similarity)
4. **Filtering Module** → Applies user preferences (impact factor, domain, etc.)
5. **Output Layer** → Top 3 journals + insights + submission links

![System Architecture](./assets/system_architecture.png) <!-- Replace with your diagram path if available -->

## 👥 Target Users

* Early-career researchers
* Interdisciplinary scholars
* Academics aiming to save time & maximize publication success

## 📊 Market Research

* Thousands of academic journals exist globally
* Journal selection is one of the top challenges for researchers
* Growing need for AI-driven tools in academic publishing

## ⚔️ Competitive Edge

Unlike existing tools, this project provides:

* AI-based semantic matching (not just keyword search)
* Actionable insights with rationale for recommendations
* Focus on **top 3 journals** to reduce overwhelm

## 🛣️ Future Roadmap

* ✅ Journal recommendation (current)
* 🔄 Add acceptance probability prediction
* 🔄 Personalize suggestions based on user profiles
* 🔄 Trend visualization of top journals in a domain
* 🔄 Integration with external submission platforms

## 📂 Dataset

* Source: [OpenAlex](https://docs.openalex.org/)
* Used for journal metadata, topics, and metrics

## 📌 How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-journal-recommender.git
   cd ai-journal-recommender
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend (FastAPI):

   ```bash
   uvicorn app.main:app --reload
   ```

4. Open frontend in browser:

   ```bash
   http://127.0.0.1:8000
   ```

## 📸 Demo

*(Add screenshots or a short demo video link here)*

## 🤝 Contributing

Contributions are welcome! Please fork this repo, create a feature branch, and submit a PR.

## 📜 License

This project is licensed under the MIT License.

---

💡 *Empowering researchers to discover hidden gem journals and publish smarter.*
