import AboutUs from './components/about/AboutUs'
import Categories from './components/categories/Categories'
import Navigation from './components/nav/Navigation'
import Blog from './components/ourBlog/Blog'
import Price from './components/price/Price'
import Slider from './components/slider/Slider'
import { accessories, clothes, shoes, ourBlog } from './data'

function App() {
	return (
		<>
			<Navigation />
			<Slider />
			<Categories moreButton='товаров' data={shoes} cat={'Обувь'} />
			<Categories moreButton='товаров' data={clothes} cat={'Одежда'} />
			<Categories moreButton='товаров' data={accessories} cat={'Аксессуары'} />
			<Price />
			<AboutUs />
			<Blog moreButton='статей' isBlog={true} data={ourBlog} cat='Наш Блог' />
			
		</>
	)
}

export default App
