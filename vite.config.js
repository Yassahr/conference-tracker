import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_APPWRITE_URL': JSON.stringify(env.REACT_APP_APPWRITE_URL),
      'process.env.REACT_APP_APPWRITE_PROJECT_ID': JSON.stringify(env.REACT_APP_APPWRITE_PROJECT_ID),
      'process.env.REACT_APP_APPWRITE_DATABASE_ID': JSON.stringify(env.REACT_APP_APPWRITE_DATABASE_ID),
      'process.env.REACT_APP_APPWRITE_COLLECTION_ID': JSON.stringify(env.REACT_APP_APPWRITE_COLLECTION_ID),
      'process.env.REACT_APP_APPWRITE_BUCKET_ID': JSON.stringify(env.REACT_APP_APPWRITE_BUCKET_ID)
    },
    plugins: [react()],
  }
})
