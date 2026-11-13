import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"

import { Button } from "@langchain/macaw-components/Button"
import { Card } from "@langchain/macaw-components/Card"
import { Skeleton } from "@langchain/macaw-components/Skeleton"
import { Text } from "@langchain/macaw-components/Text"
import FibreArc from "@/components/FibreArc"

import { LogoMark } from "@/components/Branding"
import { loginUrl } from "@/lib/api"
import { appDistribution } from "@/lib/pageTitle"
import { pageTitle } from "@/lib/pageTitle"
import {
  DEFAULT_AUTH_REDIRECT,
  consumeAuthRedirect,
  getRememberedAuthRedirect,
  rememberAuthRedirect,
} from "@/lib/auth-redirect"
import { useSession } from "@/lib/session"

type LoginSearch = { redirect?: string }

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({ meta: [{ title: pageTitle("Sign in") }] }),
  component: Login,
})
function Login() {
  const session = useSession()
  const search = Route.useSearch()
  const redirectParam = search.redirect
  const intendedPath = useMemo(
    () =>
      redirectParam
        ? rememberAuthRedirect(redirectParam)
        : (getRememberedAuthRedirect() ?? DEFAULT_AUTH_REDIRECT),
    [redirectParam]
  )
  const authenticatedRedirect = useMemo(
    () => (session.data ? consumeAuthRedirect(redirectParam) : null),
    [redirectParam, session.data]
  )
  if (session.isLoading) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-surface-level-1 p-space-5">
        <Skeleton className="h-40 w-80" />
      </main>
    )
  }

  if (authenticatedRedirect) {
    return <ClientRedirect path={authenticatedRedirect} />
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-[#0B0D12] p-space-5 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <FibreArc
          height="100%"
          width="100%"
          background="#0B0D12"
          baseColor="#FF7548"
          accentColor="#F5B66B"
          highlight="#FFF4E7"
          density={18}
          speed={35}
          direction={180}
          bundle={{ comb: 150, curve: 350, spread: 260, thickness: 50 }}
          interactive={false}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0B0D12]/60 to-[#0B0D12]" />
      </div>
      <Card
        intent="plain"
        className="relative z-10 flex w-full max-w-md flex-col gap-space-5 p-space-6 shadow-2xl border border-[#30313A] bg-[#141820]/95 backdrop-blur-md rounded-2xl"
      >
        <div className="flex flex-col items-center gap-space-3 text-center">
          <LogoMark alt={appDistribution.name} className="size-8" />
          <Text as="h1" variant="h3">
            {`Sign in to ${appDistribution.name}`}
          </Text>
        </div>
        <Button
          as={<a href={loginUrl(intendedPath)} />}
          size="md"
          className="w-full"
        >
          Continue with LangSmith
        </Button>
        <Text as="p" variant="sm" color="secondary">
          Link your GitHub account after signing in to use coding features and
          return to your existing coding threads.
        </Text>
      </Card>
    </main>
  )
}

function ClientRedirect({ path }: { path: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") window.location.replace(path)
  }, [path])

  return (
    <main className="flex min-h-svh items-center justify-center bg-surface-level-1 p-space-5">
      <Skeleton className="h-40 w-80" />
    </main>
  )
}
