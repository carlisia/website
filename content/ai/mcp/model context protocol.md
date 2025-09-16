---
title: Model Context Protocol
aliases:
  - MCP
  - Model Context Protocol
tags:
  - mcp
  - ai
  - protocol
description: Open protocol standardizing AI system access to external tools, data, and resources
created: 2025-01-01
socialDescription: MCP enables standardized communication between AI systems and external resources through interoperable components
---

The **Model Context Protocol** (MCP) is an open protocol that standardizes how [[AI system|AI systems]] and [[AI agent|AI agents]] access external [[AI tool|tools]], data, and resources.

**Quick links:** [[mcp protocol]] \* [[ai/mcp/resources]]

## Key characteristics

- **Standardized communication** – Defines how tools and data are described, invoked, and returned
- **Interoperability** – Works across different agents, clients, servers, and hosts
- **Discoverability** – Lets clients list available tools and capabilities from connected servers
- **Separation of concerns** – Distinguishes between reasoning (agent), access (client), and capability (server)
- **Security & governance** – Hosts can enforce permissions, authentication, and policies consistently
- **Scalability** – Tools exposed once via servers can be reused by many agents and systems

MCP provides the plumbing that makes tool usage consistent, reliable, **and portable**.

For notes on MCP protocol (the "P" in MCP), see: [[mcp protocol|MCP protocol]].

## MCP Components

- [[MCP client]] – The access layer that discovers and invokes tools
- [[MCP server]] – The supply side that exposes tools and data in a standard format
- [[MCP host]] – The runtime environment that runs the agent and client, and mediates secure connections to servers
- Tools
- Resources
- Prompts

Together, these components form the MCP ecosystem.

## MCP vs custom integrations

- **Custom integrations** - Each agent must be hand-wired to each tool → brittle and hard to scale
- **MCP** - A universal connector → tools are exposed once and can be reused across many agents and hosts

## Novel contributions of MCP

### Standardized AI context exchange

MCP introduces the first standardized approach to:

- Defining how AI applications access external context
- Structuring tool capabilities for AI consumption
- Managing resource metadata for AI understanding
- Templating prompts for consistent AI interactions

### Dual transport architecture

MCP's innovative transport design:

- **Local optimization**: stdio for zero-latency local processes
- **Remote capability**: HTTP+SSE for distributed systems
- **Unified interface**: Same data layer across both transports

### AI-native primitives

Unlike general-purpose protocols, MCP defines AI-specific concepts:

- Tools with JSON Schema definitions for AI understanding
- Resources with contextual metadata for AI consumption
- Prompts with templating for AI interaction patterns
- Sampling for AI model integration

## Evolutionary and revolutionary

### Evolutionary aspects

- Builds on proven JSON-RPC foundation
- Leverages existing HTTP infrastructure
- Uses standard authentication mechanisms
- Follows established client-server patterns

### Revolutionary aspects

- First standardized AI context protocol
- Novel semantic primitive definitions
- AI-specific lifecycle management
- Unified local/remote transport model

MCP represents a **specialized evolution** of existing communication patterns tailored specifically for AI applications. While MCP builds upon established foundations like JSON-RPC 2.0 and HTTP, it introduces novel semantic layers and AI-specific primitives that distinguish it from both traditional communication protocols and other AI agent protocols.

## Protocol interoperability

### MCP integration patterns

- Can coexist with traditional APIs
- Complements A2A for complete agent ecosystems
- Integrates with existing development tools
- Supports standard authentication schemes

### Cross-protocol communication

- MCP servers can expose traditional HTTP APIs
- A2A agents can use MCP for context access
- Traditional systems can implement MCP servers
- Hybrid architectures are possible and encouraged

### Standardization benefits

- Reduces integration complexity for AI applications
- Enables ecosystem of interoperable tools
- Provides consistent developer experience
- Facilitates rapid AI application development

### Market positioning

- MCP: AI-to-system integration standard
- A2A: Agent-to-agent communication standard
- Traditional APIs: General-purpose data exchange
- Combined: Complete AI ecosystem infrastructure
