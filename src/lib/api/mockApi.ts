import type { Task, TaskFormData } from "$lib/types"
import mockTasksData from "$lib/data/mock-tasks.json"

const API_DELAY = 500

const ERROR_RATE = 0.05 // 5% chance of error

function simulateDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, API_DELAY))
}

function simulateError(): void {
  if (Math.random() < ERROR_RATE) {
    throw new Error("Network error: Unable to connect to server")
  }
}

function convertMockTask(mockTask: any): Task {
  return {
    ...mockTask,
    createdAt: new Date(mockTask.createdAt),
    updatedAt: new Date(mockTask.updatedAt),
  }
}

export const mockApi = {
  // Get all tasks
  async getTasks(): Promise<Task[]> {
    await simulateDelay()
    simulateError()

    // Try to load from localStorage first, fallback to mock data
    const stored = localStorage.getItem("tasks")
    if (stored) {
      try {
        const parsedTasks = JSON.parse(stored)
        return parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }))
      } catch (error) {
        console.warn("Failed to parse stored tasks, using mock data")
      }
    }

    return mockTasksData.map(convertMockTask)
  },

  // Create a new task
  async createTask(taskData: TaskFormData): Promise<Task> {
    await simulateDelay()
    simulateError()

    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return newTask
  },

  // Update an existing task
  async updateTask(id: string, taskData: Partial<TaskFormData>): Promise<Task> {
    await simulateDelay()
    simulateError()

    // In a real API, this would return the updated task from the server
    const updatedTask: Task = {
      id,
      title: taskData.title || "",
      description: taskData.description,
      status: taskData.status || "pending",
      createdAt: new Date(), // This would come from the server
      updatedAt: new Date(),
    }

    return updatedTask
  },

  // Delete a task
  async deleteTask(id: string): Promise<void> {
    await simulateDelay()
    simulateError()

    // In a real API, this would just return success/failure
    return
  },
}
