---
title: The strategic case for building MCP servers
description: A comprehensive guide to understanding the Model Context Protocol (MCP) from the perspective of building MCP servers. Learn why MCP matters for AI infrastructure, its core components, and how it standardizes AI system integrations.
created: 2025-09-17 (PT)
id: obs-maLZ0oq2
aliases:
tags:
  - mcp
socialDescription: MCP transforms how we build AI integrations. Learn why developers should adopt this protocol for creating standardized, composable servers that AI systems can understand and use effectively.
---

![building mcp servers](static/building-mcp-servers.png)

## Unlocking the full potential of LLMs: a developer's guide to MCP servers

> [!Note]
> This article introduces developers to the Model Context Protocol (MCP) from the perspective of authoring MCP servers: creating tools and capabilities that AI systems can use. If you're looking to consume MCP servers that others have built or integrate MCP clients into your AI applications, this conceptual overview may provide useful context but isn't a usage guide.

The rapid evolution of Large Language Models (LLMs) presents significant architectural challenges for engineers. As we build integrations that AI systems consume, ensuring reliable and secure access to external systems (databases, APIs, and third-party services) is a primary concern. The Model Context Protocol (MCP) addresses these challenges by providing a standardized, composable, and secure framework that enables seamless interaction between LLMs and these systems.

Unlike traditional protocols such as REST, RPC, and GraphQL, which focus on data exchange between applications, MCP is specifically designed for AI system integration. It defines how to build servers that expose existing functionality in ways language models can understand and use effectively. And instead of creating custom integrations for each AI platform, we build once to the MCP standard and gain compatibility across the entire ecosystem.

The value of MCP lies in how it standardizes the way AI systems access external functionality and data, which facilitate intelligent workflows and resilient integrations tailored to how LLMs operate. This post explores MCP's core components and unique advantages to help you identify where it provides the most value for your AI infrastructure projects.

## What MCP is (and isn't)

MCP is a **protocol specification**, not a software library. Similar to REST, developers adopt MCP by authoring servers that implement its rules and interfaces. These servers manage the interactions, capabilities, and context exchanges defined by the protocol, allowing AI systems to act as clients.

In other words:

- ✅ MCP is a standard for developers to implement.
- ✅ We adopt MCP by authoring servers that support the protocol.
- ❌ MCP is not software we install or a library we add to our applications.

While REST is resource-centric, MCP adds context-centric and agent-centric capabilities designed for AI interaction. When authoring MCP servers, you focus on why AI models need information, what they can see, and which actions they are allowed to trigger. This distinction is important because MCP orchestrates AI behaviors systematically, providing structured and predictable communication, unlike free-form prompt interactions.

> [!Tip]
> MCP provides a standardized interface layer that makes your existing business logic and data sources accessible to AI systems without changing your core functionality.

## Before we dive in: the obvious question

Before we dive into MCP’s technical foundations, it’s worth pausing to ask: **is building an MCP server the right move for your use case?**

This article focuses on the _what_ and _why_ of MCP development. But practical adoption requires careful evaluation. For that, I recommend you explore [[the mcp server practical guide for adoption]] that I put together. It introduces a structured scoring system across eight critical dimensions, from performance requirements to ecosystem maturity, that helps you decide not only _if_ but also _when_ to adopt MCP.

Think of this article as your map of the terrain, while the adoption guide is the compass that tells you whether to start the journey now or later. With that context in place, let’s dig into MCP’s core concepts.

## Why now: core challenges of building servers for AI

The emergence of MCP is a direct response to the pain points in modern AI development. If you build servers for AI systems, you likely face these challenges:

- **Integration Fragmentation:** Major AI frameworks require different server interfaces, forcing developers to create multiple implementations of the same functionality.
- **Context Delivery Chaos:** AI sistems often request irrelevant data or misuse server capabilities, leading to poor performance and wasted resources.
- **Tool Interface Drift:** Minor API changes can break dependent AI systems, creating brittle and hard-to-maintain integrations.
- **Security and Compliance Gaps:** The lack of standardized [[mcp consent|consent]] and audit mechanisms in custom server implementations creates significant compliance risks.
- **Deployment Complexity:** Managing server implementations across different AI environments requires custom integration work for each platform, increasing maintenance overhead.

> [!Note]
> MCP's introduction in late 2024 by Anthropic benefits from lessons learned from earlier AI integration attempts. Developers adopting it now can shape its evolution and establish best practices.

## Why a protocol: the case for standardization

