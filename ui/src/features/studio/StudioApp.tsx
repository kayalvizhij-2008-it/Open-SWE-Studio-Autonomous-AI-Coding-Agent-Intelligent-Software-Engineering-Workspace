import { useState, useEffect } from "react"
import { StudioHeader } from "./StudioHeader"
import { StudioSidebar, type StudioTab } from "./StudioSidebar"
import { StudioOverview } from "./StudioOverview"
import { StudioNewTask } from "./StudioNewTask"
import { StudioRuns } from "./StudioRuns"
import { StudioPullRequests } from "./StudioPullRequests"
import { StudioRepositories } from "./StudioRepositories"
import { StudioWorkspaces } from "./StudioWorkspaces"
import { StudioSettings } from "./StudioSettings"
import { StudioFooterBar } from "./StudioFooterBar"
import FibreArc from "@/components/FibreArc"

export function StudioApp() {
  const [activeTab, setActiveTab] = useState<StudioTab>("overview")
  const [contextRepo, setContextRepo] = useState<string | undefined>()
  const [contextThreadId, setContextThreadId] = useState<string | undefined>()

  // Sync tab with URL search parameter if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab") as StudioTab
      if (
        tabParam &&
        [
          "overview",
          "new-task",
          "runs",
          "pull-requests",
          "repositories",
          "workspaces",
          "settings",
        ].includes(tabParam)
      ) {
        setActiveTab(tabParam)
      }
    }
  }, [])

  const handleNavigateTab = (
    tab: StudioTab,
    context?: { repo?: string; threadId?: string }
  ) => {
    setActiveTab(tab)
    if (context?.repo) setContextRepo(context.repo)
    if (context?.threadId) setContextThreadId(context.threadId)

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("tab", tab)
      window.history.pushState({}, "", url.toString())
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#0B0D12] text-[#F4F0E8] font-sans antialiased">
      {/* Global Atmospheric Background Fibre Arc (subtle, non-intrusive) */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <FibreArc
          height="100%"
          width="100%"
          background="#0B0D12"
          baseColor="#FF7548"
          accentColor="#F5B66B"
          highlight="#FFF4E7"
          density={14}
          speed={25}
          direction={180}
          bundle={{ comb: 130, curve: 300, spread: 240, thickness: 45 }}
          interactive={false}
        />
      </div>

      {/* Top Banner Header */}
      <StudioHeader />

      {/* Main Body: Sidebar + Dynamic Content View */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <StudioSidebar activeTab={activeTab} onSelectTab={handleNavigateTab} />

        {/* Center Main Content View */}
        <main className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 bg-[#0B0D12]/40 backdrop-blur-[2px]">
          <div className="mx-auto max-w-7xl">
            {activeTab === "overview" && (
              <StudioOverview onNavigateTab={handleNavigateTab} />
            )}
            {activeTab === "new-task" && (
              <StudioNewTask
                initialRepo={contextRepo}
                onNavigateTab={handleNavigateTab}
              />
            )}
            {activeTab === "runs" && (
              <StudioRuns
                initialThreadId={contextThreadId}
                onNavigateTab={handleNavigateTab}
              />
            )}
            {activeTab === "pull-requests" && (
              <StudioPullRequests onNavigateTab={handleNavigateTab} />
            )}
            {activeTab === "repositories" && (
              <StudioRepositories onNavigateTab={handleNavigateTab} />
            )}
            {activeTab === "workspaces" && (
              <StudioWorkspaces onNavigateTab={handleNavigateTab} />
            )}
            {activeTab === "settings" && (
              <StudioSettings onNavigateTab={handleNavigateTab} />
            )}
          </div>
        </main>
      </div>

      {/* Bottom Feature Footer Bar */}
      <StudioFooterBar />
    </div>
  )
}
