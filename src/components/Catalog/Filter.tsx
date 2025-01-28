
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import SizeFilter from './SizeFilter';
import BrandFilter from './BrandFilter';
import ModelFilter from './ModelFilter';
import ColorFilter from './ColorFilter';
import SortingFilter from './SortingFilter';
import { Filters, Product } from '../../types'



interface FilterProps {
    onFilterChange: (filters: Partial<Filters>) => void;
    products: Product[];
}

function Filter({ onFilterChange, products }: FilterProps) {

    const getUniqueValues = (products: Product[], key: keyof Product): any[] => {
        return [...new Set(products.map(item => item[key]))]
    }
    const categories = getUniqueValues(products, 'category')
    const sizes = getUniqueValues(products, 'size')
    const brands = getUniqueValues(products, 'brand')
    const models = getUniqueValues(products, 'model')
    const colors = getUniqueValues(products, 'color')

  return (
    <div className="space-y-4">
        <CategoryFilter categories={categories} onFilterChange={onFilterChange} />
        <PriceFilter onFilterChange={onFilterChange}/>
      <SizeFilter sizes={sizes} onFilterChange={onFilterChange}/>
      <BrandFilter brands={brands} onFilterChange={onFilterChange}/>
      <ModelFilter models={models} onFilterChange={onFilterChange}/>
        <ColorFilter colors={colors} onFilterChange={onFilterChange} />
      <SortingFilter onFilterChange={onFilterChange}/>
    </div>
  );
}

export default Filter;
