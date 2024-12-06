import { BrowserRouter, Route, Routes } from "react-router-dom"
import publicRoutes from "./routes/publicRoutes"
import NotFound from "./pages/NotFound"
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import authRoutes from "./routes/authRoutes"
import { Helmet } from "react-helmet"
import Popup from "./components/Popup/Popup"

function App() {

	return (
		<>
			{/* Head */}
			<Helmet>
				<title>{import.meta.env.VITE_PROJECT_NAME}</title>
			</Helmet>

			{/* Body */}
			<BrowserRouter>
				<Routes>
					{/* Public Routes */}
					{publicRoutes.map((route, index) => {
						const Page = route.component
						const Layout = route.layout || DefaultLayout
						return (
							<Route key={index} path={route.path} element={
								<Layout>
									<Page />
								</Layout>
							} />
						)
					})}

					{/* Auth Routes */}
					{authRoutes.map((route, index) => {
						const Page = route.component
						const Layout = route.layout || DefaultLayout
						return (
							<Route key={index} path={route.path} element={
								<Layout>
									<Page />
								</Layout>
							} />
						)
					})}

					{/* Page Not found (404) */}
					<Route path="*" element={
						<DefaultLayout>
							<NotFound />
						</DefaultLayout>
					} />
				</Routes>

				{/* Components */}
				<ScrollToTop />
				<Popup />

			</BrowserRouter>
		</>
	)
}

export default App
