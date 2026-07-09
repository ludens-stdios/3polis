export default {
  // Set the base directory for GitHub pages
  base: "/3polis/",

  // Set the project root directory (relative to the config file)
  root: ".",

  // Set the directory to serve static files from (relative to the root)
  publicDir: "./public",

  // Set the build output directory
  build: {
    outDir: "./dist",
    chunkSizeWarningLimit: 1000, // KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
};
