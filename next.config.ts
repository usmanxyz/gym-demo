import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project already has its own instructions in CLAUDE.local.md;
  // don't let Next scaffold a competing AGENTS.md / CLAUDE.md.
  agentRules: false,
};

export default nextConfig;
