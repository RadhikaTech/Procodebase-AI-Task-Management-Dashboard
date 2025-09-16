<script lang="ts">
  import { isDeleteModalOpen, selectedTask, uiActions } from "$lib/stores/ui"
  import { tasks, taskActions } from "$lib/stores/tasks"
  import Modal from "./ui/Modal.svelte"
  import Button from "./ui/Button.svelte"
  import { AlertTriangle } from "lucide-svelte"

  let isLoading = $state(false)
  let error = $state<string | null>(null)

  // Get the selected task data
  let currentTask = $derived(
    $selectedTask ? $tasks.find((task) => task.id === $selectedTask) : null,
  )

  async function handleDelete() {
    if (!$selectedTask) return

    try {
      isLoading = true
      error = null

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      taskActions.delete($selectedTask)
      uiActions.closeDeleteModal()
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to delete task"
    } finally {
      isLoading = false
    }
  }

  function handleClose() {
    if (!isLoading) {
      error = null
      uiActions.closeDeleteModal()
    }
  }
</script>

<Modal
  open={$isDeleteModalOpen}
  onClose={handleClose}
  title="Delete Task"
  description="This action cannot be undone."
>
  {#if error}
    <div class="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
      <p class="text-sm text-destructive" role="alert">{error}</p>
    </div>
  {/if}

  {#if currentTask}
    <div class="space-y-4">
      <!-- Warning Icon and Message -->
      <div class="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
        <AlertTriangle class="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        <div class="space-y-1">
          <p class="text-sm font-medium text-destructive">
            Are you sure you want to delete this task?
          </p>
          <p class="text-sm text-muted-foreground">
            This will permanently remove "{currentTask.title}" from your dashboard.
          </p>
        </div>
      </div>

      <!-- Task Preview -->
      <div class="p-3 bg-muted rounded-md">
        <h4 class="font-medium text-foreground">{currentTask.title}</h4>
        {#if currentTask.description}
          <p class="text-sm text-muted-foreground mt-1">{currentTask.description}</p>
        {/if}
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-2">
        <Button
          variant="destructive"
          onclick={handleDelete}
          disabled={isLoading}
          class="flex-1"
        >
          {#if isLoading}
            Deleting...
          {:else}
            Delete Task
          {/if}
        </Button>
        <Button variant="outline" onclick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </div>
  {:else}
    <div class="text-center py-4">
      <p class="text-muted-foreground">Task not found</p>
    </div>
  {/if}
</Modal>
