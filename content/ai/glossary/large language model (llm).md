---
title: Large language model - LLM
description:
created:
id: obs-zJwsM5go
aliases: LLM, llm
tags: ai
socialDescription:
socialImage: llm.png
---

![llm](static/llm.png)

A **large language model** (LLM) is a type of AI model trained on massive amounts of text data to predict the most likely next token in a sequence. This simple mechanism enables LLMs to generate fluent text, translate languages, write code, answer questions, and perform a wide variety of reasoning-like tasks.

## Key characteristics

- **Generative capability** – Produces coherent text, code, or structured outputs from prompts
- **Instruction following** – Can understand and execute complex, multi-part instructions
- **Tool-use capability** – Can decide which tools to call and format requests (though cannot execute them)
- **Statistical foundation** – Learns patterns from billions of words in training data
- **Versatility** – Can be applied to domains from writing to programming to planning
- **Context sensitivity** – Uses a prompt + context window to shape its outputs
- **Few/zero-shot adaptability** – Performs new tasks with little or no task-specific training
- **Emergent behavior** – Exhibits surprising generalization (e.g., chain-of-thought reasoning)

LLMs are the **foundational intelligence** layer of modern [[AI system|AI systems]], but by themselves they lack memory, persistence, [[AI tool|tool]] access, or governance.

## Understanding the relationships

### LLM vs. AI agent vs. AI system

- **LLM = Foundation**: The raw intelligence/reasoning engine
- **[[AI agent|AI agent]] = LLM + Agency**: Adds goal-seeking, decision-making, and tool orchestration
- **[[AI system|AI system]] = Complete Stack**: Adds infrastructure, memory, persistence, governance

```text
AI System
    ↑
AI Agent
    ↑
  LLM
```

#### What LLMs can do alone

- Generate text, code, and structured outputs from prompts
- Reason through problems and follow multi-step instructions
- Decide which tools to use and format tool calls (function calling)
- Transform and analyze content within their context window
- Answer questions based on training data and provided context

#### What LLMs cannot do alone

- Execute tool or API calls (need orchestration infrastructure)
- Maintain long-term memory or state across sessions
- Access real-time data or external systems directly
- Implement retries, complex workflows, or observability
- Enforce runtime policies or permissions
- Persist information between conversations

**Key distinction:** An LLM is not an [[AI agent|AI agent]] or an [[AI system|AI system]], it is the core model that those higher layers build on.

## Examples

- **Text generation** – Drafting essays, stories, or articles from prompts
- **Code generation** – Writing snippets, functions, or even full programs
- **Tool selection** – Analyzing user intent and choosing appropriate tools/functions
- **Language translation** – Converting text between natural languages
- **Summarization** – Condensing long articles or documents into key points
- **Question answering** – Responding to factual queries based on training data
- **Conversation** – Engaging in natural-sounding dialogue or roleplay
- **Classification** – Categorizing text (e.g., sentiment analysis, topic labeling)

> [!NOTE] Key point: An LLM is a predictive text model—powerful for generation and reasoning-like tasks, but not inherently able to use tools, maintain state, or coordinate workflows.

## Non-examples

- **[[AI agent|AI agents]]** – Agents use [[large language model (llm)|LLMs]] for reasoning but add decision-making, [[AI tool|tool]] calls, and adaptation.
- **[[agentic system|Agentic systems]]** – Full systems with infrastructure (clients, servers, [[orchestration layer|orchestration]]) built around one or more agents.
- **MCP components** – [[MCP client|Clients]], [[MCP server|servers]], and [[MCP host|hosts]] that provide access and runtime, not generative capability.
- **[[AI tool|Tools]]** – External capabilities (e.g., APIs, databases) invoked by agents; not predictive models.
- **[[orchestration layer|Orchestration layer]]** – Workflow management and reliability mechanisms; does not generate text or predictions.

**Key point:** An LLM is the **raw generative core** of modern AI, not the reasoning, action, or coordination layer.

> [!TIP] The LLM is the language engine, but it needs interfaces, memory, tools, and orchestration logic to become something users can actually interact with productively.
