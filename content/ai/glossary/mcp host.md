---
title: MCP host
description:
created:
id: obs-TuYfFqzY
aliases:
tags:
  - ai
  - mcp
socialDescription:
socialImage: mcp-host.png
---

![mcp-host](static/mcp-host.png)
An [[model context protocol|MCP]] host is the runtime environment where the [[AI agent|AI agent]] and the [[MCP client|MCP client]] operate. It provides the context in which the agent reasons, invokes [[ai tool|tools]] through clients, and connects to [[MCP server|MCP servers]]. The host is responsible for mediating these interactions, applying permissions, and ensuring that the system runs within a controlled environment.

## Key characteristics

- **Execution environment** – Runs the agent and client, providing access to the model
- **Transport management** – Handles the communication protocol between clients and servers (stdio, HTTP, WebSocket)
- **Integration point** – Connects clients to one or more servers
- **Security boundary** – Applies authentication, authorization, and sandboxing
- **Context provider** – Supplies environmental data (e.g., user session, workspace state)
- **Lifecycle management** – Starts, stops, and monitors the agent/client runtime
- **Policy enforcement** – Ensures agents and clients operate within defined guardrails

The host is not itself an agent. Instead, it is the container or platform that enables agents to function and interact with external resources via [[model context protocol|MCP]]. The host initializes MCP connections, manages their lifecycle, and provides the infrastructure for agents to use MCP clients to communicate with servers.

## Understanding the relationships

### MCP host vs. [[AI agent|AI agent]]:

- **AI Agent** - Makes reasoning decisions and tool choices (powered by an LLM).
- **Host** - Provides the environment and infrastructure where those decisions can be executed safely.

#### Without MCP Host

- Agents may run ad hoc, without consistent governance
- Permissions and security vary by setup
- Clients must handle context and lifecycle logic themselves
- No standardized transport or connection management

#### With MCP Host

- Agents run in a standardized, managed environment
- Connections to servers are mediated and secured
- Transport protocols are handled consistently
- Workflows can leverage shared policies and context

**Key distinction:** The MCP host is the platform layer. It enables agents and clients to function, while controlling how they interact with servers through standardized protocols and transports.

## Examples

- **In an IDE:** VS Code running an MCP extension acts as the host. The editor provides the runtime for the agent, initializes MCP clients, manages transport protocols, and connects to servers (like a documentation search or code analysis server).
- **In a cloud platform:** A managed runtime hosts agents, provides client access with proper transport handling, and connects securely to multiple enterprise MCP servers (databases, APIs, internal tools).

## Non-examples

- **The agent** – Provides reasoning and decision-making, but is not the runtime environment
- **The MCP client** – Executes tool calls, but does not host or mediate the runtime
- **The MCP server** – Exposes tools and resources, but is external to the host environment
- **Standalone [[orchestration layer|orchestration]]** – Adds reliability and guardrails, but is not the execution container
- **The LLM** – Generates text and reasoning, but is a model accessed by the system, not the environment itself

> [!TIP] An MCP host is the container environment where the agent and client operate, managing their connections and transport protocols—not the reasoning layer, not the tool, and not the orchestration.
