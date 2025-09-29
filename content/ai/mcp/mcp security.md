---
title: Understanding security in the Model Context Protocol (MCP)
description: Comprehensive guide to MCP security covering OAuth 2.1 authorization, token validation, consent enforcement, and AI-specific threat defense
created: 2025-09-17 (PT)
id: obs-UxzIRUuo
aliases:
  - MCP security
tags:
socialDescription: MCP security essentials - OAuth 2.1 flows, token validation, consent enforcement, and defending against AI-specific threats
---

Security within the [[model context protocol|Model Context Protocol]] (MCP) presents a dual challenge. It requires addressing both traditional web vulnerabilities and a new class of threats specific to [[AI agent|AI agents]]. As MCP standardizes how agents interact with external tools and data, it inevitably creates new attack surfaces that demand a comprehensive, defense-in-depth security strategy.

Properly securing an MCP implementation is critical for preventing data breaches, unauthorized agent actions, and significant operational disruptions.

## tl;dr

Effective MCP security is built on four key pillars:

- **Authorization and Access Control:** Utilizes OAuth 2.1-based flows to ensure that only authorized clients, acting on behalf of users or other agents, can access [[MCP server|MCP servers]].
- **Token Validation and Audience Checking:** Prevents token reuse and lateral movement attacks by requiring servers to verify that each token was issued specifically for them.
- **Consent Enforcement:** Mandates explicit user consent for every dynamically registered client, preventing the unauthorized reuse of permissions.
- **Defense Against Novel AI Threats:** Requires proactive measures to defend against emerging threats like prompt injection, tool poisoning, and agent manipulation, in addition to traditional API security practices.

## The foundation: authorization and authentication

MCP mandates the use of **OAuth 2.1** as the foundation of its security model, requiring strict adherence to its security best practices.

> Implementations **MUST** follow OAuth 2.1 security best practices as laid out in [RFC 9126 §7, “Security Considerations”](https://www.rfc-editor.org/rfc/rfc9126.html#section-7).

**Key Specification-Mandated Requirements**:

| Requirement                   | Description                                                                                      | Importance                                                                   |
| :---------------------------- | :----------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Token Audience Validation** | Servers **MUST** ensure tokens are issued specifically for them. Token passthrough is forbidden. | Prevents lateral movement across services.                                   |
| **PKCE Authorization**        | Clients **MUST** implement Proof Key for Code Exchange (PKCE).                                   | Protects against authorization code interception and replay attacks.         |
| **Secure Communication**      | All endpoints and redirect URIs (except for `localhost`) **MUST** use HTTPS.                     | Prevents credential and token exposure via Man-in-the-Middle (MITM) attacks. |
| **Secure Token Storage**      | Clients and servers **MUST** store and handle tokens securely.                                   | Prevents credential theft and impersonation.                                 |

## Major attack vectors and threats

Even with MCP's built-in protections, the security landscape is constantly evolving. Research from various security firms has identified several recurring vulnerabilities in MCP implementations. The table below summarizes common threat categories, though it is important to note that the statistics are drawn from different studies with varying scopes and methodologies [1, 2, 3].

| Threat Category                    | Example Attack                     | Prevalence / Source                               |                                                          |
| :--------------------------------- | :--------------------------------- | :------------------------------------------------ | -------------------------------------------------------- |
| **Authentication & Authorization** | Confused Deputy Problem            | A classic proxy-based vulnerability               |                                                          |
|                                    | Token Passthrough / Replay         | A common implementation flaw                      |                                                          |
| **Injection & Manipulation**       | Command Injection                  | Found in **43%** of servers in one study [2]      |                                                          |
|                                    | prompt injection                   | Prompt Injection]] (Direct & Indirect)            | A primary threat vector for LLM agents                   |
|                                    | tool poisoning                     | Tool Poisoning]]                                  | Identified in **~5%** of servers in another analysis [3] |
| **Resource & Access Control**      | Unrestricted Network Access (SSRF) | Found in **33%** of servers in one study [2]      |                                                          |
|                                    | Insecure File System Access        | Found in **22%** of servers in the same study [2] |                                                          |

### The confused deputy problem

In this scenario, an attacker tricks a legitimate [[MCP server]] into misusing its authority, for example, by manipulating it to redirect an authorization code to a malicious [[MCP client|client]]. This exploits the trust relationship between the client and the server.

**Mitigation**: The MCP specification requires that servers obtain explicit [[mcp consent|consent]] for every dynamically registered client before forwarding authorization requests, which helps prevent this type of abuse [4].

### Tool poisoning

Attackers can manipulate the metadata of a [[AI tool|tool]] to misrepresent its function, causing an [[AI agent]] to select it for a task it is not intended for. The agent makes a decision based on this deceptive description without ever executing the tool, potentially leading to data exfiltration or other unauthorized actions.

**Mitigation**:

- Maintain a curated registry of verified and trusted tools.
- Implement monitoring to detect anomalous agent decision patterns.
- Validate the integrity of tool metadata before it is presented to an agent.

### Supply chain vulnerabilities

Security flaws in popular, third-party MCP packages can create widespread vulnerabilities. A prominent example is **CVE-2025-6514**, a critical command injection vulnerability in the `mcp-remote` package that allowed remote code execution. This single vulnerability affected over **437,000 users** and highlighted the significant risks associated with supply chain security in the MCP ecosystem.

**Mitigation**:

- Thoroughly vet all third-party dependencies.
- Prefer MCP servers and clients with built-in security controls.
- Run all MCP components in sandboxed and containerized environments to limit the blast radius of a potential compromise.

## Security best practices

1.  **Least Privilege**: Grant [[MCP server|servers]] and [[AI agent|AI agents]] only the minimum permissions required to perform their intended functions.
2.  **Input Sanitization**: Treat all external inputs (including prompts), data, and [[AI tool|tool]] responses as untrusted and validate them rigorously.
3.  **Secret Management**: Use dedicated secret management solutions like HashiCorp Vault or AWS Secrets Manager instead of environment variables or hardcoded credentials.
4.  **Network Isolation**: Restrict network access for MCP components, using whitelists to define allowed connections.
5.  **Verified Tool Registry**: Limit agent access to a pre-approved list of trusted and verified tools.
6.  **Sandboxed Execution**: Isolate the execution environment for all MCP components to contain potential security breaches.
7.  **Immutable Audit Trails**: Maintain comprehensive and tamper-evident logs of all agent actions to support [[mcp provenance|provenance]] and facilitate incident response.

## Conclusion

Securing the Model Context Protocol requires a multi-faceted approach. It involves strict adherence to the protocol's foundational security requirements, disciplined operational practices, and the implementation of defenses against both established and emerging AI-specific threats. By combining the protocol’s built-in security features with robust enterprise security practices, organizations can leverage the power of AI agents safely and effectively.

---

## References

[1] [MCP Security Best Practices - Official Spec](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices)

[2] [Top 10 MCP Security Risks (Prompt Security)](https://www.prompt.security/blog/top-10-mcp-security-risks)

[3] [MCP Security Issues Threatening AI Infrastructure (Docker Blog)](https://www.docker.com/blog/mcp-security-issues-threatening-ai-infrastructure/)

[4] [MCP Authorization - Official Spec](https://modelcontextprotocol.io/specification/draft/basic/authorization)
