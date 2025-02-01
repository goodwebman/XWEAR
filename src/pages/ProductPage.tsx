import { Link, useLocation } from 'react-router-dom'
import { initialProducts } from '../data'

function ProductPage() {
	const location = useLocation()
	const products = initialProducts
	const queryParams = new URLSearchParams(location.search)

	const type = queryParams.get('type')
	const category = queryParams.get('category')
	const brand = queryParams.get('brand')
	const model = queryParams.get('model')

	const foundProduct = products.find(
		p =>
			p.type === type &&
			p.category === category &&
			p.brand === brand &&
			p.model === model
	)

	if (!foundProduct) {
		return <div>Product not found</div>
	}

	return (
		<div className='max-w-[1300px] mx-auto'>
          <div className="text-gray-500 text-sm">
              <span className="hover:text-gray-700">Главная</span>
              <span className="mx-1">/</span>
              <span  className="hover:text-gray-700">Каталог товаров</span>
              <span className="mx-1">/</span>
              <Link to={`/catalog/${type.toLowerCase()}`} className="hover:text-gray-700">{type}</Link>
              <span className="mx-1">/</span>
              <span className="hover:text-gray-700">{category}</span>
              <span className="mx-1">/</span>
              <span>{`${brand} ${model}`}</span>
          </div>
        <h2>{foundProduct.brand} {foundProduct.model}</h2>
         {/*Остальной контент*/}
      </div>
	)
}

export default ProductPage
