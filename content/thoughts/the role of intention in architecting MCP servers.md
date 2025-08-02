---
title: The role of intention in architecting MCP servers
description:
created:
id: obs-lbGlugLh
aliases:
tags:
  - mcp
  - system-design
  - intention
  - ai
draft:
socialDescription:
socialImage:
---

## The paradox of building with AI in the loop

As modern software engineers, we're trained in the agile way: ship fast, iterate based on feedback, let design emerge. We start minimal and evolve based on what we learn from users.

But architecting robust, performant, and useful MCP servers demands the opposite: with LLMs in the loop, the system's effectiveness is significantly improved by intentionally and explicitly defining constraints upfront. These constraints improve the predictability, discoverability, and usability of our tools. Why?

Because for an LLM to make reasonable choices, it must be carefully guided. They can't read between the lines, infer unstated intentions, or choose between multiple paths to the same goal. They work purely with (their interpretation of) what we explicitly provide. The context we give them becomes their entire universe of what's possible.

> [!TIP] Because LLMs rely heavily on clarity, precision, and explicit structure, defining intentional constraints upfront is critical.

This fundamentally shifts how we measure success. Instead of evaluating how fast we ship and iterate, now we prioritize testing how reliably our constraints allow LLMs to discover and effectively compose our tools.

> [!INFO] The Constraint Paradox
>
> - Traditional software development: minimize constraints, maximize flexibility
> - MCP server development: maximize constraints, maximize flexibility
>
> The clearer our constraints, the more confidently LLMs can compose our tools into helpful solutions.

A competitive landscape amplifies this new reality. As the ecosystem matures, users will seamlessly switch between different servers and tools.

Instead of thinking of this as me suggesting to abandon agile principles 😱, I'd rather 🙏 you saw it as a realization that building with AI in the loop has different rules. Where traditional software rewards emergent flexibility, MCP servers reward intentional constraints.

