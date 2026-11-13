import { useState } from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight"
import { GitBranchIcon } from "@phosphor-icons/react/dist/ssr/GitBranch"
import { GitPullRequestIcon } from "@phosphor-icons/react/dist/ssr/GitPullRequest"
import { StarIcon } from "@phosphor-icons/react/dist/ssr/Star"
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { PlayCircleIcon } from "@phosphor-icons/react/dist/ssr/PlayCircle"
import FibreArc from "@/components/FibreArc"
import { useRepos } from "@/lib/profile"
import { useSidebarRecents, useSidebarPinnedThreads } from "@/features/agents/lib/queries"
import { cn } from "@/lib/utils"
import type { StudioTab } from "./StudioSidebar"

interface StudioOverviewProps {
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

interface DisplayRepo {
  full_name: string
  name: string
  stars?: number
}

interface DisplayPR {
  number: number
  title: string
  state: string
}

export function StudioOverview({ onNavigateTab }: StudioOverviewProps) {
  const [metricRange, setMetricRange] = useState<"7d" | "30d" | "90d">("7d")

  // Real backend queries
  const reposQuery = useRepos()
  const recentsQuery = useSidebarRecents({
    repoMode: false,
    includeAutomations: true,
    includeResolved: false,
    owned: false,
    includeClaudeCode: true,
    includeSlack: true,
    sort: "created",
    enabled: true,
  })
  const pinnedQuery = useSidebarPinnedThreads({ enabled: true })

  const realRepos: DisplayRepo[] = (reposQuery.data?.repositories ?? []).map((r) => ({
    full_name: r.full_name,
    name: r.full_name.split("/").pop() || r.full_name,
    stars: 120,
  }))

  const sampleRepos: DisplayRepo[] = [
    { full_name: "open-swe-app", name: "open-swe-app", stars: 1240 },
    { full_name: "langgraph-agent", name: "langgraph-agent", stars: 820 },
    { full_name: "ai-tools-suite", name: "ai-tools-suite", stars: 456 },
  ]

  const repos = realRepos.length > 0 ? realRepos : sampleRepos
  const recentThreads = recentsQuery.items ?? []
  const pinnedThreads = pinnedQuery.data ?? []
  const allRuns = [...pinnedThreads, ...recentThreads]

  const samplePRs: DisplayPR[] = [
    { number: 124, title: "feat: improve planning logic", state: "Merged 2h ago" },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Welcome Banner with Fibre Arc background */}
      <div className="relative overflow-hidden rounded-2xl border border-[#30313A] bg-[#141820] shadow-2xl">
        {/* Fibre Arc 3D Canvas Background */}
        <div className="absolute inset-0 z-0 opacity-75 pointer-events-none">
          <FibreArc
            height="100%"
            width="100%"
            background="#141820"
            baseColor="#FF7548"
            accentColor="#F5B66B"
            highlight="#FFF4E7"
            speed={50}
            density={22}
            direction={180}
            bundle={{ comb: 170, curve: 380, spread: 280, thickness: 65 }}
            interactive={false}
          />
          {/* Subtle directional gradient overlay so text is crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141820] via-[#141820]/75 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-xl p-8 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF7548]/30 bg-[#FF7548]/10 px-3 py-1 text-xs font-semibold text-[#FF7548] mb-4">
            <SparkleIcon size={14} weight="fill" />
            <span>Autonomous Intelligence Engine</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F4F0E8] mb-3">
            Welcome to <span className="text-[#FF7548]">Open SWE Studio</span>
          </h1>

          <p className="text-sm sm:text-base text-[#9A9DA6] leading-relaxed mb-6">
            Your autonomous coding partner built on LangChain Open SWE.
            Plan, code, verify, and ship production-ready pull requests seamlessly.
          </p>

          <button
            type="button"
            onClick={() => onNavigateTab("new-task")}
            className="studio-glow-btn inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold cursor-pointer"
          >
            <span>Start a task</span>
            <ArrowRightIcon size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* 2x2 Grid of Main Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Active Agent Runs */}
        <div className="studio-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#30313A]">
              <div className="flex items-center gap-2">
                <PlayCircleIcon size={18} className="text-[#FF7548]" weight="fill" />
                <h2 className="font-heading text-base font-semibold text-[#F4F0E8]">
                  Active Agent Runs
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab("runs")}
                className="text-xs font-medium text-[#FF7548] hover:text-[#FF8A63] flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRightIcon size={12} />
              </button>
            </div>

