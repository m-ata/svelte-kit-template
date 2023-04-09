import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
		  "/token": "https://company.dev.fishreg.net",
		  "/logout": "https://company.dev.fishreg.net",
		  "/api/v1": "https://company.dev.fishreg.net",
		},
	  },
});
