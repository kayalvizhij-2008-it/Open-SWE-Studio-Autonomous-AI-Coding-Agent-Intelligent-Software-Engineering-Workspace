import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning"
import { CodeIcon } from "@phosphor-icons/react/dist/ssr/Code"
import { ChartLineUpIcon } from "@phosphor-icons/react/dist/ssr/ChartLineUp"
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck"
import { DiamondIcon } from "@phosphor-icons/react/dist/ssr/Diamond"

export function StudioFooterBar() {
  return (
    <footer className="w-full shrink-0 border-t border-[#30313A] bg-[#0B0D12]/90 backdrop-blur-md px-4 py-2.5 z-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs font-medium text-[#9A9DA6]">
        <div className="flex items-center gap-2 hover:text-[#F4F0E8] transition-colors">
          <LightningIcon size={15} weight="fill" className="text-[#FF7548]" />
          <span>Autonomous Task Execution</span>
        </div>

        <div className="hidden sm:block h-3 w-px bg-[#30313A]" />

        <div className="flex items-center gap-2 hover:text-[#F4F0E8] transition-colors">
          <CodeIcon size={15} weight="bold" className="text-[#FF7548]" />
          <span>Deep GitHub Integration</span>
        </div>

        <div className="hidden sm:block h-3 w-px bg-[#30313A]" />

        <div className="flex items-center gap-2 hover:text-[#F4F0E8] transition-colors">
          <ChartLineUpIcon size={15} weight="bold" className="text-[#F5B66B]" />
          <span>Real-time Insights</span>
        </div>

        <div className="hidden md:block h-3 w-px bg-[#30313A]" />

        <div className="flex items-center gap-2 hover:text-[#F4F0E8] transition-colors">
          <ShieldCheckIcon size={15} weight="fill" className="text-[#A8D96C]" />
          <span>Secure &amp; Sandboxed</span>
        </div>

        <div className="hidden lg:block h-3 w-px bg-[#30313A]" />

        <div className="flex items-center gap-2 text-[#F4F0E8] font-semibold">
          <DiamondIcon size={15} weight="fill" className="text-[#FF7548]" />
          <span>Powered by LangChain Open SWE</span>
        </div>
      </div>
    </footer>
  )
}
