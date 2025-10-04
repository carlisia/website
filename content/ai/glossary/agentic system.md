---
title: Agentic system
description: An AI system built around autonomous agents that pursue goals through multi-step reasoning and tool use. Includes supporting infrastructure like MCP components, hosts, and orchestration for reliable operation at scale.
created:
id: obs-M7jvlr11
aliases:
tags:
  - ai
socialDescription: Agentic systems are AI systems with autonomy - they plan, adapt, and persist across multiple steps. Requires agents plus infrastructure, not just an LLM with function calling.
socialImage: agentic-system.png
---

![agentic-system](static/agentic-system.png)

An **agentic system** is an [[AI system]] built around one or more [[AI agent|AI agents]] that autonomously pursues goals through reasoning, planning, and [[AI tool|tool]] use. While an AI agent represents a **single reasoning entity**, an agentic system includes the supporting infrastructure such as tool interfaces, integration layers (including [[MCP client]] and [[MCP server]]), [[MCP host|hosts]], and the [[orchestration layer|orchestration layer]]. These components enable agents to operate reliably, persistently, and at scale. Unlike a general AI system, which may simply generate outputs or provide predictions (such as a classifier, translator, or recommender), an agentic system exhibits proactive, goal-directed behavior that unfolds across multiple steps and adapts over time.

## Key characteristics

- **Goal orientation** – Pursues explicit objectives across multiple steps
- **Multi-step reasoning** – Plans and executes sequences of actions iteratively
- **Tool integration** – Can invoke [[AI tool|tools]] through custom connectors, plugins, or standardized protocols such as the Model Context Protocol ([[model context protocol|MCP]])
- **Adaptivity** – Adjusts strategy when conditions change or tools fail
- **Persistence** – Maintains state or memory across actions and sessions
- **System-level reliability** – Depends on [[orchestration layer|orchestration]] for retries, guardrails, and monitoring
- **Scalability** – Can coordinate multiple agents and tools within a single system

## Understanding relationships

### Agentic system vs. [[AI agent|AI agent]]

An **agent** is a single reasoning entity that uses an [[large language model (llm)|LLM]] to decide and act. In contrast, an **agentic system** is the larger [[AI system]] that embeds one or more agents within the necessary infrastructure (tool interfaces, integration layers, hosts, and orchestration) that allows them to function dependably and at scale.

### Agentic system vs. [[AI system]]

All agentic systems are AI systems, but not all AI systems are agentic. Many AI systems simply generate predictions or outputs (e.g., classifiers, translators, recommenders), whereas agentic systems exhibit autonomy, planning, and proactive goal pursuit.

## Examples

- A **travel-planning system** that interprets preferences, searches flights, checks weather, books reservations, and adapts if disruptions occur
- A **research companion** that searches papers, extracts citations, builds knowledge graphs, and synthesizes findings
- A **trading system** that monitors markets, executes trades, and adjusts strategies dynamically

## Non-examples

- A single [[AI agent|AI agent]] running in isolation without supporting infrastructure
- An [[large language model (llm)|LLM]] with function calling that makes one-off [[AI tool|tool]] calls without persistent goals or multi-step planning
- A classifier or translator that produces outputs but does not pursue goals or coordinate tools
- A basic chatbot that answers queries without planning or adaptation

> [!TIP] An agentic system is not just an agent, and not just an AI system, it is the combination of one or more agents with the infrastructure needed for **autonomous, goal-directed, multi-step behavior at scale**.
