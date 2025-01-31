// src/App.tsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navigation from './components/nav/Navigation'
import Footer from './footer/Footer'
import { SearchProvider } from './hooks/SearchContext'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'

function App() {
	return (
		<section className='flex flex-col min-h-screen'>
			<Router>
				<SearchProvider>
					<div className='flex-1'>
						<Navigation />
						<Routes>
							<Route path='/' element={<HomePage />} />

							<Route path='/catalog/:type/*' element={<CatalogPage />} />
						</Routes>
					</div>
					<Footer />
				</SearchProvider>
			</Router>
		</section>
	)
}

export default App
