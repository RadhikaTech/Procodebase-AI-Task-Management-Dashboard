<script lang="ts">
  import type { TaskFormData, TaskStatus } from "$lib/types"
  import Button from "./ui/Button.svelte"
  import Input from "./ui/Input.svelte"
  import Label from "./ui/Label.svelte"
  import Textarea from "./ui/Textarea.svelte"

  interface Props {
    initialData?: Partial<TaskFormData>
    onSubmit: (data: TaskFormData) => void
    onCancel: () => void
    submitLabel?: string
    isLoading?: boolean
  }

  let {
    initialData = {},
    onSubmit,
    onCancel,
    submitLabel = "Create Task",
    isLoading = false,
  }: Props = $props()

  let formData = $state<TaskFormData>({
    title: initialData.title || "",
    description: initialData.description || "",
    status: initialData.status || "pending",
  })

  let errors = $state<Partial<Record<keyof TaskFormData, string>>>({})

  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {}

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long"
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters"
    }

    // Description validation (optional but with length limit)
    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters"
    }

    errors = newErrors
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(event: Event) {
    event.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Trim whitespace from form data
    const cleanedData: TaskFormData = {
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
      status: formData.status,
    }

    onSubmit(cleanedData)
  }

  // Real-time validation for title
  $effect(() => {
    if (errors.title && formData.title.trim()) {
      validateForm()
    }
  })
</script>

<form onsubmit={handleSubmit} class="space-y-4">
  <!-- Title Field -->
  <div class="space-y-2">
    <Label htmlFor="task-title">Title *</Label>
    <Input
      id="task-title"
      bind:value={formData.title}
      placeholder="Enter task title..."
      disabled={isLoading}
      class={errors.title ? "border-destructive" : ""}
      aria-describedby={errors.title ? "title-error" : undefined}
      required
    />
    {#if errors.title}
      <p id="title-error" class="text-sm text-destructive" role="alert">
        {errors.title}
      </p>
    {/if}
  </div>

  <!-- Description Field -->
  <div class="space-y-2">
    <Label htmlFor="task-description">Description</Label>
    <Textarea
      id="task-description"
      bind:value={formData.description}
      placeholder="Enter task description (optional)..."
      disabled={isLoading}
      class={errors.description ? "border-destructive" : ""}
      aria-describedby={errors.description ? "description-error" : undefined}
      rows="3"
    />
    {#if errors.description}
      <p id="description-error" class="text-sm text-destructive" role="alert">
        {errors.description}
      </p>
    {/if}
  </div>

  <!-- Status Field -->
  <div class="space-y-2">
    <Label htmlFor="task-status">Status</Label>
    <!-- Simplified select to use native HTML select -->
    <select
      id="task-status"
      bind:value={formData.status}
      disabled={isLoading}
      aria-label="Task status"
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="pending">Pending</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  </div>

  <!-- Form Actions -->
  <div class="flex items-center gap-3 pt-4">
    <Button type="submit" disabled={isLoading} class="flex-1">
      {#if isLoading}
        Creating...
      {:else}
        {submitLabel}
      {/if}
    </Button>
    <Button type="button" variant="outline" onclick={onCancel} disabled={isLoading}>
      Cancel
    </Button>
  </div>
</form>