Absolutely nothing wrong about yolo'ing your way thru your first MCP servers. I'm just wanting to tell you [when I did that](https://github.com/carlisia/mcp-factcheck), I had to reel myself back from a much deeper abyss than it was fun (or profitable) for me, all because I didn't have this guide that is now in front of your eyeballs! 👁👁

What follows is a practical framework for architecting MCP servers that embraces constraints and upfront intention as competitive advantages. I'll share concrete pointers for how to architect MCP servers intentionally enough to get considerable gains 💪 quickly, but not so much that it doesn't feel playful or experimental or productive.

As my Gen Z kid says: "**Trust**."

> [!TIP] PS:
> The core principles I discuss here apply to agentic systems in general, not only MCP servers/tools.

## Why MCP makes clear intention so very critical, going deeper

When we build an MCP server, our primary users are LLMs. These "users" must:

- Select appropriate tools from what a server provides based solely on tool metadata (name, description, and parameter schemas)
- Reason about when and how to use them
- Compose them into solutions
- Work within context window limits

### Tool metadata

Here's a sample of what LLMs actually see:

```json
{
  "name": "search_documents",
  "description": "Search markdown documents by content or title",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search term to find in documents"
      },
      "searchIn": {
        "type": "string",
        "description": "Where to search"
      }
    },
    "required": ["query"]
  }
}
```

The LLM uses:

- **Tool name**: For identification and selection
- **Description**: To understand the tool's purpose
- **Parameter names and types**: To construct valid calls
- **Parameter descriptions**: To understand how to use each parameter
- **Conditions**: To know values that are required

### Vague metadata

This is why vague metadata at ANY level hurts LLM usage:

```json
// Bad: Ambiguous at every level
{
  "name": "process", // Process what?
  "description": "Processes data", // How? What kind?
  "inputSchema": {
    "type": "object",
    "properties": {
      "data": {
        "type": "string",
        "description": "The data" // What format? What content?
      },
      "mode": {
        "type": "string", // What are valid modes?
        "description": "Processing mode"
      }
    }
  }
}
```

If there is ONE THING that LLMs are terrible at is this: handling ambiguity. When an LLM encounters this tool, how will it know what to do with it? How would any request lead to this tool being selected?

## The impact of vague intentions

When developers encounter an unexpected behavior with a tool, we experiment, ask questions, read code, read the logs, read docs. I'm kidding!!! We never read the docs.

When machines (you know, the regular kind) encounter unknown inputs, they follow their programming: retry, retry with different options, follow alternative logic paths, or fail gracefully with error codes. How deterministic of them.

When LLMs encounter a vaguely described tool with seemingly ambiguous parameters, they... are unhelpful at best, harmful (and costly) at worst. They will either bypass the intended tool entirely, or misuse it, potentially burning through tokens and derailing the entire process. In the absence of clear directions, they won't ask for clarification. They won’t raise warnings. They will... _confidently guess_.

The impact from tools designed with vague intentions manifests differently based on the type of MCP client.

#### When there are only humans in the loop

- **Every interaction is a test of clarity:** if our tool isn't defined with clear, consistent, and authoritative signals, LLMs will struggle to distinguish it from others or use it correctly.

- **Every inconsistency becomes noise:** ambiguous descriptions, overlapping functionality, or unclear parameters make it exponentially harder for LLMs to reliably select and use our tools.

- **User patterns crystallize around what works:** when users find tool definitions that produce consistent results, they build workflows, share prompts, and create automations based on that specific formulation.

- **Trust compounds or erodes with each interaction:** consistent tool behavior builds user confidence, while unpredictable results drive them to use competing tools.

#### When MCP clients are agents

- **Failure modes become silent degradation:** agents can't course-correct when tools behave unexpectedly; they just propagate errors downstream.

  - Agents typically don't have robust error handling for tool selection failures
  - They often make their "best guess" and continue rather than stopping

- **Integration assumptions become permanent contracts:** some agent developers hard-code expectations about our tool behavior into their systems.

  - When developers build agent systems that use our MCP tools, they encode assumptions
  - These get embedded in prompts, workflows, and agent architectures
  - Changing our tools breaks these hard-coded expectations
  - This is especially true for production systems where changes require extensive testing

- **Latency and token usage increase significantly:** unclear tools force agents to make multiple attempts or defensive calls, compounding costs.

  - Unclear tools do cause agents to use more tokens in decision-making
  - Agents might make multiple attempts with different tools

- **There's no forgiveness for ambiguity:** agents interpret our tools literally, without the human ability to infer intent from context.

  - Agents can't use context clues the way humans do
  - They interpret descriptions literally
  - Ambiguous parameter names or descriptions lead to consistent misuse

## Start with intention, not features

The beauty of MCP development is we can start with a single tool and grow from there. We don't need a 50-page specification. We just need one sentence:

"I want to help [someone] do [something]"

That's it. That's our v0.0.1 intention.

Maybe it's:

- "I want to help myself manage my todo lists better"
- "I want to help my team debug production issues faster"
- "I want to know if LLMs can help my code reviews"

This is a hypothesis to test. But having this hypothesis, however rough, fundamentally changes how we experiment.

> [!TIP] Note: The devil is in the precision.

### The intention statement framework

Before writing code, write this:

```markdown
This MCP server helps [WHO] to [DO WHAT] with [WHAT CONSTRAINTS]
so that [WHY THIS MATTERS]
```

Examples:

- "This MCP server helps **individual developers** to **manage their personal notes** with **minimal friction** so that **context-switching doesn't kill productivity**"
- "This MCP server helps **SREs** to **debug production issues** with **read-only access** so that **they can find root causes without risking further damage**"
- "This MCP server helps **data analysts** to **explore CSV files** with **read-only safety** so that **they avoid costly accidental data corruption**
- "[This MCP server](https://github.com/carlisia/mcp-factcheck) helps **developers and technical writers** to **validate any MCP-related content against official specifications** with **real-time accuracy checking** so that **they don't waste efforts and resources on misinformation**"

Here's how to know if your intention is strong:

- **Weak intention**: "This server processes log files" (missing WHO and WHY)
- **Strong intention**: "This server helps SREs to debug production issues faster so that they can reduce system downtime"

**Test**: Can you measure if you're succeeding?

- Processing log files → What does success look like? Who benefits? Why does it matter?
- Helping SREs debug production issues → Measurable: time to root cause, escalation rates, downtime minutes ✓

The strong intention clearly identifies:

- WHO: SREs
- WHAT: debug production issues faster
- WHY: reduce system downtime

> [!SUCCESS] Tip
> I personally start with the WHY, then play with the WHAT and WHO interchangeably.

## A tale of two MCP servers

Let me tell you about Eduardo and Monica, two developers who learned this lesson very differently.

Monica built FlexiServer. She wanted to create the "Swiss Army knife of MCP servers" that could handle any text processing task:

```go
func ProcessDocument(params struct {
    Action   string      `json:"action"`   // "read", "analyze", "transform", "query"
    Path     string      `json:"path"`
    Options  interface{} `json:"options"`  // Depends on action
}) (interface{}, error) {
    // 2000 lines handling every possible combination
    // Returns different JSON shapes based on action
    // LLM can't predict response structure
}
```

Eduardo built DocAnalyzer. He had one focused goal: help developers understand and improve their documentation quality:

```go
func ExtractDocumentOutline(path string) ([]HeadingNode, error) {
    // Returns hierarchical outline structure
}

func ListBrokenLinks(path string) ([]BrokenLink, error) {
    // Returns list of links that 404
}

func Summarize(path string, maxWords int) (string, error) {
    // Returns plain text summary
}

func ReadingStats(path string) (ReadingStats, error) {
    // Returns time estimate and complexity score
}
```

Six months later:

- Monica's server had 12 GitHub issues like "AI returns wrong response format" and "Can't figure out which action to use"
- Eduardo's server was featured in "Awesome MCP" with the comment: "Finally, doc analysis that just works"

The difference? Eduardo had a clear intention. Monica had possibilities.

## The pitfalls of unclear intention

Without clear intention, MCP server developers fall into predictable traps:

### LLM interaction pitfalls

**The tool granularity confusion**

```go
// Too coarse: LLMs can't reason about this effectively
func ProcessContent(params struct {
    Action   string      `json:"action"`   // "validate", "search", "check", "analyze"
    Content  string      `json:"content"`
    Options  interface{} `json:"options"`  // Depends on action
}) (interface{}, error) {
    switch params.Action {
    case "validate":
        // Full validation? Quick check? What version?
    case "check":
        // How is this different from validate?
    }
}

// Clear intention guides proper boundaries
func ValidateMCPContent(content string, specVersion string) (ValidationResult, error) { }
func CheckQuickFact(claim string) (FactCheckResult, error) { }
func SearchSpecification(query string, section string) ([]SpecMatch, error) { }
```

**The discovery paradox**

```go
// Bad: LLM can't determine when to use this
var ToolDefinitions = []Tool{{
    Name:        "check",
    Description: "Checks MCP content", // Check what? How?
}}

// Good: Clear intention enables discovery
var ToolDefinitions = []Tool{{
    Name:        "validate_mcp_claims",
    Description: "Validate claims about MCP against official specs, returning accuracy status and corrections",
}}
```

### Technical design pitfalls

**The context window waste**

```go
// No clear intention = kitchen sink response
func QueryDatabase(query string) (interface{}, error) {
    return struct {
        Rows     [][]interface{} `json:"rows"`
        Metadata DatabaseMeta    `json:"metadata"`
        Stats    QueryStats      `json:"stats"`
        Explain  QueryPlan       `json:"explain"`
        // 50KB of JSON for a simple query
    }
}

// Clear intention = focused response
func GetUserByEmail(email string) (*User, error) {
    return &User{
        ID:    user.ID,
        Name:  user.Name,
        Email: user.Email,
    }, nil
}
```

**The stateless assumption violation**

```go
// Wrong: Assumes session state
type StatefulServer struct {
    openFiles map[string]*os.File
}

func (s *StatefulServer) OpenFile(path string) (string, error) {
    handle := generateID()
    s.openFiles[handle] = file // LLM might never call CloseFile!
    return handle, nil
}

// Right: Each tool call is independent
func ReadFile(path string) (string, error) {
    data, err := os.ReadFile(path)
    return string(data), err
}
```

### Evolution pitfalls

**The feature creep spiral**

```go
// Started as a "simple markdown processor"
func ProcessMarkdown(params struct {
    Content      string `json:"content"`
    ExecuteCode  bool   `json:"execute_code"`      // Added for one user
    SendEmail    bool   `json:"send_email"`       // Marketing asked
    DeployToAWS  bool   `json:"deploy_to_aws"`    // Why not?
}) (string, error) {
    // 2000 lines of spaghetti
}
```

## During planning: Finding your boundaries

### How narrow is too narrow?

The Goldilocks Test for intention scope:

**Too broad**: "Help with text processing"

- LLMs can't reason about when to use your server
- You'll build a ProcessDocument mega-tool
- Impossible to optimize for any specific use case

**Too narrow**: "Parse Python 3.11.2 async generator expressions in files named 'main.py'"

- Overly restrictive
- Won't evolve naturally
- Probably not worth a whole server

**Just right**: "Help developers understand Python code behavior"

- Clear enough for LLMs to discover
- Focused enough to build cohesive tools
- Flexible enough to evolve with user needs

### One server or many?

Natural boundary detection framework:

**Same server when**:

- Tools naturally chain together (parse → analyze → report)
- Tools serve the same user persona
- Tools share the same constraints
- Combined value is greater than sum of parts

**Different servers when**:

- Different user personas (developers vs. marketing team)
- Conflicting constraints (read-only analysis vs. write operations)
- No natural workflow between tools
- Different reasons for using them

Example: Eduardo considered adding "fix documentation" tools to DocAnalyzer. But fixing requires write access (different constraint) and serves a different workflow. Better as a separate DocFixer server that could chain with DocAnalyzer.

## During development: The intention-decision method

### Every decision flows through your filter

```
Decision Point → Does this serve WHO?
              → Does this enable WHAT?
              → Does this respect CONSTRAINTS?
              → Does this advance WHY?

If all YES → Build it
If any NO → Decline or save for different server
```

### When intention guides design

**Natural tool boundaries**:

```go
// Intention: Help SREs debug production issues
type DebugServer struct{}

// Each tool has one clear purpose aligned with intention
func (s DebugServer) FindErrorPatterns(timeRange TimeRange) ([]ErrorPattern, error) { }
func (s DebugServer) TraceRequestPath(requestID string) (RequestTrace, error) { }
func (s DebugServer) CompareMetrics(baseline, incident TimeRange) (MetricsDiff, error) { }

// NOT: DebugSystem(action string, params map[string]interface{})
```

**Discoverable descriptions**:

```go
var Tools = []ToolDef{
    {
        Name: "find_error_patterns",
        Description: "Identify recurring error patterns in logs within a time range so that SREs can spot systemic issues",
        // Clear WHO: SREs
        // Clear WHAT: identify patterns
        // Clear WHY: spot systemic issues
    },
}
```

**Actionable errors**:

```go
func ValidateTimeRange(start, end time.Time) error {
    if start.After(end) {
        return fmt.Errorf("start time must be before end time")
    }
    if end.Sub(start) > 24*time.Hour {
        return fmt.Errorf("time range cannot exceed 24 hours for performance reasons")
    }
    // LLM can adjust request based on clear constraints
}
```

## During evolution: When reality meets intention

Your users will surprise you. The question is: how do you evolve without losing focus?

### The three evolution patterns

**1. Deepen (most common)**
Your intention stays the same, but you serve it better:

```go
// V1: Help developers understand code
func ExplainFunction(name string) (string, error) { }

// V2: Same intention, deeper capability
func ExplainFunction(name string, detail Level) (Explanation, error) { }
func VisualizeCallGraph(name string) (GraphData, error) { }
func ExplainWithExamples(name string) (ExplanationWithCode, error) { }
```

**2. Fork (when users pull you in new directions)**
Your users want something adjacent but different:

```go
// Original: DocAnalyzer - helps understand docs
// Users want: "Can it fix the broken links it finds?"

// Wrong: Add fixing to DocAnalyzer (breaks read-only constraint)
// Right: Create DocFixer as a sibling server
```

**3. Pivot (rare, when your intention was wrong)**
Only when you discover your original intention missed the mark entirely:

```go
// Started: "Help developers write better commit messages"
// Discovered: They actually needed "Help developers understand what changed"
// Pivot: Refocus on change analysis, not message writing
```

### Evolution in practice

```go
// V1: Personal use
// Intention: Help individuals track personal tasks so that nothing falls through cracks
type TaskTrackerV1 struct{}

func (t TaskTrackerV1) AddTask(description string) error {
    return saveToFile(description)
}

// V2: Team adoption
// Intention: Help teams track shared tasks so that everyone knows who's doing what
type TaskTrackerV2 struct{}

func (t TaskTrackerV2) AddTask(description, assignee string, watchers []string) error {
    // Still task tracking, but deepened for team collaboration
    task := Task{
        Description: description,
        Assignee:    assignee,
        Watchers:    watchers,
        CreatedAt:   time.Now(),
    }
    return t.storage.Save(task)
}

// V3: Enterprise scale
// Intention: Help organizations track tasks with compliance so that work is auditable
type TaskTrackerV3 struct{}

func (t TaskTrackerV3) AddTask(ctx context.Context, req TaskRequest) error {
    // Core intention intact, enterprise features added
    if err := t.validator.CheckCompliance(req); err != nil {
        return err
    }

    return t.storage.SaveWithAudit(ctx, req)
}
```

Each version deepens the same core intention for an expanding audience.

## How about existing APIs?

## Constraints as superpowers

In the MCP world, constraints aren't limitations—they're superpowers:

- **Clarity**: LLMs can reason confidently about your tools
- **Trust**: Users know exactly what your server will and won't do
- **Focus**: You can say no to feature creep with confidence
- **Quality**: You can deeply optimize for your specific use case

When someone asks "Can you add X?" and X doesn't serve your intention, "No" becomes a complete sentence.

## Next steps

1. **Write your intention statement** before your next commit
2. **Put it in your README** as the first thing users see
3. **Use it to evaluate every decision**: "Does this serve our intention?"
4. **Let it guide your evolution**: Deepen rather than broaden

Remember: In a world where LLMs are your users, the most powerful thing you can do is be brilliantly narrow. Your intention isn't a constraint—it's your compass.

---

_Building an MCP server? Start with WHY, then WHO, then WHAT. The HOW will become obvious._
