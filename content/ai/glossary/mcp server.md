---
title: MCP server
description:
created:
id: obs-IJ6EOfnq
aliases:
tags:
  - ai
  - mcp
socialDescription:
socialImage: mcp-server.png
---

![mcp-server](static/mcp-server.png)
An MCP server is the component of the [[model context protocol|Model Context Protocol (MCP)]] that exposes [[ai tool|tools]], data, or resources in a standardized format so they can be consumed by an [[MCP client|MCP client]] and used by an [[AI agent|AI agent]]. It makes capabilities discoverable, interoperable, and reusable across different [[ai system|AI systems]] without custom integration code.

## Key characteristics

- **Tool exposure** – Publishes [[ai tool|tools]], APIs, or data sources in a consistent schema
- **Discoverability** – Advertises available tools and their metadata to [[MCP client|clients]]
- **Standardized responses** – Returns outputs in a predictable format
- **Reusability** – Enables the same resource to be used by multiple [[AI agent|AI agents]] or [[MCP host|hosts]]
- **Security boundaries** – Enforces access control and permissions on its resources
- **Interoperability** – Works with any MCP-compliant client, regardless of implementation

The MCP server does not initiate actions. Instead, it waits for requests from [[MCP client|MCP clients]], processes them, and returns results.

## Understanding the relationships

### MCP server vs. [[MCP client|MCP client]]

- **MCP Server** - publishes capabilities (“I provide access to calendar events, document search, or database queries”).
- **MCP Client** - consumes and invokes those capabilities on behalf of an agent.

#### Without MCP Server

- Tools must be hardcoded into the agent or [[orchestration layer]].
- Capabilities are siloed and difficult to share.
- Scaling integrations across teams is error-prone.

#### With MCP Server

- Tools are exposed once, reused everywhere.
- Agents can discover capabilities dynamically.
- Ecosystems of interoperable tools emerge.

**Key distinction:** The MCP server is the supply side of MCP. It provides capabilities that clients (and therefore agents) can consume.

## Example

A company exposes its internal resources as MCP servers:

1. A search server that indexes internal documentation.
2. A ticketing server that manages support requests.
3. A knowledge-graph server that maps relationships between data entities.

Agents running in different hosts can all access these resources via their MCP clients, without custom connectors or duplicated integration work.

## Non-examples

- **The [[AI agent|agent]]** – Decides which tool to use (with the LLM), but does not expose capabilities.
- The **[[MCP client|MCP client]]** – Invokes tools, but does not publish or serve them.
- **The [[MCP host|MCP host]]** – Provides the runtime environment, but does not expose tools.
- **The [[orchestration layer]]** – Coordinates workflows and reliability, but does not make tools available.
- **A [[ai tool|tool]] by itself** – A capability (e.g., database API) is not an MCP server until it is exposed through the protocol.

> [!TIP] An MCP server is the supply side of MCP: it publishes tools and data for clients to consume, but does not reason, decide, or execute requests itself.
