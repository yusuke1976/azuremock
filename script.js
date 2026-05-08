// AzureのURLではなく、自分のAPIルートを叩く
const response = await fetch("/api/GetAIAnswer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: messageText })
});
const data = await response.json();
addMessage(data.answer, 'bot');