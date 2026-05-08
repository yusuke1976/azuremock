// ボタンクリックイベント
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Enterキー入力イベント
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

// ★ async を付けて非同期関数として定義する
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const messageText = inputField.value.trim();

    if (messageText !== "") {
        // ユーザーのメッセージを画面に表示
        addMessage(messageText, 'user');
        inputField.value = "";

        try {
            // --- API 連携部分 ---
            // await は async 関数の中なので使えるようになります
            const response = await fetch("/api/GetAIAnswer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageText })
            });

            if (!response.ok) {
                throw new Error('ネットワーク応答が正常ではありません');
            }

            const data = await response.json();
            
            // APIからの回答を表示（data.answer の構造は Azure Functions 側に合わせる）
            addMessage(data.answer, 'bot');

        } catch (error) {
            console.error("Error:", error);
            addMessage("申し訳ありません、エラーが発生しました。", 'bot');
        }
    }
}

// メッセージを画面に追加する補助関数
function addMessage(text, sender) {
    const chatWindow = document.getElementById('chat-window');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);

    // 常に最新のメッセージまでスクロール
    chatWindow.scrollTop = chatWindow.scrollHeight;
}