Standardized server interfaces are crucial for AI infrastructure. AI models, as probabilistic agents, need structured, deterministic interactions with external systems. Without a protocol like MCP, developers face a cycle of building custom, fragile integrations for each AI platform, leading to duplicated effort and maintenance challenges.

This ad-hoc approach often results in:

- **Platform-specific server implementations**, leading to code duplication.
- **Custom authentication patterns** for each AI platform.
- **Fragile API versioning** that breaks integrations.
- **Inconsistent capability discovery** by AI systems.

While this may work for small projects, it is unsustainable for multi-vendor AI applications that require [[mcp security|security]] reviews and reproducible audits. A protocol like MCP offers several advantages:

- **Cross-Platform Compatibility:** A single MCP server can work with any compliant AI system, creating a plug-and-play ecosystem.
- **Composable Server Architecture:** Server capabilities can be chained with other MCP servers, allowing for complex, modular workflows.
- **Predictable Server Behavior:** Every action is typed, logged, and replayable, which is crucial for debugging, auditing, and ensuring consistency.
- **Built-in Governance:** [[mcp consent|Consent]], capability negotiation, and [[mcp provenance|provenance]] are designed into the protocol, simplifying compliance and enhancing trust.

> [!Tip]
> By providing a common language, MCP elevates AI development from a fragmented approach to a standardized, scalable, and secure paradigm.

## The MCP client-server interaction model

MCP defines a client-server model where you author MCP servers that expose capabilities to MCP hosts (applications that integrate servers, sometimes but not always AI/LLM apps).

### The 6-step interaction flow

1. **Server Advertises Capabilities**  
   Servers expose **Tools** (functions), **Resources** (data sources), **Prompts** (templates), and optionally **Roots** (filesystem boundaries) through discovery.
2. **Host Makes Capabilities Available**  
   The Host (user-facing app) creates Clients to communicate with Servers, queries capabilities, and makes them available to the model or user. Prompts are explicitly user-selected.
3. **Model Processes Context**  
   The model reasons over user input plus available Resources, Prompts, and Tool descriptions to decide what might be useful.
4. **Model Requests Tool Execution (Optional)**  
   The model may emit a Tool call with parameters. Many interactions use only Resources for context.
5. **Host Validates and Forwards**  
   The Host intercepts all Tool calls, validating against policies, permissions, and user consent:

| Authorization Mode    | Description                                                                                                                                                                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Human in the Loop** | The Host validates requests against user-defined permissions and can be configured to request explicit user consent before execution. The human user serves as the ultimate authorization authority. This mode is common in interactive applications where a user is present.                  |
| **Agent in the Loop** | The Host validates requests against a set of **pre-configured policies** and scope boundaries, without seeking real-time user consent. This is used for automated workflows or background processes where immediate user interaction is not feasible. Permissions must be established upfront. |

6. **Server Executes and Responds**  
   The Server executes deterministically and returns results via the Client–Host connection. For Resources-only interactions, the Host passes data directly to the model.

This model creates a clear separation of concerns. The protocol is transport-agnostic, and higher-level concerns like authentication and pagination are handled outside the direct MCP interaction, maintaining guardrails around what models can see and do.

> [!Note] **Note on Server Capabilities:**
> MCP servers expose three types of capabilities with different interaction patterns:
>
> - **Tools**: Model-controlled functions that the AI can execute automatically
> - **Resources**: Contextual data that the AI can access and use directly
> - **Prompts**: User-controlled templates that users explicitly select to guide interactions

### Host vs. client: key distinction

**The Host (User-Facing Application):**

- The app users interact with (IDE, notebook, chat app, etc.)
- Creates and manages multiple Clients
- Enforces security, permissions, and consent
- Integrates Server results into the user experience

**The Client (Protocol Participant):**

- Can be a human user or an agent acting through the Host
- Maintains a 1:1 stateful session with a Server
- Translates requests into protocol messages
- Handles negotiation, routing, and error handling
- Provides isolation so Servers stay separated

### Key design principles

1. **Servers should be simple to implement**
   - Complexity lives in the Host.
   - Servers expose narrow, well-defined capabilities.
2. **Servers should be composable**
   - Each Server is focused and isolated.
   - Hosts can combine them seamlessly via the shared protocol.
3. **Servers are isolated by design**
   - Servers never see the whole conversation.
   - They only receive minimal context needed.
4. **Features evolve progressively**
   - The protocol defines a minimal core.
   - Extra features are opt-in and negotiated.
   - Backwards compatibility is preserved.

## MCP's core components

MCP defines three primary server-side primitives and three client-side features that work together to enable sophisticated AI interactions.

### Server features

