document.getElementById('summarize').addEventListener("click",() => {
    const result  = document.getElementById('result');
    const summaryType = document.getElementById('summary-type').value;

    result.textContent = "Extracting text..."

    // 1. Get the user's API

    chrome.storage.sync.get(['geminiApiKey'], (geminiApiKey) => {
        if (!geminiApiKey){
            result.textContent = "No Api key is set. Click the gear icon to add one.";
            return;
        }
        // Ask content.js to page text
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab || !tab.id) {
            result.textContent = "Couldn't access the active tab.";
            return;
        }

        chrome.tabs.sendMessage(
            tab.id,
            { type: "GET_ARTICAL_TEXT" },
            async (response) => {
                console.log(response);
                
                const { text } = response || {};
                console.log("Extracted Text:", text);

                if (!text) {
                    result.textContent = "Couldn't extract the text from the page.";
                    return;
                }

                try {
                    const summary = await getGeminiSummary(text, summaryType, geminiApiKey);
                    result.textContent = summary;
                } catch (error) {
                    result.textContent = "Gemini Error: " + error.message;
                }
            }
        );
    });

    })
})

async function getGeminiSummary(rawText, type, apiKey) {
    const max = 200000;
    const text = rawText.length > max ? rawText.slice(0, max)+ "..." : rawText;

    const promptMap ={
        brief: `Summarize in 3-4 sentence:\n\n${text}`,
        detailed: `Give a detailed summary:\n\n${text}`,
        bullets: `Summarize in 6-8 bullet points (start each line with "- "):\n\n${text}`,
    }

    const prompt = promptMap[type] || promptMap.brief;

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                content: [{parts: [{text: prompt}] }],
                generationConfig: {temperature: 0.2},

            })
        }
    )

    if (!res.ok){
        const {error} = await res.json();
        throw new Error(error?.message || "Request Sent");
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No Summary.";
}