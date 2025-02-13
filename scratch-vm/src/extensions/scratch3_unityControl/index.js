const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const log = require("../../util/log");

const blockIconURI =
    "data:image/png;base64,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";

const menuIconURI =
    "data:image/png;base64,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";

// クライアントサイド (ブラウザ環境)
const socket = new WebSocket("ws://localhost:8080"); // サーバーへの接続

// WebSocket が開いたときの処理
socket.onopen = () => {
    console.log("WebSocket connected");
    socket.send("Hello Unity"); // メッセージ送信
};

// サーバーからメッセージを受け取る
socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
};

// WebSocket が閉じられたときの処理
socket.onclose = () => {
    console.log("Connection closed");
};

// function sendCommandToUnityIfNodeEnv(args) {
//     if (typeof window === "undefined") {
//         const sendCommandToUnity = require("../../../server/sendCommandToUnity.js");
//         sendCommandToUnity(args);
//         console.log("sent command to Unity");
//     } else {
//         console.warn("sendCommandToUnity cannot run in the browser");
//     }
// }

// メッセージをWebSocketサーバーに送信する関数
function sendMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ text: message }));
        console.log("Message sent:", message);
    } else {
        console.error("WebSocket is not open");
    }
}

class UnityExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }
    getInfo() {
        return {
            id: "unityExtension",
            name: "Unity Control",
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: "moveForward",
                    blockType: BlockType.COMMAND,
                    text: "前に [STEP] 進む",
                    arguments: {
                        STEP: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50,
                        },
                    },
                },
                {
                    opcode: "turnUp",
                    blockType: BlockType.COMMAND,
                    text: "上を向く",
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                {
                    opcode: "turnDown",
                    blockType: BlockType.COMMAND,
                    text: "下を向く",
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 180,
                        },
                    },
                },
                {
                    opcode: "turnRight",
                    blockType: BlockType.COMMAND,
                    text: "右を向く",
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 90,
                        },
                    },
                },
                {
                    opcode: "turnLeft",
                    blockType: BlockType.COMMAND,
                    text: "左を向く",
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 270,
                        },
                    },
                },
                {
                    opcode: "isMyHealthGreaterThan",
                    blockType: BlockType.BOOLEAN, // ✅ Boolean (true/false) を返す
                    text: "自分のHP > [VALUE]",
                    arguments: {
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50,
                        },
                    },
                },
                {
                    opcode: "isMyHealthLessThan",
                    blockType: BlockType.BOOLEAN, // ✅ Boolean (true/false) を返す
                    text: "自分のHP < [VALUE]",
                    arguments: {
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50,
                        },
                    },
                },
                {
                    opcode: "isEnemysHealthLessThan",
                    blockType: BlockType.BOOLEAN, // ✅ Boolean (true/false) を返す
                    text: "自分のHP < [VALUE]",
                    arguments: {
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50,
                        },
                    },
                },
                {
                    opcode: "isEnemysHealthLessThan",
                    blockType: BlockType.BOOLEAN, // ✅ Boolean (true/false) を返す
                    text: "自分のHP < [VALUE]",
                    arguments: {
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50,
                        },
                    },
                },
                {
                    opcode: "isMyBarrierActive",
                    blockType: BlockType.BOOLEAN, // ✅ true / false を返す
                    text: "バリアを展開している",
                },
            ],
            menus: {},
        };
    }

    moveForward(args) {
        const step = Cast.toNumber(args.STEP);
        log.log(`move forward ${step}`);
        // sendCommandToUnityIfNodeEnv({ action: "move", step: args.STEP });
        sendMessage({ action: "move", step: step });
    }

    turnUp() {
        log.log("turn Up");
        // sendCommandToUnityIfNodeEnv({ action: "rotate", angle: 0 });
        sendMessage({ action: "rotate", angle: 0 });
    }

    turnDown() {
        log.log("turn Down");
        // sendCommandToUnityIfNodeEnv({ action: "rotate", angle: 180 });
        sendMessage({ action: "rotate", angle: 180 });
    }

    turnRight() {
        log.log("turn Right");
        // sendCommandToUnityIfNodeEnv({ action: "rotate", angle: 90 });
        sendMessage({ action: "rotate", angle: 90 });
    }

    turnLeft() {
        log.log("turn Left");
        // sendCommandToUnityIfNodeEnv({ action: "rotate", angle: 270 });
        sendMessage({ action: "rotate", angle: 270 });
    }

    isMyHealthGreaterThan(args) {
        return this.health > args.VALUE;
    }

    isMyHealthLessThan(args) {
        return this.health < args.VALUE;
    }

    isEnemysHealthGreaterThan(args) {
        return this.health > args.VALUE;
    }

    isEnemysHealthLessThan(args) {
        return this.health < args.VALUE;
    }

    isMyBarrierActive() {
        return this.barrierActive;
    }
}

module.exports = UnityExtension;
