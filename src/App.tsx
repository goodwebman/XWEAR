import Categories from './components/categories/Categories'
import Navigation from './components/nav/Navigation'
import Price from './components/price/Price'
import Slider from './components/slider/Slider'
import {shoes, clothes, accessories} from './data'

function App() {
	return (
		<>
			<Navigation />
			<Slider />
			<Categories data={shoes} cat={'Обувь'} />
			<Categories data={clothes} cat={'Одежда'} />
			<Categories data={accessories} cat={'Аксессуары'} />
			<Price />
		</>
	)
}

export default App
