import { createFileRoute } from "@tanstack/react-router";
import { MoreHome } from "@/components/more-pages";

export const Route = createFileRoute("/mas")({
  head: () => ({ meta: [{ title: "Más — RUN" }, { name: "description", content: "Cuenta, herramientas y configuración de RUN." }, { property: "og:title", content: "Más — RUN" }, { property: "og:description", content: "Cuenta, herramientas y configuración de RUN." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: MoreHome,
});