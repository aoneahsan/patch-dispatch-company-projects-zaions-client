import nodeFileSystemPkg from 'fs'
import puppeteer from 'puppeteer'
import { saferWebsiteUrl } from './utils/constants/index.js'
import { getMCNumbers } from './extractMCNumbers/index.module.js'

async function main() {
	// const extractedNumbers = getMCNumbers()

	// if (extractedNumbers.length > 0) {
		// Launch a headless Chromium browser
		const browser = await puppeteer.launch({
			headless: 'new',
		})
		// const browser = await puppeteer.launch({
		//   headless: 'new'
		// });

		// Create a new page
		const page = await browser.newPage()

		// Navigate to the target website
		await page.goto(saferWebsiteUrl) // Replace with the actual website URL


		// Extract the number from the HTML file provided by your client
		const extractedNumber = '65510' // Replace with your extraction logic

		// Fill out a form or perform any required actions on the website
		// Select "MC/MX Number"
		page.click('label[for="2"]')

		// enter number
		page.type('input[id="4"]', extractedNumber)

		await page.click('input[type="SUBMIT"]')

		// wait for redirect
		await page.waitForNavigation()

		// Extract data from the resulting page
		const extractedData = await page.evaluate(() => {
			// Use JavaScript to extract data from the page
			const dataElement = document.querySelector(
				'table[summary="For formatting purpose"] tbody tr:nth-child(7) td'
			) // Replace with actual selector
			return dataElement ? dataElement?.textContent?.trim() : null
		})

		// Close the browser
		await browser.close()

		// Store the extracted data in an Excel file or any desired format
		// Example: Write to a CSV file
		nodeFileSystemPkg.writeFileSync(
			'extracted_data.csv',
			extractedData,
			'utf-8'
		)
	// } else {
	// 	console.error('extractedNumbers array is empty')
	// }
}

main().catch((error) => console.error('Error:', error))
