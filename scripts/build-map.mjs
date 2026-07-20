// `vite build --sourcemap` with route messaging forced on.
//
// vite.config.ts reads process.env.VITE_ENABLE_ROUTE_MESSAGING directly, and in
// production mode it only enables route messaging when the value is exactly
// "true". A `VAR=value cmd` prefix in package.json would only work in a POSIX
// shell, so the variable is set here instead and the build runs as a child
// process — same behaviour on Windows, macOS and Linux.
import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["vite", "build", "--sourcemap"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, VITE_ENABLE_ROUTE_MESSAGING: "true" },
});

process.exit(result.status ?? 1);
