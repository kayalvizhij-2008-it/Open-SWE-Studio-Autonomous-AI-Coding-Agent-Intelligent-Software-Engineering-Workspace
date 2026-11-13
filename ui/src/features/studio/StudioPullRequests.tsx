import { useState } from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { GitPullRequestIcon } from "@phosphor-icons/react/dist/ssr/GitPullRequest"
import { FileCodeIcon } from "@phosphor-icons/react/dist/ssr/FileCode"
import { ChatCircleDotsIcon } from "@phosphor-icons/react/dist/ssr/ChatCircleDots"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight"
import FibreArc from "@/components/FibreArc"
import { cn } from "@/lib/utils"
import type { StudioTab } from "./StudioSidebar"

interface StudioPullRequestsProps {
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

export function StudioPullRequests({ onNavigateTab }: StudioPullRequestsProps) {
  const [activeTab, setActiveTab] = useState<"changes" | "checks" | "conversation">("changes")
  const [approved, setApproved] = useState<boolean>(false)

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
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
            bundle={{ comb: 150, curve: 330, spread: 260, thickness: 50 }}
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
              <div className="flex items-center gap-2.5">
                <GitPullRequestIcon size={20} className="text-[#FF7548]" weight="bold" />
                <h1 className="font-heading text-xl font-bold tracking-tight text-[#F4F0E8]">
                  Pull Request #1247
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#A8D96C]/40 bg-[#A8D96C]/10 px-2.5 py-0.5 text-xs font-semibold text-[#A8D96C]">
                  Open
                </span>
              </div>
              <p className="text-xs text-[#9A9DA6] mt-0.5 font-medium">
                feat: improve analytics dashboard with 3D fibre arc
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-[#30313A] bg-[#1B202A] px-4 py-2 text-xs font-semibold text-[#F4F0E8] hover:border-[#FF7548]/40 hover:bg-[#222836] transition-colors cursor-pointer"
            >
              Request Changes
            </button>
            <button
              type="button"
              onClick={() => setApproved(!approved)}
              className="studio-glow-btn rounded-xl px-5 py-2 text-xs font-bold cursor-pointer"
            >
              {approved ? "Approved ✓" : "Approve"}
            </button>
          </div>
        </div>
      </div>

      {/* Main PR Body */}
      <div className="studio-card p-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#30313A] pb-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("changes")}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeTab === "changes"
                ? "bg-[#1B202A] text-[#FF7548] font-semibold border border-[#30313A]"
                : "text-[#9A9DA6] hover:text-[#F4F0E8]"
            )}
          >
            Changes (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("checks")}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeTab === "checks"
                ? "bg-[#1B202A] text-[#FF7548] font-semibold border border-[#30313A]"
                : "text-[#9A9DA6] hover:text-[#F4F0E8]"
            )}
          >
            Checks (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("conversation")}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeTab === "conversation"
                ? "bg-[#1B202A] text-[#FF7548] font-semibold border border-[#30313A]"
                : "text-[#9A9DA6] hover:text-[#F4F0E8]"
            )}
          >
            Conversation
          </button>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Changed Files List */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#F4F0E8] flex items-center gap-2">
              <FileCodeIcon size={16} className="text-[#FF7548]" />
              <span>Changed Files</span>
            </h3>

            <div className="space-y-2">
              {[
                { file: "src/components/Dashboard.tsx", changes: "+124", badge: "text-[#A8D96C]" },
                { file: "src/lib/analytics.ts", changes: "+46", badge: "text-[#A8D96C]" },
                { file: "package.json", changes: "+2", badge: "text-[#A8D96C]" },
              ].map((f) => (
                <div
                  key={f.file}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#30313A] bg-[#1B202A] hover:border-[#FF7548]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCodeIcon size={14} className="text-[#9A9DA6] shrink-0" />
                    <span className="text-xs font-mono text-[#F4F0E8] truncate">
                      {f.file}
                    </span>
                  </div>
                  <span className={cn("text-xs font-mono font-semibold", f.badge)}>
                    {f.changes}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Code Review Card & CI Checks Card */}
          <div className="space-y-4">
            {/* Code Review Card */}
            <div className="rounded-xl border border-[#30313A] bg-[#1B202A] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-6 rounded-full bg-gradient-to-tr from-[#FF7548] to-[#F56B3A] flex items-center justify-center text-[10px] font-bold text-[#0B0D12]">
                    CR
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F4F0E8]">Code Review</p>
                    <p className="text-[10px] text-[#9A9DA6]">2h ago</p>
                  </div>
                </div>
                <ChatCircleDotsIcon size={16} className="text-[#FF7548]" />
              </div>

              <p className="text-xs text-[#F4F0E8] bg-[#141820] p-3 rounded-lg border border-[#232630] leading-relaxed">
                Consider adding error handling for API calls.
              </p>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#FF7548] hover:text-[#FF8A63] transition-colors"
              >
                <span>View in file</span>
                <ArrowUpRightIcon size={12} />
              </button>
            </div>

            {/* CI Checks Card */}
            <div className="rounded-xl border border-[#30313A] bg-[#1B202A] p-4 space-y-3">
              <h4 className="text-xs font-semibold text-[#F4F0E8]">CI Checks</h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#F4F0E8]">
                    <CheckCircleIcon size={15} weight="fill" className="text-[#A8D96C]" />
                    <span>build</span>
                  </div>
                  <span className="text-[11px] text-[#A8D96C] font-semibold">Passed</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#F4F0E8]">
                    <CheckCircleIcon size={15} weight="fill" className="text-[#A8D96C]" />
                    <span>lint</span>
                  </div>
                  <span className="text-[11px] text-[#A8D96C] font-semibold">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
