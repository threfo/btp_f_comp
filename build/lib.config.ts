import baseConfig from "./base.config";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: "lib/v3",
    lib: {
      entry: resolve(__dirname, "../packages/index.ts"),
      name: "BtpComp",
      fileName: "index",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "vue-demi"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [...(baseConfig as any).plugins, dts()],
});
