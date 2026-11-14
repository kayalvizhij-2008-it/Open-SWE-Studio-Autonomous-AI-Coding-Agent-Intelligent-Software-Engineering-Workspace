import { useState, useEffect } from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr/WarningCircle"
import { ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr/ArrowClockwise"
import { GearIcon } from "@phosphor-icons/react/dist/ssr/Gear"
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import { CpuIcon } from "@phosphor-icons/react/dist/ssr/Cpu"
import { CloudIcon } from "@phosphor-icons/react/dist/ssr/Cloud"
import FibreArc from "@/components/FibreArc"
import { cn } from "@/lib/utils"
import { checkBackendHealth } from "@/lib/api-base"
import type { StudioTab } from "./StudioSidebar"

interface StudioSettingsProps {
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

export function StudioSettings({ onNavigateTab }: StudioSettingsProps) {
  const [defaultModel, setDefaultModel] = useState<string>("Claude 3.5 Sonnet")
  const [sandboxedExecution, setSandboxedExecution] = useState<boolean>(true)
  const [requirePrReview, setRequirePrReview] = useState<boolean>(true)
  const [allowExternalTools, setAllowExternalTools] = useState<boolean>(false)

  const [healthStatus, setHealthStatus] = useState<{
    ok: boolean
    status: string
    url: string
    timestamp: string
    checking: boolean
  }>({
    ok: true,
    status: "healthy",
    url: "/health",
    timestamp: "Just now",
    checking: false,
  })

  const runHealthCheck = async () => {
    setHealthStatus((prev) => ({ ...prev, checking: true }))
    const res = await checkBackendHealth()
    setHealthStatus({
      ok: res.ok,
      status: res.status,
      url: res.url,
      timestamp: res.timestamp,
      checking: false,
    })
  }

  useEffect(() => {
    void runHealthCheck()
  }, [])

  return (
    <div className="space-y-6 pb-12">
      {/* Settings Header */}
      <div className="relative overflow-hidden rounded-2xl border border-[#30313A] bg-[#141820] p-6 shadow-xl">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <FibreArc
            height="100%"
            width="100%"
            background="#141820"
            baseColor="#FF7548"
            accentColor="#F5B66B"
            highlight="#FFF4E7"
            density={14}
            speed={30}
            direction={180}
            bundle={{ comb: 140, curve: 300, spread: 240, thickness: 45 }}
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
              <div className="flex items-center gap-2">
                <GearIcon size={20} className="text-[#FF7548]" weight="fill" />
                <h1 className="font-heading text-xl font-bold tracking-tight text-[#F4F0E8]">
                  Workspace Settings
                </h1>
              </div>
              <p className="text-xs text-[#9A9DA6] mt-0.5">
                Manage your integrations, models and security preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Settings Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 1: Connected Integrations (span 2 on large) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="studio-card p-6">
            <h2 className="font-heading text-sm font-semibold text-[#F4F0E8] mb-4 pb-2 border-b border-[#30313A]">
              Connected Integrations
            </h2>

            <div className="space-y-3">
              {/* GitHub */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#30313A] bg-[#1B202A]">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-[#0B0D12] flex items-center justify-center text-[#F4F0E8] border border-[#30313A]">
                    <svg className="size-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F4F0E8]">GitHub</p>
                    <p className="text-[11px] text-[#A8D96C]">Connected</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Disconnect
                </button>
              </div>

              {/* Slack */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#30313A] bg-[#1B202A]">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-[#0B0D12] flex items-center justify-center text-[#FF7548] border border-[#30313A] font-bold text-sm">
                    #
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F4F0E8]">Slack</p>
                    <p className="text-[11px] text-[#A8D96C]">Connected • 1h ago</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Disconnect
                </button>
              </div>

              {/* Linear */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#30313A] bg-[#1B202A]">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-[#0B0D12] flex items-center justify-center text-[#F5B66B] border border-[#30313A] font-bold text-sm">
                    L
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#F4F0E8]">Linear</p>
                    <p className="text-[11px] text-[#A8D96C]">Connected</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          {/* Model & Sandbox Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model Settings */}
            <div className="studio-card p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#30313A]">
                <CpuIcon size={16} className="text-[#FF7548]" />
                <h3 className="font-heading text-xs font-semibold text-[#F4F0E8]">
                  Model Settings
                </h3>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#9A9DA6] mb-1.5">
                  Default Model
                </label>
                <select
                  value={defaultModel}
                  onChange={(e) => setDefaultModel(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#30313A] bg-[#1B202A] px-3.5 py-2 text-xs text-[#F4F0E8] focus:border-[#FF7548] focus:outline-none"
                >
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</option>
                  <option value="GPT-4o">GPT-4o</option>
                </select>
              </div>
            </div>

            {/* Sandbox Provider */}
            <div className="studio-card p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#30313A]">
                <CloudIcon size={16} className="text-[#FF7548]" />
                <h3 className="font-heading text-xs font-semibold text-[#F4F0E8]">
                  Sandbox Provider
                </h3>
              </div>
              <div className="p-3 rounded-xl border border-[#30313A] bg-[#1B202A]">
                <p className="text-xs font-semibold text-[#F4F0E8]">E2B Sandbox</p>
                <p className="text-[11px] text-[#A8D96C] mt-0.5">Operational • MicroVM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security & System Operational Status */}
        <div className="space-y-6">
          {/* Security Toggles Card */}
          <div className="studio-card p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#30313A]">
              <ShieldCheckIcon size={16} className="text-[#A8D96C]" />
              <h3 className="font-heading text-xs font-semibold text-[#F4F0E8]">
                Security Preferences
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#F4F0E8]">Enable Sandboxed Execution</p>
                  <p className="text-[10px] text-[#9A9DA6]">Isolate shell operations</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSandboxedExecution(!sandboxedExecution)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                    sandboxedExecution ? "bg-[#FF7548]" : "bg-[#30313A]"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block size-4 transform rounded-full bg-[#0B0D12] transition",
                      sandboxedExecution ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#F4F0E8]">Require PR Review</p>
                  <p className="text-[10px] text-[#9A9DA6]">Mandate human sign-off</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRequirePrReview(!requirePrReview)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                    requirePrReview ? "bg-[#FF7548]" : "bg-[#30313A]"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block size-4 transform rounded-full bg-[#0B0D12] transition",
                      requirePrReview ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#F4F0E8]">Allow External Tools</p>
                  <p className="text-[10px] text-[#9A9DA6]">Permit network plugins</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAllowExternalTools(!allowExternalTools)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                    allowExternalTools ? "bg-[#FF7548]" : "bg-[#30313A]"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block size-4 transform rounded-full bg-[#0B0D12] transition",
                      allowExternalTools ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* All Systems Operational Card with Live Health Monitoring */}
          <div className="studio-card p-6 flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-b from-[#141820] to-[#1B202A]">
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-2xl border transition-colors",
                healthStatus.ok
                  ? "bg-[#A8D96C]/10 border-[#A8D96C]/30 text-[#A8D96C]"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-400"
              )}
            >
              {healthStatus.ok ? (
                <CheckCircleIcon size={32} weight="fill" />
              ) : (
                <WarningCircleIcon size={32} weight="fill" />
              )}
            </div>

            <div className="w-full">
              <h3
                className={cn(
                  "font-heading text-base font-bold",
                  healthStatus.ok ? "text-[#A8D96C]" : "text-amber-400"
                )}
              >
                {healthStatus.ok ? "All Systems Operational" : "Backend Reconnecting"}
              </h3>
              <p className="text-[11px] text-[#9A9DA6] mt-0.5">
                Status: <span className="text-[#F4F0E8] font-mono">{healthStatus.status}</span>
              </p>
              <p className="text-[10px] text-[#9A9DA6] mt-1 font-mono truncate max-w-full px-2" title={healthStatus.url}>
                {healthStatus.url}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="text-[10px] text-[#9A9DA6]">
                  Checked: {healthStatus.timestamp}
                </span>
                <button
                  type="button"
                  onClick={() => void runHealthCheck()}
                  disabled={healthStatus.checking}
                  className="flex items-center gap-1 text-[11px] font-medium text-[#FF7548] hover:text-[#F5B66B] disabled:opacity-50 transition-colors"
                >
                  <ArrowClockwiseIcon
                    size={12}
                    className={cn(healthStatus.checking && "animate-spin")}
                  />
                  <span>{healthStatus.checking ? "Checking..." : "Recheck"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
