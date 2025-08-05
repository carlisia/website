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

> [!WARNING]
> No developer soul is meant to be hurt in the process of reading this article. While I know **no one** would architect a system in the way of some of the examples here, they are still very useful for the contrast needed to highlight the new (old?) thinking for building useful agentic systems.

## Why MCP makes clear intention so very critical, going deeper

When we build an MCP server, our primary users are LLMs. These "users" must:

- Select appropriate tools from what a server provides based solely on tool metadata (name, description, and parameter schemas)
- Reason about when and how to use them
- Compose them into solutions
- Work within context window limits

### Tool metadata

Here's a simple sample metadata of a tool definition, which is what LLMs actually see:

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

### Vague tool metadata

Here's a sample metadata of a tool definition with very vague metadata:

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

> [!SUCCESS] Beyond this point, I will demonstrate how vague intention at ANY level hurts LLM usage on multiple fronts.

## The impact of vague intention

When developers encounter an unexpected behavior with a tool, we experiment, ask questions, read code, read the logs, read docs. I'm kidding!!! We never read the docs.

When machines (you know, the regular kind) encounter unknown inputs, they follow their programming: retry, retry with different options, follow alternative logic paths, or fail gracefully with error codes. How deterministic of them.

When LLMs encounter a vaguely described tool with seemingly ambiguous parameters, they... are unhelpful at best, harmful (and costly) at worst. They will either bypass the intended tool entirely, or misuse it, potentially burning through tokens and derailing the entire process. In the absence of clear directions, they won't ask for clarification. They won’t raise warnings. They will... _confidently guess_.

The unintended impact from tools designed with vague intentions manifests differently based on the type of MCP client.

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

The stakes should be clear: vague intentions lead directly to unpredictable outcomes. To avoid these pitfalls, we need to shift our mindset entirely. Rather than starting from features or implementation details, the strongest foundation for reliable MCP tools is a clear and explicit intention.

## Start with intention, not features

The beauty of MCP development is we can start with a single tool and grow from there. We don't need a 50-page specification. We just need one sentence:

"I want to help [someone] do [something]"

That's it. That's our v0.0.1 intention.

Maybe it's:

- "I want to help myself manage my todo lists better"
- "I want to help my team debug production issues faster"
- "I want to know if LLMs can help my code reviews"

This is a hypothesis to test. But having this hypothesis, however rough, fundamentally improves how we experiment.

> [!TIP] Note: The devil is in the precision.

### The intention statement framework for agentic systems

For an even greater level of precision in your intention, I suggest using [[the-intention-statement-framework-for-agentic-systems|The Intention Statement Framework for Agentic Systems]] to define it more completely, and before you write any code:

```markdown
This MCP server helps [WHO] to [DO WHAT] with [WHAT CONSTRAINTS]
so that [WHY THIS MATTERS]
```

Examples:

- "This MCP server helps **individual developers** to **manage their personal notes** with **minimal friction** so that **context-switching doesn't kill productivity**"
- "This MCP server helps **SREs** to **debug production issues** with **read-only access** so that **they can find root causes without risking further damage**"
- "This MCP server helps **data analysts** to **explore CSV files** with **read-only safety** so that **they avoid costly accidental data corruption**
- "[This MCP server](https://github.com/carlisia/mcp-factcheck) helps **developers and technical writers** to **validate any MCP-related content against official specifications** with **strict adherence to official definitions on a per-version basis** so that **they can have high confidence that MCP-related content they read or write is free from misinformation**"

Here's how to know if your intention is strong:

- **Weak intention**: "This server processes log files" (missing WHO and WHY)
- **Strong intention**: "This server helps SREs to debug production issues faster so that they can reduce system downtime"

**Test**: Can you measure if you're succeeding?

- Processing log files → What does success look like? Who benefits? Why does it matter?
- Helping SREs debug production issues → Measurable: time to root cause, escalation rates, downtime minutes ✓

The strong intention clearly identifies:

- WHO: SREs
- WHAT: debug production issues faster
  - ⚠️ pay close attention to this one, it will be relevant again later for a different purpose
- WHY: reduce system downtime

> [!SUCCESS] Tip
> I personally always start with the WHY, then play with the WHAT and WHO interchangeably.

## A tale of three MCP servers

Let me tell you about Eduardo and Monica (😬 if you know, you know, lolz), and Bruno, three developers who learned this lesson very differently.

> [!HELP] Keep in mind:
> A tool (handler) can either contain all the code to be executed or simply call another function that serves as an entry point for the actual work. Below, I’m showing only these entry-point functions.

### Monica's FlexiServer: why just one thing?

Monica built FlexiServer, aiming to create the "Swiss Army knife of MCP servers" that could handle text processing tasks, and be extensible:

