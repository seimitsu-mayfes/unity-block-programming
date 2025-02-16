// ✅ ブラウザで実行されないようにする
if (typeof window !== "undefined") {
    console.error("This script should not run in the browser!");
    throw new Error("sendCommandToUnity.js should only run in Node.js");
}

const WebSocket = require("ws");

// WebSocket サーバーを立ち上げる
let scratchSocket = null;
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");
    scratchSocket = ws;

    ws.on("message", (message) => {
        console.log("Received from Scratch:", message);
        // ここで Unity にメッセージを送信する処理を追加
        sendCommandToUnity(message);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        scratchSocket = null;
    });
});

console.log("WebSocket server is running on ws://localhost:8080");

let unitySocket = null;

// Unity への接続処理
const unityWss = new WebSocket.Server({ port: 9090 });
unityWss.on("connection", (ws) => {
    console.log("Unity connected");
    unitySocket = ws;

    ws.on("message", (message) => {
        sendCommandToScratch(message);
        let decodedmessage = message.toString("utf-8");
        let messageObj = JSON.parse(decodedmessage);
        console.log("Received from Unity:", messageObj);
    });

    ws.on("close", () => {
        console.log("Unity disconnected");
        unitySocket = null;
    });
});

console.log("Unity WebSocket server is running on ws://localhost:9090");

// Unity へのコマンド送信
function sendCommandToUnity(message) {
    if (unitySocket) {
        unitySocket.send(JSON.stringify(message));
    } else {
        console.log("Unity is not connected.");
    }
}

function sendCommandToScratch(message) {
    if (scratchSocket) {
        scratchSocket.send(JSON.stringify(message));
    } else {
        console.log("Scratch is not connected.");
    }
}
