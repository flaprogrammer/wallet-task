import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'sx8r46',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},
  },
});
