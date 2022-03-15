const watch = process.argv[2] === "--watch";

require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["App.jsx"],
    bundle: true,
    outfile: "./dist/projects_page.js",
    target: ["chrome58", "firefox57", "safari11", "edge18"],
    plugins: [require("esbuild-sass-plugin").sassPlugin()],
    watch,
    minify: !watch,
  })
  .catch(() => process.exit(1));
