// src/App.tsx
import { useEffect, useState } from 'react'
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useNavigate,
} from 'react-router-dom'
import Navigation from './components/nav/Navigation'
import { initialProducts } from './data'
import Footer from './footer/Footer'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'

function App() {
	
	return (
		<section className='flex flex-col min-h-screen'>
			<Router>
				<div className='flex-1'>
					<Navigation />
					<Routes>
						<Route path='/' element={<HomePage />} />

						<Route path='/catalog/:type/*' element={<CatalogPage />} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</section>
	)
}

export default App