            <div className="divide-y divide-[#20232D] mt-2">
              {allRuns.length > 0 ? (
                allRuns.slice(0, 3).map((thread) => {
                  const isRunning = !thread.resolved && thread.status === "running"
                  return (
                    <div
                      key={thread.id}
                      onClick={() => onNavigateTab("runs", { threadId: thread.id })}
                      className="group flex items-center justify-between py-3 cursor-pointer hover:bg-[#1B202A]/50 px-2 rounded-lg transition-colors"
                    >
                      <div className="min-w-0 pr-3">
                        <p className="text-xs font-medium text-[#F4F0E8] group-hover:text-[#FF7548] truncate transition-colors">
                          {thread.title || "Autonomous Task"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full",
                              isRunning
                                ? "bg-[#FF7548]/15 text-[#FF7548] border border-[#FF7548]/30"
                                : "bg-[#A8D96C]/15 text-[#A8D96C] border border-[#A8D96C]/30"
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 rounded-full",
                                isRunning ? "bg-[#FF7548] animate-ping" : "bg-[#A8D96C]"
                              )}
                            />
                            {isRunning ? "Running • Active" : "Completed"}
                          </span>
                          <span className="text-[10px] text-[#9A9DA6]">
                            {new Date(thread.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Sparkline wave visualizer */}
                      <div className="shrink-0 w-20 h-6 flex items-center">
                        <svg viewBox="0 0 80 24" className="w-full h-full text-[#FF7548]">
                          <path
                            d="M0 12 Q 10 4, 20 12 T 40 12 T 60 12 T 80 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className={isRunning ? "animate-pulse" : "opacity-50"}
                          />
                        </svg>
                      </div>
                    </div>
                  )
                })
              ) : (
                // Sample items matching reference design
                <>
                  <div
                    onClick={() => onNavigateTab("runs")}
                    className="group flex items-center justify-between py-3 cursor-pointer hover:bg-[#1B202A]/50 px-2 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#F4F0E8] group-hover:text-[#FF7548] truncate">
                        Fix authentication flow
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FF7548]/15 text-[#FF7548] border border-[#FF7548]/30">
                          <span className="size-1.5 rounded-full bg-[#FF7548] animate-ping" />
                          Running • 12 min
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 w-20 h-6">
                      <svg viewBox="0 0 80 24" className="w-full h-full text-[#FF7548]">
                        <path
                          d="M0 14 Q 15 2, 30 14 T 60 10 T 80 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    onClick={() => onNavigateTab("runs")}
                    className="group flex items-center justify-between py-3 cursor-pointer hover:bg-[#1B202A]/50 px-2 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#F4F0E8] group-hover:text-[#FF7548] truncate">
                        Add analytics dashboard
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5B66B]/15 text-[#F5B66B] border border-[#F5B66B]/30">
                          <span className="size-1.5 rounded-full bg-[#F5B66B]" />
                          Planning • 3 min
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 w-20 h-6">
                      <svg viewBox="0 0 80 24" className="w-full h-full text-[#F5B66B]">
                        <path
                          d="M0 12 Q 20 6, 40 12 T 80 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    onClick={() => onNavigateTab("runs")}
                    className="group flex items-center justify-between py-3 cursor-pointer hover:bg-[#1B202A]/50 px-2 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#F4F0E8] group-hover:text-[#FF7548] truncate">
                        Refactor API modules
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#9A9DA6]/15 text-[#9A9DA6] border border-[#9A9DA6]/30">
                          Queued
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 w-20 h-6">
                      <svg viewBox="0 0 80 24" className="w-full h-full text-[#9A9DA6]">
                        <path
                          d="M0 12 L 80 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Your Repositories */}
        <div className="studio-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#30313A]">
              <div className="flex items-center gap-2">
                <GitBranchIcon size={18} className="text-[#FF7548]" weight="bold" />
                <h2 className="font-heading text-base font-semibold text-[#F4F0E8]">
                  Your Repositories
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab("repositories")}
                className="text-xs font-medium text-[#FF7548] hover:text-[#FF8A63] flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRightIcon size={12} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {repos.slice(0, 3).map((r: DisplayRepo) => (
                <div
                  key={r.full_name}
                  onClick={() => onNavigateTab("new-task", { repo: r.full_name })}
                  className="group rounded-xl border border-[#30313A] bg-[#1B202A] p-3.5 hover:border-[#FF7548]/40 hover:bg-[#222836] transition-all cursor-pointer"
                >
                  <GitBranchIcon size={16} className="text-[#FF7548] mb-2" />
                  <p className="text-xs font-semibold text-[#F4F0E8] truncate group-hover:text-[#FF7548] transition-colors">
                    {r.name}
                  </p>
                  <p className="text-[10px] text-[#9A9DA6] mt-1">
                    Updated recently
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#F5B66B] mt-2">
                    <StarIcon size={12} weight="fill" />
                    <span>{r.stars ? `${(r.stars / 1000).toFixed(1)}k` : "1.2k"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Recent Pull Requests */}
        <div className="studio-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#30313A]">
              <div className="flex items-center gap-2">
                <GitPullRequestIcon size={18} className="text-[#FF7548]" weight="bold" />
                <h2 className="font-heading text-base font-semibold text-[#F4F0E8]">
                  Recent Pull Requests
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab("pull-requests")}
                className="text-xs font-medium text-[#FF7548] hover:text-[#FF8A63] flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRightIcon size={12} />
              </button>
            </div>

