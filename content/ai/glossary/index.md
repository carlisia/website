---
title: AI glossary
description:
created:
id: obs-m4d8zxh6
aliases:
tags:
socialDescription:
---

![ai glossary](static/ai-glossary.png)

We've all read that article where the author writes "the AI system"—but it's rarely clear what they actually mean. Are they talking about the base model, the raw LLM that generates text? The agent, which reasons with that model and makes tool calls? The MCP client, which standardizes how agents access tools and resources? The MCP server, which actually exposes those tools and data sources? Or the orchestration layer, the surrounding logic that sequences calls, manages workflows, and ensures everything runs reliably?

These distinctions aren't just academic. Without a shared vocabulary, discussions about AI get muddled, and teams risk misunderstanding what technology is actually doing, what it's capable of, and where its limitations lie. For developers, that can mean building brittle integrations. For business leaders, it can mean setting the wrong expectations. And for users, it can mean misplacing trust—expecting "intelligence" where there's really just plumbing.

## Component relationships

LLMs power agents, agents use tools, tools are exposed by MCP servers and invoked via MCP clients, hosts run them all, and orchestration keeps the system reliable.

## Why terminology matters

When we conflate LLMs with agents, we miss crucial distinctions that shape how we build and deploy AI systems. An LLM is the reasoning engine—think GPT-4 or Claude processing text. An agent is the orchestration layer that can call tools, maintain context, and execute multi-step workflows. The tools are the specific capabilities: web search, code execution, file manipulation. The AI system is the entire stack that brings these components together.

These distinctions matter more than we might initially think. When we're designing an AI-powered application, understanding whether we need just an LLM for text generation, an agent for complex workflows, or a full system with persistent state changes how we architect everything from API design to user experience.

As AI capabilities expand rapidly, precise terminology becomes our shared language for building the right solutions. The clearer we are about what each component actually does, the better we can match our technical choices to real user needs—and avoid the disappointment that comes from expecting agent-level capabilities from LLM-only implementations.
