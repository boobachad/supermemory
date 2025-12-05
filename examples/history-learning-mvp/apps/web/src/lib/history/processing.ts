// Processing library for filtering and cross-referencing browsing history
// This converts history entries into the format expected by @supermemory/memory-graph

import type {
	DocumentWithMemories,
	MemoryEntry,
} from "@supermemory/memory-graph"
import type { HistoryEntry } from "./mock-data"

// Processing rules for categorizing entries
export interface ProcessingRule {
	keywords: string[]
	category: string
	parentLabel: string
}

// Processing rules for categorizing entries by topic
export const processingRules: ProcessingRule[] = [
	{
		keywords: ["table", "tr", "td", "th", "thead", "tbody"],
		category: "html-tables",
		parentLabel: "HTML Tables",
	},
	{
		keywords: ["div", "division", "container"],
		category: "html-div",
		parentLabel: "HTML Div/Containers",
	},
	{
		keywords: ["span", "inline"],
		category: "html-span",
		parentLabel: "HTML Span",
	},
	{
		keywords: ["form", "input", "submit", "textarea", "select", "button"],
		category: "html-forms",
		parentLabel: "HTML Forms",
	},
	{
		keywords: [
			"header",
			"footer",
			"nav",
			"section",
			"article",
			"aside",
			"semantic",
		],
		category: "html-semantic",
		parentLabel: "HTML Semantic Elements",
	},
	{
		keywords: ["css", "flexbox", "grid", "layout", "style", "stylesheet"],
		category: "css",
		parentLabel: "CSS Styling",
	},
	{
		keywords: ["javascript", "js", "function", "async", "await", "promise"],
		category: "javascript",
		parentLabel: "JavaScript",
	},
]

/**
 * Filter history entries - removes non-programming related entries
 * and assigns categories based on keywords
 */
export function filterHistoryEntries(entries: HistoryEntry[]): HistoryEntry[] {
	return entries.filter((entry) => {
		const titleLower = entry.title.toLowerCase()
		const urlLower = entry.url.toLowerCase()

		for (const rule of processingRules) {
			const matches = rule.keywords.some(
				(keyword) => titleLower.includes(keyword) || urlLower.includes(keyword)
			)
			if (matches) {
				entry.category = rule.category
				return true
			}
		}
		return false
	})
}

/**
 * Convert filtered history entries to unlinked DocumentWithMemories format
 * Each entry becomes a separate document with one memory entry
 * No parent nodes yet - just flat structure
 */
export function createUnlinkedDocuments(
	entries: HistoryEntry[]
): DocumentWithMemories[] {
	return entries.map((entry) => {
		const now = new Date().toISOString()

		const memoryEntry: MemoryEntry = {
			id: `mem-${entry.id}`,
			documentId: `doc-${entry.id}`,
			content: entry.title,
			title: entry.title,
			url: entry.url,
			createdAt: entry.visitTime.toISOString(),
			updatedAt: now,
			spaceContainerTag: entry.category || "uncategorized",
		}

		const document: DocumentWithMemories = {
			id: `doc-${entry.id}`,
			contentHash: entry.url,
			orgId: "mvp-org",
			userId: "mvp-user",
			title: entry.title,
			url: entry.url,
			status: "done",
			createdAt: entry.visitTime.toISOString(),
			updatedAt: now,
			memoryEntries: [memoryEntry],
		}

		return document
	})
}

/**
 * Cross-reference entries and create parent documents with linked memories
 * This groups entries by category and creates parent "topic" documents
 * Child memories link to their parent via memoryRelations
 */
export function crossReferenceDocuments(
	entries: HistoryEntry[]
): DocumentWithMemories[] {
	const documents: DocumentWithMemories[] = []
	const now = new Date().toISOString()

	// Group entries by category
	const categoryGroups = new Map<string, HistoryEntry[]>()
	for (const entry of entries) {
		if (entry.category) {
			const group = categoryGroups.get(entry.category) || []
			group.push(entry)
			categoryGroups.set(entry.category, group)
		}
	}

	// Create parent document for each category, then child documents that link to it
	categoryGroups.forEach((groupEntries, category) => {
		const rule = processingRules.find((r) => r.category === category)
		if (!rule) return

		const parentId = `doc-parent-${category}`
		const parentMemoryId = `mem-parent-${category}`

		// Create parent memory entry
		const parentMemory: MemoryEntry = {
			id: parentMemoryId,
			documentId: parentId,
			content: `Main topic: ${rule.parentLabel}. Contains ${groupEntries.length} related entries.`,
			title: rule.parentLabel,
			summary: `Parent topic for ${groupEntries.length} browsing history entries related to ${rule.parentLabel}`,
			createdAt: now,
			updatedAt: now,
			spaceContainerTag: category,
			isLatest: true,
		}

		// Create parent document
		const parentDocument: DocumentWithMemories = {
			id: parentId,
			contentHash: `parent-${category}`,
			orgId: "mvp-org",
			userId: "mvp-user",
			title: rule.parentLabel,
			summary: `Parent topic grouping ${groupEntries.length} entries`,
			status: "done",
			type: "parent-topic",
			createdAt: now,
			updatedAt: now,
			memoryEntries: [parentMemory],
		}

		documents.push(parentDocument)

		// Create child documents with memory relations linking to parent
		groupEntries.forEach((entry) => {
			const childMemory: MemoryEntry = {
				id: `mem-${entry.id}`,
				documentId: `doc-${entry.id}`,
				content: entry.title,
				title: entry.title,
				url: entry.url,
				createdAt: entry.visitTime.toISOString(),
				updatedAt: now,
				spaceContainerTag: category,
				// Link to parent memory
				parentMemoryId: parentMemoryId,
				memoryRelations: [
					{
						relationType: "derives",
						targetMemoryId: parentMemoryId,
					},
				],
			}

			const childDocument: DocumentWithMemories = {
				id: `doc-${entry.id}`,
				contentHash: entry.url,
				orgId: "mvp-org",
				userId: "mvp-user",
				title: entry.title,
				url: entry.url,
				status: "done",
				createdAt: entry.visitTime.toISOString(),
				updatedAt: now,
				memoryEntries: [childMemory],
			}

			documents.push(childDocument)
		})
	})

	return documents
}
