import type { ReactNode } from "react"
import FibreArc from "@/components/FibreArc"

export function AgentChatEmptyState(props: { logo?: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-space-4 pb-space-6 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <FibreArc
          height="100%"
          width="100%"
          background="transparent"
          baseColor="#FF7548"
          accentColor="#F5B66B"
          highlight="#FFF4E7"
          density={14}
          speed={30}
          bundle={{ comb: 140, curve: 320, spread: 240, thickness: 45 }}
          interactive={false}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 py-4">
        <div className="flex items-center justify-center gap-space-3">
          {props.logo ?? (
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7548] to-[#F56B3A] p-1.5 shadow-md shadow-[#FF7548]/30">
              <svg viewBox="0 0 24 24" fill="none" className="size-5 text-[#0B0D12]">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          <h1 className="cursor-default text-center font-heading text-2xl font-bold tracking-tight text-[#F4F0E8] select-none sm:text-3xl">
            What should we work on?
          </h1>
        </div>
        <p className="text-xs text-[#9A9DA6]">
          Autonomous Coding Agent • Powered by LangChain Open SWE
        </p>
      </div>
    </div>
  )
}
