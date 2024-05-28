import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        importListing: 'import-listing.html',
        importAll: 'import-all.html'
      }
    },
  },
  plugins: [react()],
})
