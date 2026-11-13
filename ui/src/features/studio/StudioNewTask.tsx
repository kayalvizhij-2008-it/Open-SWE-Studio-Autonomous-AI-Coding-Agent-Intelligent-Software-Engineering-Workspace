import { useState, type FormEvent } from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { GitBranchIcon } from "@phosphor-icons/react/dist/ssr/GitBranch"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { CpuIcon } from "@phosphor-icons/react/dist/ssr/Cpu"
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle"
import FibreArc from "@/components/FibreArc"
import { useRepos } from "@/lib/profile"
import { cn } from "@/lib/utils"
import type { StudioTab } from "./StudioSidebar"

interface StudioNewTaskProps {
  initialRepo?: string
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

export function StudioNewTask({ initialRepo, onNavigateTab }: StudioNewTaskProps) {
  const reposQuery = useRepos()
  const rawRepos = reposQuery.data?.repositories ?? []
  const repos = rawRepos.map((r) => ({ full_name: r.full_name }))

  const defaultRepo = initialRepo ?? (repos[0]?.full_name || "open-swe-app")
  const [selectedRepo, setSelectedRepo] = useState<string>(defaultRepo)
  const [planMode, setPlanMode] = useState<boolean>(true)
  const [taskDescription, setTaskDescription] = useState<string>(
    "Add a modern analytics dashboard with real-time insights and a beautiful 3D fibre arc visualization."
  )
  const [selectedModel, setSelectedModel] = useState<string>("Claude 3.5 Sonnet")
  const [reasoningEffort, setReasoningEffort] = useState<"Low" | "Medium" | "High">("High")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault()
    if (!taskDescription.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onNavigateTab("runs")
    }, 600)
  }

  const samplePrompts = [
    "Add real-time telemetry sparklines to active tasks",
    "Integrate 3D Fibre Arc WebGL into the workspace layout",
    "Refactor GitHub review webhook handler for parallel checks",
    "Fix auth token refresh race condition in session loop",
  ]

  return (
    <div className="relative space-y-6 pb-12">
      {/* Header with Back button and Fibre Arc atmosphere */}
      <div className="relative overflow-hidden rounded-2xl border border-[#30313A] bg-[#141820] p-6 shadow-xl">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <FibreArc
            height="100%"
            width="100%"
            background="#141820"
            baseColor="#FF7548"
            accentColor="#F5B66B"
            highlight="#FFF4E7"
            density={16}
            speed={35}
            direction={180}
            bundle={{ comb: 150, curve: 350, spread: 260, thickness: 50 }}
            interactive={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141820] via-[#141820]/80 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("overview")}
              className="flex size-9 items-center justify-center rounded-xl border border-[#30313A] bg-[#1B202A] text-[#9A9DA6] hover:border-[#FF7548]/40 hover:text-[#F4F0E8] transition-colors"
            >
              <ArrowLeftIcon size={16} />
            </button>
            <div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#F4F0E8]">
                New Task
              </h1>
              <p className="text-xs text-[#9A9DA6]">
                Configure target repository, requirements, and execution intelligence.
              </p>
            </div>
          </div>

          {/* Plan Mode Switch */}
          <div className="flex items-center gap-3 rounded-xl border border-[#30313A] bg-[#1B202A] px-4 py-2">
            <div>
              <p className="text-xs font-semibold text-[#F4F0E8]">Plan Mode</p>
              <p className="text-[10px] text-[#9A9DA6]">
                Let the agent plan before executing
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={planMode}
              onClick={() => setPlanMode(!planMode)}
              className={cn(
                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                planMode ? "bg-[#FF7548]" : "bg-[#30313A]"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block size-4 transform rounded-full bg-[#0B0D12] shadow-lg ring-0 transition duration-200 ease-in-out",
                  planMode ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleCreateTask} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Repository & Task Description (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Repository Selector */}
          <div className="studio-card p-6">
            <label className="block text-xs font-semibold text-[#F4F0E8] mb-2 flex items-center gap-2">
              <GitBranchIcon size={16} className="text-[#FF7548]" />
              <span>Target Repository</span>
            </label>
            <div className="relative">
              <select
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#30313A] bg-[#1B202A] px-4 py-2.5 text-sm text-[#F4F0E8] focus:border-[#FF7548] focus:outline-none transition-colors"
              >
                {repos.length > 0 ? (
                  repos.map((r: { full_name: string }) => (
                    <option key={r.full_name} value={r.full_name} className="bg-[#141820]">
                      {r.full_name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="open-swe-app" className="bg-[#141820]">
                      open-swe-app
                    </option>
                    <option value="langgraph-agent" className="bg-[#141820]">
                      langgraph-agent
                    </option>
                    <option value="ai-tools-suite" className="bg-[#141820]">
                      ai-tools-suite
                    </option>
                  </>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9A9DA6]">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Task Description */}
          <div className="studio-card p-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#F4F0E8] flex items-center gap-2">
                <SparkleIcon size={16} className="text-[#FF7548]" weight="fill" />
                <span>Task Description</span>
              </label>
              <span className="text-[11px] text-[#9A9DA6]">
                {taskDescription.length} / 2000
              </span>
            </div>

            <textarea
              rows={5}
              maxLength={2000}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Describe what you want the agent to build, refactor, or fix..."
              className="w-full rounded-xl border border-[#30313A] bg-[#1B202A] p-4 text-sm text-[#F4F0E8] placeholder-[#9A9DA6] focus:border-[#FF7548] focus:outline-none transition-colors leading-relaxed"
            />

            {/* Quick Suggestions */}
            <div className="mt-4">
              <p className="text-[11px] font-medium text-[#9A9DA6] mb-2">
                Quick Prompts:
              </p>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setTaskDescription(prompt)}
                    className="rounded-lg border border-[#30313A] bg-[#141820] px-2.5 py-1 text-[11px] text-[#9A9DA6] hover:border-[#FF7548]/40 hover:text-[#F4F0E8] transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Connected Integrations Status Badges */}
          <div className="studio-card p-5">
            <p className="text-xs font-semibold text-[#F4F0E8] mb-3">
              Active Integrations
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#A8D96C]/30 bg-[#A8D96C]/10 px-3.5 py-2 text-xs font-medium text-[#A8D96C]">
                <CheckCircleIcon size={16} weight="fill" />
                <span>GitHub Connected</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#A8D96C]/30 bg-[#A8D96C]/10 px-3.5 py-2 text-xs font-medium text-[#A8D96C]">
                <CheckCircleIcon size={16} weight="fill" />
                <span>Slack Connected</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#A8D96C]/30 bg-[#A8D96C]/10 px-3.5 py-2 text-xs font-medium text-[#A8D96C]">
                <CheckCircleIcon size={16} weight="fill" />
                <span>Linear Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Model & Reasoning + Primary Action */}
        <div className="space-y-6">
          {/* Model & Reasoning Card */}
          <div className="studio-card p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#30313A]">
              <CpuIcon size={18} className="text-[#FF7548]" />
              <h2 className="font-heading text-sm font-semibold text-[#F4F0E8]">
                Model &amp; Reasoning
              </h2>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9A9DA6] mb-1.5">
                Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#30313A] bg-[#1B202A] px-3.5 py-2 text-sm text-[#F4F0E8] focus:border-[#FF7548] focus:outline-none"
              >
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet (Hybrid)</option>
                <option value="GPT-4o">GPT-4o (OpenAI)</option>
                <option value="Gemini 2.5 Pro">Gemini 2.5 Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9A9DA6] mb-1.5">
                Reasoning Effort
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Low", "Medium", "High"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setReasoningEffort(level)}
                    className={cn(
                      "rounded-lg border py-1.5 text-xs font-semibold transition-all",
                      reasoningEffort === level
                        ? "border-[#FF7548] bg-[#FF7548]/15 text-[#FF7548]"
                        : "border-[#30313A] bg-[#1B202A] text-[#9A9DA6] hover:text-[#F4F0E8]"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#30313A] bg-[#1B202A]/60 p-3 text-xs text-[#9A9DA6] space-y-1.5">
              <div className="flex justify-between">
                <span>Execution Sandbox:</span>
                <span className="font-medium text-[#F4F0E8]">E2B MicroVM</span>
              </div>
              <div className="flex justify-between">
                <span>Verification:</span>
                <span className="font-medium text-[#A8D96C]">Full Test Suite</span>
              </div>
            </div>
          </div>

          {/* Primary Create Task Button */}
          <button
            type="submit"
            disabled={isSubmitting || !taskDescription.trim()}
            className="studio-glow-btn flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <span>{isSubmitting ? "Initializing Agent..." : "Create Task"}</span>
            <ArrowRightIcon size={16} weight="bold" />
          </button>
        </div>
      </form>
    </div>
  )
}
