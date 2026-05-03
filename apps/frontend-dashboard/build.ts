import tailwind from "bun-plugin-tailwind";
import { rm } from "node:fs/promises";
import path from "node:path";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

// 👇 ADD THIS
const API_URL =
  process.env.VITE_API_1 || "https://openrouter-kgd1.onrender.com";

console.log("BUILD API:", API_URL);

// 👇 keep your html entrypoints
const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

const result = await Bun.build({
  entrypoints,
  outdir,
  plugins: [tailwind],
  minify: true,
  target: "browser",
  sourcemap: "linked",

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),

    // 👇 ADD THIS LINE (IMPORTANT)
    "process.env.VITE_API_1": JSON.stringify(API_URL),
  },
});

for (const output of result.outputs) {
  console.log(
    ` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`,
  );
}