| Feature      | Purpose                                    | User Consent                                        | Benefit                                   | Execution  |
| :----------- | :----------------------------------------- | :-------------------------------------------------- | :---------------------------------------- | :--------- |
| **Resource** | Contextual info (files, data, state)       | None                                                | Provide structured context to AI systems  | Read-only  |
| **Prompt**   | Structured instruction templates           | None                                                | Define reusable prompt patterns           | Per-task   |
| **Tool**     | Executable functions (API calls, commands) | Human-in-loop: **Yes** \| Agent: **Pre-configured** | Implement deterministic, documented funcs | Stateless  |
| **Roots**    | Filesystem boundaries                      | None                                                | Define scope for server interactions      | Structural |

### Client features

| Feature         | Purpose                                            | Initiated By | Benefit                           |
| :-------------- | :------------------------------------------------- | :----------- | :-------------------------------- |
| **Sampling**    | Request LLM completions from AI applications       | Server       | Enable agentic behaviors in tools |
| **Elicitation** | Request user input (requires human in interactive) | Server       | Gather dynamic input when needed  |

## Why developers should adopt MCP now

### 1. **Ecosystem network effects**

Early adoption positions developers to benefit from network effects as more AI applications adopt MCP, providing automatic access to an expanding ecosystem.

### 2. **Implementation simplicity**

MCP's standardized approach reduces complexity, allowing developers to focus on core functionality rather than learning multiple platform-specific integration patterns.

### 3. **Future-proof architecture**

Building on an open protocol standard protects investments from platform changes and proprietary lock-in while maintaining compatibility as the ecosystem evolves.

### 4. **Enhanced capability expression**

The protocol's rich primitive model allows developers to express complex capabilities in ways AI systems can understand and utilize effectively.

> [!Note]
> The protocol provides immediate benefits through implementation simplification while offering long-term strategic value through ecosystem participation. For developers serious about AI integration, MCP represents both a technical choice and strategic positioning decision.

## Common misconceptions about MCP servers

### "MCP server replaces my existing APIs"

**Reality**: MCP servers complement existing APIs by providing a standardized interface layer. Your core business logic remains unchanged.

**Best Practice**: Think of MCP as a translation layer that makes existing capabilities accessible to AI systems.

### "MCP always requires human approval for actions"

**Reality**: MCP supports both interactive (human-supervised) and autonomous (policy-driven) operation modes, allowing for flexible deployment scenarios.

**Best Practice**: Design servers to work in both modes by clearly documenting which operations require human oversight versus those that can operate autonomously under pre-configured policies. Include this guidance in your tool descriptions, API documentation, and server capability declarations so MCP hosts can configure appropriate authorization policies for interactive versus automated deployment scenarios.

### "MCP is only for simple tools"

**Reality**: MCP supports sophisticated capabilities through its rich primitive model, including agentic behaviors and dynamic user interaction.

**Best Practice**: Start with simple tools to learn patterns, then gradually expose more complex capabilities.

### "I need to rebuild everything for MCP"

**Reality**: MCP servers typically wrap existing functionality with standardized interfaces. Most work involves mapping existing capabilities to MCP primitives.

**Best Practice**: Identify which existing capabilities map to MCP's resource, tool, and prompt primitives, then create thin wrapper layers.

### "MCP locks me into Anthropic's ecosystem"

**Reality**: MCP is an open protocol supported by multiple organizations. Developers maintain full control over implementations.

**Best Practice**: Design servers to be transport-agnostic and avoid dependencies on specific AI system features for maximum compatibility.

### "My server should handle everything"

**Reality**: Monolithic servers reduce composability and create maintenance challenges. Author focused servers around specific domains.

**Best Practice**: Focus on doing one thing well rather than trying to be everything to everyone. Let AI systems orchestrate across multiple servers.

## Where MCP server fits: your implementation journey

Understanding the strategic case for MCP is just the beginning. Real value comes from systematic implementation that ships features, reduces operational complexity, and creates trust in AI-driven workflows.

The next article in this series, **"To Implementation and Beyond: Your MCP Server Development Journey,"** provides the practical roadmap you need. It introduces five pillars of MCP development and maps them to three interconnected pathways designed to address specific friction points.

You can start anywhere based on your most urgent pain points, but the principles compound, each solved problem creates momentum for the next.

Stay tuned!

> [!Note] > **Protocol Status:**
> MCP uses version 2025-06-18 as the current specification. While core architecture is stable, some features like Elicitation are newly introduced and may evolve in future versions. Verify technical details against the official specification at modelcontextprotocol.io.