```go
type OperationType string // stringly-typed
type ProcessConfig map[string]any // a grab bag
type ProcessResult struct {
    Data interface{} `json:"data"` // returns anything
    Type string      `json:"type"` // requires interpretation
}

// Process executes any text processing operation based on the operation type.
// The config parameter requirements vary by operation.
// Returns ProcessResult whose structure depends on the operation.
func Process(input string, operation OperationType, config ProcessConfig) (*ProcessResult, error)

// Apply runs a processing pipeline on text.
// Each step is executed in sequence with the output of one feeding the next.
// Returns a PipelineResult whose structure varies based on the final step.
func Apply(text string, steps []PipelineStep) (*PipelineResult, error)

// Execute performs text operations based on natural language commands.
// Interprets commands like "make this shorter" or "find key points".
// Returns an ExecutionResult with command-specific structure.
func Execute(content string, command NaturalCommand) (*ExecutionResult, error)

// Transform modifies text based on the provided ruleset.
// Rules can be regex patterns, templates, or custom transformers.
// Output structure depends on the rule type applied.
func Transform(input TextInput, rules TransformRules) (*TransformOutput, error)

// RegisterExtension adds new processing capabilities at runtime.
// Extensions are identified by ExtensionID like "sentiment" or "translate.spanish".
func RegisterExtension(id ExtensionID, handler ExtensionHandler) error
```

With unconstrained flexibility and ambiguous interface definitions, this design creates uncertainty for LLM usage:

• **Tool selection token burn** - With `Process`, `Execute`, and `Transform` all modifying text, LLMs waste tokens reasoning through which to use and explaining their choice to users

• **Configuration discovery overhead** - `ProcessConfig map[string]any` forces trial-and-error. Each failed attempt adds request + error + retry reasoning to the context window

• **Verbose operation explanations** - Since `OperationType` values like "enhance" have no clear meaning, LLMs burn tokens explaining what they _think_ might happen

• **Compound ambiguity costs** - `Execute` with natural language commands like "make it better" requires tokens for: interpreting the command + explaining uncertainty + handling unpredictable results

• **Runtime capability confusion** - `RegisterExtension` means LLMs can't cache which operations exist, requiring fresh discovery and adding explanation tokens each session

• **Error cascade verbosity** - When `Process` fails due to wrong config keys, the LLM needs tokens to explain the error, guess correct parameters, and retry

• **Result interpretation overhead** - With `ProcessResult.Data interface{}`, LLMs waste tokens explaining what type of data they received and how they're interpreting it, instead of just presenting results

> [!NOTE]
> The flexible design undermines reliability at every stage: selection (ambiguous boundaries), execution (unpredictable behavior), and integration (inconsistent outputs).

### Bruno's DocInspector: bring my own APIs, all of them

Bruno built DocInspector. He already had a comprehensive REST API for document analytics, so his intention was simple: be efficient and reuse all 47 existing endpoints by mapping each one directly to an MCP tool. Why reinvent the wheel when the APIs were already tested and deployed?

```go
// DocumentWordCount returns the total word count
func DocumentWordCount(path string) (int, error)

// DocumentCharacterCount returns the total character count
func DocumentCharacterCount(path string) (int, error)

// DocumentLineCount returns the total line count
func DocumentLineCount(path string) (int, error)

// DocumentParagraphCount returns the total paragraph count
func DocumentParagraphCount(path string) (int, error)

// DocumentHeading1Count returns count of H1 headings
func DocumentHeading1Count(path string) (int, error)

// DocumentHeading2Count returns count of H2 headings
func DocumentHeading2Count(path string) (int, error)

// DocumentCodeBlockCount returns count of code blocks
func DocumentCodeBlockCount(path string) (int, error)

// DocumentPythonCodeBlockCount returns count of Python code blocks
func DocumentPythonCodeBlockCount(path string) (int, error)

// DocumentJavaScriptCodeBlockCount returns count of JavaScript code blocks
func DocumentJavaScriptCodeBlockCount(path string) (int, error)

// CheckDocumentHasTableOfContents returns true if doc has a TOC
func CheckDocumentHasTableOfContents(path string) (bool, error)

// CheckDocumentHasIntroduction returns true if doc has an intro section
func CheckDocumentHasIntroduction(path string) (bool, error)

// DocumentReadingTimeInSeconds returns estimated reading time
func DocumentReadingTimeInSeconds(path string) (int, error)

// DocumentFleschScore returns Flesch readability score
func DocumentFleschScore(path string) (float64, error)

// ... 30+ more ultra-specific tools
```

With excessive granularity and fragmented operations, this design creates orchestration overhead for LLM usage:

