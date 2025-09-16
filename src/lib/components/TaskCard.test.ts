import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/svelte"
import TaskCard from "./TaskCard.svelte"
import type { Task } from "$lib/types"

// Mock the stores
vi.mock("$lib/stores/ui", () => ({
  uiActions: {
    openEditModal: vi.fn(),
    openDeleteModal: vi.fn(),
  },
}))

describe("TaskCard Component", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    status: "pending",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  }

  it("should render task information correctly", () => {
    render(TaskCard, { props: { task: mockTask } })

    expect(screen.getByText("Test Task")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("Pending")).toBeInTheDocument()
  })

  it("should display formatted date", () => {
    render(TaskCard, { props: { task: mockTask } })

    expect(screen.getByText(/Created Jan 15, 2024/)).toBeInTheDocument()
  })

  it("should render without description", () => {
    const taskWithoutDescription = { ...mockTask, description: undefined }
    render(TaskCard, { props: { task: taskWithoutDescription } })

    expect(screen.getByText("Test Task")).toBeInTheDocument()
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument()
  })

  it("should render edit and delete buttons", () => {
    render(TaskCard, { props: { task: mockTask } })

    expect(screen.getByLabelText("Edit task")).toBeInTheDocument()
    expect(screen.getByLabelText("Delete task")).toBeInTheDocument()
  })
})
