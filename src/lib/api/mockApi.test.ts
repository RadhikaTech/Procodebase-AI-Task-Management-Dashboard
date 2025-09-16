import { describe, it, expect, beforeEach, vi } from "vitest"
import { mockApi } from "./mockApi"
import type { TaskFormData } from "$lib/types"

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("Mock API", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it("should get tasks from localStorage if available", async () => {
    const storedTasks = JSON.stringify([
      {
        id: "1",
        title: "Stored Task",
        status: "pending",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
      },
    ])

    localStorageMock.getItem.mockReturnValue(storedTasks)

    const tasks = await mockApi.getTasks()

    expect(tasks).toHaveLength(1)
    expect(tasks[0].title).toBe("Stored Task")
    expect(tasks[0].createdAt).toBeInstanceOf(Date)
  })

  it("should create a new task", async () => {
    const taskData: TaskFormData = {
      title: "New Task",
      description: "New Description",
      status: "pending",
    }

    const newTask = await mockApi.createTask(taskData)

    expect(newTask.id).toBeDefined()
    expect(newTask.title).toBe("New Task")
    expect(newTask.createdAt).toBeInstanceOf(Date)
    expect(newTask.updatedAt).toBeInstanceOf(Date)
  })

  it("should update a task", async () => {
    const taskData: Partial<TaskFormData> = {
      title: "Updated Task",
      status: "completed",
    }

    const updatedTask = await mockApi.updateTask("1", taskData)

    expect(updatedTask.id).toBe("1")
    expect(updatedTask.title).toBe("Updated Task")
    expect(updatedTask.status).toBe("completed")
  })

  it("should delete a task", async () => {
    await expect(mockApi.deleteTask("1")).resolves.toBeUndefined()
  })
})
