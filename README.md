# 🧠 AI for Summarizer

**AI for Summarizer** is a browser extension that uses Gemini or any AI API provided by the user to extract textual content from article-based web pages (such as news sites, blogs, etc.) and convert it into three structured formats:
- 🔹 **Brief**
- 🔹 **Summary**
- 🔹 **Bullet points**

This extension is designed to make consuming long-form content faster, smarter, and more efficient.

---

## 🚀 Features

- Extract text directly from article/web pages.
- Summarize content using Gemini or user-supplied AI API.
- Generate three summary formats: brief, summary, bullet points.
- Automatically opens a new tab to request API key if none is found.

---

## 📁 Project Structure

| File | Description |
|------|-------------|
| `manifest.json` | Specifies metadata and dependencies of the extension |
| `popup.html` | Main interface displayed to the user |
| `popup.js` | Core functionality and logic for UI interactions |
| `content.js` | Extracts text from web pages for summarization |
| `background.js` | Manages background tasks, opens a new tab if API key is missing |

---

## 🛠️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/ai-for-summarizer.git
