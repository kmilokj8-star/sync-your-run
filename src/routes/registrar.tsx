import { createFileRoute } from "@tanstack/react-router";
import { RecordPage } from "@/components/run-pages";
export const Route = createFileRoute("/registrar")({ head: () => ({ meta: [{ title: "Registrar carrera — RUN" }, { name: "description", content: "Graba tu carrera con el GPS del teléfono." }, { property: "og:title", content: "Registrar carrera — RUN" }, { property: "og:description", content: "Graba tu carrera con el GPS del teléfono." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: RecordPage });
