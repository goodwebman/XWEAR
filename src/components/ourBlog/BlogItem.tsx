type Props = {
	img: string
	title: string
	desk: string
	id: number
}

const BlogItem = ({ id, img, title, desk }: Props) => {
	return (
		<button className='text-left  max-w-[433px] cursor-pointer min-w-[160px]'>
			<img className='mt-[32px]' src={img} alt={title} />

			<h1 className='font-[800] text-[23px] pt-[12px] leading-[30px] text-[#121214]'>
				{title}
			</h1>

			<p className='text-[16px] pt-[12px] leading-[26px] font-[400] text-[#303030]'>
				{desk}
			</p>

			<div className='flex relative justify-between gap-8  pt-[12px]  '>
				<button className=' text-[15px] font-[800] uppercase'>
					Узнать подробнее
				</button>
				<div className='absolute h-[3.5px] w-[95px] bottom-[-0.1px]  rounded-2xl bg-[#49D0FF] z-0 '></div>
				<p className='text-[13px] leading-[23px] text-[#8C8F96]'>
					16 июня 2023
				</p>
			</div>
		</button>
	)
}

export default BlogItem
