import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mas")({
  component: MoreLayout,
});

function MoreLayout() {
  return <Outlet />;
}
