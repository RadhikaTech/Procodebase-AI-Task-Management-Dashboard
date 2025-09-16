<script lang="ts">
  import { isCreateModalOpen, uiActions } from "$lib/stores/ui"
  import { taskActions } from "$lib/stores/tasks"
  import type { TaskFormData } from "$lib/types"
  import Modal from "./ui/Modal.svelte"
  import TaskForm from "./TaskForm.svelte"

  let isLoading = $state(false)
  let error = $state<string | null>(null)

  async function handleSubmit(formData: TaskFormData) {
    try {
      isLoading = true
      error = null

      console.log("[v0] Creating task with data:", formData)

      await taskActions.create(formData)
      
      console.log("[v0] Task created successfully")
      uiActions.closeCreateModal()
    } catch (err) {
      console.log("[v0] Error creating task:", err)
      error = err instanceof Error ? err.message : "Failed to create task"
    } finally {
      isLoading = false
    }
  }

  function handleClose() {
    if (!isLoading) {
      error = null
      uiActions.closeCreateModal()
    }
  }

  $effect(() => {
    if (!$isCreateModalOpen) {
      error = null
      isLoading = false
    }
  })
</script>

<Modal
  open={$isCreateModalOpen}
  onClose={handleClose}
  title="Create New Task"
  description="Add a new task to your dashboard. Fill in the details below."
>
  {#if error}
    <div class="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
      <p class="text-sm text-destructive" role="alert">{error}</p>
    </div>
  {/if}

  <TaskForm
    onSubmit={handleSubmit}
    onCancel={handleClose}
    submitLabel="Create Task"
    {isLoading}
  />
</Modal>