            <div className="mt-3 space-y-2.5">
              {samplePRs.map((pr: DisplayPR) => (
                <div
                  key={pr.number}
                  onClick={() => onNavigateTab("pull-requests")}
                  className="group flex items-center justify-between p-3 rounded-xl border border-[#30313A] bg-[#1B202A] hover:border-[#FF7548]/40 hover:bg-[#222836] transition-all cursor-pointer"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-semibold text-[#F4F0E8] group-hover:text-[#FF7548] truncate transition-colors">
                      {pr.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#9A9DA6]">
                      <span>#{pr.number}</span>
                      <span>•</span>
                      <span className="text-[#A8D96C]">{pr.state}</span>
                    </div>
                  </div>
                  <CheckCircleIcon size={18} weight="fill" className="text-[#A8D96C] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 4: Usage Metrics */}
        <div className="studio-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#30313A]">
              <h2 className="font-heading text-base font-semibold text-[#F4F0E8]">
                Usage Metrics
              </h2>
              <div className="flex items-center gap-1 rounded-lg border border-[#30313A] bg-[#1B202A] p-0.5 text-[11px]">
                {(["7d", "30d", "90d"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMetricRange(r)}
                    className={cn(
                      "px-2 py-0.5 rounded font-medium transition-colors",
                      metricRange === r
                        ? "bg-[#FF7548] text-[#0B0D12] font-semibold"
                        : "text-[#9A9DA6] hover:text-[#F4F0E8]"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="text-3xl font-extrabold text-[#F4F0E8]">48</p>
                <p className="text-xs text-[#9A9DA6]">Tasks executed</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-[#A8D96C]">92%</p>
                <p className="text-xs text-[#9A9DA6]">Success Rate</p>
              </div>
            </div>

            {/* Glowing Copper/Amber Area Chart */}
            <div className="mt-4 h-16 w-full">
              <svg viewBox="0 0 300 70" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF7548" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF7548" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 55 Q 50 45, 100 20 T 200 35 T 300 15 L 300 70 L 0 70 Z"
                  fill="url(#metricGrad)"
                />
                <path
                  d="M0 55 Q 50 45, 100 20 T 200 35 T 300 15"
                  fill="none"
                  stroke="#FF7548"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
