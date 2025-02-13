const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const Cast = require("../../util/cast");
const log = require("../../util/log");

const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iSUQwLjA4NjgyNDQzOTAwMDMzODMyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjQ5MTU0NjY2MDY2MTY5NzQsIDAsIDAsIDAuNDkxNTQ2NjYwNjYxNjk3NCwgLTY0LjUsIC03Ny4yNSkiPjxwYXRoIGlkPSJJRDAuNTcyMTQ2MjMwMzc3MjU2OSIgZmlsbD0iI0ZGOTQwMCIgc3Ryb2tlPSJub25lIiBkPSJNIDE4OCAxNDEgTCAyNTAgMTQxIEwgMjUwIDIwMyBMIDE4OCAyMDMgTCAxODggMTQxIFogIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjI4NzkwMzMwODg2ODQwODIsIDAsIDAsIDEuMjg3OTAzMzA4ODY4NDA4MiwgLTExMC45LCAtMjQuNCkiLz48cGF0aCBpZD0iSUQwLjYzODMzNjEzNTA3NDQ5NjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTk2IDIwNCBDIDE5NiAyMDQgMTkyLjcwNiAxOTAuMDU4IDE5MyAxODMgQyAxOTMuMDc0IDE4MS4yMzYgMTk1Ljg4NiAxNzguNDU4IDE5NyAxODAgQyAyMDEuNDU1IDE4Ni4xNjggMjAzLjQ0MyAyMDMuNzU0IDIwNiAyMDEgQyAyMDkuMjExIDE5Ny41NDIgMjEwIDE2NiAyMTAgMTY2ICIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTU3LCAxNS44KSIvPjxwYXRoIGlkPSJJRDAuNzU4NzMwMzU2NTgxNTA5MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTSAyMTUgMTY5IEMgMjE1IDE2OSAyMTguMzY3IDE2OS41MzQgMjIwIDE3MCBDIDIyMC43MTYgMTcwLjIwNSAyMjEuMjc4IDE3MC44MTkgMjIyIDE3MSBDIDIyMi42NDYgMTcxLjE2MiAyMjMuMzY4IDE3MC43ODkgMjI0IDE3MSBDIDIyNC40NDcgMTcxLjE0OSAyMjUgMTcyIDIyNSAxNzIgIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCAtNTcsIDE1LjgpIi8+PHBhdGggaWQ9IklEMC4yNDM2NzMwNzMxMjc4NjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNIDIyNyAxNTQgQyAyMjcgMTU0IDIxOC41NTUgMTQ3Ljg5MCAyMTcgMTUxIEMgMjEyLjM0NSAxNjAuMzEwIDIxMS4yODkgMTcxLjczMyAyMTMgMTgyIEMgMjEzLjYxMiAxODUuNjcyIDIyMyAxODcgMjIzIDE4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIC01NywgMTUuOCkiLz48cGF0aCBpZD0iSUQwLjc5MzkzOTQ4MTk1NTAyMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTc1IDIwMC41MDAgQyAxNzUgMjAwLjUwMCAxNjkuODA1IDIyMS45MTMgMTcxIDIyMi43NTAgQyAxNzIuMTk1IDIyMy41ODcgMTc4Ljc5NSAyMDUuMjk1IDE4Mi41MDAgMjA1Ljc1MCBDIDE4NS45MjAgMjA2LjE3MCAxODEuODU5IDIyNC41MDAgMTg1LjI1MCAyMjQuNTAwIEMgMTg5LjIxMyAyMjQuNTAwIDE5Ny4yNTAgMjA1Ljc1MCAxOTcuMjUwIDIwNS43NTAgIi8+PC9nPjwvc3ZnPg==";

const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZyBpZD0iSUQwLjA4NjgyNDQzOTAwMDMzODMyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjQ5MTU0NjY2MDY2MTY5NzQsIDAsIDAsIDAuNDkxNTQ2NjYwNjYxNjk3NCwgLTY0LjUsIC03Ny4yNSkiPjxwYXRoIGlkPSJJRDAuNTcyMTQ2MjMwMzc3MjU2OSIgZmlsbD0iI0ZGOTQwMCIgc3Ryb2tlPSJub25lIiBkPSJNIDE4OCAxNDEgTCAyNTAgMTQxIEwgMjUwIDIwMyBMIDE4OCAyMDMgTCAxODggMTQxIFogIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjI4NzkwMzMwODg2ODQwODIsIDAsIDAsIDEuMjg3OTAzMzA4ODY4NDA4MiwgLTExMC45LCAtMjQuNCkiLz48cGF0aCBpZD0iSUQwLjYzODMzNjEzNTA3NDQ5NjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTk2IDIwNCBDIDE5NiAyMDQgMTkyLjcwNiAxOTAuMDU4IDE5MyAxODMgQyAxOTMuMDc0IDE4MS4yMzYgMTk1Ljg4NiAxNzguNDU4IDE5NyAxODAgQyAyMDEuNDU1IDE4Ni4xNjggMjAzLjQ0MyAyMDMuNzU0IDIwNiAyMDEgQyAyMDkuMjExIDE5Ny41NDIgMjEwIDE2NiAyMTAgMTY2ICIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTU3LCAxNS44KSIvPjxwYXRoIGlkPSJJRDAuNzU4NzMwMzU2NTgxNTA5MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTSAyMTUgMTY5IEMgMjE1IDE2OSAyMTguMzY3IDE2OS41MzQgMjIwIDE3MCBDIDIyMC43MTYgMTcwLjIwNSAyMjEuMjc4IDE3MC44MTkgMjIyIDE3MSBDIDIyMi42NDYgMTcxLjE2MiAyMjMuMzY4IDE3MC43ODkgMjI0IDE3MSBDIDIyNC40NDcgMTcxLjE0OSAyMjUgMTcyIDIyNSAxNzIgIiB0cmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAxLCAtNTcsIDE1LjgpIi8+PHBhdGggaWQ9IklEMC4yNDM2NzMwNzMxMjc4NjU4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNIDIyNyAxNTQgQyAyMjcgMTU0IDIxOC41NTUgMTQ3Ljg5MCAyMTcgMTUxIEMgMjEyLjM0NSAxNjAuMzEwIDIxMS4yODkgMTcxLjczMyAyMTMgMTgyIEMgMjEzLjYxMiAxODUuNjcyIDIyMyAxODcgMjIzIDE4NyAiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIC01NywgMTUuOCkiLz48cGF0aCBpZD0iSUQwLjc5MzkzOTQ4MTk1NTAyMTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0gMTc1IDIwMC41MDAgQyAxNzUgMjAwLjUwMCAxNjkuODA1IDIyMS45MTMgMTcxIDIyMi43NTAgQyAxNzIuMTk1IDIyMy41ODcgMTc4Ljc5NSAyMDUuMjk1IDE4Mi41MDAgMjA1Ljc1MCBDIDE4NS45MjAgMjA2LjE3MCAxODEuODU5IDIyNC41MDAgMTg1LjI1MCAyMjQuNTAwIEMgMTg5LjIxMyAyMjQuNTAwIDE5Ny4yNTAgMjA1Ljc1MCAxOTcuMjUwIDIwNS43NTAgIi8+PC9nPjwvc3ZnPg==";

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
