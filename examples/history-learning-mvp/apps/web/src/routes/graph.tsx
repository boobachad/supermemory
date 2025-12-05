import { createFileRoute } from "@tanstack/react-router"
import { useState, useCallback, useMemo } from "react"
import { MemoryGraph, type DocumentWithMemories } from "@supermemory/memory-graph"
import "@supermemory/memory-graph/styles.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	mockHistoryData,
	filterHistoryEntries,
	createUnlinkedDocuments,
	crossReferenceDocuments,
	type HistoryEntry,
} from "@/lib/history"

export const Route = createFileRoute("/graph")({
	component: GraphComponent,
})

type ViewState = "initial" | "filtered" | "cross-referenced"

function GraphComponent() {
	const [viewState, setViewState] = useState<ViewState>("initial")
	const [filteredEntries, setFilteredEntries] = useState<HistoryEntry[]>([])
	const [documents, setDocuments] = useState<DocumentWithMemories[]>([])
	const [isProcessing, setIsProcessing] = useState(false)

	// Step 1: Fetch and filter history entries
	const handleFetchAndFilter = useCallback(() => {
		setIsProcessing(true)

		// Simulate async processing
		setTimeout(() => {
			// Filter the mock history data
			const filtered = filterHistoryEntries([...mockHistoryData])
			setFilteredEntries(filtered)

			// Create unlinked documents for display
			const unlinkedDocs = createUnlinkedDocuments(filtered)
			setDocuments(unlinkedDocs)

			setViewState("filtered")
			setIsProcessing(false)
		}, 500)
	}, [])

	// Step 2: Cross-reference and create parent nodes
	const handleCrossReference = useCallback(() => {
		setIsProcessing(true)

		// Simulate async processing
		setTimeout(() => {
			// Cross-reference and create linked documents
			const linkedDocs = crossReferenceDocuments(filteredEntries)
			setDocuments(linkedDocs)

			setViewState("cross-referenced")
			setIsProcessing(false)
		}, 800)
	}, [filteredEntries])

	// Reset to initial state
	const handleReset = useCallback(() => {
		setViewState("initial")
		setFilteredEntries([])
		setDocuments([])
	}, [])

	// Statistics
	const stats = useMemo(() => {
		const totalHistory = mockHistoryData.length
		const filteredCount = filteredEntries.length
		const removedCount = totalHistory - filteredCount

		// Count categories
		const categories = new Map<string, number>()
		for (const entry of filteredEntries) {
			if (entry.category) {
				categories.set(entry.category, (categories.get(entry.category) || 0) + 1)
			}
		}

		return {
			totalHistory,
			filteredCount,
			removedCount,
			categoryCount: categories.size,
			categories: Array.from(categories.entries()),
		}
	}, [filteredEntries])

	return (
		<div className="flex h-full flex-col">
			{/* Control Panel */}
			<div className="shrink-0 border-b bg-card p-4">
				<div className="container mx-auto">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div>
							<h1 className="text-xl font-semibold">
								History Learning MVP - Memory Graph Demo
							</h1>
							<p className="text-sm text-muted-foreground">
								Visualize browsing history as a knowledge graph with cross-referencing
							</p>
						</div>

						<div className="flex items-center gap-2">
							<Button
								onClick={handleFetchAndFilter}
								disabled={isProcessing || viewState !== "initial"}
								variant={viewState === "initial" ? "default" : "secondary"}
							>
								{isProcessing && viewState === "initial"
									? "Filtering..."
									: "1. Fetch & Filter History"}
							</Button>

							<Button
								onClick={handleCrossReference}
								disabled={isProcessing || viewState !== "filtered"}
								variant={viewState === "filtered" ? "default" : "secondary"}
							>
								{isProcessing && viewState === "filtered"
									? "Processing..."
									: "2. Cross-Reference"}
							</Button>

							<Button onClick={handleReset} variant="outline">
								Reset
							</Button>
						</div>
					</div>

					{/* Statistics Panel */}
					{viewState !== "initial" && (
						<div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
							<Card>
								<CardHeader className="pb-2">
									<CardDescription>Total History Entries</CardDescription>
									<CardTitle className="text-2xl">{stats.totalHistory}</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription>Filtered (Relevant)</CardDescription>
									<CardTitle className="text-2xl text-green-500">
										{stats.filteredCount}
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription>Removed (Irrelevant)</CardDescription>
									<CardTitle className="text-2xl text-red-500">
										{stats.removedCount}
									</CardTitle>
								</CardHeader>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription>Topic Categories</CardDescription>
									<CardTitle className="text-2xl text-blue-500">
										{stats.categoryCount}
									</CardTitle>
								</CardHeader>
							</Card>
						</div>
					)}

					{/* Category Breakdown */}
					{viewState === "cross-referenced" && stats.categories.length > 0 && (
						<div className="mt-4">
							<p className="mb-2 text-sm font-medium">Categories (Parent Nodes):</p>
							<div className="flex flex-wrap gap-2">
								{stats.categories.map(([category, count]) => (
									<span
										key={category}
										className="rounded-full bg-primary/10 px-3 py-1 text-sm"
									>
										{category}: {count} entries
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Graph Container */}
			<div className="flex-1 overflow-hidden">
				{viewState === "initial" ? (
					<div className="flex h-full items-center justify-center">
						<Card className="max-w-md">
							<CardHeader>
								<CardTitle>Get Started</CardTitle>
								<CardDescription>
									This MVP demonstrates how browsing history can be visualized as a
									knowledge graph using @supermemory/memory-graph.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2 text-sm">
									<p>
										<strong>Step 1:</strong> Click "Fetch & Filter History" to load
										mock browsing history and filter out irrelevant entries.
									</p>
									<p>
										<strong>Step 2:</strong> Click "Cross-Reference" to analyze
										entries and create parent topic nodes that link related items.
									</p>
								</div>
								<Button onClick={handleFetchAndFilter} className="w-full">
									Start Demo
								</Button>
							</CardContent>
						</Card>
					</div>
				) : (
					<MemoryGraph
						documents={documents}
						isLoading={isProcessing}
						variant="consumer"
						showSpacesSelector={false}
					>
						<div className="flex h-full items-center justify-center text-muted-foreground">
							No documents to display
						</div>
					</MemoryGraph>
				)}
			</div>

			{/* Status Bar */}
			<div className="shrink-0 border-t bg-muted/50 px-4 py-2">
				<div className="container mx-auto flex items-center justify-between text-sm">
					<span>
						Status:{" "}
						<span className="font-medium">
							{viewState === "initial" && "Ready to start"}
							{viewState === "filtered" && "Showing filtered entries (unlinked)"}
							{viewState === "cross-referenced" &&
								"Showing cross-referenced entries with parent nodes"}
						</span>
					</span>
					<span className="text-muted-foreground">
						Documents: {documents.length} | Using @supermemory/memory-graph
					</span>
				</div>
			</div>
		</div>
	)
}
