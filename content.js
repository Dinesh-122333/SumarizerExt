function getArticleText() {
    const article = document.querySelector("article");
    if (article) return article.innerText;
<<<<<<< HEAD

    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map((p) => p.innerText).join('\n');
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("hii");
    
  if (message.type === "GET_ARTICAL_TEXT") {
    const articleText = getArticle();
    sendResponse({ text: articleText });
    console.log(articleText);
    return true; // ✅ Important: Keeps the message channel open for async responses
  }
});
console.log("Extracted text:", getArticle());
=======
  
    // fallback
    const paragraphs = Array.from(document.querySelectorAll("p"));
    return paragraphs.map((p) => p.innerText).join("\n");
  }
  
  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === "GET_ARTICLE_TEXT") {
      const text = getArticleText();
      sendResponse({ text });
    }
  });
>>>>>>> 468ac3ee8efa0d52a1de51c6c16e52b84244ddfe
