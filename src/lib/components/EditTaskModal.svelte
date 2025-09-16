<script lang="ts">
  import { isEditModalOpen, selectedTask, uiActions } from "$lib/stores/ui"
  import { tasks, taskActions } from "$lib/stores/tasks"
  import type { TaskFormData } from "$lib/types"
  import Modal from "./ui/Modal.svelte"
  import TaskForm from "./TaskForm.svelte"

  let isLoading = $state(false)
  let error = $state<string | null>(null)

  // Get the selected task data
  let currentTask = $derived(
    $selectedTask ? $tasks.find((task) => task.id === $selectedTask) : null,
  )

  async function handleSubmit(formData: TaskFormData) {
    if (!$selectedTask) return

    try {
      isLoading = true
      error = null

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      taskActions.update($selectedTask, formData)
      uiActions.closeEditModal()
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to update task"
    } finally {
      isLoading = false
    }
  }

  function handleClose() {
    if (!isLoading) {
      error = null
      uiActions.closeEditModal()
    }
  }
</script>

<Modal
  open={$isEditModalOpen}
  onClose={handleClose}
  title="Edit Task"
  description="Update the task details below."
>
  {#if error}
    <div class="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
      <p class="text-sm text-destructive" role="alert">{error}</p>
    </div>
  {/if}

  {#if currentTask}
    <TaskForm
      initialData={{
        title: currentTask.title,
        description: currentTask.description,
        status: currentTask.status,
      }}
      onSubmit={handleSubmit}
      onCancel={handleClose}
      submitLabel="Update Task"
      {isLoading}
    />
  {:else}
    <div class="text-center py-4">
      <p class="text-muted-foreground">Task not found</p>
    </div>
  {/if}
</Modal>
