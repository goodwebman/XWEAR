import { cn } from '../libs/cn'


type Props = {
    buttonText: string
	className?: string
}

const CustomButton = ({buttonText, className}: Props) => {
	return (
		<button className={cn('bg-[#121214] hover:bg-black/90 hover:shadow-2xl border-[2px] border-black  inline-flex duration-300 text-white font-bold  rounded-[10px] gap-[23px] px-[27px] py-[20px] whitespace-nowrap cursor-pointer max-[400px]:py-[10px] max-[400px]:gap-[5px] max-[400px]:px-[16px] hover:stroke-black ', className)}>
			<span className='uppercase font-[700]'>{buttonText}</span>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='white'
				className='w-[18px] h-[26px]  '
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='m8.25 4.5 7.5 7.5-7.5 7.5'
				/>
			</svg>
		</button>
	)
}

export default CustomButton
