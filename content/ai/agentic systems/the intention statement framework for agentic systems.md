---
title: The agentic intention framework
description:
created:
id: obs-zgBYxqdT
aliases:
tags: methodology, intention, ai
socialDescription:
socialImage:
---

## About this framework

**WHO**:

- **Production teams (Full framework)**: Software/platform engineers building production-ready agentic AI systems who need organizational alignment and KPIs
- **Individual builders (Core framework)**: Developers creating useful agents for personal or small-scale use who need clarity but not organizational buy-in

**WHAT**: A structured framework that transforms vague AI agent ideas into precise, measurable workflow definitions by eliciting explicit answers to critical questions before development begins:

- **Full framework** (production): WHO, WHAT, CONSTRAINTS, WHY, ALIGNMENT
- **Core framework** (individual): WHO, WHAT, CONSTRAINTS, WHY

**CONSTRAINTS**:

- Production mode requires answering all five questions including ALIGNMENT
- Individual mode allows skipping ALIGNMENT for faster iteration
- Requires ongoing but minimal time investment (< 5% of project time)
- Must be revisitable and adjustable as learning occurs

**WHY**: Achieve higher adoption rates for agentic tools and reduce chances of major pivots after development starts by catching misalignment early, when changes cost minutes instead of months.

**ALIGNMENT**: 2-4 hours of upfront intention crafting plus 15-minute weekly reviews prevents weeks of wasted development, failed launches, and abandoned projects, delivering 100x ROI on time invested for individuals and teams that would otherwise face even one major pivot.

## Why intention matters in agentic systems

Architecting robust, performant, and useful agents demands clear and precise intention for our workflows: with LLMs in the loop, system effectiveness multiplies when boundaries are explicitly defined upfront. These boundaries enhance predictability, discoverability, and usability of our agentic tools.

Because for an LLM to make sound decisions, it requires precise guidance. They cannot infer unstated goals, deduce implicit requirements, or navigate ambiguous objectives. They operate solely on the explicit instructions we provide. The intention statement we establish becomes their complete operating [[context-engineering|context]].

A clear intention statement has the power to transform vague possibilities into specific, measurable, achievable outcomes.

## What are agents

In this context, please think of an agent as a set of 1.n tools/other agents that collective compose to serve a single intention. In the [[model-context-protocol|Model Context Protocol]] world, it would be the MCP server, which contains 1.n tools, all of which would do work to support the server's sole intention.

## This framework in practice

This document makes a case that designing agentic systems with clear intention upfront is crucial. It provides a framework to transform vague AI agent ideas into precise, measurable workflow definitions, plus guidance on how to validate them.

If you'd like to see a comprehensive walkthrough of use cases demonstrating why this is crucial for agentic systems, tradeoffs of designing and implementing agents in alternative ways, examples of how to do it down to code examples, guidance for pitfalls to avoid, and how to design very tight boundaries for agents (as a collections) or MCP servers, as well as individual tools, check out the comprehensive article [[the-role-of-intention-in-architecting-mcp-servers|The role of intention in architecting mcp servers]] (the core concepts covered also apply to agentic systems in general, not only MCP servers).

> [!TIP] Note: The devil is in the precision.

## Prompt system

If you want to jump right into it, use the [[agentic-intention-framework-prompt-system|Agentic intention framework prompt system]]. Follow the instructions.

## The five questions

These are 5 straighforward questions to apply to both a set of agentic tools and each tool in that set (if more than 1) individually:

```markdown
This agent helps [WHO: specific users with context]
to [WHAT: exact workflow/task]
with [CONSTRAINTS: explicit boundaries and limitations]
so that [WHY: measurable outcome with timeline]
delivering [ALIGNMENT: X hours saved × Y users × Z frequency = impact that justifies investment].
```

> [!TIP]
> The intention must remain the same all across all tools, what changes is scope.

### WHO: define exact users

Transform broad categories into specific personas with clear contexts.

❌ **Weak**: "Developers who need help with code"

✅ **Strong**: "Backend engineers debugging production Python services between 10K-100K requests/minute"

❌ **Weak**: "Data scientists"

✅ **Strong**: "ML engineers validating model outputs before A/B tests in recommendation systems"

The specificity test: Can you list 10 real people or companies who fit this description exactly?

### WHAT: specify the opportunity

Define the exact workflow or pain point the agent addresses.

❌ **Weak**: "Assist with documentation"

✅ **Strong**: "Generate OpenAPI specs from existing REST endpoint code and validate against current implementation"

❌ **Weak**: "Help with testing"

✅ **Strong**: "Create edge case scenarios for payment processing flows based on production error patterns"

The specificity test: Could another engineer implement this without asking clarifying questions?

### CONSTRAINTS: set explicit boundaries

Define precise boundaries for what the agent will and won't do.

Essential constraint categories:

- **Operations**: Read-only analysis vs. write operations vs. execution permissions
- **Performance**: Max file sizes, timeout limits, rate limits
- **Security**: Sandboxing requirements, data access restrictions, authentication needs
- **Scope**: Supported languages, frameworks, file formats

❌ **Weak**: "Works with code files"

