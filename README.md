# Squarespace Product Type Highlighter
This is a Chrome browser extension that works in a Squarespace Product Page, highlighting and counting the different product types.

## Motivation
This extension helps troubleshoot issues customers may write to us about in regards to products and Product Page behaviors. 

Investigating product types would normally require viewing each product separately. This extension solves that problem.

This project was developed as a Code Camp Hackweek project.

## Installation

1. Download the extension from this link: [https://link](https://link)
2. Open the Chrome browser extension panel from this link: [chrome://extensions/](chrome://extensions/)
3. Enable "Developer Mode" in the top-right corner.
4. ?????Install App????? - (update this with correct steps, depending on whether we pack extension, and where we host it)

## How to use?
In order to use this extension, you must be viewing a Squarespace Product Page. Just click on the Squarespace Product Type Highlighter extension, and watch the magic happen.

## Languages used
<b>Built with</b>
* [HTML](https://developer.mozilla.org/en-US/docs/Web/html)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/css)

## Authors
Imandra Mckenzie, Ralph Daub, and Deb Margarella

### Special Thanks
Thanks to Ross Donaldson for leading the Code Camp classes and inspiring us to hack away. 
Special thanks to all others involved in various aspects of Code Camp, from leading classes, answering questions, making things happen behind the scene, bringing treats, and making the space for learning and coding!

#### Program Flow
The following program flow was drafted on the first day of our Hackweek project.

1. Find the Products Page URL slug from the HTML
 * < link rel="canonical" href=“BUILT-IN DOMAIN & SLUG”>

2. Access JSON data from Products Page URL while logged in
 * Append **?format=json** to the end of the retrieved URL

3. Find the “productType”

4. Return count of each “productType”
 * physical = 1
 * digital = 2
 * service = 3
 * gift card = 4

5. Build visible display overlaying the page for the user

6. Correlate the count for each product type to the correct line in the display