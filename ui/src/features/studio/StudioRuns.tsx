import { useState, useEffect, useRef } from "react"
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr/ArrowLeft"
import { StopIcon } from "@phosphor-icons/react/dist/ssr/Stop"
import { GitPullRequestIcon } from "@phosphor-icons/react/dist/ssr/GitPullRequest"
import { FileCodeIcon } from "@phosphor-icons/react/dist/ssr/FileCode"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle"
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr/CircleNotch"
import { PulseIcon } from "@phosphor-icons/react/dist/ssr/Pulse"
import FibreArc from "@/components/FibreArc"
import { cn } from "@/lib/utils"
import type { StudioTab } from "./StudioSidebar"

interface StudioRunsProps {
  initialThreadId?: string
  onNavigateTab: (tab: StudioTab, context?: { repo?: string; threadId?: string }) => void
}

export function StudioRuns({ initialThreadId: _initialThreadId, onNavigateTab }: StudioRunsProps) {
  const [activeTab, setActiveTab] = useState<"execution" | "terminal" | "tools">("execution")
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [selectedFile, setSelectedFile] = useState<string>("src/components/Dashboard.tsx")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated Live Activity oscilloscope wave
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let t = 0

    const render = () => {
      t += 0.04
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      ctx.beginPath()
      ctx.strokeStyle = "#A8D96C"
      ctx.lineWidth = 2
      ctx.shadowColor = "#A8D96C"
      ctx.shadowBlur = 8

      for (let x = 0; x < w; x++) {
        const norm = x / w
        const envelope = Math.sin(norm * Math.PI)
        const y =
          h / 2 +
          Math.sin(norm * 18 + t * 4) * 12 * envelope +
          Math.sin(norm * 8 - t * 2) * 6 * envelope
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="space-y-6 pb-12">
      {/* Top Mission Control Header */}
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
            speed={40}
            direction={180}
            bundle={{ comb: 150, curve: 320, spread: 250, thickness: 50 }}
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
                <h1 className="font-heading text-xl font-bold tracking-tight text-[#F4F0E8]">
                  Run #1247
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A8D96C]/40 bg-[#A8D96C]/10 px-2.5 py-0.5 text-xs font-semibold text-[#A8D96C]">
                  <span className="size-1.5 rounded-full bg-[#A8D96C] animate-ping" />
                  Active
                </span>
              </div>
              <p className="text-xs text-[#9A9DA6] mt-0.5">
                Target: <span className="text-[#F4F0E8] font-mono">open-swe-app</span> • Started 3 min ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("pull-requests")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#30313A] bg-[#1B202A] px-4 py-2 text-xs font-semibold text-[#F4F0E8] hover:border-[#FF7548]/40 hover:bg-[#222836] transition-colors cursor-pointer"
            >
              <GitPullRequestIcon size={16} className="text-[#FF7548]" />
              <span>View PR</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors cursor-pointer",
                isRunning
                  ? "border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  : "border border-[#A8D96C]/40 bg-[#A8D96C]/10 text-[#A8D96C] hover:bg-[#A8D96C]/20"
              )}
            >
              <StopIcon size={14} weight="fill" />
              <span>{isRunning ? "Stop" : "Resume"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Mission Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Task Thread Stepper (3 cols) */}
        <div className="lg:col-span-3 studio-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#30313A]">
            <h2 className="font-heading text-sm font-semibold text-[#F4F0E8]">
              Task Thread
            </h2>
            <span className="text-[10px] text-[#A8D96C] font-mono">4 stages</span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#30313A]">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -left-6 top-0.5 size-4 rounded-full border-2 border-[#0B0D12] bg-[#A8D96C] flex items-center justify-center">
                <CheckCircleIcon size={12} weight="fill" className="text-[#0B0D12]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#F4F0E8]">Planning the task...</p>
                  <span className="text-[10px] text-[#9A9DA6]">2 min ago</span>
                </div>
                <p className="text-[11px] text-[#9A9DA6] mt-0.5">
                  Analysing repository and planning steps
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -left-6 top-0.5 size-4 rounded-full border-2 border-[#0B0D12] bg-[#A8D96C] flex items-center justify-center">
                <CheckCircleIcon size={12} weight="fill" className="text-[#0B0D12]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#F4F0E8]">Executing changes...</p>
                  <span className="text-[10px] text-[#9A9DA6]">1 min ago</span>
                </div>
                <p className="text-[11px] text-[#9A9DA6] mt-0.5">
                  Running code modifications
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -left-6 top-0.5 size-4 rounded-full border-2 border-[#0B0D12] bg-[#A8D96C] flex items-center justify-center">
                <CheckCircleIcon size={12} weight="fill" className="text-[#0B0D12]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#F4F0E8]">Running tests...</p>
                  <span className="text-[10px] text-[#9A9DA6]">7 sec ago</span>
                </div>
                <p className="text-[11px] text-[#A8D96C] mt-0.5 font-medium">
                  All tests passed (48/48)
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative group">
              <div className="absolute -left-6 top-0.5 size-4 rounded-full border-2 border-[#0B0D12] bg-[#FF7548] flex items-center justify-center animate-pulse">
                <CircleNotchIcon size={12} className="animate-spin text-[#0B0D12]" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#FF7548]">Preparing PR...</p>
                  <span className="text-[10px] text-[#FF7548]">Just now</span>
                </div>
                <p className="text-[11px] text-[#9A9DA6] mt-0.5">
                  Creating pull request
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Console & Live Oscilloscope (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="studio-card p-5 flex flex-col h-[420px]">
            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-[#30313A] pb-3 mb-3">
              {(["execution", "terminal", "tools"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                    activeTab === tab
                      ? "bg-[#1B202A] text-[#FF7548] font-semibold border border-[#30313A]"
                      : "text-[#9A9DA6] hover:text-[#F4F0E8]"
                  )}
                >
                  {tab === "execution" ? "Execution Details" : tab}
                </button>
              ))}
            </div>

            {/* Terminal Console Output */}
            <div className="flex-1 rounded-xl bg-[#090B0F] border border-[#232630] p-4 font-mono text-xs text-[#F4F0E8] overflow-y-auto space-y-2 leading-relaxed">
              <div className="text-[#9A9DA6]">&gt; uv run pytest tests/ -v</div>
              <div className="text-[#A8D96C]">tests/test_analytics.py::test_load PASSED [ 25%]</div>
              <div className="text-[#A8D96C]">tests/test_fibre_arc.py::test_render PASSED [ 50%]</div>
              <div className="text-[#A8D96C]">tests/test_studio.py::test_overview PASSED [100%]</div>
              <div className="text-[#A8D96C] font-semibold mt-2">
                48 passed, 0 failed in 1.42s
              </div>
              <div className="text-[#9A9DA6] mt-3">&gt; Creating pull request...</div>
              <div className="text-[#FF7548] font-semibold">
                PR #1247 created successfully!
              </div>
              <div className="text-[#9A9DA6] text-[11px]">
                https://github.com/langchain-ai/open-swe/pull/1247
              </div>
            </div>
          </div>

          {/* Live Activity Oscilloscope Monitor */}
          <div className="studio-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F0E8]">
                <PulseIcon size={16} className="text-[#A8D96C]" weight="bold" />
                <span>Live Activity</span>
              </div>
              <span className="text-[10px] text-[#A8D96C] font-mono">Stream: active</span>
            </div>
            <div className="h-12 w-full rounded-lg bg-[#090B0F] border border-[#232630] overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} width={360} height={48} className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Right Column: Files Changed & Code Diff (4 cols) */}
        <div className="lg:col-span-4 studio-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#30313A]">
            <div className="flex items-center gap-2">
              <FileCodeIcon size={16} className="text-[#FF7548]" />
              <h2 className="font-heading text-sm font-semibold text-[#F4F0E8]">
                Files Changed (3)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#A8D96C]">+172 lines</span>
          </div>

          {/* Files List */}
          <div className="space-y-1.5">
            {[
              { path: "src/components/Dashboard.tsx", added: "+124", color: "text-[#A8D96C]" },
              { path: "src/lib/analytics.ts", added: "+46", color: "text-[#A8D96C]" },
              { path: "package.json", added: "+2", color: "text-[#A8D96C]" },
            ].map((f) => (
              <button
                key={f.path}
                type="button"
                onClick={() => setSelectedFile(f.path)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-mono transition-colors text-left",
                  selectedFile === f.path
                    ? "bg-[#1B202A] text-[#FF7548] border border-[#30313A]"
                    : "text-[#9A9DA6] hover:bg-[#1B202A]/50 hover:text-[#F4F0E8]"
                )}
              >
                <span className="truncate">{f.path}</span>
                <span className={cn("text-[10px] font-semibold shrink-0 ml-2", f.color)}>
                  {f.added}
                </span>
              </button>
            ))}
          </div>

          {/* Code Diff Preview */}
          <div className="rounded-xl border border-[#232630] bg-[#090B0F] p-3 text-[11px] font-mono leading-relaxed overflow-x-auto">
            <div className="text-[#9A9DA6] mb-1.5 pb-1 border-b border-[#232630]">
              // {selectedFile}
            </div>
            <div className="text-[#A8D96C]">+ export const loadData = async () =&gt; &#123;</div>
            <div className="text-[#A8D96C]">+   return await fetchAnalytics();</div>
            <div className="text-[#A8D96C]">+ &#125;</div>
            <div className="text-[#9A9DA6] mt-2">+ export const renderScene = () =&gt; &#123; ... &#125;</div>
          </div>
        </div>
      </div>
    </div>
  )
}
