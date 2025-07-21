console.log("✅ content.js loaded!");

function getArticle() {
    const article = document.querySelector('article');
    console.log(article);
    
    if (article) return article.innerText;

    const paragraphs = Array.from(document.querySelectorAll('p'));
    return paragraphs.map((p) => p.innerText).join('\n');
}

console.log(getArticle());


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📨 Message received in content script:", message);

  if (message.type === "GET_ARTICAL_TEXT") {
    const articleText = getArticle();
    console.log("📑 Extracted article text:", articleText);

    sendResponse({ text: articleText });
    return true; // Keeps channel open!
  }
});

  