import { createFileRoute } from "@tanstack/react-router";
import { PublicWebsite } from "./web";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RUN — Train. Progress. Connect." },
      { name: "description", content: "RUN is a platform for runners: record activities, connect Garmin, Strava, Apple Health and Coros, organize training and reach your goals." },
      { property: "og:title", content: "RUN — Train. Progress. Connect." },
      { property: "og:description", content: "Everything runners need: activities, training, goals, devices and community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PublicWebsite,
});
