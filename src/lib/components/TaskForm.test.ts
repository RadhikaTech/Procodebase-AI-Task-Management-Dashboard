import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/svelte"
import TaskForm from "./TaskForm.svelte"
import type { TaskFormData } from "$lib/types"

describe("TaskForm Component", () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render form fields", () => {
    render(TaskForm, {
      props: {
        onSubmit: mockOnSubmit,
        onCancel: mockOnCancel,
      },
    })

    expect(screen.getByLabelText(/Title/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status/)).toBeInTheDocument()
  })

  it("should show validation error for empty title", async () => {
    render(TaskForm, {
      props: {
        onSubmit: mockOnSubmit,
        onCancel: mockOnCancel,
      },
    })

    const submitButton = screen.getByRole("button", { name: /Create Task/ })
    await fireEvent.click(submitButton)

    expect(screen.getByText("Title is required")).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("should submit valid form data", async () => {
    render(TaskForm, {
      props: {
        onSubmit: mockOnSubmit,
        onCancel: mockOnCancel,
      },
    })

    const titleInput = screen.getByLabelText(/Title/)
    const descriptionInput = screen.getByLabelText(/Description/)
    const submitButton = screen.getByRole("button", { name: /Create Task/ })

    await fireEvent.input(titleInput, { target: { value: "Test Task" } })
    await fireEvent.input(descriptionInput, { target: { value: "Test Description" } })
    await fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
      status: "pending",
    })
  })

  it("should populate form with initial data", () => {
    const initialData: Partial<TaskFormData> = {
      title: "Initial Title",
      description: "Initial Description",
      status: "in-progress",
    }

    render(TaskForm, {
      props: {
        initialData,
        onSubmit: mockOnSubmit,
        onCancel: mockOnCancel,
      },
    })

    expect(screen.getByDisplayValue("Initial Title")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Initial Description")).toBeInTheDocument()
  })
})
