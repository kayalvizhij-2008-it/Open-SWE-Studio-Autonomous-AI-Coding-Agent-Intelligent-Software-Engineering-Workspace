import { useState } from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { GitBranchIcon } from "@phosphor-icons/react/dist/ssr/GitBranch"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass"
import { StarIcon } from "@phosphor-icons/react/dist/ssr/Star"
import FibreArc from "@/components/FibreArc"
import { useRepos } from "@/lib/profile"
import type { StudioTab } from "./StudioSidebar"

interface StudioRepositoriesProps {
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

interface RepoItem {
  full_name: string
  name: string
  default_branch?: string
  stars?: number
}

export function StudioRepositories({ onNavigateTab }: StudioRepositoriesProps) {
  const [filter, setFilter] = useState<string>("")
  const reposQuery = useRepos()
  const rawRepos = reposQuery.data?.repositories ?? []

  const realRepos: RepoItem[] = rawRepos.map((r) => ({
    full_name: r.full_name,
    name: r.full_name.split("/").pop() || r.full_name,
    default_branch: "main",
    stars: 120,
  }))

  const sampleRepos: RepoItem[] = [
    { full_name: "open-swe-app", name: "open-swe-app", default_branch: "main", stars: 1240 },
    { full_name: "langgraph-agent", name: "langgraph-agent", default_branch: "main", stars: 820 },
    { full_name: "ai-tools-suite", name: "ai-tools-suite", default_branch: "main", stars: 456 },
  ]

  const repos: RepoItem[] = realRepos.length > 0 ? realRepos : sampleRepos

  const filtered = repos.filter((r) =>
    r.full_name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
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
            bundle={{ comb: 150, curve: 320, spread: 260, thickness: 50 }}
            interactive={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141820] via-[#141820]/80 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("overview")}
              className="flex size-9 items-center justify-center rounded-xl border border-[#30313A] bg-[#1B202A] text-[#9A9DA6] hover:border-[#FF7548]/40 hover:text-[#F4F0E8] transition-colors"
            >
              <ArrowLeftIcon size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <GitBranchIcon size={20} className="text-[#FF7548]" weight="bold" />
                <h1 className="font-heading text-xl font-bold tracking-tight text-[#F4F0E8]">
                  Connected Repositories
                </h1>
              </div>
              <p className="text-xs text-[#9A9DA6] mt-0.5">
                Authorized repositories available for autonomous agent workflows.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab("new-task")}
            className="studio-glow-btn flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold cursor-pointer"
          >
            <PlusIcon size={14} weight="bold" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filter and List */}
      <div className="studio-card p-6 space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon
            size={16}
            className="absolute left-3.5 top-3 text-[#9A9DA6]"
          />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter repositories..."
            className="w-full rounded-xl border border-[#30313A] bg-[#1B202A] pl-10 pr-4 py-2 text-xs text-[#F4F0E8] placeholder-[#9A9DA6] focus:border-[#FF7548] focus:outline-none"
          />
        </div>

        <div className="divide-y divide-[#232630]">
          {filtered.map((r) => (
            <div
              key={r.full_name}
              className="flex items-center justify-between py-3.5 px-2 hover:bg-[#1B202A]/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#0B0D12] border border-[#30313A] text-[#FF7548]">
                  <GitBranchIcon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#F4F0E8] truncate">
                    {r.full_name}
                  </p>
                  <p className="text-[11px] text-[#9A9DA6]">
                    Default branch: <span className="font-mono text-[#F5B66B]">{r.default_branch || "main"}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {r.stars !== undefined && (
                  <div className="hidden sm:flex items-center gap-1 text-xs text-[#F5B66B]">
                    <StarIcon size={14} weight="fill" />
                    <span>{r.stars}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onNavigateTab("new-task", { repo: r.full_name })}
                  className="rounded-lg border border-[#30313A] bg-[#1B202A] px-3 py-1.5 text-xs font-medium text-[#F4F0E8] hover:border-[#FF7548]/40 hover:text-[#FF7548] transition-colors"
                >
                  Start task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
