import { createFileRoute } from "@tanstack/react-router";
import { PublicWebsite } from "./web";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RUN — Entrena. Progresa. Conecta." },
      { name: "description", content: "RUN es una plataforma para corredores: registra actividades, conecta dispositivos, organiza entrenamientos, alcanza objetivos y conecta con entrenadores." },
    ],
  }),
  component: PublicWebsite,
});