✅ **Strong**: "Read-only analysis of Python/TypeScript files under 500KB, no execution, no external API calls"

### WHY: measurable outcomes

Connect the agent to specific, measurable improvements.

❌ **Weak**: "Improve developer productivity"

✅ **Strong**: "Reduce p0 debugging time from 45 to 15 minutes for production incidents"

❌ **Weak**: "Better code quality"

✅ **Strong**: "Catch 90% of breaking API changes before merge, preventing ~20 rollbacks per quarter"

The specificity test: Can you measure this outcome within 30 days of deployment?

### ALIGNMENT: proving ROI (production teams only)

This question helps to determine whether the agent idea justifies the investment. For production systems, alignment is not only the difference between a promoted project and a cancelled one, but it goes to the very reputation and success of the enterprise.

Strong alignment means demonstrating that limited resources (time, talent, budget) will deliver concentrated impact that far exceeds the investment. Think in terms of transforming specific workflows for specific users so dramatically that the ROI becomes undeniable.

The key questions to answer:

- Can we quantify the exact impact delivered to our primary users?
- Does the effort-to-impact ratio justify choosing this over other projects?
- Will the concentrated impact be sufficient to sustain long-term investment?

Without clear answers to these questions, even technically brilliant agents become stale. The following section provides formulas, templates, and examples to make this math crystal clear.

## Intention checkpoints

### Intention validation checklist

- [ ] Can you name 10 specific users who urgently need this?
- [ ] Would they notice if your agent disappeared after one week?
- [ ] Can you measure success within 30 days of deployment?
- [ ] Is the Impact Score > 10?
- [ ] Could you explain the ROI to a skeptical CFO in 2 minutes?
- [ ] Will the first version solve one complete workflow end-to-end?
- [ ] Can you ship meaningful impact with < 500 development hours?

If any answer is "no," reapply the framework with more precise answers.

### Red flags in intention statements

- **Hedge words**: "various", "multiple", "flexible", "any"
- **Vague outcomes**: "better", "easier", "improved"
- **Missing constraints**: No boundaries = infinite scope
- **Everyone problems**: "all developers" = no one's specific need
- **Shallow payoff**: "slight improvement" = resource sink
- **Mismatched ambition**: Grand vision with shoestring capacity

## Alignment deep dive: making the math work

### The effort-to-impact formula

For any agent project, calculate:

Impact Score = (Users Affected × Hours Saved per User × Frequency) / Implementation Hours

- Viable threshold: Impact Score > 10
- Excellent target: Impact Score > 100

#### Example calculations

**High-alignment agent**: API documentation validator

- 50 engineers × 2 hours saved/week × 50 weeks = 5,000 hours saved/year
- Implementation: 200 hours
- Impact Score: 25 ✅

**Poor-alignment agent**: Automated technical debt tracker

- 200 engineers × 3 hours saved/quarter × 4 quarters = 2,400 hours saved/year
- Implementation: 800 hours + 200 hours/year maintenance = 1,000 hours year one
- Impact Score: 2.4 ❌

Why this seems smart but isn't: While technical debt tracking is important and affects many engineers, the actual time saved is sparse (quarterly planning only) and the implementation requires complex codebase analysis, metric tracking, and visualization dashboards to maintain. Most of the "impact" is indirect and hard to measure precisely. Engineers might still debate priorities regardless of the tracking, and management already has rough visibility through sprint velocity and bug rates.

### The concentration principle

Strong alignment concentrates resources where they matter most:

Concentration Score = (Value to Primary Users / Total Users) × (Core Features / Total Features)

Target: > 0.6 (60% of value from focused effort)

#### Applied examples

**Concentrated approach**: Python debugging agent for microservices

- 80% value to 20 backend engineers (primary users)
- 3 core features: trace analysis, memory profiling, bottleneck detection
- 5 total features (including nice-to-haves)
- Concentration Score: 0.8 × 0.6 = 0.48 (acceptable, could be better)

**Diluted approach**: "Universal code helper"

- 20% value spread across 100 developers
- 2 core features out of 15 attempted features
- Concentration Score: 0.2 × 0.13 = 0.026 (failure)

### Common alignment pitfalls

**1. The enterprise mirage**
Building for Fortune 500 companies without confirmed demand or access.

- **Reality check**: Do you have 3+ champions inside target companies?
- **Better approach**: Start with mid-size companies where you have relationships

**2. The perfect assistant fallacy**
Trying to handle every edge case from day one.

- **Reality check**: Can you ship value with 20% of planned features?
- **Better approach**: Launch with one workflow perfected, expand based on usage

**3. The metrics phantom**
Claiming measurable outcomes you can't actually track.

- **Reality check**: Do you have telemetry in place to measure this?
- **Better approach**: Choose metrics your existing tools already capture

**4. The infinite loop**
Adding features to serve more users, diluting impact for core users.

- **Reality check**: Will your first 10 users still love this after all additions?
- **Better approach**: Say no to feature requests not aligned with the intention

### Alignment templates by project type

**Infrastructure agent** (e.g., Kubernetes troubleshooting)

