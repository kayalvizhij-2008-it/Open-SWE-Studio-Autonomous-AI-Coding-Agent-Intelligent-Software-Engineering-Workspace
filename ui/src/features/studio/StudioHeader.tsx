import FibreArc from "@/components/FibreArc"

export function StudioHeader() {
  return (
    <header className="relative w-full overflow-hidden border-b border-[#30313A] bg-[#0B0D12] select-none">
      {/* Background Fibre Arc atmospheric effect */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <FibreArc
          height="100%"
          width="100%"
          background="#0B0D12"
          baseColor="#FF7548"
          accentColor="#F5B66B"
          highlight="#FFF4E7"
          speed={40}
          density={18}
          bundle={{ comb: 150, curve: 320, spread: 260, thickness: 55 }}
          interactive={false}
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D12] via-transparent to-[#0B0D12] opacity-80 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF7548] to-[#F56B3A] p-2 shadow-lg shadow-[#FF7548]/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-[#0B0D12]"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-[#F4F0E8]">
                OPEN SWE
              </span>
              <span className="font-heading text-lg font-light text-[#FF7548]">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] tracking-widest uppercase font-semibold text-[#9A9DA6]">
              Autonomous Coding Agent • Powered by LangChain Open SWE
            </p>
          </div>
        </div>

        {/* Center: Script Tagline */}
        <div className="hidden lg:flex items-center justify-center">
          <span className="font-serif italic text-xl tracking-wide text-[#F5B66B] drop-shadow-[0_2px_10px_rgba(245,182,107,0.3)]">
            Plan. Code. Create. Autonomously.
          </span>
        </div>

        {/* Right: Sub-descriptor */}
        <div className="hidden md:flex flex-col text-right">
          <span className="text-xs font-medium text-[#F4F0E8]">
            From Ideas to Pull Requests
          </span>
          <span className="text-[11px] text-[#9A9DA6]">
            with the Power of AI Agents.
          </span>
        </div>
      </div>
    </header>
  )
}
