export type TaskStatus = "pending" | "in-progress" | "completed"
export type SortOption = "created-desc" | "created-asc" | "title-asc" | "title-desc" | "status"

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export interface TaskFormData {
  title: string
  description?: string
  status: TaskStatus
}

export interface FilterOptions {
  status?: TaskStatus | "all"
  search?: string
  sortBy?: SortOption
  dateRange?: {
    start?: Date
    end?: Date
  }
}
