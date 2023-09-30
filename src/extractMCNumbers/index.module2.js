import nodeFileSystemPkg from 'fs'
import { load } from 'cheerio'
import path from 'path'

// Read the HTML file
const html = nodeFileSystemPkg.readFileSync(path.resolve(__dirname, './input.html'), 'utf-8')

// Load the HTML into cheerio
const $ = load(html)

// Initialize an array to store the extracted numbers
const extractedNumbers = []

// Regular expression pattern to match numbers in the format MC-XXXXX
const regex = /MC-(\d+)/g

// Find and extract numbers in the HTML
$('td').each((index, element) => {
	const text = $(element).text()
	const matches = text.match(regex)
	if (matches) {
		extractedNumbers.push(matches[0])
	}
})

// Log the extracted numbers
console.log(extractedNumbers)

// You can now save these numbers to a JSON file, CSV, or perform any other desired operations.
