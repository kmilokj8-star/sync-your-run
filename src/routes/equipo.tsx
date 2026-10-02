import { createFileRoute } from "@tanstack/react-router";
import { GearPage } from "@/components/run-pages";
export const Route = createFileRoute("/equipo")({ head: () => ({ meta: [{ title: "Equipo — RUN" }, { name: "description", content: "Kilometraje y vida útil de tus zapatillas." }, { property: "og:title", content: "Equipo — RUN" }, { property: "og:description", content: "Kilometraje y vida útil de tus zapatillas." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: GearPage });
