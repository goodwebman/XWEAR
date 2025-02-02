
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navigation from './components/nav/Navigation'
import { SearchProvider } from './hooks/SearchContext'
import CatalogPage from './pages/CatalogPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';



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
							<Route path='/product' element={<ProductPage />} />{' '}
							{/* Маршрут для страницы товара */}
							
						</Routes>
						
					</div>
					<Footer />
				</SearchProvider>
			</Router>
		</section>
	)
}

export default App
