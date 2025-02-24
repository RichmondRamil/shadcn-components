// REACT
import { useState, useEffect } from 'react';
// DEPENDENCIES
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
// PAGES
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Dashboard from './pages/DashBoard';
import NotFoundPage from './pages/NotFound';
// COMPONENTS
import Loader from './shared/components/common/Loader';
// HOC
import PrivateRoutes from './shared/components/hoc/PrivateRoute';
import PublicRoutes from './shared/components/hoc/PublicRoute';
// Layout
import DashboardLayout from './shared/components/layout/Dashboard';
// THEME AND CSS
import { ThemeProvider } from '@shadcn/components/theme-provider';

function App() {
	const [isLoading, setIsLoading] = useState(false);

	async function axiosInterceptor() {
		axios.interceptors.request.use(
			(config) => {
				// setIsLoading(true);
				return config;
			},
			(error) => {
				setIsLoading(false);
				return Promise.reject(error);
			}
		);

		axios.interceptors.response.use(
			(response) => {
				// set loading to false
				setIsLoading(false);
				return response;
			},
			(error) => {
				console.log('error', error);
				setIsLoading(false);
				if (!error.response) {
					// TODO: PUT YOUR ERROR MODAL HERE

					return;
				}
				// Show the error message
				if (error.response.data.message) {
					// TODO: PUT YOUR ERROR MODAL HERE
				}
			}
		);
	}

	useEffect(() => {
		axiosInterceptor();
	}, []);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Loader isLoading={isLoading} />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/dashboard" element={<DashboardLayout />}>
							<Route index element={<Dashboard />} />
							<Route path="contact" element={<h1>Contact</h1>} />
						</Route>
					</Route>
					<Route element={<PublicRoutes />}>
						<Route path="/login" element={<LoginPage />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
