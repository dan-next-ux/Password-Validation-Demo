---
name: penpot-mcp
description: Set up and use Penpot's official MCP server with MCP-aware clients and local Penpot plugins. Use when Codex needs to connect an MCP client to Penpot, explain the Penpot MCP architecture, configure transports for Claude/Codex/Cursor-style clients, troubleshoot localhost or browser/plugin connection failures, or guide design-to-code and code-to-design workflows against Penpot files.
---

# Penpot MCP

Use this skill to connect an MCP client to Penpot's official MCP server and operate on Penpot design files through the Penpot plugin bridge.

## Quick Start

1. Confirm the user wants the official Penpot MCP flow, not a separate Penpot REST API integration.
2. Read [references/setup.md](references/setup.md) for the current server topology, ports, and transport choices.
3. Choose the client transport:
   - Use direct HTTP when the client supports Streamable HTTP MCP.
   - Use SSE only when the client or existing setup expects it.
   - Use `mcp-remote` only when the client supports stdio transport but not HTTP/SSE.
4. Verify the Penpot plugin is loaded from the local manifest and kept open while the MCP session is active.

## Workflow

### 1. Establish What Needs Configuring

Determine which part is missing:

- Penpot MCP server not installed or not running
- Penpot plugin not loaded in Penpot
- MCP client not configured
- Existing connection failing during runtime

Do not jump straight to client config if the local Penpot plugin bridge is not connected first.

### 2. Configure the Local Penpot Side

Use the official local plugin workflow from the reference:

- Serve the plugin manifest locally
- Load the manifest URL in Penpot
- Open the plugin UI
- Connect the plugin UI to the MCP server

Treat the plugin UI as part of the runtime connection. If the UI closes, the MCP bridge drops.

### 3. Configure the MCP Client

Prefer the simplest viable transport:

- `http://localhost:4401/mcp` for clients with Streamable HTTP support
- `http://localhost:4401/sse` for clients that expect SSE
- `npx -y mcp-remote http://localhost:4401/sse --allow-http` only for stdio-only clients

When writing config snippets for a user, keep them minimal and adapted to the exact client they named.

### 4. Troubleshoot in the Right Order

Check failures in this order:

1. The Penpot MCP server process is running
2. The local plugin manifest is reachable
3. The plugin is loaded into the target Penpot file
4. The plugin UI shows an active MCP connection
5. The MCP client is pointed at the correct endpoint or proxy command
6. Browser local-network restrictions are not blocking `localhost`

Most failures are local-network or plugin-lifecycle issues, not MCP schema issues.

## Output Expectations

When helping with Penpot MCP:

- State which transport was chosen and why
- Give exact config or command snippets for the named client
- Call out the required local URLs and ports
- Mention the browser restriction caveat when Penpot runs on `https://design.penpot.app`
- Mention that the archived `penpot/penpot-mcp` repository is historical and the active source now lives in the main Penpot repo

## Reference

Read [references/setup.md](references/setup.md) when you need:

- current ports and endpoint URLs
- browser security caveats
- stdio proxy guidance
- official repository status and maintenance location
