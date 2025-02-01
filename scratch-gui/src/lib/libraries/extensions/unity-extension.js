class UnityExtension {
    getInfo() {
        return {
            id: "unityExtension",
            name: "Unity Control",
            blocks: [
                {
                    opcode: "moveForward",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "move forward [STEP]",
                    arguments: {
                        STEP: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10,
                        },
                    },
                },
                {
                    opcode: "turnLeft",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "turn left [ANGLE]",
                    arguments: {
                        ANGLE: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 90,
                        },
                    },
                },
            ],
        };
    }

    moveForward(args) {
        sendCommandToUnity({ action: "move", step: args.STEP });
    }

    turnLeft(args) {
        sendCommandToUnity({ action: "rotate", angle: args.ANGLE });
    }
}

Scratch.extensions.register(new UnityExtension());
