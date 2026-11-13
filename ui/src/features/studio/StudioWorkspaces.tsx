import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { StackIcon } from "@phosphor-icons/react/dist/ssr/Stack"
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import { CloudIcon } from "@phosphor-icons/react/dist/ssr/Cloud"
import FibreArc from "@/components/FibreArc"
import { useWorkspaceOptions } from "@/features/agents/lib/queries"
import type { StudioTab } from "./StudioSidebar"

interface StudioWorkspacesProps {
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

export function StudioWorkspaces({ onNavigateTab }: StudioWorkspacesProps) {
  const workspaceOptionsQuery = useWorkspaceOptions(true)
  const workspaces = workspaceOptionsQuery.data?.workspaces ?? []

  const sampleWorkspaces = [
    { slug: "default", name: "Production Engineering", sandbox: "E2B MicroVM", activeRuns: 3 },
    { slug: "staging", name: "Staging Sandbox", sandbox: "Modal Container", activeRuns: 1 },
    { slug: "internal", name: "Security & Auditing", sandbox: "Docker Isolated", activeRuns: 0 },
  ]

  const displayList = workspaces.length > 0
    ? workspaces.map((w) => ({
        slug: w.slug,
        name: w.name,
        sandbox: "E2B MicroVM",
        activeRuns: 1,
      }))
    : sampleWorkspaces

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

        <div className="relative z-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateTab("overview")}
            className="flex size-9 items-center justify-center rounded-xl border border-[#30313A] bg-[#1B202A] text-[#9A9DA6] hover:border-[#FF7548]/40 hover:text-[#F4F0E8] transition-colors"
          >
            <ArrowLeftIcon size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <StackIcon size={20} className="text-[#FF7548]" weight="bold" />
              <h1 className="font-heading text-xl font-bold tracking-tight text-[#F4F0E8]">
                Workspaces &amp; Environments
              </h1>
            </div>
            <p className="text-xs text-[#9A9DA6] mt-0.5">
              Isolated multi-tenant execution environments and sandbox configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayList.map((ws) => (
          <div
            key={ws.slug}
            className="studio-card p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#0B0D12] border border-[#30313A] text-[#FF7548]">
                  <StackIcon size={18} weight="fill" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#A8D96C]/30 bg-[#A8D96C]/10 px-2 py-0.5 text-[10px] font-semibold text-[#A8D96C]">
                  Healthy
                </span>
              </div>

              <h2 className="font-heading text-sm font-bold text-[#F4F0E8]">
                {ws.name}
              </h2>
              <p className="text-[11px] text-[#9A9DA6] font-mono mt-0.5">
                slug: {ws.slug}
              </p>

              <div className="mt-4 pt-3 border-t border-[#232630] space-y-2 text-xs text-[#9A9DA6]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CloudIcon size={14} className="text-[#FF7548]" />
                    <span>Sandbox:</span>
                  </span>
                  <span className="font-medium text-[#F4F0E8]">{ws.sandbox}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheckIcon size={14} className="text-[#A8D96C]" />
                    <span>Isolation:</span>
                  </span>
                  <span className="font-medium text-[#A8D96C]">Airgapped MicroVM</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("new-task")}
              className="w-full rounded-lg border border-[#30313A] bg-[#1B202A] py-2 text-xs font-semibold text-[#F4F0E8] hover:border-[#FF7548]/40 hover:bg-[#FF7548]/10 transition-colors"
            >
              Launch in Workspace
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
