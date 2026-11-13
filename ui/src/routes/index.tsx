import { createFileRoute } from "@tanstack/react-router"
import { StudioApp } from "@/features/studio/StudioApp"
import { pageTitle } from "@/lib/pageTitle"

export const Route = createFileRoute("/")({
  component: StudioApp,
  head: () => ({ meta: [{ title: pageTitle("Studio") }] }),
})