• **Tool discovery overhead** - Before executing any request, LLMs must parse and evaluate 50+ tool definitions (each 100-200 tokens), consuming 5,000-10,000 tokens just to understand available capabilities

• **Orchestration complexity** - A "document analysis" request requires the LLM to construct a directed acyclic graph of 15-30 tool calls, reason about dependencies, and maintain execution order

• **Context window exhaustion** - Each tool call adds ~200-500 tokens (request + response + reasoning). A 20-tool sequence consumes 4,000-10,000 tokens in intermediate state alone, leaving insufficient room for document content

• **Latency amplification** - Serial dependencies prevent parallelization. If ReadingTimeInSeconds depends on WordCount, and FleschScore depends on both, you have a critical path of 3+ sequential round-trips

• **High failure surface area** - More tools mean more failure points. When tool 15 of 20 fails, the LLM must decide whether partial results are acceptable or if the entire analysis is compromised

• **Semantic ambiguity at scale** - LLMs must infer relationships between `DocumentHeading1Count`, `DocumentHeading2Count`...`DocumentHeading6Count` versus a single `DocumentHeadingStructure` that returns hierarchical data

> [!NOTE]
> The atomic design degrades user experience at every stage: selection (overwhelming choices), execution (excessive latency), and integration (fragmented results).

### Eduardo's DocQualityAdvisor: why so picky?

Eduardo built DocQualityAdvisor. He had one precise intention: help developers understand and improve their documentation quality with clear, actionable feedback, so that their tools become reliably discoverable and easy to use:

```go
// AnalyzeDocumentationQuality examines technical documentation for common quality issues
// including missing sections, unclear explanations, and structural problems.
// Use this to get specific improvement recommendations for developer documentation.
// Returns a QualityReport with scored issues and actionable suggestions for each problem found.
func AnalyzeDocumentationQuality(path string) (QualityReport, error)

// CheckLinkValidity validates all links in documentation, identifying broken links,
// redirects, and invalid anchor references. Use this to ensure all references work correctly.
// Set checkExternal to true to also validate external URLs (slower but more thorough).
// Returns a LinkReport containing broken links, redirect chains, and anchor mismatches.
func CheckLinkValidity(path string, checkExternal bool) (LinkReport, error)

// CalculateReadabilityMetrics analyzes text complexity and reading difficulty.
// Use this to ensure documentation matches your target audience's reading level.
// Returns grade level, estimated reading time, and technical jargon density.
func CalculateReadabilityMetrics(path string) (ReadabilityMetrics, error)

// ExtractDocumentStructure parses the hierarchical organization of a document.
// Use this to analyze navigation flow and identify structural issues like
// missing sections or imbalanced content depth.
// Returns a DocumentStructure with heading hierarchy, section balance, and navigation tree.
func ExtractDocumentStructure(path string) (DocumentStructure, error)
```

With intentional constraints and boundaries, this design optimizes for LLM efficiency:

• **Deterministic tool selection** - Names like `CheckLinkValidity` and `CalculateReadabilityMetrics` create clear decision boundaries, minimizing selection tokens because LLMs don't need exploratory reasoning

• **Zero overlap design** - Each tool owns exclusive functionality (links OR readability OR structure), preventing token waste because LLMs never compare similar tools

• **Predictable parameter contracts** - Fixed, typed parameters like `(path string, checkExternal bool)` eliminate configuration discovery overhead because LLMs can see exactly what's required from the schema

• **Structured return types** - `LinkReport`, `ReadabilityMetrics` provide consistent schemas, allowing direct result formatting because LLMs know the exact structure in advance

• **Composability without coupling** - Tools can be called independently or together, enabling simpler orchestration because there are no hidden dependencies between tools

• **Context window efficiency** - Clear, focused tools need minimal description tokens while providing maximum clarity because each tool does one thing well

> [!NOTE]
> The design optimizes for LLM effectiveness at every stage: selection (obvious choice), execution (predictable behavior), and integration (composable results).

### Six months later

**Monica's FlexiServer:**

- 47 open GitHub issues: "Process returns string but AI expects array", "What does operation='enhance' actually do?", "ProcessConfig completely undocumented"
- Monica spends more time explaining parameter combinations than adding features
- 3 frustrated blog posts: "Why I Gave Up on MCP After 2 Weeks"
- Average token usage: 3x higher due to LLMs repeatedly guessing valid combinations

**Bruno's DocInspector:**

- 12 open issues: "Why does analyzing a document require 47 API calls?", "Timing out after 30 seconds"
- Bruno's server works perfectly for direct API users, but fails for LLM interactions
- One viral tweet: "MCP servers: Death by a thousand tool calls"
- 90% of users only use the newly added `AnalyzeDocument` aggregate tool

