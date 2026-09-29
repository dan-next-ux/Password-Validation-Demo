# Penpot MCP Setup Reference

## Overview

Use this reference when configuring or troubleshooting Penpot's official MCP integration.

As of March 12, 2026:

- The historical repository `penpot/penpot-mcp` is archived.
- The active source has been integrated into `penpot/penpot` under the `mcp` area.
- The workflow still depends on a local Penpot plugin plus a local MCP server.

## Current Topology

Penpot MCP has three runtime pieces:

1. An MCP server process exposed to the AI client
2. A locally served Penpot plugin manifest and UI
3. A Penpot design file with the plugin opened and connected

The MCP server exposes tools to the client, while the Penpot plugin talks back to the server over WebSocket and executes actions inside Penpot.

## Default Local URLs

- Plugin manifest: `http://localhost:4400/manifest.json`
- Streamable HTTP MCP endpoint: `http://localhost:4401/mcp`
- SSE MCP endpoint: `http://localhost:4401/sse`

If the user's setup overrides ports, adapt every snippet consistently. Do not mix default and custom ports in the same answer.

## Server Startup

The archived official README describes this flow:

1. Install dependencies with `npm install`
2. Start everything with `npm run bootstrap`

That bootstrap path installs dependencies, builds the components, and starts the local services.

## Client Transport Selection

Prefer transports in this order:

1. Streamable HTTP
2. SSE
3. stdio proxied through `mcp-remote`

Use these patterns:

### HTTP-capable MCP clients

Point the client at:

```text
http://localhost:4401/mcp
```

### SSE-based MCP clients

Point the client at:

```text
http://localhost:4401/sse
```

### Stdio-only clients

Use:

```bash
npx -y mcp-remote http://localhost:4401/sse --allow-http
```

Only recommend the proxy when the client cannot talk to HTTP/SSE directly.

## Penpot Plugin Flow

1. Open a Penpot design file
2. Open the plugin manager
3. Load the local manifest URL
4. Open the plugin UI
5. Click the UI control that connects to the MCP server

Do not tell the user to close the plugin UI after connection. Closing it drops the active bridge.

## Browser Restrictions

Penpot Cloud runs from a remote origin such as `https://design.penpot.app`, while the plugin manifest and MCP server are usually local. Chromium-based browsers may block or prompt on this private-network access.

When users report that Penpot cannot load the local plugin or cannot connect to the local MCP server:

- Tell them to approve the browser local-network access prompt if shown
- Mention Brave shields as a common blocker
- Suggest Firefox if Chromium network restrictions keep interfering

## Troubleshooting Cues

Use these symptom-to-cause mappings:

- "Plugin doesn't exist" or manifest load failure
  Usually the plugin web server is not running or the manifest URL is wrong.
- Plugin loaded but not connected
  Usually the MCP server is not running, the wrong port is in use, or browser local-network access was denied.
- MCP client cannot see tools
  Usually the client points at the wrong transport or needs `mcp-remote`.
- Connection works and then stops
  Usually the Penpot plugin UI was closed.

## Historical Note

When citing repository locations, be precise:

- Historical repo: `https://github.com/penpot/penpot-mcp`
- Active integrated source: `https://github.com/penpot/penpot/tree/develop/mcp`

Treat the archived repository as still useful for setup examples, but prefer the integrated main repository when describing the current upstream location.
