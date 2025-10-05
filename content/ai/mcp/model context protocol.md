---
title: Model Context Protocol
aliases:
  - MCP
  - Model Context Protocol
tags:
  - mcpAcademy
  - mcp
  - protocol
description: Open protocol standardizing AI system access to external tools, data, and resources
created: 2025-01-01
socialDescription: MCP enables standardized communication between AI systems and external resources through interoperable components
---

## How MCP stacks up against traditional communication protocols

### Where MCP seems familiar 

#### JSON-RPC foundation  

MCP’s messaging layer builds on **JSON-RPC 2.0**, so you’ll recognize:  
- structured method calls and responses  
- JSON-based serialization  
- standard error handling  
- notification and request-response patterns  

#### HTTP transport compatibility  

The **HTTP transport** option makes MCP easy to deploy over familiar web infrastructure:  
- client-to-server messages use `POST`  
- server-to-client streaming uses **Server-Sent Events (SSE)**  
- supports standard HTTP authentication (bearer tokens, API keys)  
- reuses HTTP networking features such as proxies and TLS  

#### Local / stdio (“WebSocket-like”) transport  

For local integrations, MCP also supports a **stdio transport**, offering:  
- persistent, bidirectional message channels  
- low-latency exchange between local processes  
- event-driven interactions, ideal for real-time tooling  
### Where MCP breaks new ground

#### Semantic abstraction layer

MCP introduces a set of high-level primitives tailored for AI-tool interaction:

- **Tools** — executable operations defined with schemas (APIs / functions the model can invoke)  
- **Resources** — contextual data sources (files, DB schemas, documents, metadata) exposed to the model  
- **Prompts** — reusable templates or instruction scaffolds offered by the server  
- **Sampling** — model completion requests (text, image, audio) under protocol control  

These primitives provide a richer semantic interface compared to raw HTTP or JSON-RPC endpoints, aligning more directly with AI workflows.

#### AI-centric lifecycle & discovery

MCP defines a richer lifecycle and discovery process than traditional RPC or REST systems:

- **Capability negotiation** — client and server agree on supported features such as tools, resources, and prompts.  
- **Dynamic discovery** — clients can query available primitives through standardized `list` methods.  
- **Context-aware state management** — maintains session context, negotiated features, and resource state across interactions.  
- **AI integration patterns** — provides conventions for exposing prompts, resources, and structured tools optimized for AI-driven workflows.

#### Domain-specific design

Unlike general-purpose protocols like REST or gRPC, which aim to serve any system, **MCP** is optimized for AI integration. It focuses on:

- **Context-rich model interactions** – standardizing how AI models discover and use external tools and data.
- **Model–system decoupling** – enabling interchangeable tools through consistent schemas.
- **Agentic workflow orchestration** – supporting multi-step, autonomous reasoning and execution.
- **Modality-agnostic integration** – allowing consistent access to text, image, or audio tools.

Traditional protocols move data; **MCP enables cooperation** between models and systems, trading universality for interoperability, semantics, and autonomy.

## How MCP compares to other AI agent protocols

### LangChain & MCP: cooperation rather than competition

#### Shared goals

- Both aim to reduce integration friction between agents and external systems  
- Use JSON-based schemas and communication  
- Support agent lifecycle logic (tool use, state, chaining)  
- Open-source  

#### Key divergences

- **Focus / scope**: LangChain is an agent orchestration / tool-chaining framework; MCP is a protocol for exposing context, tools, and resources to agents  
- **Abstraction layer**: LangChain is built around “chains, agents, memory, tool routing”; MCP defines primitives (tools, resources, prompts, sampling) at the protocol boundary  
- **Role in architecture**: LangChain manages how agents reason and plan; MCP standardizes how agents invoke external systems  

### A2A & MCP: horizontal + vertical integration

#### Complementary roles

Google positions **A2A** as a protocol for agent-to-agent coordination, while **MCP** provides the plumbing for an agent’s access to tools, data, and context.  [oai_citation:4‡Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability)  

#### Distinct design emphases

- **Agent vs system interface**: A2A emphasizes peer communication and shared tasks; MCP emphasizes structured tool/data invocation  
- **Discovery & capabilities**: A2A uses “Agent Cards” and capability exchange between agents; MCP uses listing/discovery primitives for tools, resources, prompts  
- **Modality support**: A2A is designed to support diverse modalities in agent dialogue; MCP is protocol-agnostic but its implementations often start with text/JSON-based tooling  

## Architecture comparison

### How the protocol stacks actually work

#### MCP architecture

```text
Application Layer: AI Host (Claude, VS Code, etc.)
    ↓
Client Layer: MCP Client (one per MCP Server)
    ↓
Data Layer: JSON-RPC 2.0 + MCP Primitives (tools, resources, prompts, sampling)
    ↓
Transport Layer: stdio | HTTP + SSE
    ↓
Network Layer: TCP/IP
```

#### Traditional REST API

```text
Application Layer: Web Application
    ↓
API Layer: REST Endpoints (CRUD + HTTP Methods)
    ↓
Transport Layer: HTTP/HTTPS
    ↓
Network Layer: TCP/IP
```

#### A2A protocol

```text
Application Layer: Agent Ecosystem
    ↓
Agent Layer: Client Agent ↔ Remote Agent
    ↓
Protocol Layer: JSON-RPC + A2A Extensions (Agent Cards, Capabilities)
    ↓
Transport Layer: HTTP + SSE
    ↓
Network Layer: TCP/IP
```

### How messages actually flow through these systems

#### Here's how MCP handles message flow

1. Initialization – handshake and capability negotiation
2. Discovery – list available primitives (tools/list, resources/list, prompts/list)
3. Context Retrieval – fetch context objects (resources/get, prompts/get)
4. Action Execution – call executable tools (tools/call)
5. Streaming / Notifications – receive updates, results, or errors

#### Traditional API flow

1. Authentication
2. Request construction
3. HTTP execution (GET, POST, etc.)
4. Response parsing
5. Connection termination

#### A2A message flow

1. Agent Discovery – identify agents and advertise capabilities
2. Task Delegation – assign or request task execution
3. Collaboration – message exchange between agents
4. Artifact Sharing – exchange intermediate or final outputs
5. Completion & Feedback – finalize tasks, optionally update shared state