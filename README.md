# Open SWE Studio 🚀
### Autonomous AI Coding Agent | Intelligent Software Engineering Workspace

**Plan. Code. Execute. Validate. Deliver.**

Open SWE Studio is a modern AI-powered software engineering workspace built around the Open SWE autonomous coding agent architecture. It provides an intuitive developer experience for delegating software engineering tasks to autonomous agents, monitoring execution, reviewing code changes, and managing development workflows.

Powered by **LangGraph and Deep Agents**, the project brings autonomous software development workflows into a visually immersive, interactive workspace.

---

## ✨ Vision

Imagine describing a software engineering task in natural language and having an AI agent take responsibility for the development workflow.

Open SWE Studio aims to make that experience more accessible through an integrated workspace where developers can initiate tasks, monitor agent activity, inspect code changes, and follow the journey from an engineering request to a potential pull request.

Rather than being just another AI chatbot, it is designed around an agent-driven software engineering workflow.

## 🎯 Core Capabilities

### 🤖 Autonomous Coding Workflows
- Delegate software engineering tasks to AI agents.
- Leverage the existing Open SWE agent architecture.
- Support repository-aware development workflows.
- Track task execution and agent progress.

### ⚡ Intelligent Agent Workspace
- Interactive task execution interface.
- Conversation-based development workflow.
- Execution activity and progress visibility.
- Context-aware task continuation where supported.

### 🔍 Code Review & Pull Requests
- Inspect generated code changes.
- View repository and pull request information where available.
- Monitor review and validation workflows.
- Connect development tasks with GitHub workflows.

### 📂 Repository & Workspace Management
- Explore connected repositories.
- Organize development workspaces.
- Access repository-specific context.
- Configure supported integrations.

### 📊 Development Mission Control
- Centralized execution overview.
- Recent task activity.
- Agent run history.
- Repository and workflow visibility.

### 🎨 Immersive Developer Experience
- Premium dark interface.
- Custom shader-based Fibre Arc WebGL animation.
- Interactive visual elements.
- Responsive layouts and modern navigation.
- Consistent visual experience across application pages.

---

## 🧠 Technology Stack

| Technology | Purpose |
|---|---|
| LangGraph | Agent orchestration |
| Deep Agents | Autonomous coding workflows |
| Python | Backend implementation |
| FastAPI | Backend API |
| TypeScript | Frontend development |
| React | User interface |
| Vite | Frontend tooling |
| Tailwind CSS | Interface styling |
| WebGL / GLSL | Fibre Arc visual experience |
| GitHub | Repository and development workflows |

*The exact technologies and integrations depend on the upstream Open SWE version and project configuration.*

---

## 🏗️ Architecture

Open SWE Studio builds its experience around the original Open SWE architecture.

**High-level workflow:**

1. **Task Input** – A developer describes the required engineering task.
2. **Agent Orchestration** – The existing agent runtime processes the request.
3. **Repository Context** – The agent works with the configured repository and development environment.
4. **Execution** – Supported tools and sandbox environments perform development operations.
5. **Validation** – Available checks and execution results are evaluated.
6. **Delivery** – Results, code changes and pull request information are surfaced in the workspace where supported.

The original backend architecture and API contracts are preserved rather than replaced with simulated functionality.

---

## 🎨 Design Philosophy

Open SWE Studio combines engineering functionality with an immersive visual identity.

- Midnight charcoal surfaces.
- Copper-orange and warm amber highlights.
- Carefully layered dashboard components.
- Custom Fibre Arc shader animation.
- Clear information hierarchy.
- Responsive developer-focused layouts.

The visual system is designed to communicate intelligence, precision and continuous execution.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kayalvizhij-2008-it/Open-SWE-Studio-Autonomous-AI-Coding-Agent-Intelligent-Software-Engineering-Workspace.git
cd Open-SWE-Studio-Autonomous-AI-Coding-Agent-Intelligent-Software-Engineering-Workspace
```

### 2. Install dependencies

```bash
# Frontend Studio dependencies
cd ui
pnpm install

# Root dependencies
pnpm install
```

### 3. Configure environment variables

Configure the required credentials and services using the upstream environment setup instructions.

Depending on the deployment, this may include:
- Model provider credentials.
- GitHub App configuration.
- Managed Deep Agents / LangGraph configuration.
- Sandbox provider credentials.
- Optional integrations.

Never commit `.env` files or secrets.

### 4. Start the application

#### Studio UI Development Server
```bash
cd ui
pnpm dev
```
Open your browser at `http://localhost:3000` (or `http://localhost:5173`) to launch the Open SWE Studio interface with the Fibre Arc 3D visualization.

#### Backend Agent Services
```bash
# Run backend LangGraph / Python services
pnpm start
```

---

## 🔐 Security & Reliability

- Preserve existing authentication and authorization.
- Keep credentials on the server side.
- Use configured sandbox environments for agent execution.
- Respect repository permissions.
- Avoid exposing private environment variables.
- Clearly distinguish unavailable integrations from operational features.

---

## 🌟 Project Goals

Open SWE Studio explores how autonomous AI agents can improve software engineering workflows.

Its broader goals include:

- Reducing repetitive development tasks.
- Making AI-assisted coding workflows more transparent.
- Improving visibility into autonomous execution.
- Simplifying repository-aware task delegation.
- Creating a unified interface for AI-driven engineering operations.

---

## 🔗 Original Project

**Open SWE by LangChain**

https://github.com/langchain-ai/open-swe

Open SWE Studio is a frontend-focused project built around the upstream Open SWE architecture. It is an independent presentation and development experience, not an official LangChain product.

---

## 👩‍💻 Project

**Open SWE Studio**

*Where autonomous intelligence meets modern software engineering.*

**Plan smarter. Build faster. Ship with confidence.**
