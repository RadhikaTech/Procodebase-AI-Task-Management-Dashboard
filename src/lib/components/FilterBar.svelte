<script lang="ts">
  import { filters, filterActions } from "$lib/stores/tasks"
  import { uiActions } from "$lib/stores/ui"
  import Button from "./ui/Button.svelte"
  import Input from "./ui/Input.svelte"
  import Select from "./ui/Select.svelte"
  import { Plus, Search, X, Filter, SortAsc, Sparkles } from "lucide-svelte"
  import type { TaskStatus, SortOption } from "$lib/types"

  let searchValue = $state("")
  let statusFilter = $state<TaskStatus | "all">("all")
  let sortBy = $state<SortOption>("created-desc")
  let searchTimeout: number

  // Initialize from store
  $effect(() => {
    searchValue = $filters.search || ""
    statusFilter = $filters.status || "all"
    sortBy = $filters.sortBy || "created-desc"
  })

  $effect(() => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      filterActions.setSearch(searchValue)
    }, 300)
  })

  // Update filters when local state changes
  $effect(() => {
    filterActions.setStatus(statusFilter)
  })

  $effect(() => {
    filterActions.setSortBy(sortBy)
  })

  function clearSearch() {
    searchValue = ""
    filterActions.clearSearch()
  }

  function clearAllFilters() {
    searchValue = ""
    statusFilter = "all"
    sortBy = "created-desc"
    filterActions.clearFilters()
  }

  // Check if any filters are active
  let hasActiveFilters = $derived(
    $filters.search || 
    ($filters.status && $filters.status !== "all") || 
    ($filters.sortBy && $filters.sortBy !== "created-desc")
  )
</script>

<div class="space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6 bg-card border-b border-border">
  <!-- Main Filter Row -->
  <div class="flex flex-col gap-3 sm:gap-4">
    <!-- Responsive search and filter controls -->
    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1">
      <!-- Enhanced Search Input -->
      <div class="relative flex-1 min-w-0">
        <Search class="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
        <Input
          bind:value={searchValue}
          placeholder="Search tasks..."
          class="pl-8 sm:pl-10 pr-8 sm:pr-10 h-9 sm:h-10 bg-background border-input focus:border-primary focus:ring-primary text-sm"
          aria-label="Search tasks"
        />
        {#if searchValue}
          <Button
            variant="ghost"
            size="icon"
            class="absolute right-0.5 sm:right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 hover:bg-primary/10 text-primary"
            onclick={clearSearch}
            aria-label="Clear search"
          >
            <X class="h-2 w-2 sm:h-4 sm:w-4" />
          </Button>
        {/if}
      </div>

      <!-- Responsive filter controls -->
      <div class="flex gap-2 sm:gap-3">
        <Select bind:value={statusFilter} aria-label="Filter by status" class="min-w-[120px] sm:min-w-[140px] h-9 sm:h-10 bg-background border-input focus:border-primary text-sm">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>

        <Select bind:value={sortBy} aria-label="Sort tasks" class="min-w-[140px] sm:min-w-[160px] h-9 sm:h-10 bg-background border-input focus:border-primary text-sm">
          <option value="created-desc">Newest First</option>
          <option value="created-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="status">By Status</option>
        </Select>
      </div>
    </div>

    <!-- Responsive clear filters button -->
    {#if hasActiveFilters}
      <div class="flex justify-start">
        <Button
          variant="outline"
          size="sm"
          onclick={clearAllFilters}
          aria-label="Clear all filters"
          class="h-8 sm:h-10 px-3 sm:px-4 font-medium hover:border-primary hover:text-primary text-sm"
        >
          <Filter class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
          Clear Filters
        </Button>
      </div>
    {/if}
  </div>

  <!-- Responsive active filters display -->
  {#if hasActiveFilters}
    <div class="flex flex-wrap items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-primary/5 rounded-md sm:rounded-lg border border-primary/10">
      <span class="text-xs sm:text-sm font-medium text-primary">Active filters:</span>
      
      {#if $filters.search}
        <div class="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-background text-foreground text-xs sm:text-sm font-medium rounded border border-primary/20">
          <Search class="h-2 w-2 sm:h-3 sm:w-3 text-primary" />
          <span class="truncate max-w-[100px] sm:max-w-none">"{$filters.search}"</span>
          <Button
            variant="ghost"
            size="icon"
            class="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1 hover:bg-primary/10 text-primary"
            onclick={clearSearch}
            aria-label="Remove search filter"
          >
            <X class="h-2 w-2 sm:h-3 sm:w-3" />
          </Button>
        </div>
      {/if}

      {#if $filters.status && $filters.status !== "all"}
        <div class="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-background text-foreground text-xs sm:text-sm font-medium rounded border border-primary/20">
          <Filter class="h-2 w-2 sm:h-3 sm:w-3 text-primary" />
          <span class="truncate">Status: {$filters.status === "in-progress" ? "In Progress" : $filters.status === "pending" ? "Pending" : $filters.status}</span>
          <Button
            variant="ghost"
            size="icon"
            class="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1 hover:bg-primary/10 text-primary"
            onclick={() => filterActions.setStatus("all")}
            aria-label="Remove status filter"
          >
            <X class="h-2 w-2 sm:h-3 sm:w-3" />
          </Button>
        </div>
      {/if}

      {#if $filters.sortBy && $filters.sortBy !== "created-desc"}
        <div class="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-background text-foreground text-xs sm:text-sm font-medium rounded border border-primary/20">
          <span class="truncate">
            Sort: {
              $filters.sortBy === "created-asc" ? "Oldest First" :
              $filters.sortBy === "title-asc" ? "Title A-Z" :
              $filters.sortBy === "title-desc" ? "Title Z-A" :
              $filters.sortBy === "status" ? "By Status" :
              "Custom"
            }
          </span>
          <Button
            variant="ghost"
            size="icon"
            class="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1 hover:bg-primary/10 text-primary"
            onclick={() => filterActions.setSortBy("created-desc")}
            aria-label="Remove sort filter"
          >
            <X class="h-2 w-2 sm:h-3 sm:w-3" />
          </Button>
        </div>
      {/if}
    </div>
  {/if}
</div>
