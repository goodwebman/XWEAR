import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Product, Filters } from '../types'; // Импортируем типы

interface UseProductFiltersProps {
  initialProducts: Product[];
}


const useProductFilters = ({ initialProducts }: UseProductFiltersProps) => {
    const { type } = useParams<{ type: string }>();
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();

    const initialFilters: Filters = {
        category: searchParams.getAll('category'),
        price:
            searchParams.getAll('price').length > 0
                ? searchParams.getAll('price').map(Number)
                : [0, 8000],
        size: searchParams.getAll('size'),
        brand: searchParams.getAll('brand'),
        model: searchParams.getAll('model'),
        color: searchParams.getAll('color'),
        sorting: searchParams.get('sorting') as 'asc' | 'desc' | null,
    };

    const [filters, setFilters] = useState<Filters>(initialFilters);

    const filteredProducts = useMemo(() => {
        let filtered = initialProducts.filter(
            product => product.type.toLowerCase() === type
        );

        // Фильтрация по категории
        if (filters.category.length > 0) {
            filtered = filtered.filter(product =>
                filters.category.includes(product.category)
            );
        }

        // Фильтрация по цене
        if (filters.price && filters.price.length === 2) {
            filtered = filtered.filter(
                product =>
                    product.price >= filters.price[0] && product.price <= filters.price[1]
            );
        }

        // Фильтрация по размеру
        if (filters.size.length > 0) {
            filtered = filtered.filter(product => {
                if (typeof product.size === 'number') {
                    return filters.size.includes(product.size.toString());
                } else {
                    return filters.size.includes(product.size);
                }
            });
        }

        // Фильтрация по бренду
        if (filters.brand.length > 0) {
            filtered = filtered.filter(product =>
                filters.brand.includes(product.brand)
            );
        }
        // Фильтрация по модели
        if (filters.model.length > 0) {
            filtered = filtered.filter(product =>
                filters.model.includes(product.model)
            );
        }
        // Фильтрация по цвету
        if (filters.color.length > 0) {
            filtered = filtered.filter(product =>
                filters.color.includes(product.color)
            );
        }
        // Сортировка
        if (filters.sorting === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sorting === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [filters, type, initialProducts]);

    const typeProducts = useMemo(() => {
        return initialProducts.filter(
            product => product.type.toLowerCase() === type
        );
    }, [type, initialProducts]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.category.length > 0) {
            filters.category.forEach(category => params.append('category', category));
        }
        if (filters.price && filters.price.length === 2) {
            params.append('price', filters.price[0].toString());
            params.append('price', filters.price[1].toString());
        }
        if (filters.size.length > 0) {
            filters.size.forEach(size => {
                if (typeof size === 'number') {
                    params.append('size', size.toString());
                } else {
                    params.append('size', size);
                }
            });
        }
        if (filters.brand.length > 0) {
            filters.brand.forEach(brand => params.append('brand', brand));
        }
        if (filters.model.length > 0) {
            filters.model.forEach(model => params.append('model', model));
        }
        if (filters.color.length > 0) {
            filters.color.forEach(color => params.append('color', color));
        }
        if (filters.sorting) {
            params.set('sorting', filters.sorting);
        }
        navigate({
            pathname: `/catalog/${type}`,
            search: params.toString(),
        });
    }, [filters, type, navigate]);

    const handleResetFilters = () => {
        setFilters({
            category: [],
            price: [0, 8000],
            size: [],
            brand: [],
            model: [],
            color: [],
            sorting: null,
        });
    };

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    return {
        filters,
        filteredProducts,
        typeProducts,
        handleResetFilters,
        handleFilterChange,
        type
    };
};

export default useProductFilters;
