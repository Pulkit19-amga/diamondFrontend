// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(), // ✅ React plugin must be included!
    {
      name: 'copy-htaccess',
      closeBundle: () => {
        const source = path.resolve(__dirname, '.htaccess')
        const destination = path.resolve(__dirname, 'dist/.htaccess')
        try {
          fs.copyFileSync(source, destination)
          console.log('✅ .htaccess copied to dist folder')
        } catch (error) {
          console.error('❌ Failed to copy .htaccess:', error)
        }
      },
    },
  ],
})
