function getArticle() {
    const article = document.querySelector('article');
    console.log(article);
    
    if (article) return article.innerText;

    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map((p) => p.innerText).join('\n');
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ARTICAL_TEXT") {
    const articleText = getArticle();
    sendResponse({ text: articleText });
    return true; // ✅ Important: Keeps the message channel open for async responses
  }
});