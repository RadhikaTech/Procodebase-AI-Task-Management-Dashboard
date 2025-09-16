import { writable, derived } from "svelte/store"
import type { Task, TaskFormData, FilterOptions, SortOption } from "$lib/types"
import { mockApi } from "$lib/api/mockApi"
import { persistence } from "./persistence"

export const tasks = writable<Task[]>([])
export const isLoading = writable<boolean>(false)
export const error = writable<string | null>(null)

const defaultFilters: FilterOptions = {
  status: "all",
  search: "",
  sortBy: "created-desc",
  dateRange: {},
}

export const filters = writable<FilterOptions>(defaultFilters)

// Load persisted filters on initialization
if (typeof window !== "undefined") {
  const persistedFilters = persistence.loadFilters()
  if (persistedFilters) {
    filters.update((current) => ({ ...current, ...persistedFilters }))
  }
}

// Persist filters when they change
filters.subscribe((currentFilters) => {
  if (typeof window !== "undefined") {
    persistence.saveFilters(currentFilters)
  }
})

// Persist tasks when they change
tasks.subscribe((currentTasks) => {
  if (typeof window !== "undefined") {
    persistence.saveTasks(currentTasks)
  }
})

// Filtered tasks derived store
export const filteredTasks = derived([tasks, filters], ([$tasks, $filters]) => {
  let filtered = [...$tasks]

  // Filter by status
  if ($filters.status && $filters.status !== "all") {
    filtered = filtered.filter((task) => task.status === $filters.status)
  }

  // Filter by search term (title and description)
  if ($filters.search) {
    const searchTerm = $filters.search.toLowerCase().trim()
    filtered = filtered.filter(
      (task) => task.title.toLowerCase().includes(searchTerm) || task.description?.toLowerCase().includes(searchTerm),
    )
  }

  // Filter by date range
  if ($filters.dateRange?.start || $filters.dateRange?.end) {
    filtered = filtered.filter((task) => {
      const taskDate = task.createdAt
      const start = $filters.dateRange?.start
      const end = $filters.dateRange?.end

      if (start && taskDate < start) return false
      if (end && taskDate > end) return false
      return true
    })
  }

  // Sort tasks
  if ($filters.sortBy) {
    filtered.sort((a, b) => {
      switch ($filters.sortBy) {
        case "created-desc":
          return b.createdAt.getTime() - a.createdAt.getTime()
        case "created-asc":
          return a.createdAt.getTime() - b.createdAt.getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "status":
          const statusOrder = { pending: 0, "in-progress": 1, completed: 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        default:
          return 0
      }
    })
  }

  return filtered
})

export const taskActions = {
  // Initialize tasks from API
  async initialize(): Promise<void> {
    try {
      isLoading.set(true)
      error.set(null)

      const fetchedTasks = await mockApi.getTasks()
      tasks.set(fetchedTasks)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load tasks"
      error.set(errorMessage)
      console.error("Failed to initialize tasks:", err)
    } finally {
      isLoading.set(false)
    }
  },

  // Create a new task
  async create(taskData: TaskFormData): Promise<void> {
    try {
      error.set(null)

      const newTask = await mockApi.createTask(taskData)
      tasks.update((currentTasks) => [...currentTasks, newTask])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create task"
      error.set(errorMessage)
      throw err // Re-throw so UI can handle it
    }
  },

  // Update an existing task
  async update(id: string, taskData: Partial<TaskFormData>): Promise<void> {
    try {
      error.set(null)

      await mockApi.updateTask(id, taskData)
      tasks.update((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? { ...task, ...taskData, updatedAt: new Date() } : task)),
      )
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update task"
      error.set(errorMessage)
      throw err // Re-throw so UI can handle it
    }
  },

  // Delete a task
  async delete(id: string): Promise<void> {
    try {
      error.set(null)

      await mockApi.deleteTask(id)
      tasks.update((currentTasks) => currentTasks.filter((task) => task.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete task"
      error.set(errorMessage)
      throw err // Re-throw so UI can handle it
    }
  },

  // Clear error state
  clearError(): void {
    error.set(null)
  },
}

// Filter actions
export const filterActions = {
  setSearch: (search: string) => {
    filters.update((current) => ({ ...current, search }))
  },

  setStatus: (status: FilterOptions["status"]) => {
    filters.update((current) => ({ ...current, status }))
  },

  setSortBy: (sortBy: SortOption) => {
    filters.update((current) => ({ ...current, sortBy }))
  },

  setDateRange: (dateRange: FilterOptions["dateRange"]) => {
    filters.update((current) => ({ ...current, dateRange }))
  },

  clearFilters: () => {
    filters.set({
      status: "all",
      search: "",
      sortBy: "created-desc",
      dateRange: {},
    })
  },

  clearSearch: () => {
    filters.update((current) => ({ ...current, search: "" }))
  },
}
