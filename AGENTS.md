# PROJECT KNOWLEDGE BASE

> **⚠️ CUSTOM FORK: @carmandale/oh-my-opencode**
> 
> This is Dale Carman's fork with the **THINK. ALIGN. ACT.** paradigm.
> NOT the upstream npm release. Built and installed locally via `bun link`.
> 
> - **Upstream**: `code-yeongyu/oh-my-opencode` (npm: `oh-my-opencode`)
> - **This fork**: `carmandale/oh-my-opencode` (npm: `@carmandale/oh-my-opencode`)

**Branch:** master

## CUSTOM FORK DETAILS

### THINK. ALIGN. ACT. Paradigm

Location: `src/agents/paradigm/think-align-act.ts`

This module contains Dale's agent philosophy:
- **North Star**: Working code over perfect code
- **THINK**: Understand before touching anything  
- **ALIGN**: Get confirmation before significant actions
- **ACT**: Execute only after understanding and alignment
- **Safety Limits**: Agent spawning limits, git safety, scope creep prevention

The paradigm is imported into `sisyphus.ts` and composited into the system prompt.

### Local Build & Install

```bash
# Build and link locally
bun run local:install

# Use in OpenCode (run from ~/.config/opencode)
bun run local:use

# Or manually:
bun run rebuild && bun link
cd ~/.config/opencode && bun link @carmandale/oh-my-opencode
```

### Merging Upstream Changes

1. Fetch upstream: `git fetch upstream`
2. Check what's new: `git log HEAD..upstream/master --oneline`
3. Merge: `git merge upstream/master`
4. Resolve conflicts in `sisyphus.ts` (keep paradigm imports)
5. Rebuild: `bun run local:install`

The paradigm module is isolated - conflicts should only occur in:
- `src/agents/sisyphus.ts` (the import and composition)
- `package.json` (keep your custom name/scripts)

## OVERVIEW

OpenCode plugin implementing Claude Code/AmpCode features. Multi-model agent orchestration (GPT-5.2, Claude, Gemini, Grok), LSP tools (11), AST-Grep search, MCP integrations (context7, websearch_exa, grep_app). "oh-my-zsh" for OpenCode.

## STRUCTURE

