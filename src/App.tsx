import Categories from './components/categories/Categories'
import Navigation from './components/nav/Navigation'
import Slider from './components/slider/Slider'

function App() {
	return (
		<>
			<Navigation />
			<Slider />
			<Categories cat={'Обувь'} />
		</>
	)
}

export default App
