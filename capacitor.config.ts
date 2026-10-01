import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.run",
  appName: "RUN",
  webDir: "dist/client",
  server: {
    url: "https://id-preview--6a0e6b26-2393-4f72-a301-efe8d4d403ee.lovable.app",
    cleartext: false,
  },
  android: { backgroundColor: "#111214" },
};

export default config;