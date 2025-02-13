// ✅ ブラウザで実行されないようにする
if (typeof window !== "undefined") {
    console.error("This script should not run in the browser!");
    throw new Error("sendCommandToUnity.js should only run in Node.js");
}

const WebSocket = require("ws");

// WebSocket サーバーを立ち上げる
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log("Received:", message);
        // ここで Unity にメッセージを送信する処理を追加
        sendCommandToUnity(message);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on ws://localhost:8080");

let unitySocket = null;

// Unity への接続処理
const unityWss = new WebSocket.Server({ port: 9090 });
unityWss.on("connection", (ws) => {
    console.log("Unity connected");
    unitySocket = ws;
});
unityWss.on("close", () => {
    console.log("Unity disconnected");
    unitySocket = null;
});

// Unity へのコマンド送信
function sendCommandToUnity(message) {
    if (unitySocket) {
        if (message.toString("hex").startsWith("7b")) {
            unitySocket.send(JSON.stringify(message));
        } else {
            console.log("Message from Unity:", message.toString("utf8"));
            //ここにUnityからのメッセージを受け取った時の処理を追加
        }
    } else {
        console.log("Unity is not connected.");
    }
}
