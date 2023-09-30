const nodeFileSystemPkg = require('fs')
const { load } = require('cheerio')
const path = require('path')

// Read the HTML file

const getMCNumbers = () => {
	const pathToFile = path.resolve(__dirname, 'input.html')

	console.log({ pathToFile })
	const html = nodeFileSystemPkg.readFileSync(
		path.resolve(__dirname, 'input.html'),
		'utf-8'
	)

	// console.log(html)
	// Load the HTML into cheerio
	const $ = load(html)

	console.log($)

	// Initialize an array to store the extracted numbers
	const extractedNumbers = []

	// Regular expression pattern to match numbers in the format MC-XXXXX
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

	// You can now save these numbers to a JSON file, CSV, or perform any other desired operations.

	return extractedNumbers
}
