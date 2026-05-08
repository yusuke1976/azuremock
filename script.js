document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const messageText = inputField.value.trim();

    if (messageText !== "") {
        // ユーザーのメッセージを表示
        addMessage(messageText, 'user');
        inputField.value = "";

        // 返信のシミュレーション（後にAzure OpenAI等と連携）
        setTimeout(() => {
            addMessage("ご質問ありがとうございます。「" + messageText + "」についてですね。お調べいたしますので少々お待ちください。", 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);

    // 常に最新のメッセージまでスクロール
    chatWindow.scrollTop = chatWindow.scrollHeight;
}