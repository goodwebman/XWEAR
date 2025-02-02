import {
    useState,
    useEffect,
    useRef,
    useCallback,
  } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useSearch } from './SearchContext'; // Укажите правильный путь к вашему контексту поиска
  import { initialProducts } from '../data'; // Путь к вашим данным
  interface NavItem {
      name: string;
      path: string;
      dropdown?: { name: string; path: string }[];
  }
  
  interface HeaderHookResult {
    showSearchInput: boolean;
    handleToggleSearchInput: () => void;
    isCatalogPage: boolean;
    isProductPage: boolean;
    isMainPage: string;
    isMenuOpen: boolean;
    toggleMenu: () => void;
    menuRef: React.RefObject<HTMLDivElement>;
      navItems: NavItem[];
      openDropdown: string | null;
    handleToggleDropdown: (name: string) => void;
      handleNavClick: (path: string) => void;
      dropdownRef: React.RefObject<HTMLDivElement | null>
  }
  
  
  const useNav = (): HeaderHookResult => {
    const { handleSearch } = useSearch(); // Получаем handleSearch из контекста
    const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
    const location = useLocation();
    const isCatalogPage = location.pathname.startsWith('/catalog');
    const isProductPage = location.pathname.startsWith('/product');
    const isMainPage = location.pathname;
  
    const handleClearSearch = () => {
      handleSearch(''); // Сбрасываем поиск на пустую строку
    };
  
    const handleToggleSearchInput = useCallback(() => {
      setShowSearchInput(!showSearchInput);
        handleClearSearch()
    }, [showSearchInput, handleClearSearch]);
  
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
      const [navItems, setNavItems] = useState<NavItem[]>([]);
      const [openDropdown, setOpenDropdown] = useState<string | null>(null);
      
      const navigate = useNavigate();
      
      const dropdownRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
  
    const toggleMenu = (): void => {
      setIsMenuOpen(!isMenuOpen);
    };
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
  
    useEffect(() => {
      if (isMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isMenuOpen]);
  
      useEffect(() => {
          const uniqueTypes = [
            ...new Set(initialProducts.map(product => product.type)),
          ].map(type => type.toLowerCase());
          
          const initialNavItems = [
            {
              name: 'Каталог',
              path: '/catalog',
              dropdown: uniqueTypes.map(type => ({
                name: type.charAt(0).toUpperCase() + type.slice(1),
                path: `/catalog/${type}`,
              })),
            },
            {
              name: 'Created by',
              path: '',
            },
            {
              name: 'GoodWebMan',
              path: '',
            },
          ];
          setNavItems(initialNavItems);
        }, []);
      
        const handleToggleDropdown = (name: string) => {
          setOpenDropdown(openDropdown === name ? null : name);
        };
      
        const handleNavClick = (path: string) => {
          setIsMenuOpen(!isMenuOpen);
          setOpenDropdown(null);
          navigate(path);
        };
  
    return {
      showSearchInput,
      handleToggleSearchInput,
      isCatalogPage,
      isProductPage,
      isMainPage,
      isMenuOpen,
      toggleMenu,
        menuRef,
      navItems,
      openDropdown,
        handleToggleDropdown,
        handleNavClick,
        dropdownRef
    };
  };
  
  export default useNav;
  