**Eduardo's DocQualityAdvisor:**

- Integrated into 4 major documentation platforms
- Pull request: "This is exactly what we needed, each tool does one thing perfectly!"
- Featured in MCP showcase: "Example of thoughtful MCP server design that LLMs love"
- Community fork expanded it following the same easy to follow [[the-intention-statement-framework-for-agentic-systems|Intention Statement Framework for Agentic Systems]]

The key differences? Eduardo designed for agentic interaction. Monica designed for flexibility. Bruno designed for API reuse.

## The pitfalls of unclear intention

After seeing Eduardo, Monica, and Bruno's six-month outcomes, you might be ready to craft your own clear intention for your MCP servers and tools using [[the-intention-statement-framework-for-agentic-systems|The Intention Statement Framework for Agentic Systems]].

Beyond this point I will show how to continue using that same intention to very tightly define MCP server boundaries and create tools optimized for composition.

But if you're still unconvinced that unclear intentions create real problems, here I list specific pitfalls across three critical categories, side-by-side for maximum contrast, and using the [previous tales of 3 MCP servers](#a-tale-of-three-mcp-servers) as anchors. These aren't theoretical concerns, they're innevitable frustrations users, agents (and their LLMs) will face.

### 1) LLM interaction pitfalls

#### a) The tool granularity trap

Without clear intention, developers swing between extremes:

