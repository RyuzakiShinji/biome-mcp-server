# Biome MCP Server

[English](README.md) | [日本語](README.ja.md)

A Model Context Protocol (MCP) server that enables LLMs and AI agents to perform code linting and automatic formatting using [Biome](https://biomejs.dev/). This server exposes Biome's linting and formatting capabilities as MCP tools, allowing AI to programmatically check and format code.

## Overview

This MCP server specializes in linting and formatting JavaScript/TypeScript code. Key features include:

- **Code Analysis**: Detects lint errors and provides detailed diagnostic information
- **Auto-formatting**: Automatically formats code according to Biome's rules
- **AI Integration**: Easy access to these features through the MCP protocol

## Features

- Exposes Biome's lint and format functionality as MCP tools
- Simple TypeScript implementation that's easy to extend
- Configurable Biome settings support

## Prerequisites

- Node.js 22 or higher

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/RyuzakiShinji/biome-mcp-server.git
cd biome-mcp-server
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Your MCP Client
Add the following configuration to your MCP client:

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

Replace `/path/to/the/cloned/repo/biome-mcp-server/biome-mcp-server.ts` with the actual path to your cloned repository.

## Available Tools

### `biome-lint`
Analyzes JavaScript/TypeScript files and returns Biome lint diagnostics.

**Parameters:**
- `paths` (string[]): Array of file paths to lint
- `configPath` (optional string): Path to custom Biome configuration file (e.g., `biome.json`). Uses default settings if not specified

**Output:**
- Returns diagnostic results (errors, warnings, suggestions) in text format

### `biome-format`
Automatically formats JavaScript/TypeScript files according to Biome rules.

**Parameters:**
- `paths` (string[]): Array of file paths to format
- `configPath` (optional string): Path to custom Biome configuration file. Uses default settings if not specified

**Output:**
- Returns formatted code in text format

### Custom Biome Configuration

You can specify a custom Biome configuration file using the `configPath` parameter. This allows you to tailor linting and formatting rules for different projects, providing flexibility in code style enforcement.

## References

- [Model Context Protocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Biome Official Documentation](https://biomejs.dev/)

## License

MIT License
