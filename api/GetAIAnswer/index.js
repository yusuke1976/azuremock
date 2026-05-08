module.exports = async function (context, req) {
    const userMessage = req.body && req.body.message;

    // 環境変数（Azure上の設定）からキーを取得
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_KEY;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: userMessage }]
        })
    });

    const data = await response.json();
    context.res = {
        body: { answer: data.choices[0].message.content }
    };
};