```
oh-my-opencode/
├── src/
│   ├── agents/        # AI agents (OmO, oracle, librarian, explore, frontend, document-writer, multimodal-looker)
│   ├── hooks/         # 21 lifecycle hooks (comment-checker, rules-injector, keyword-detector, etc.)
│   ├── tools/         # LSP (11), AST-Grep, Grep, Glob, background-task, look-at, skill, slashcommand, interactive-bash, call-omo-agent
│   ├── mcp/           # MCP servers (context7, websearch_exa, grep_app)
│   ├── features/      # Terminal, Background agent, Claude Code loaders (agent, command, skill, mcp, session-state), hook-message-injector
│   ├── config/        # Zod schema, TypeScript types
│   ├── auth/          # Google Antigravity OAuth
│   ├── shared/        # Utilities (deep-merge, pattern-matcher, logger, etc.)
│   └── index.ts       # Main plugin entry (OhMyOpenCodePlugin)
├── script/            # build-schema.ts, publish.ts
├── assets/            # JSON schema
└── dist/              # Build output (ESM + .d.ts)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new agent | `src/agents/` | Create .ts file, add to builtinAgents in index.ts, update types.ts |
| Add new hook | `src/hooks/` | Create dir with createXXXHook(), export from index.ts |
| Add new tool | `src/tools/` | Dir with index/types/constants/tools.ts, add to builtinTools |
| Add MCP server | `src/mcp/` | Create config, add to index.ts |
| Modify LSP behavior | `src/tools/lsp/` | client.ts for connection, tools.ts for handlers |
| AST-Grep patterns | `src/tools/ast-grep/` | napi.ts for @ast-grep/napi binding |
| Google OAuth | `src/auth/antigravity/` | OAuth plugin for Google models |
| Config schema | `src/config/schema.ts` | Zod schema, run `bun run build:schema` after changes |
| Claude Code compat | `src/features/claude-code-*-loader/` | Command, skill, agent, mcp loaders |
| Background agents | `src/features/background-agent/` | manager.ts for task management |
| Interactive terminal | `src/tools/interactive-bash/` | tmux session management |

## CONVENTIONS

- **Package manager**: Bun only (`bun run`, `bun build`, `bunx`)
- **Types**: bun-types (not @types/node)
- **Build**: Dual output - `bun build` (ESM) + `tsc --emitDeclarationOnly`
- **Exports**: Barrel pattern - `export * from "./module"` in index.ts
- **Directory naming**: kebab-case (`ast-grep/`, `claude-code-hooks/`)
- **Tool structure**: Each tool has index.ts, types.ts, constants.ts, tools.ts, utils.ts
- **Hook pattern**: `createXXXHook(input: PluginInput)` returning event handlers

## ANTI-PATTERNS (THIS PROJECT)

- **npm/yarn**: Use bun exclusively
- **@types/node**: Use bun-types
- **Bash file operations**: Never use mkdir/touch/rm/cp/mv for file creation in code
- **Generic AI aesthetics**: No Space Grotesk, avoid typical AI-generated UI patterns
- **Direct bun publish**: Use GitHub Actions workflow_dispatch only (OIDC provenance)
- **Local version bump**: Version managed by CI workflow, never modify locally
- **Rush completion**: Never mark tasks complete without verification
- **Interrupting work**: Complete tasks fully before stopping

## UNIQUE STYLES

- **Platform handling**: Union type `"darwin" | "linux" | "win32" | "unsupported"`
- **Optional props**: Extensive use of `?` for optional interface properties
- **Flexible objects**: `Record<string, unknown>` for dynamic configs
- **Error handling**: Consistent try/catch with async/await in all tools
- **Agent tools restriction**: Use `tools: { include: [...] }` or `tools: { exclude: [...] }`
- **Temperature**: Most agents use `0.1` for consistency
- **Hook naming**: `createXXXHook` function naming convention

## AGENT MODELS

| Agent | Model | Purpose |
|-------|-------|---------|
| OmO | anthropic/claude-opus-4-5 | Primary orchestrator, team leader |
| oracle | openai/gpt-5.2 | Strategic advisor, code review, architecture |
| librarian | anthropic/claude-sonnet-4-5 | Multi-repo analysis, docs lookup, GitHub examples |
| explore | opencode/grok-code | Fast codebase exploration, file patterns |
| frontend-ui-ux-engineer | google/gemini-3-pro-preview | UI generation, design-focused |
| document-writer | google/gemini-3-pro-preview | Technical documentation |
| multimodal-looker | google/gemini-2.5-flash | PDF/image/diagram analysis |

## COMMANDS

```bash
# Type check
bun run typecheck

# Build (ESM + declarations + schema)
bun run build

# Clean + Build
bun run rebuild

# Build schema only
bun run build:schema
```

## DEPLOYMENT

**This fork is NOT published to npm. Use local build only.**

```bash
# Build and install locally
bun run local:install

# After changes, rebuild:
bun run rebuild && bun link
```

### Upstream Deployment (for reference)

The upstream repo uses GitHub Actions workflow_dispatch for npm publishing.
This fork does NOT use that workflow - we build locally.

## NOTES

- **No tests**: Test framework not configured
- **OpenCode version**: Requires >= 1.0.150 (earlier versions have config bugs)
- **Multi-language docs**: README.md (EN), README.ko.md (KO), README.ja.md (JA)
- **Config locations**: `~/.config/opencode/oh-my-opencode.json` (user) or `.opencode/oh-my-opencode.json` (project)
- **Schema autocomplete**: Add `$schema` field in config for IDE support
- **Trusted dependencies**: @ast-grep/cli, @ast-grep/napi, @code-yeongyu/comment-checker
