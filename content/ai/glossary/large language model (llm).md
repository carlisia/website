---
title: Large language model
description:
created:
id: obs-zJwsM5go
aliases: LLM, llm
tags: ai
socialDescription:
---

![llm](static/llm.png)

A large language model (LLM) is a type of AI model trained on massive amounts of text data to predict the most likely next token in a sequence. This simple mechanism enables LLMs to generate fluent text, translate languages, write code, answer questions, and perform a wide variety of reasoning-like tasks.

## Key characteristics

• **Generative capability** – Produces coherent text, code, or structured outputs from prompts

• **Statistical foundation** – Learns patterns from billions of words in training data

• **Versatility** – Can be applied to domains from writing to programming to planning

• **Context sensitivity** – Uses a prompt + context window to shape its outputs

• **Few/zero-shot adaptability** – Performs new tasks with little or no task-specific training

• **Emergent behavior** – Exhibits surprising generalization (e.g., chain-of-thought reasoning)

LLMs are the foundational intelligence layer of modern AI systems, but by themselves they lack memory, persistence, tool access, or governance.

## LLM vs. AI agent: understanding the relationship

• LLM = raw generative engine (“predict the next word”).
• Agent = wraps an LLM to pursue goals, make decisions, and call tools.

### What LLMs can do alone

• Write an essay from a prompt
• Translate a sentence into another language
• Generate code from an instruction
• Answer a factual question (within training limits)

### What LLMs cannot do alone

• Decide which tool or API to call
• Maintain long-term goals or state
• Handle retries, workflows, or observability
• Enforce policies or permissions

**Key distinction:** An LLM is not an [[ai agent|agent]] or an [[ai system|AI system]], it is the core model that those higher layers build on.

## Examples

- Text generation – Drafting essays, stories, or articles from prompts
- Code generation – Writing snippets, functions, or even full programs
- Language translation – Converting text between natural languages
- Summarization – Condensing long articles or documents into key points
- Question answering – Responding to factual queries based on training data
- Conversation – Engaging in natural-sounding dialogue or roleplay
- Classification – Categorizing text (e.g., sentiment analysis, topic labeling)

> [!NOTE] Key point: An LLM is a predictive text model—powerful for generation and reasoning-like tasks, but not inherently able to use tools, maintain state, or coordinate workflows.

## Non-examples

- **AI agents** – Agents use LLMs for reasoning but add decision-making, tool calls, and adaptation.

- **Agentic systems** – Full systems with infrastructure (clients, servers, orchestration) built around one or more agents.

- **MCP components** – Clients, servers, and hosts that provide access and runtime, not generative capability.

- **Tools** – External capabilities (e.g., APIs, databases) invoked by agents; not predictive models.

- **Orchestration layer** – Workflow management and reliability mechanisms; does not generate text or predictions.
  
**Key point:** An LLM is the **raw generative core** of modern AI, not the reasoning, action, or coordination layer.

> [!TIP] The LLM is the language engine, but it needs interfaces, memory, tools, and orchestration logic to become something users can actually interact with productively.
