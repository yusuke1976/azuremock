// axiosなどのライブラリを使わず、標準の https モジュールを使うか、
// もしくは最新のNode.js向けに fetch を安定させる書き方です。

module.exports = async function (context, req) {
    try {
        const userMessage = req.body && req.body.message;

        // 1. 環境変数が取れているかチェック
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_KEY;

        if (!endpoint || !apiKey) {
            context.res = {
                status: 500,
                body: { answer: "サーバーの設定（APIキー）が足りません。" }
            };
            return;
        }

        // 2. Azure OpenAI へのリクエスト
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

        // 3. 正常なレスポンスを返す
        context.res = {
            status: 200,
            body: { answer: data.choices[0].message.content }
        };

    } catch (error) {
        context.log('Error:', error);
        context.res = {
            status: 500,
            body: { answer: "API呼び出し中にエラーが発生しました: " + error.message }
        };
    }
};
