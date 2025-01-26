export function handsomePrice(number: number): string {
	if (number <= 1000) {
		return String(number) // Возвращаем число как строку, если оно меньше или равно 1000
	}

	const numberString = String(number)
	const thousandsSeparator = ' '
	let formattedNumber = ''

	for (let i = numberString.length - 1, count = 0; i >= 0; i--) {
		formattedNumber = numberString[i] + formattedNumber
		count++
		if (count === 3 && i !== 0) {
			formattedNumber = thousandsSeparator + formattedNumber
			count = 0
		}
	}
	return formattedNumber
}
