---
title: AI agent
description:
created:
id: obs-orousE2G
aliases:
tags: ai
socialDescription:
---

![ai agent](static/ai-agent.png)
An **AI agent** is a type of [[ai system|AI system]] that uses a [[llm|large language model (LLM)]] for reasoning and autonomously pursues goals by making decisions, invoking [[ai tool|tools]], and adapting to feedback. Agents add **goal-directed behavior** on top of raw model outputs, enabling systems to act in dynamic and flexible ways. Agents can use different mechanisms to access tools, including direct integrations, plugin architectures, or standardized approaches such as the [[model context protocol|Model Context Protocol (MCP)]].

## Key characteristics

- **Autonomous operation** – Acts independently without constant human guidance
- **Goal-directed behavior** – Pursues explicit objectives or outcomes
- **Environmental awareness** – Gathers and interprets contextual information
- **Decision-making capability** – Chooses actions based on reasoning and current state
- **Tool integration** – Can interact with external systems, APIs, or resources
- **Adaptive behavior** – Modifies strategy when conditions change or goals aren’t met
- **Iterative process** – Continuously cycles through perception, decision, and action

While agents can be built using various AI approaches (e.g., reinforcement learning, rule-based systems), large language models have significantly expanded agent capabilities—particularly for complex reasoning, natural language interaction, and flexible tool use.

## AI agent vs. AI system: understanding the relationship

All agents are AI systems, but not all AI systems are agents.

### AI systems that are NOT agents

- Image classifiers that label photos
- Translation services that convert text
- Recommendation engines that suggest products
- Chatbots that return predefined responses

### AI systems that ARE agents

- Travel planners that autonomously book and manage trips
- Trading systems that make investment decisions
- Research assistants that gather and synthesize information
- Personal assistants that manage schedules and tasks

**Key distinction:** Agency requires autonomy and goal-directed behavior. Many AI systems are reactive (responding to inputs) rather than proactive (pursuing objectives).

> \[!TIP] Agents are a subset of AI systems—the ones that can operate independently toward goals rather than simply processing inputs and returning outputs.

## Example

A travel-planning agent that understands user preferences, checks flight availability and weather conditions, books reservations, monitors for delays, and automatically adjusts itineraries when disruptions occur.

## Agent vs. agentic system: understanding the relationship

An **agent** is a single reasoning entity. An **agentic system** is the larger [[ai system|AI system]] built around one or more agents, along with supporting infrastructure such as tool interfaces, integration layers (e.g., [[mcp client|MCP clients]] and [[mcp server|MCP servers]]), [[mcp host|hosts]], and the [[orchestration layer|orchestration layer]].
