---
title: AI tool
description:
created:
id: obs-8sN2jJAP
aliases:
tags: ai
socialDescription:
---

![ai tool](static/ai-tool.png)

A **tool** is a capability beyond an [[llm|LLM]]'s native text generation that an [[ai agent|AI agent]] can invoke to access data, perform actions, or integrate with services. Tools can be connected in different ways—through direct API calls, plugin frameworks, or standardized protocols such as the [[model context protocol|Model Context Protocol (MCP)]].

## Key characteristics

- **Action-enabling** – Executes tasks the LLM cannot perform directly (e.g., database queries, API calls, code execution)
- **Structured interface** – Defined inputs, outputs, and error formats
- **Discoverable** – May be listed dynamically (e.g., via MCP) or hardcoded in integrations
- **Interoperable** – Works across systems when exposed through common standards like MCP
- **Composable** – Can be combined into multi-step workflows coordinated by an [[orchestration layer|orchestration layer]]
- **Permissioned** – Access can be governed by security and policy rules

Also:

- **Passive** - Wait to be called, don't initiate actions independently

- **Functional** - Designed to perform specific operations when invoked

- **Specialized** - Built for particular use cases or domains

- **Variable predictability** - Range from deterministic to highly variable outputs

A tool is not itself intelligent. Its power comes from being combined with agents, orchestration, and models into larger [[ai system|AI systems]].

## Tool behavior spectrum

### Deterministic tools

- **Calculator APIs** - 2+2 always equals 4
- **Database queries** - Same query returns same data (at that moment)
- **File operations** - Reading a file returns the same content

### Non-deterministic tools

- **LLM-powered tools** - Text summarization, content generation, analysis
- **Agent-based tools** - Research assistants, complex workflow automators
- **AI services** - Image generation, recommendation engines
- **Dynamic systems** - Weather APIs, stock prices, search results

## Tool vs. LLM: understanding the relationship

- **LLM 🤖** – Generates text, code, or reasoning outputs from prompts
- **Tool 🧰** – Executes actions or retrieves data the LLM cannot produce on its own

### What LLMs can do

- Draft a document from a prompt
- Translate a sentence
- Generate code snippets
- Answer factual questions (within training data)

### What Tools can do

- Query a live database
- Retrieve current web information
- Add events to a calendar
- Execute precise calculations

**Key distinction:** An LLM produces content; a tool performs operations or retrieves information beyond the model’s native scope.

## Examples

In a travel-planning [[ai system|AI system]]:

1. The **agent** reasons: “I need flight availability.”
2. It selects the **flight search tool**, which could be a direct API integration or exposed by an [[mcp server|MCP server]].
3. The **tool call** is executed (via API, plugin, or MCP client/server).
4. The **orchestration layer** manages retries, logs the call, and ensures the result is returned to the agent.

This workflow turns a static model into a system that can act on real-world data.

## Non-examples

- **The LLM itself** – It generates predictions but does not expose callable actions
- **Training data** – Knowledge embedded in the model, not an invocable capability
- **Static outputs** – Prewritten text or fixed responses, which lack structured invocation

**Key point:** A tool must be an _active capability_ that an agent can call—not just information or generation.
