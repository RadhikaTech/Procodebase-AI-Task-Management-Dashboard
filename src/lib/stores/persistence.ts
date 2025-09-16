import type { Task, FilterOptions } from "$lib/types"

export const persistence = {
  // Save tasks to localStorage
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error)
    }
  },

  // Load tasks from localStorage
  loadTasks(): Task[] | null {
    try {
      const stored = localStorage.getItem("tasks")
      if (!stored) return null

      const parsedTasks = JSON.parse(stored)
      return parsedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }))
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error)
      return null
    }
  },

  // Save filters to localStorage
  saveFilters(filters: FilterOptions): void {
    try {
      // Don't persist search term, only persistent filters
      const persistentFilters = {
        status: filters.status,
        sortBy: filters.sortBy,
      }
      localStorage.setItem("filters", JSON.stringify(persistentFilters))
    } catch (error) {
      console.error("Failed to save filters to localStorage:", error)
    }
  },

  // Load filters from localStorage
  loadFilters(): Partial<FilterOptions> | null {
    try {
      const stored = localStorage.getItem("filters")
      if (!stored) return null

      return JSON.parse(stored)
    } catch (error) {
      console.error("Failed to load filters from localStorage:", error)
      return null
    }
  },

  // Save UI preferences
  saveUIPreferences(preferences: { darkMode: boolean }): void {
    try {
      localStorage.setItem("uiPreferences", JSON.stringify(preferences))
    } catch (error) {
      console.error("Failed to save UI preferences:", error)
    }
  },

  // Load UI preferences
  loadUIPreferences(): { darkMode: boolean } | null {
    try {
      const stored = localStorage.getItem("uiPreferences")
      if (!stored) return null

      return JSON.parse(stored)
    } catch (error) {
      console.error("Failed to load UI preferences:", error)
      return null
    }
  },
}