- Users: [X] platform engineers managing [Y] clusters
- Time saved: [Z] hours per incident × [N] incidents/month
- Investment: [Dev hours] + [Maintenance hours/month × 12]
- Break-even: Investment < (Time saved × $150/hour)

**Development workflow agent** (e.g., code review assistant)

- Users: [X] developers doing [Y] reviews/week
- Quality impact: [Z]% fewer bugs reaching production
- Current bug cost: [$ per bug × bugs/month]
- Investment: [Dev hours] × $150/hour
- ROI period: When does prevention savings exceed investment?

**Migration/modernization agent** (e.g., framework upgrader)

- Scope: [X] services/components to migrate
- Manual effort: [Y] hours per service
- Agent effort: [Z] hours per service
- Total savings: (Y - Z) × X × $150/hour
- Success rate needed: Break-even at what accuracy percentage?

## Complete examples

### Strong: production observability agent

**WHO**: SRE teams managing Kubernetes-based microservices (20-100 services) experiencing 5+ incidents weekly

**WHAT**: Analyze pod logs, metrics, and traces to identify root causes of latency spikes and error rate increases, generating runbooks for common patterns

**CONSTRAINTS**:

- Read-only access to Prometheus, Jaeger, and CloudWatch
- Analyzes last 24 hours of data only
- No automated remediation actions
- Must complete analysis within 2 minutes

**WHY**: Reduce mean time to resolution (MTTR) from 47 minutes to under 20 minutes for 80% of production incidents

**ALIGNMENT**:

- 15 SREs × 3 hours saved/week × 50 weeks = 2,250 hours/year
- Implementation: 320 hours
- Impact Score: 7.0 (acceptable)
- Concentration: 90% value to SREs, minimal value to others
- ROI: $337,500 saved/year vs $48,000 investment

### Weak: enterprise code quality analyzer

**WHO**: Development teams working on production services

**WHAT**: Analyze code patterns and suggest architectural improvements based on best practices

**CONSTRAINTS**:

- Supports major languages and frameworks
- Integrates with existing CI/CD"

**WHY**: Reduce technical debt and improve system maintainability

**ALIGNMENT**:

- Cannot calculate deliverable: "technical debt reduction" has no concrete timeline
- "improved maintainability" could mean anything from 5% to 50% fewer bugs
- "development teams" could be 10 or 1000 people
- "architectural improvements" range from trivial to year-long refactors.

_This project will fail because it sounds sophisticated and important but lacks any measurable target. It's the kind of initiative that gets approved because nobody wants to argue against "code quality" but dies in implementation when nobody can agree what success looks like._

## Building with intention

The intention statement isn't meant to be a static, use-once artifact, it's an active tool that guides ongoing decisions and evolution.

### Regular intention reviews

**Weekly**: 15-minute review

- Are we accepting only features that serve our WHO?
- Are we staying within same set of CONSTRAINTS per agent?
- Are we tracking toward our WHY?

**Monthly**: Alignment check

- Is our Impact Score trending as predicted?
- Should we adjust scope to maintain concentration?
- What would our first users say about recent additions?

**Quarterly**: Full revision

- Has our understanding of WHO evolved?
- Should we graduate from individual to production mode?
- Is it time to spawn a second, separate agent to serve a different intention?

### Three patterns for intentional evolution

Here are three patterns can help us evolve agentic systems without losing focus.

**1. Deepen (most common)**

Keep the same intention but serve it more powerfully. Instead of adding adjacent features, enhance the core workflow with richer capabilities, better accuracy, or faster performance.

For example, an agent that "explains Python functions" might evolve to provide interactive examples, visualize call graphs, or trace execution paths—all deepening the original explanation goal without changing the fundamental intention.

Signs we should deepen:

- Users love the core feature but want it to do more
- The original challenge still isn't fully solved
- We can 10x the impact without changing the WHO or WHAT

**2. Fork (when intentions diverge)**

When users request features that would violate the original constraints or serve different workflows, create a separate agent with its own intention statement rather than diluting the original.

For example, if our read-only documentation analyzer users keep asking for auto-fixing capabilities, don't break the read-only constraint. Instead, spawn a sibling "documentation fixer" agent with write permissions and its own clear intention.

Signs we should fork:

- Feature requests conflict with core constraints
- Different user segments want opposing behaviors
- The new capability would require fundamentally different architecture

**3. Pivot (rare but necessary)**

Sometimes we discover the original intention missed the real opportunity entirely. Pivoting means admitting this, crafting a new intention statement, and potentially deprecating the original approach.

For example, we might build an agent to "help write better commit messages" only to discover developers actually by far struggle most with understanding what changed in their code. The pivot refocuses entirely on workflows to support change analysis rather than message crafting.

Signs we should pivot:

- User adoption is minimal despite technical success
- Users consistently use the tool for unintended purposes
- The real challenge is adjacent to, but different from, the original assumption

### The power of precision

This framework helps us maintain that precision through the entire lifecycle of agents, from initial idea through production evolution.

If you believe that a sharp intention that serves 20 users excellently beats a vague intention that serves 2,000 users poorly, this is for you. use it, modify it, maybe build agentic workflows to use it for validation. Pass it around. Because with agentic AI, precision is power (and profit).
