import useNav from '@/hooks/useNav'
import { useSearch } from '../../hooks/SearchContext'
import Cart from '../basket/Cart'
import SearchInput from '../catalog/SearchInput'
import FavoritesDrawer from '../favs/Favorites'
import Logo from '/logo.svg'
import search from '/search.svg'

const Navigation: React.FC = () => {
	const { handleSearch } = useSearch()
	const {
		showSearchInput,
		handleToggleSearchInput,
		isCatalogPage,
		isProductPage,
		isMainPage,
		isMenuOpen,
		toggleMenu,
		navItems,
		openDropdown,
		handleToggleDropdown,
		handleNavClick,
		dropdownRef,
	} = useNav()

	return (
		<nav className='bg-[#121214] '>
			<div className='max-w-[1300px] min-h-[115px] px-[30px] m-auto py-[32px] flex items-center justify-between'>
				{/* LOGO */}
				{!showSearchInput && (
					<div className='flex gap-[54px] max-[400px]:gap-[20px] '>
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
						<a href='XWEAR/'>
							<img src={Logo} alt='' />
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
				)}

				{isMenuOpen && (
					<div
						className='fixed inset-0 transition-opacity duration-300 ease-in-out'
						onClick={toggleMenu}
					></div>
				)}

				<nav
					className={`${
						isMenuOpen ? 'left-0' : 'left-[-100%]'
					}    fixed top-0 min-[970px]:hidden  w-[100%] h-full bg-[#121214] overflow-auto z-10  duration-300`}
				>
					<button onClick={toggleMenu} className='cursor-pointer p-4 '>
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

					<ul className='flex flex-col pl-[20px] justify-start  gap-[48px]'>
						{navItems.map(item => (
							<li key={item.name} className='relative group'>
								{item.dropdown ? (
									<div ref={dropdownRef}>
										<button
											className=' text-white gap-[4px] py-2  rounded focus:outline-none flex items-center'
											onClick={() => handleToggleDropdown(item.name)}
										>
											<p className='text-white font-[600] leading-[17px] cursor-pointer'>
												{item.name}
											</p>
											<div>
												{openDropdown ? (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m4.5 15.75 7.5-7.5 7.5 7.5'
														/>
													</svg>
												) : (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m19.5 8.25-7.5 7.5-7.5-7.5'
														/>
													</svg>
												)}
											</div>
										</button>
										{openDropdown === item.name && (
											<div className=' flex flex-col pt-[20px] gap-[15px] mt-2 bg-[#121214]  rounded shadow-lg z-10 p-[20] w-[200px]  h-48'>
												{item.dropdown.map(dropdownItem => (
													<button
														key={dropdownItem.name}
														className='block px-4 py-2 cursor-pointer text-white hover:underline w-full text-left'
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
										className='  text-white font-[600] leading-[17px]  relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:transition-all pb-[6px] before:duration-500 before:ease-in-out group-hover:before:w-full cursor-pointer'
										onClick={() => handleNavClick(item.path)}
									>
										{item.name}
									</button>
								)}
							</li>
						))}
					</ul>
				</nav>

				{/* NAV ITEMS */}
				{!showSearchInput && (
					<ul className='flex max-[970px]:hidden items-center gap-[48px]'>
						{navItems.map(item => (
							<li key={item.name} className='relative group'>
								{item.dropdown ? (
									<div ref={dropdownRef}>
										<button
											className=' text-white gap-[4px] py-2 px-4 rounded focus:outline-none flex items-center'
											onClick={() => handleToggleDropdown(item.name)}
										>
											<p className='text-white font-[600] leading-[17px] cursor-pointer'>
												{item.name}
											</p>
											<div>
												{openDropdown ? (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m4.5 15.75 7.5-7.5 7.5 7.5'
														/>
													</svg>
												) : (
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														stroke-width='1.5'
														stroke='white'
														className='size-4 opacity-60'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='m19.5 8.25-7.5 7.5-7.5-7.5'
														/>
													</svg>
												)}
											</div>
										</button>
										{openDropdown === item.name && (
											<div className='absolute flex flex-col pt-[20px] gap-[15px] mt-2 bg-[#121214]  rounded shadow-lg z-10 py-[20px] w-[200px]  '>
												{item.dropdown.map(dropdownItem => (
													<button
														key={dropdownItem.name}
														className='block px-4 py-2 cursor-pointer text-white hover:underline w-full text-left'
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
										className='  text-white font-[600] leading-[17px]  relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:transition-all pb-[6px] before:duration-500 before:ease-in-out group-hover:before:w-full cursor-pointer'
										onClick={() => handleNavClick(item.path)}
									>
										{item.name}
									</button>
								)}
							</li>
						))}
					</ul>
				)}

				{showSearchInput && (
					<button className='w-full flex-1 mx-[20px] min-w-[250px] max-[380px]:min-w-[140px] '>
						<SearchInput onSearch={handleSearch} />
					</button>
				)}
				{/* NAV ICONS */}
				<div className='flex items-center gap-[32px] max-[400px]:gap-[20px]'>
					{(isCatalogPage || isProductPage) && (
						<button
							onClick={handleToggleSearchInput}
							className='cursor-pointer'
						>
							<img src={search} alt='search' />
						</button>
					)}

					{isMainPage === 'XWEAR' && <button className='w-[18px]'></button>}

					{!showSearchInput && (
						<div className='flex items-center gap-[32px]'>
							<Cart /> <FavoritesDrawer />
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navigation
