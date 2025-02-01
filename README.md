# 事前準備

node と npm を使うので、実行できない場合は先にインストールしてください

まずは scratch-gui に移動して node_modules をインストール

```bash
cd scratch-gui
npm install
```

同様に、scratch-vm に移動して node_modules をインストール

```bash
cd ../scratch-vm
npm install
```

# 実行方法

scratch-vm/server に移動して sendCommandToUnity.js を実行

```bash
cd scratch-vm/server
node sendCommandToUnity.js
```

scratch-gui に移動して起動

sendCommandToUnity.js を実行するとターミナルが使えなくなるので、別のターミナルを起動する

```bash
cd scratch-gui
npm start
```

"http://localhost:8601/"に接続することで実機を動かせる

# ブロックの追加

/scratch-vm/src/extensions/scratch3_unityControl/index.js
に移動してブロックの定義を行う

定義はコードを読んで適宜行う

```bash
cd scratch-vm/src/extensions/scratch3_unityControl/index.js
```