**Too granular** (Bruno's mistake):

```go
// LLM sees 50+ tools and thinks:
// "Do I need WordCount + LineCount + CharCount... or just WordCount?"
// "Should I call them in parallel? What if one fails?"
// "The user wants 'analysis' - does that mean all metrics?"
```

**Too broad** (Monica's mistake):

```go
// LLM sees Process() and thinks:
// "Will 'analyze' mode return the same structure as 'transform'?"
// "Can I chain Process→Process or will that break?"
// "What happens if I use wrong config keys?"
```

Clear intention creates natural boundaries. Eduardo's tools hit the sweet spot because each serves a specific documentation quality need.

#### b) The discovery paradox

Vaguely boundaried MCP servers create a cruel irony: the more flexible the tools, the less discoverable they become.

```go
// Monica's FlexiServer
"Process any text with any operation"
// LLM: "When would I use this versus... every other text tool?"

// Bruno's DocInspector
"Get any metric about any document"
// LLM: "I need 5 metrics... that's 5 sequential calls?"

// Eduardo's DocQualityAdvisor
"Find documentation quality issues"
// LLM: "Perfect for the user asking about doc problems!"
```

The paradox: trying to be useful for everything makes the server useful for nothing specific.

#### c) The composition breakdown

This is where unclear intention sabotages what I consider MCP's most powerful feature: enabling LLMs to compose tools into solutions. LLMs can always chain tools together, but unpredictable outputs make this chaining less reliable and more token-intensive.

**Why Monica's tools don't compose**:

```go
Process("text", "enhance", config) → ??? → Process(???, "format", ???)
// What does enhance output? What should format expect?
// LLM gives up and warns user about uncertainty
```

**Why Bruno's tools compose poorly**:

```go
WordCount() → LineCount() → ParagraphCount() → ReadingTime()
// 4 network calls, 4 potential failures, 4x context usage
// For what could have been one DocumentMetrics() call
```

**Why Eduardo's tools compose naturally**:

```go
AnalyzeQuality() → CheckLinks() → CalculateReadability()
// Each output is predictable, structured, and independent
// LLM can parallelize and handle partial failures
```

Good composition requires:

- Predictable outputs that become inputs
- Independence (tool B doesn't break if tool A fails)
- Clear data flow (obvious what chains with what)

### 2) Technical design pitfalls

#### a) The context window waste

Every token counts, and unclear designs burn them recklessly:

**Token waste in discovery**:

- Bruno: 50+ tool definitions = 5,000+ tokens before work starts
- Monica: Vague descriptions need lengthy explanations
- Eduardo: Focused tools need minimal description

**Token waste in execution**:

- Bruno: 20 calls × 200 tokens per call = 4,000 tokens of orchestration
- Monica: Failed attempts + retries + error handling = token multiplication
- Eduardo: Single-purpose calls with predictable results

**Token waste in results**:

- Bruno: Accumulating 20 small results in context
- Monica: Explaining what ambiguous outputs mean
- Eduardo: Structured results that speak for themselves

#### b) The hidden dependencies trap

Unclear intention creates tools with non-obvious dependencies and coupling:

```go
// Monica's runtime dependencies
RegisterExtension("sentiment", handler) // Must happen before...
Process("text", "sentiment", nil) // ...this works
// What if the extension wasn't registered in this session?

// Bruno's orchestration complexity
// The LLM must track results across 20+ calls
results := map[string]any{}
results["words"] = WordCount(doc)
results["lines"] = LineCount(doc)
results["readTime"] = CalculateReadingTime(results["words"]) // Depends on previous
// Context fills with intermediate results

// Eduardo's independent tools
report := AnalyzeQuality(doc) // Self-contained
links := CheckLinks(doc) // No dependency on AnalyzeQuality
metrics := CalculateReadability(doc) // Each tool stands alone
```

The "hidden" problems:

- Tools that silently depend on setup or prior calls
- Complex orchestration where the LLM must manage relationships
- Context window bloat from accumulating intermediate results

The real cost might not even be the dependencies themselves, it's the token overhead and user frustration when LLMs are required to act more as orchestration engines rather than problem solvers.

### 3) Evolution pitfalls

#### The feature creep spiral

Without clear intention, every user feature request seems reasonable:

**Monica's spiral**:

1. "Can `Process` handle JSON?" → Add JSON mode
2. "What about YAML?" → Add YAML mode
3. "Can it validate too?" → Add validation modes
4. "Transform between formats?" → More modes

Result: 47 modes, none work reliably

**Bruno's spiral**:

1. "We need WordCount" → Add endpoint
2. "Also need CharCount" → Add endpoint
3. "And LineCount" → Add endpoint

Result: 50+ endpoints, terrible UX

**Eduardo's triage**:

1. "Can it fix the issues it finds?" → No, that's a different intention
1. "Add markdown-to-HTML conversion?" → No, that's transformation not quality analysis
1. "Add auto-translation?" → No, that's content generation not quality checking
1. "Add plagiarism detection?" → No, that's content verification not documentation quality
1. "Can it fix the issues it finds?" → No, that's writing not analyzing
1. "Add SEO optimization?" → No, that's marketing not documentation quality

Result: Focused tools that excel at their purpose

Upfront, clear intention is our defense against the feature creep spiral. It gives us clarity and permission to say "that's a great idea for a different MCP server."

## Defining tighter boundaries using intention

The [[the-intention-statement-framework-for-agentic-systems|The Intention Statement Framework for Agentic Systems]] can be used as a daily decision-making filter. If every choice we face flows through this framework, we will succeed in keeping our MCP servers (or agentic systems in general) focused and effective.

### Scope boundaries

Before writing any code, our intention helps us define what belongs in our MCP server and what doesn't.

#### The Goldilocks test for server scope

How to know if the intention itself is too broad, too narrow, or just right?

**Too broad**:

- "Help with text processing"
- Test: Can we list 10 specific tools? If we get vague ones like "ProcessText", too broad
- LLMs can't determine when to use the MCP server
- We'll build Monica's FlexiServer

**Too narrow**:

- "Validate Python 3.11 async functions in .md files between 1-5KB"
- Test: Will this serve users for > 6 months? If not, too narrow
- Not enough tools to justify an MCP server
- Won't evolve naturally

**Just right**:

- "Help developers validate code examples in their documentation"
- Test: Clear tool ideas? Yes: ValidateCode, CheckImports, VerifyOutput
- Test: Natural boundaries? Yes: Validation tools naturally group together
- Test: Room to grow? Yes: More languages, more checks
- LLMs understand when to use it

#### One server or many?

Our intention can help decide when to split functionality:

**Signs we need multiple servers**:

- Different user personas (developers vs. marketing)
- Conflicting constraints (read vs. write)
- No natural workflow between tool groups
- Different core purposes

**Signs we need one server**:

- Tools naturally chain: Parse → Analyze → Report
- Same user persona throughout
- Shared constraints (all read-only, same file types)
- Combined value exceeds individual tools

**Example: Eduardo's decision**

Eduardo considered adding documentation fixing to DocQualityAdvisor:

```
Analyze tools:              Fix tools:
- WHO: Developers          - WHO: Developers ✓
- WHAT: Find issues        - WHAT: Fix issues ✗
- CONSTRAINTS: Read-only   - CONSTRAINTS: Write ✗
- WHY: Understand quality  - WHY: Improve quality ✗
```

Three mismatches = separate server. DocQualityAdvisor finds problems, DocFixer solves them. They chain beautifully but maintain clear boundaries.

#### Scoping features

When requests arrive, we can also run them through the filter:

**1) Request**: "Can DocQualityAdvisor fix the broken links it finds?"

- WHO: ✓ Still developers
- WHAT: ✗ Fixing isn't analyzing
- CONSTRAINTS: ✗ Would need write permissions
- WHY: ✗ Different outcome (fixing vs understanding)

**Decision**: No, but great idea for a companion DocFixer MCP server

**2) Request**: "Can DocQualityAdvisor check Python code examples in docs?"

- WHO: ✓ Developers writing docs
- WHAT: ✓ Quality includes working examples
- CONSTRAINTS: ✓ Still read-only analysis
- WHY: ✓ Reduces documentation issues

**Decision**: Yes, add `ValidateCodeExamples` tool

### Implementation boundaries

Once we know our scope, intention guides how we structure our tools.

#### Tool granularity decisions

Letting intention define natural tool edges:

```go
// Intention: Help SREs debug production issues quickly and safely

// Clear boundaries from intention
func FindErrorPatterns(logs LogQuery) ([]ErrorPattern, error)
// - Serves WHO: SREs need pattern recognition
// - Enables WHAT: Find systemic issues
// - Respects CONSTRAINTS: Read-only log analysis
// - Advances WHY: Faster issue identification

// Would violate intention
func AutoFixErrors(pattern ErrorPattern) error
// - Different WHAT: Fixing vs debugging
// - Violates CONSTRAINTS: Modifies production
// - Different WHY: Prevention vs understanding
```

#### Parameter design choices

**Choice**: Return all metrics in one call vs separate tools?

- One call serves "quick overview" (aligns with WHY: fast understanding)
- Separate tools serves "detailed analysis" (aligns with WHAT: thorough checking)

**Decision**: Both: `GetOverview` for quick checks, individual tools for deep dives

**Choice**: Support markdown only vs multiple formats?

- WHO uses what formats?
- Does multi-format serve core WHAT?
- What's the complexity CONSTRAINT?

**Decision**: Start with markdown (80% of WHO), add formats only if WHO expands

### Communication boundaries

Clear communication helps LLMs understand and use our tools effectively.

#### Writing tool descriptions

Writing descriptions that reflect the intention clearly:

```go
// Weak: Generic description
"Analyzes text for various metrics"

// Strong: Intention-aligned description
"Analyzes API documentation to identify quality issues that frustrate developers,
including broken examples, missing parameters, and unclear descriptions"
// - Clear WHO: developers reading API docs
// - Clear WHAT: quality issues
// - Clear WHY: reduce frustration
```

#### Error messages that guide

Leveraging error messages as guide toward the intention:

```go
// Weak: Technical error
"Error: Invalid parameter type"

// Strong: Intention-guiding error
"Error: Code validation requires a markdown file with code blocks.
Supported languages: Python, JavaScript, Go"
// Reinforces WHAT: validating code in documentation
// Clarifies CONSTRAINTS: specific file types
```

## Composition patterns that work

One of MCP's most powerful features is enabling LLMs to combine tools into solutions. But as we saw with Monica and Bruno, poor design breaks this capability. On the other hand, Eduardo's tools compose naturally. In this section I want to give you ideas for how to craft patterns you can use.

### Why Eduardo's tools compose naturally

Eduardo's tools work well together because they follow three principles:

**1. Predictable contracts**
Each tool has clear inputs and outputs. When `AnalyzeDocumentationQuality` returns a `QualityReport`, we know exactly what fields it contains. It can confidently access `.Issues` or `.Score` without uncertainty about what the tool returned.

**2. Independent operation**
`CheckLinkValidity` doesn't need `AnalyzeDocumentationQuality` to run first. Each tool is self-contained, taking a document path and returning complete results.

**3. Complementary purposes**
Each tool provides a different lens on the same problem space. Quality analysis, link checking, and readability metrics all contribute to understanding documentation health without overlapping.

### Sequential patterns

Sequential composition creates workflows where each tool's output enhances the next step.

**Pattern: Progressive refinement**

```
AnalyzeDocumentationQuality(doc)
→ identifies missing sections
→ CheckLinkValidity(doc, focus_on_sections=identified_sections)
→ checks links in problem areas first
→ GenerateImprovementReport(quality_results, link_results)
```

**Pattern: Filter and focus**

```
ExtractDocumentStructure(doc)
→ identifies all code blocks
→ ValidateCodeExamples(doc, languages=found_languages)
→ validates only relevant languages
→ CalculateCodeCoverage(validation_results)
```

**Why it works**: Each step narrows focus based on previous discoveries. The LLM can explain its reasoning: "I found Python and JavaScript examples, so I'll validate those languages specifically."

### Parallel patterns

Parallel composition leverages independence for efficiency.

**Pattern: Comprehensive analysis**

```
Parallel:
├── AnalyzeDocumentationQuality(doc)
├── CheckLinkValidity(doc)
├── CalculateReadabilityMetrics(doc)
└── ExtractDocumentStructure(doc)

Then: CombineIntoReport(all_results)
```

**Pattern: Multi-perspective validation**

```
For each code example in parallel:
├── CheckSyntax(example)
├── CheckImports(example)
├── CheckOutput(example)
└── CheckComplexity(example)
```

**Why it works**: No tool depends on another's output. If one fails, others still provide value. The LLM can optimize for speed without worrying about ordering.

### The role of structured outputs

Structured outputs are the secret to reliable composition. Here's why:

**Typed contracts enable chaining**

```go
type QualityReport struct {
    Score           float64
    Issues          []Issue
    MissingSections []string
}

type Issue struct {
    Type        string
    Severity    string
    Location    string
    Suggestion  string
}
```

When tools return structured data, the LLM knows:

- What fields are available
- How to extract specific information
- How to combine results meaningfully

**Contrast with poor structure**

```go
// Monica's approach - composition nightmare
type ProcessResult struct {
    Data any    // Could be string, map, array...
    Type string // LLM must interpret this
}

// Bruno's approach - composition overhead
WordCount() int         // Need 20 calls
CharacterCount() int    // to get full picture
LineCount() int         // Each adds round-trip latency
```

**Structured outputs enable intelligent filtering**

```go
// LLM can reason: "Show only high-severity issues"
report := AnalyzeDocumentationQuality(doc)
criticalIssues := filter(report.Issues, severity="high")

// Versus Monica's approach where LLM must guess
result := Process(doc, "analyze", config)
// How to filter unknown structure?
```

### Composition best practices

**1. Design tools that transform, not just extract**

- Possible: `GetWordCount() int`
- Better: `AnalyzeReadability() ReadabilityReport`

The second provides rich data that feeds naturally into next steps.

You're right - a concrete example of tool chaining would be helpful. Here's a better one:

**2. Organize outputs for easy filtering and chaining**

Instead of returning flat data, structure it for common use cases:

```go
// Flat output - harder to use
type LinkReport struct {
    BrokenLinks []BrokenLink  // Just one big list
}

// Organized output - ready for composition
type LinkReport struct {
    BrokenLinks []BrokenLink
    BySection   map[string][]BrokenLink  // Pre-grouped by document section
    BySeverity  map[string][]BrokenLink  // "critical", "warning", "info"
}
```

What this format makes possible for composition:

```
CheckLinks() → returns LinkReport with broken links by section
PrioritizeFixesForSection("api-docs") → uses report.BySection["api-docs"]
GenerateFixPlan() → uses report.BySeverity["critical"] for urgent fixes
```

Each tool can efficiently access the exact subset of data it needs:

- The MCP client asks: "What critical links need fixing in the API docs?"
- LLM combines: `report.BySection["api-docs"]` ∩ `report.BySeverity["critical"]`
- No filtering through hundreds of links needed

The principle: Anticipate how the output will be used and structure it accordingly.

**3. Provide both summary and detail**

```go
type QualityReport struct {
    Summary     Summary      // For quick decisions
    Details     []Issue      // For deep analysis
    Suggestions []Suggestion // For next steps
}
```

LLMs can choose the appropriate level for their current task.

**4. Use consistent identification**

```go
// All tools use same document identification
func AnalyzeQuality(docPath string) ...
func CheckLinks(docPath string) ...
func ValidateExamples(docPath string) ...

// Not: different parameter names/types
func AnalyzeQuality(file string) ...
func CheckLinks(documentURI URI) ...
func ValidateExamples(doc Document) ...
```

Consistent interfaces reduce composition friction.

Useful composition doesn't happen by stacking iterations, it emerges from clear intentions, predictable contracts, and structured thinking about how tools work together.

## When intention meets reality, aka iterations

Our users will surprise us. The question is: how do we evolve without losing focus? How do we adapt to real needs without becoming Monica's FlexiServer?

### Evolution without losing focus

The key to healthy evolution is treating our intention as a compass, not a cage. It guides direction while allowing for growth. Every successful MCP server evolves, but the ones that thrive do so deliberately.

**Signs of healthy evolution:**

- New tools make existing ones more valuable
- Original users get more power without more complexity
- Each addition serves the core intention better
- LLMs can still explain the server's purpose in one sentence

**Signs of drift:**

- New tools serve different user types
- Original tools feel disconnected from new ones
- We're adding parameters to make tools do double duty
- LLMs hedge when describing what the server does

### The three patterns: Deepen, Fork, Pivot

#### **1. Deepen (most common)**

Our intention stays the same, but we serve it better:

```go
// V1: Help developers understand code
func ExplainFunction(name string) (string, error)

// V2: Same intention, deeper capability
func ExplainFunction(name string, detail Level) (Explanation, error)
func VisualizeCallGraph(name string) (GraphData, error)
func ExplainWithExamples(name string) (ExplanationWithCode, error)
```

Deepening feels natural because:

- Original users get more value
- New tools complement existing ones
- The core intention gets stronger, not diluted

#### **2. Fork (when users pull in new directions)**

Our users want something adjacent but different:

```go
// Original: DocQualityAdvisor - helps understand docs
// Users want: "Can it fix the broken links it finds?"

// Wrong: Add fixing to DocQualityAdvisor (breaks read-only constraint)
// Right: Create DocFixer as a sibling server
```

Forking preserves clarity:

- Original server stays focused
- New server has its own clear intention
- They compose beautifully together
- Neither suffers from scope creep

#### **3. Pivot (rare, when intention was wrong)**

Only when we discover our original intention missed the mark entirely:

```go
// Started: "Help developers write better commit messages"
// Discovered: They actually needed "Help developers understand what changed"
// Pivot: Refocus on change analysis, not message writing
```

Pivoting requires honesty:

- Admit the original intention was off
- Define a new, clearer intention
- Potentially rename/rebrand
- Communicate the change clearly

### Version evolution example

Let's follow a server through realistic growth:

**Version 1.0: Personal use**

```
Intention: Help me find security issues in my Node.js projects
Tools:
- FindHardcodedSecrets()
- CheckDependencyVulnerabilities()
- IdentifyInsecurePatterns()
```

**Version 2.0: Team adoption (Deepen)**

```
Same intention, expanded for team needs:
- FindHardcodedSecrets(severity Level)
- CheckDependencyVulnerabilities(includeDevDeps bool)
- IdentifyInsecurePatterns(customRules []Rule)
- GenerateSecurityReport() // New: aggregate findings
```

**Version 3.0: Adjacent need emerges (Fork decision)**

```
Users: "Can it automatically update vulnerable dependencies?"

Decision point:
- Updating != Finding (different WHAT)
- Requires write access (different CONSTRAINT)
- Solution: Fork into SecurityScanner + SecurityFixer
```

Each version deepened value for the original use case without losing focus.

### When to say no

The hardest part of evolution is saying no to good ideas that don't fit. Here's a framework:

**Immediate no:**

- Violates core constraints (write access for read-only tool)
- Serves different users (enterprise features for personal tool)
- Requires architecture change (real-time for batch tool)

**Consider forking when:**

- Great idea but different intention
- Would help users but breaks existing patterns
- Valuable but changes core assumptions

**Consider deepening when:**

- Makes existing tools more powerful
- Serves same users better
- Respects all constraints
- Natural extension of current capabilities

**Real example: Eduardo's decisions**

```
Request: "Add spell checking"
Filter check:
- WHO: ✓ Still developers
- WHAT: ✗ Spelling != documentation quality
- WHY: ✗ Grammar != functional correctness
Decision: No, that's a different concern

Request: "Add API example validation"
Filter check:
- WHO: ✓ Developers writing docs
- WHAT: ✓ Code quality is documentation quality
- WHY: ✓ Reduces confusion from broken examples
Decision: Yes, deepen with ValidateAPIExamples
```

Remember: Every "no" protects the clarity that makes our server valuable. Every "yes" should make our intention stronger, not weaker. When in doubt, preserve focus—our users chose us for what we do well, not for doing everything.

## Conclusion: trust the process

This avoids repetition while building naturally on your examples. The composition section specifically can reference back to why Eduardo's design enables it while the others don't.

---

## OLD

---

## When intention meets reality, aka iterations

Your users will surprise you. The question is: how do you evolve without losing focus?

### The three evolution patterns

#### **1. Deepen (most common)**

Your intention stays the same, but you serve it better:

```go
// V1: Help developers understand code
func ExplainFunction(name string) (string, error) { }

// V2: Same intention, deeper capability
func ExplainFunction(name string, detail Level) (Explanation, error) { }
func VisualizeCallGraph(name string) (GraphData, error) { }
func ExplainWithExamples(name string) (ExplanationWithCode, error) { }
```

#### **2. Fork (when users pull you in new directions)**

Your users want something adjacent but different:

```go
// Original: DocAnalyzer - helps understand docs
// Users want: "Can it fix the broken links it finds?"

// Wrong: Add fixing to DocAnalyzer (breaks read-only constraint)
// Right: Create DocFixer as a sibling server
```

#### **3. Pivot (rare, when your intention was wrong)**

Only when you discover your original intention missed the mark entirely:

```go
// Started: "Help developers write better commit messages"
// Discovered: They actually needed "Help developers understand what changed"
// Pivot: Refocus on change analysis, not message writing
```

### Evolution in practice

#### Version 1.0: Personal use

#### Version 2.0: Team collaboration

#### Version 3.0: Enterprise scale

Each version deepens the same core intention for an expanding audience.

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
