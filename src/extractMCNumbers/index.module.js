import fs from 'fs'
import cheerio from 'cheerio'
import path from 'path'

export const getMCNumbers = () => {
	// Specify the correct path to the HTML file
	const htmlFilePath = path.join(
		new URL('.', import.meta.url).pathname,
		'./input.html'
	)

	// Read the HTML file
	const html = fs.readFileSync(htmlFilePath, 'utf-8')

	// Load the HTML into cheerio
	const $ = cheerio.load(html)

	// Initialize an array to store the extracted numbers
	const extractedNumbers = []

	// Regular expression pattern to match numbers in the format MC-XXXXX and capture only the numeric part
	const regex = /MC-(\d+)/g

	// Find and extract numbers in the HTML
	$('th').each((index, element) => {
		const text = $(element).text()
		const matches = text.match(regex)
		if (matches) {
			const numericPart = matches[0].replace('MC-', '') // Extract numeric part
			extractedNumbers.push(numericPart)
		}
	})

	// Log the extracted numbers
	console.log(extractedNumbers)

	return extractedNumbers
}
