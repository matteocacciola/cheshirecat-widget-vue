import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set base path to empty string to generate relative paths instead of absolute paths
  // This allows the widget to be deployed in any directory
  base: '',

  // Configure plugins used in the project
  plugins: [
    vue(), // Vue 3 support
    AutoImport({
      dts: true, // Generate TypeScript declaration file
      imports: [
        'vue', // Auto-import Vue composition API functions
        '@vueuse/core', // Auto-import VueUse functions
        'pinia' // Auto-import Pinia store functions
      ],
      eslintrc: {
        enabled: true // Generate ESLint config for auto-imports
      }
    }),
    Components({
      dts: true, // Generate TypeScript declaration for components
      resolvers: [
        // Automatically import Headless UI and Icon components without explicit imports
        HeadlessUiResolver({ prefix: "" }),
        IconsResolver({ prefix: "" })
      ]
    }),
    Icons({ autoInstall: true }), // Auto-install required icon sets
    tsconfigPaths() // Support for path aliases defined in tsconfig.json
  ],

  // Build configuration options
  build: {
    // Control whether to minify the output based on build mode
    minify: mode !== 'development',
    
    // Generate source maps for easier debugging
    sourcemap: true,
    
    // Output directory for the build files
    outDir: mode !== 'development' ? 'dist' : 'dist-dev',

    // Don't create a separate directory for assets
    assetsDir: '',
    
    // Don't split CSS into separate files per chunk
    cssCodeSplit: false,

    // Rollup-specific output options
    rollupOptions: {
      output: {
        // Control whether to minify internal exports based on build mode
        // This affects how module exports are optimized
        minifyInternalExports: mode !== 'development',
        
        // Name of the main JS bundle file
        entryFileNames: 'widget.js',
        
        // Define names for asset files (CSS, images, etc)
        assetFileNames: (info) => `${info.names[0]?.endsWith('css') ? 'widget' : '[name]'}[extname]`,
        
        // All code chunks will be named "chunk.js"
        chunkFileNames: 'chunk.js',
        
        // Force all dynamic imports to be combined into a single chunk
        manualChunks: () => 'chunk.js',
        
        // Configuration for the generated JavaScript code
        generatedCode: {
          preset: 'es2015', // ES2015 output format
          constBindings: true, // Use const instead of var
          objectShorthand: true // Use object shorthand notation
        }
      }
    }
  }
}))