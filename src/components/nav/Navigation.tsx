import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { initialProducts } from '../../data'

interface NavItem {
	name: string
	path: string
	dropdown?: NavItem[]
}

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	const menuRef = useRef<HTMLDivElement>(null)

	const toggleMenu = (): void => {
		setIsMenuOpen(!isMenuOpen)
	}
	const handleClickOutside = (event: MouseEvent): void => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsMenuOpen(false)
		}
	}

	useEffect(() => {
		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isMenuOpen])

	//updaTE

	const navigate = useNavigate()
	const [types, setTypes] = useState<string[]>([])
	const [navItems, setNavItems] = useState<NavItem[]>([])
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
        const uniqueTypes = [...new Set(initialProducts.map(product => product.type))].map(type => type.toLowerCase())
           setTypes(uniqueTypes)
          const initialNavItems = [
                  {
                      name: 'Каталог',
                      path: '/catalog',
                      dropdown: uniqueTypes.map((type) => ({ name: type.charAt(0).toUpperCase() + type.slice(1), path: `/catalog/${type}` }))
                  },
                  {
                      name: 'Расчет стоимости',
                      path: '/pricing'
                  },
                  {
                      name: 'Информация',
                      path: '/information',
                      dropdown: [
                          { name: 'Контакты', path: '/information/contact' },
                          { name: 'О нас', path: '/information/about' }
                      ]
                  },
              ];
          setNavItems(initialNavItems);

      }, [])

	const handleToggleDropdown = (name: string) => {
		setOpenDropdown(openDropdown === name ? null : name)
	}

	const handleNavClick = (path: string) => {
		setOpenDropdown(null)
		navigate(path)
	}

	// update

	// const [isOpen, setIsOpen] = useState<boolean>(false)
	// const dropdownRef = useRef<HTMLDivElement | null>(null)
	// const navigate = useNavigate()
	// const [types, setTypes] = useState<string[]>([])
	// useEffect(() => {
	// 	const uniqueTypes = [
	// 		...new Set(initialProducts.map(product => product.type)),
	// 	].map(type => type.toLowerCase())
	// 	setTypes(uniqueTypes)
	// 	if (uniqueTypes.length > 0) {
	// 		navigate(`/catalog/${uniqueTypes[0]}`)
	// 	}
	// }, [navigate])

	// const handleToggle = () => {
	// 	setIsOpen(!isOpen)
	// }

	// const handleTypeClick = (type: string) => {
	// 	navigate(`/catalog/${type}`)
	// 	setIsOpen(false)
	// }

	// useEffect(() => {
	// 	document.addEventListener('mousedown', handleClickOutside)
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside)
	// 	}
	// }, [])

	return (
		<nav className='bg-[#121214]'>
			<div className='max-w-[1200px] px-[30px] m-auto py-[32px] flex items-center justify-between'>
				{/* LOGO */}
				<div className='flex gap-[54px] max-[400px]:gap-[20px]'>
					<button
						onClick={toggleMenu}
						className='hidden max-[500px]:block cursor-pointer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='white'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 9h16.5m-16.5 6.75h16.5'
							/>
						</svg>
					</button>
					<a href='/'>
						<img src='logo.svg' alt='' />
					</a>

					<button
						onClick={toggleMenu}
						className='hidden max-[970px]:block cursor-pointer max-[500px]:hidden'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='white'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 9h16.5m-16.5 6.75h16.5'
							/>
						</svg>
					</button>
				</div>

				{isMenuOpen && (
					<div
						className='fixed inset-0   transition-opacity duration-300 ease-in-out'
						onClick={toggleMenu}
					></div>
				)}

				<nav
					className={`${
						isMenuOpen ? 'left-0' : 'left-[-100%]'
					}    fixed top-0  w-[100%] h-full bg-[#121214] overflow-auto z-10  duration-300`}
				>
					<button onClick={toggleMenu} className='cursor-pointer p-4'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='white'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18 18 6M6 6l12 12'
							/>
						</svg>
					</button>

					<ul className='p-[10px_40px] flex flex-col gap-[50px]'>
						{navItems.map(item => (
							<li key={item.path} className='relative'>
								<Link
									to={item.path}
									className='text-white font-[600] leading-[17px]'
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* <Link
								to={item.path}
								className=' text-white font-[600] leading-[17px]  relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:transition-all pb-[6px] before:duration-500 before:ease-in-out group-hover:before:w-full'
							>
								{item.name}
							</Link> */}

				{/* NAV ITEMS */}
				<ul className='flex max-[970px]:hidden items-center gap-[48px]'>
					{navItems.map(item => (
						<li key={item.name} className='relative group'>
							{item.dropdown ? (
								<div ref={dropdownRef}>
									<button
										className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none flex items-center'
										onClick={() => handleToggleDropdown(item.name)}
									>
										{item.name}
										<span className='ml-1'>&#9660;</span>
									</button>
									{openDropdown === item.name && (
										<div className='absolute right-0 mt-2 bg-white border rounded shadow-lg z-10 w-48'>
											{item.dropdown.map(dropdownItem => (
												<button
													key={dropdownItem.name}
													className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'
													onClick={() => handleNavClick(dropdownItem.path)}
												>
													{dropdownItem.name}
												</button>
											))}
										</div>
									)}
								</div>
							) : (
								<button
									className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none'
									onClick={() => handleNavClick(item.path)}
								>
									{item.name}
								</button>
							)}
						</li>
					))}
				</ul>

				{/* NAV ICONS */}
				<div className='flex items-center gap-[32px] max-[400px]:gap-[20px]'>
					<button className='cursor-pointer'>
						<img src='favorites.svg' alt='fav' />
					</button>
					<button className='cursor-pointer'>
						<img src='profile.svg' alt='prof' />
					</button>
					<div className='flex gap-[6px] items-center'>
						<button className='cursor-pointer relative'>
							<img src='busket.svg' alt='busket' />
							<div className=' hidden absolute  max-[500px]:inline-flex  top-[-8px] w-[8px] h-[8px] items-center justify-center rounded-full text-white p-2  bg-blue-400 '>
								<span className='text-[12px] font-[400]'>7</span>
							</div>
						</button>
						<span className='text-[#8C8F96] relative font-[800] whitespace-nowrap max-[500px]:hidden'>
							11 899 ₽
						</span>
						<div className='relative inline-flex w-[18px] h-[18px] items-center justify-center rounded-full text-white p-3  bg-blue-400 max-[500px]:hidden'>
							<span className='font-[800]'>7</span>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navigation
