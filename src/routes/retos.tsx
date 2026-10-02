import { createFileRoute } from "@tanstack/react-router";
import { ChallengesPage } from "@/components/run-pages";
export const Route = createFileRoute("/retos")({ head: () => ({ meta: [{ title: "Retos — RUN" }, { name: "description", content: "Únete a retos de kilometraje y gana puntos." }, { property: "og:title", content: "Retos — RUN" }, { property: "og:description", content: "Únete a retos de kilometraje y gana puntos." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: ChallengesPage });
