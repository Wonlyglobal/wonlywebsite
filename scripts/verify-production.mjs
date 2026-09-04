const origin = (process.argv[2] || "https://www.wonlyglobal.com").replace(/\/$/, "");
const attempts = Number(process.env.VERIFY_ATTEMPTS || 6);
const delayMs = Number(process.env.VERIFY_DELAY_MS || 10_000);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchText(path) {
  const response = await fetch(`${origin}${path}`, {
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    headers: { "cache-control": "no-cache" },
  });
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`);
  return { response, text: await response.text() };
}

async function verify() {
  const health = await fetchText("/healthz");
  if (health.text.trim() !== "ok") throw new Error("/healthz returned an unexpected body");

  const home = await fetchText("/");
  if (!home.text.includes("<title>WONLY | Security Doors & Smart Locks</title>") || !home.text.includes('id="root"')) {
    throw new Error("homepage is missing its expected title or application root");
  }
  const paths = new Set(
    [...home.text.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map(match => match[1])
  );
  if (!paths.size) throw new Error("homepage did not reference JavaScript or CSS assets");

  for (const path of paths) {
    const url = path.startsWith("http") ? path : `${origin}${path}`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15_000),
      headers: { "cache-control": "no-cache" },
    });
    if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
    const type = response.headers.get("content-type") || "";
    if (path.endsWith(".js") && !type.includes("javascript")) throw new Error(`${url} returned ${type || "no content type"}`);
    if (path.endsWith(".css") && !type.includes("text/css")) throw new Error(`${url} returned ${type || "no content type"}`);
  }
  console.log(`Production verified: health, hero content and ${paths.size} JS/CSS assets are available at ${origin}`);
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    await verify();
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.error(`Verification attempt ${attempt}/${attempts} failed: ${error.message}`);
    if (attempt < attempts) await wait(delayMs);
  }
}
throw lastError;
