---
title: MCP host
description:
created:
id: obs-TuYfFqzY
aliases:
tags: mcp
socialDescription:
---

An MCP host is the runtime environment where the [[ai agent|AI agent]] and the [[mcp client|MCP client]] operate. It provides the context in which the agent reasons, invokes tools through clients, and connects to [[mcp server|MCP servers]]. The host is responsible for mediating these interactions, applying permissions, and ensuring that the system runs within a controlled environment.

## Key characteristics

• Execution environment – Runs the model, agent, and client together
• Integration point – Connects clients to one or more servers
• Security boundary – Applies authentication, authorization, and sandboxing
• Context provider – Supplies environmental data (e.g., user session, workspace state)
• Lifecycle management – Starts, stops, and monitors the agent/client runtime
• Policy enforcement – Ensures agents and clients operate within defined guardrails

The host is not itself an agent. Instead, it is the container or platform that enables agents to function and interact with external resources via MCP.

## MCP host vs. agent: understanding the relationship

• Agent = makes reasoning decisions and tool choices.
• Host = provides the environment and plumbing where those decisions can be executed safely.

### Without MCP Host

• Agents may run ad hoc, without consistent governance.
• Permissions and security vary by setup.
• Clients must handle context and lifecycle logic themselves.

### With MCP Host

• Agents run in a standardized, managed environment.
• Connections to servers are mediated and secured.
• Workflows can leverage shared policies and context.

**Key distinction:** The MCP host is the platform layer. It enables agents and clients to function, while controlling how they interact with servers.

## Examples

• In an IDE: VS Code running an MCP extension acts as the host. The editor loads the agent, provides an MCP client, and connects to servers (like a documentation search or code analysis server).
• In a cloud platform: A managed runtime hosts agents, provides client access, and connects securely to multiple enterprise MCP servers (databases, APIs, internal tools).

## Non-examples

The agent 🕵️ – Provides reasoning and decision-making, but is not the runtime environment.

The MCP client 🔌 – Executes tool calls, but does not host or mediate the runtime.

The MCP server 🧰 – Exposes tools and resources, but is external to the host environment.

Standalone orchestration 🎛️ – Adds reliability and guardrails, but is not the execution container.

The LLM 🤖 – Generates text, but is just a model inside the system, not the environment it runs in.

Key point: An MCP host is the container environment where the agent and client live, not the reasoning layer, not the tool, and not the orchestration.
