

import { defineConfig } from 'vite'  //This imports the defineConfig function from the Vite library, which is used to define the Vite configuration.
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{
    port:3000,
    proxy:{
      '/api':{ target:'http://localhost:4000', //backend port
        changeOrigin:true  //it tells the server when a call starting with /api comes it should redirect to localhost:4000t
      }}}                   //it will reduce CORS related issues
      
})
