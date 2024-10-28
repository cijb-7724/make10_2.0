import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/make10_2.0/'  // リポジトリ名に置き換え
});
