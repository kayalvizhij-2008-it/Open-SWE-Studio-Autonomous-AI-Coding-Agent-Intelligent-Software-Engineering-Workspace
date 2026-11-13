import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House"
import { PlusCircleIcon } from "@phosphor-icons/react/dist/ssr/PlusCircle"
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning"
import { GitPullRequestIcon } from "@phosphor-icons/react/dist/ssr/GitPullRequest"
import { GitBranchIcon } from "@phosphor-icons/react/dist/ssr/GitBranch"
import { StackIcon } from "@phosphor-icons/react/dist/ssr/Stack"
import { GearIcon } from "@phosphor-icons/react/dist/ssr/Gear"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight"
import { useSession } from "@/lib/session"
import { useAppCommandControls } from "@/lib/appCommands"
import { cn } from "@/lib/utils"

export type StudioTab =
  | "overview"
  | "new-task"
  | "runs"
  | "pull-requests"
  | "repositories"
  | "workspaces"
  | "settings"

interface StudioSidebarProps {
  activeTab: StudioTab
  onSelectTab: (tab: StudioTab) => void
  searchQuery?: string
  onSearchChange?: (q: string) => void
  className?: string
}

export function StudioSidebar({
  activeTab,
  onSelectTab,
  className,
}: StudioSidebarProps) {
  const session = useSession()
  const user = session.data
  const { openPalette } = useAppCommandControls()

  const navItems = [
    { id: "overview" as StudioTab, label: "Overview", icon: HouseIcon },
    { id: "new-task" as StudioTab, label: "New task", icon: PlusCircleIcon },
    { id: "runs" as StudioTab, label: "Runs", icon: LightningIcon },
    { id: "pull-requests" as StudioTab, label: "Pull requests", icon: GitPullRequestIcon },
    { id: "repositories" as StudioTab, label: "Repositories", icon: GitBranchIcon },
    { id: "workspaces" as StudioTab, label: "Workspaces", icon: StackIcon },
    { id: "settings" as StudioTab, label: "Settings", icon: GearIcon },
  ]

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-[#30313A] bg-[#0E1118]/95 backdrop-blur-md select-none",
        className
      )}
    >
      {/* Brand Mini Header */}
      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF7548] to-[#F56B3A] p-1.5 shadow-md shadow-[#FF7548]/25">
          <svg viewBox="0 0 24 24" fill="none" className="size-4 text-[#0B0D12]">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-heading text-sm font-bold tracking-tight text-[#F4F0E8]">
            OPEN SWE
          </span>
          <span className="text-xs text-[#9A9DA6] font-medium">Studio</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="px-3 pb-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() => openPalette?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openPalette?.()
          }}
          className="group flex w-full items-center gap-2 rounded-lg border border-[#30313A] bg-[#141820] px-3 py-1.5 text-xs text-[#9A9DA6] hover:border-[#FF7548]/40 hover:text-[#F4F0E8] transition-all cursor-pointer"
        >
          <MagnifyingGlassIcon size={14} className="text-[#9A9DA6] group-hover:text-[#FF7548]" />
          <span className="flex-1 text-left truncate">Search repositories, tasks...</span>
          <kbd className="rounded border border-[#30313A] bg-[#1B202A] px-1.5 py-0.5 text-[10px] text-[#9A9DA6]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-0.5 px-2.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-left",
                isActive
                  ? "bg-gradient-to-r from-[#FF7548]/20 to-[#FF7548]/5 text-[#FF7548] border-l-2 border-[#FF7548] shadow-sm"
                  : "text-[#9A9DA6] hover:bg-[#141820] hover:text-[#F4F0E8]"
              )}
            >
              <Icon
                size={18}
                weight={isActive ? "fill" : "regular"}
                className={cn(
                  "shrink-0 transition-colors",
                  isActive ? "text-[#FF7548]" : "text-[#9A9DA6] group-hover:text-[#F4F0E8]"
                )}
              />
              <span className="truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Cards: Pro Plan & User */}
      <div className="p-3 border-t border-[#30313A] space-y-3">
        {/* Pro Plan Card */}
        <div className="rounded-xl border border-[#30313A] bg-[#141820] p-3 text-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#A8D96C] animate-pulse" />
              <span className="font-semibold text-[#F4F0E8]">Pro Plan</span>
            </div>
            <span className="text-[10px] text-[#9A9DA6]">Active</span>
          </div>
          <p className="text-[11px] text-[#9A9DA6] mb-2.5">
            Active until Dec 2026
          </p>
          <button
            type="button"
            onClick={() => onSelectTab("settings")}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-[#30313A] bg-[#1B202A] py-1 text-xs font-medium text-[#F4F0E8] hover:border-[#FF7548]/50 hover:bg-[#FF7548]/10 transition-colors"
          >
            <span>Upgrade</span>
            <ArrowUpRightIcon size={12} />
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="size-7 rounded-full bg-gradient-to-tr from-[#FF7548] to-[#F5B66B] flex items-center justify-center text-xs font-bold text-[#0B0D12]">
              {user?.login ? (user.login[0] ? user.login[0].toUpperCase() : "U") : "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#F4F0E8] truncate">
                {user?.login ?? "Developer"}
              </p>
              <p className="text-[10px] text-[#A8D96C] truncate">
                {user ? "Signed In" : "Local Workspace"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab("settings")}
            aria-label="Settings"
            className="text-[#9A9DA6] hover:text-[#F4F0E8] p-1 rounded hover:bg-[#1B202A] transition-colors"
          >
            <GearIcon size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
