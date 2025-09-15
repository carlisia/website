---
title: Agentic system
description:
created:
id: obs-M7jvlr11
aliases:
tags:
socialDescription:
---

An **agentic system** is an [[ai system|AI system]] built around one or more [[ai agent|AI agents]] that autonomously pursue goals through reasoning, planning, and [[ai tool|tool]] use. While an agent represents a **single reasoning entity**, an agentic system includes the supporting infrastructure—such as tool interfaces, integration layers (including [[mcp client|MCP clients]] and [[mcp server|MCP servers]]), [[mcp host|hosts]], and the [[orchestration layer|orchestration layer]]—that enables agents to operate reliably, persistently, and at scale. Unlike a general AI system, which may simply generate outputs or provide predictions (such as a classifier, translator, or recommender), an agentic system exhibits proactive, goal-directed behavior that unfolds across multiple steps and adapts over time.

## Key characteristics

- **Goal orientation** – Pursues explicit objectives across multiple steps
- **Multi-step reasoning** – Plans and executes sequences of actions iteratively
- **Tool integration** – Can invoke tools through custom connectors, plugins, or standardized protocols such as the Model Context Protocol (MCP)
- **Adaptivity** – Adjusts strategy when conditions change or tools fail
- **Persistence** – Maintains state or memory across actions and sessions
- **System-level reliability** – Depends on orchestration for retries, guardrails, and monitoring
- **Scalability** – Can coordinate multiple agents and tools within a single system

## Agentic system vs. agent

An **agent** is a single reasoning entity that uses an [[llm|LLM]] to decide and act. An **agentic system** is the larger [[ai system|AI system]] that embeds one or more agents within the necessary infrastructure—tool interfaces, integration layers, hosts, and orchestration—that allows them to function dependably and at scale.

## Agentic system vs. AI system: understanding the relationship

All agentic systems are AI systems, but not all AI systems are agentic. Many AI systems simply generate predictions or outputs (e.g., classifiers, translators, recommenders), whereas agentic systems exhibit autonomy, planning, and proactive goal pursuit.

## Examples

- A **travel-planning system** that interprets preferences, searches flights, checks weather, books reservations, and adapts if disruptions occur
- A **research companion** that searches papers, extracts citations, builds knowledge graphs, and synthesizes findings
- A **trading system** that monitors markets, executes trades, and adjusts strategies dynamically

## Non-examples

- A single [[ai agent|agent]] running in isolation without supporting infrastructure
- A classifier or translator that produces outputs but does not pursue goals or coordinate tools
- A basic chatbot that answers queries without planning or adaptation

**Key distinction:** An agentic system is not just an agent, and not just an AI system—it is the combination of one or more agents with the infrastructure needed for **autonomous, goal-directed, multi-step behavior at scale**.
