import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: 'jsdom',
        api: {
            host: '127.0.0.1', // Exposes the server to the WSL gateway
            port: 3001,     // Or change to a unique port like 5432 if still blocked
        },
    }
});
