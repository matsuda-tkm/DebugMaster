# Debug Master

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/matsuda-tkm/DebugMaster)

Open Hack U 2025 OSAKA

## APIキーの設定

1. [Notion](https://www.notion.so/matsuda-takumi/1b3179e2944180f2829df89096efdf13?pvs=4)に記載したコマンドを実行して環境変数としてAPIキーを設定する。

```bash
export GENAI_API_KEY=XXXXXXXXXX
```

## 実行方法

1. ターミナルで以下を実行し、コンテナを起動する。

```bash
docker compose up -d
```

2. http://localhost:5173 にアクセスする。

3. コンテナを停止する場合は以下を実行する。

```bash
docker compose down
```

