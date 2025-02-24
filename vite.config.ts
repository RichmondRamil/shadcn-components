import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		plugins: [react()],
		server: {
			port: parseInt(process.env.VITE_PORT),
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@shadcn': path.resolve(__dirname, './src/dependencies/shadcn'),
			},
		},
	});
};
