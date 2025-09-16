import { describe, it, expect, beforeEach, vi } from "vitest"
import { get } from "svelte/store"
import { tasks, filters, filteredTasks, taskActions, filterActions } from "./tasks"
import type { Task, TaskFormData } from "$lib/types"

// Mock the API
vi.mock("$lib/api/mockApi", () => ({
  mockApi: {
    getTasks: vi.fn().mockResolvedValue([]),
    createTask: vi.fn().mockImplementation((data: TaskFormData) =>
      Promise.resolve({
        id: "test-id",
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
    updateTask: vi.fn().mockResolvedValue(undefined),
    deleteTask: vi.fn().mockResolvedValue(undefined),
  },
}))

// Mock persistence
vi.mock("./persistence", () => ({
  persistence: {
    saveTasks: vi.fn(),
    loadTasks: vi.fn().mockReturnValue(null),
    saveFilters: vi.fn(),
    loadFilters: vi.fn().mockReturnValue(null),
    saveUIPreferences: vi.fn(),
    loadUIPreferences: vi.fn().mockReturnValue(null),
  },
}))

describe("Task Store", () => {
  beforeEach(() => {
    // Reset stores
    tasks.set([])
    filters.set({
      status: "all",
      search: "",
      sortBy: "created-desc",
      dateRange: {},
    })
  })

  it("should initialize with empty tasks", () => {
    expect(get(tasks)).toEqual([])
  })

  it("should create a new task", async () => {
    const taskData: TaskFormData = {
      title: "Test Task",
      description: "Test Description",
      status: "pending",
    }

    await taskActions.create(taskData)
    const currentTasks = get(tasks)

    expect(currentTasks).toHaveLength(1)
    expect(currentTasks[0].title).toBe("Test Task")
    expect(currentTasks[0].status).toBe("pending")
  })

  it("should filter tasks by status", () => {
    const testTasks: Task[] = [
      {
        id: "1",
        title: "Task 1",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Task 2",
        status: "completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    tasks.set(testTasks)
    filterActions.setStatus("pending")

    const filtered = get(filteredTasks)
    expect(filtered).toHaveLength(1)
    expect(filtered[0].status).toBe("pending")
  })

  it("should filter tasks by search term", () => {
    const testTasks: Task[] = [
      {
        id: "1",
        title: "Important Task",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Regular Task",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    tasks.set(testTasks)
    filterActions.setSearch("Important")

    const filtered = get(filteredTasks)
    expect(filtered).toHaveLength(1)
    expect(filtered[0].title).toBe("Important Task")
  })

  it("should sort tasks correctly", () => {
    const testTasks: Task[] = [
      {
        id: "1",
        title: "B Task",
        status: "pending",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "A Task",
        status: "pending",
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date(),
      },
    ]

    tasks.set(testTasks)
    filterActions.setSortBy("title-asc")

    const filtered = get(filteredTasks)
    expect(filtered[0].title).toBe("A Task")
    expect(filtered[1].title).toBe("B Task")
  })

  it("should clear filters", () => {
    filterActions.setSearch("test")
    filterActions.setStatus("completed")
    filterActions.clearFilters()

    const currentFilters = get(filters)
    expect(currentFilters.search).toBe("")
    expect(currentFilters.status).toBe("all")
  })
})
