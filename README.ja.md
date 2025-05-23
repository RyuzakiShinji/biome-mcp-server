# Biome MCP Server

[日本語](README.ja.md) | [English](README.md)

このプロジェクトは、[Biome](https://biomejs.dev/)を使用してLLMやAIエージェントがコードのリントエラー検出や自動フォーマットを簡単に実行するためのModel Context Protocol (MCP) サーバーです。MCPツールとしてリント・フォーマット機能を提供し、AIがプログラム的にコードのチェックや整形を行えるようにします。

## 概要

このサーバーは、JavaScript/TypeScriptコードのリントとフォーマットに特化したMCPサーバーです。主な特徴は以下の通りです：
- コードのリントエラーを検出し、詳細な診断結果を提供します
- Biomeのルールに基づいてコードを自動整形します
- MCPプロトコルを経由してAIからこれらの機能を簡単に利用できます

## 特徴
- Biomeのリント・フォーマット機能をMCPツールとして提供
- シンプルなTypeScript実装により拡張も容易

## 前提条件

- Node.js 22以上がインストールされていること

## はじめに

### 1. リポジトリのクローン
```sh
git clone https://github.com/RyuzakiShinji/biome-mcp-server.git
cd biome-mcp-server
```

### 2. 依存パッケージのインストール
```sh
npm install
```

### 3. MCPクライアントの設定
以下の内容をMCPクライアントに設定してください。

```json
{
  "mcpServers": {
    "biome": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/path/to/the/cloned/repo/biome-mcp-server/biome-mcp-server.ts"
      ],
      "env": {},
      "autoApprove": [],
      "disabled": false
    }
  }
}
```

なお、`/path/to/the/cloned/repo/biome-mcp-server/biome-mcp-server.ts`は実際のパスに置き換えてください。

## 利用可能なツール

### 1. `biome-lint`
- **説明:** JavaScript/TypeScriptファイルを解析し、Biomeによるリント診断結果を返します。
- **入力:**
  - `paths`（文字列配列）：リント対象ファイルのパス
  - `configPath`（省略可・文字列）：カスタムBiome設定ファイル（例: `biome.json`）のパス。未指定時はデフォルト設定を使用
- **出力:**
  - 診断結果（エラー、警告、提案など）をテキスト形式で返却

### 2. `biome-format`
- **説明:** JavaScript/TypeScriptファイルをBiomeのルールに基づいて自動整形します。
- **入力:**
  - `paths`（文字列配列）：整形対象ファイルのパス
  - `configPath`（省略可・文字列）：カスタムBiome設定ファイルのパス。未指定時はデフォルト設定を使用
- **出力:**
  - 整形結果をテキスト形式で返却

### Biome設定ファイルのカスタマイズ
`configPath`でBiome設定ファイルのパスを指定することで、カスタム設定に基づいてリント・フォーマットを実行できます。これにより、プロジェクトごとにリント・フォーマットルールを柔軟にカスタマイズできます。

## 参考リンク
- [Model Context Protocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Biome公式ドキュメント](https://biomejs.dev/)

## ライセンス

MIT License
