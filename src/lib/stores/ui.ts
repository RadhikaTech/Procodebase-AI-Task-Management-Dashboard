import { writable } from "svelte/store"
import { persistence } from "./persistence"

// Modal states
export const isCreateModalOpen = writable(false)
export const isEditModalOpen = writable(false)
export const isDeleteModalOpen = writable(false)

// Currently selected task for editing/deleting
export const selectedTask = writable<string | null>(null)

export const isDarkMode = writable(false)

export const isSidebarOpen = writable(false)

// Load persisted UI preferences
if (typeof window !== "undefined") {
  const preferences = persistence.loadUIPreferences()
  if (preferences) {
    isDarkMode.set(preferences.darkMode)
  }
}

// Persist UI preferences when they change
isDarkMode.subscribe((darkMode) => {
  if (typeof window !== "undefined") {
    persistence.saveUIPreferences({ darkMode })
  }
})

// UI actions
export const uiActions = {
  openCreateModal: () => {
    isCreateModalOpen.set(true)
  },

  closeCreateModal: () => {
    isCreateModalOpen.set(false)
  },

  openEditModal: (taskId: string) => {
    selectedTask.set(taskId)
    isEditModalOpen.set(true)
  },

  closeEditModal: () => {
    selectedTask.set(null)
    isEditModalOpen.set(false)
  },

  openDeleteModal: (taskId: string) => {
    selectedTask.set(taskId)
    isDeleteModalOpen.set(true)
  },

  closeDeleteModal: () => {
    selectedTask.set(null)
    isDeleteModalOpen.set(false)
  },

  toggleDarkMode: () => {
    isDarkMode.update((current) => !current)
  },

  toggleSidebar: () => {
    isSidebarOpen.update((current) => !current)
  },

  openSidebar: () => {
    isSidebarOpen.set(true)
  },

  closeSidebar: () => {
    isSidebarOpen.set(false)
  },
}
