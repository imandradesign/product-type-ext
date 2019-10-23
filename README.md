# Squarespace Product Type Highlighter

###### This is a Chrome browser extension that highlights products on a Squarespace Products Page to view their type when the extension is clicked / enabled.

##### By Imandra Mckenzie, Ralph Daub, and Deb Margarella


#### Program Flow

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


#### Languages
* JavaScript
* HTML
* CSS
