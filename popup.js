document.getElementById('summarize').addEventListener(() => {
    const result  = document.getElementById('result');
    result.textContent = "Extracting text..."

    chrome.tabs.query({acitve: true, currentWindow: true}, ([tabs]) =>{
        chrome.tabs.sendMessage(
            tabs.id,
            {type: "GET_ARTICAL_TEXT"},
            ({text}) => {
                result.textContent = text
                ? text.slice(0, 300) + "...."
                : "No article found"
            }
        )
    })
})