function getArticle(){
    const article = document.querySelector('article');
    if (article) return article.innerHTML;

    const paragraphs = Array.from(document.querySelector('p')); 
    return paragraphs.map((p) => p.innerText).join('\n');
}

chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req.type = "GET_ARTICAL_TEXT"){
        const text = getArticle();
        sendResponse ({text});
    }
})