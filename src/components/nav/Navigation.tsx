import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

const Navigation = () => {
	// const [toggleSearch, setToggleSearch] = useState<boolean>(false)
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

	const navItems = [
		{ name: 'Каталог', path: '/catalog' },

		{ name: 'Расчет стоимости', path: '/pricing' },
		{ name: 'Информация', path: '/information' },
	]

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
						className='hidden max-[960px]:block cursor-pointer max-[500px]:hidden'
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
					}  hidden max-[770px]:block fixed top-0  w-[100%] h-full bg-[#121214] overflow-auto z-10  duration-300`}
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

				{/* NAV ITEMS */}
				<ul className='flex max-[970px]:hidden items-center gap-[48px]'>
					{navItems.map(item => (
						<li key={item.path} className='relative group'>
							<Link
								to={item.path}
								className=' text-white font-[600] leading-[17px]  relative before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:transition-all pb-[6px] before:duration-500 before:ease-in-out group-hover:before:w-full'
							>
								{item.name}
							</Link>
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
