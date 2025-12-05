// Mock browsing history data simulating HTML learning related entries
// This simulates what a browser extension would fetch from browsing history

export interface HistoryEntry {
	id: string
	url: string
	title: string
	visitTime: Date
	category?: string // Will be assigned after processing
}

// Generate random date in last 7 days
const randomRecentDate = () => {
	const now = new Date()
	const daysAgo = Math.floor(Math.random() * 7)
	const hoursAgo = Math.floor(Math.random() * 24)
	return new Date(now.getTime() - daysAgo * 86400000 - hoursAgo * 3600000)
}

// Mock browsing history entries - HTML learning related
export const mockHistoryData: HistoryEntry[] = [
	// HTML Table related
	{
		id: "h1",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
		title: "HTML <table> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h2",
		url: "https://www.w3schools.com/html/html_tables.asp",
		title: "HTML Tables - W3Schools",
		visitTime: randomRecentDate(),
	},
	{
		id: "h3",
		url: "https://css-tricks.com/complete-guide-table-element/",
		title: "A Complete Guide to the Table Element | CSS-Tricks",
		visitTime: randomRecentDate(),
	},

	// HTML Div related
	{
		id: "h4",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
		title: "HTML <div> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h5",
		url: "https://www.w3schools.com/tags/tag_div.asp",
		title: "HTML div Tag - W3Schools",
		visitTime: randomRecentDate(),
	},
	{
		id: "h6",
		url: "https://stackoverflow.com/questions/div-vs-section",
		title: "When to use div vs section in HTML5 - Stack Overflow",
		visitTime: randomRecentDate(),
	},

	// HTML Span related
	{
		id: "h7",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span",
		title: "HTML <span> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h8",
		url: "https://www.w3schools.com/tags/tag_span.asp",
		title: "HTML span Tag - W3Schools",
		visitTime: randomRecentDate(),
	},

	// HTML Forms related
	{
		id: "h9",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
		title: "HTML <form> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h10",
		url: "https://www.w3schools.com/html/html_forms.asp",
		title: "HTML Forms Tutorial - W3Schools",
		visitTime: randomRecentDate(),
	},
	{
		id: "h11",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
		title: "HTML <input> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},

	// CSS related (different topic)
	{
		id: "h12",
		url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flexbox",
		title: "CSS Flexbox Guide - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h13",
		url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
		title: "A Complete Guide to Flexbox | CSS-Tricks",
		visitTime: randomRecentDate(),
	},
	{
		id: "h14",
		url: "https://www.w3schools.com/css/css_grid.asp",
		title: "CSS Grid Layout - W3Schools",
		visitTime: randomRecentDate(),
	},

	// JavaScript related (different topic)
	{
		id: "h15",
		url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
		title: "JavaScript Functions - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h16",
		url: "https://javascript.info/async-await",
		title: "Async/Await in JavaScript - JavaScript.info",
		visitTime: randomRecentDate(),
	},

	// HTML Semantics
	{
		id: "h17",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header",
		title: "HTML <header> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h18",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer",
		title: "HTML <footer> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},
	{
		id: "h19",
		url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
		title: "HTML <nav> Element - MDN Web Docs",
		visitTime: randomRecentDate(),
	},

	// Random non-programming related (will be filtered out)
	{
		id: "h20",
		url: "https://www.youtube.com/watch?v=random-video",
		title: "YouTube - Entertainment Video",
		visitTime: randomRecentDate(),
	},
	{
		id: "h21",
		url: "https://twitter.com/home",
		title: "Twitter / X - Home",
		visitTime: randomRecentDate(),
	},
	{
		id: "h22",
		url: "https://mail.google.com/mail/",
		title: "Gmail - Inbox",
		visitTime: randomRecentDate(),
	},
]
