<script lang="ts">
  import { filteredTasks, filters } from "$lib/stores/tasks"
  import TaskCard from "./TaskCard.svelte"
  import { FileText, Search } from "lucide-svelte"

  const tasks = filteredTasks

  let emptyStateMessage = $derived.by(() => {
    if ($filters.search || ($filters.status && $filters.status !== "all")) {
      return {
        title: "No matching tasks found",
        description: "Try adjusting your search terms or filters to find what you're looking for.",
        icon: Search,
      }
    }
    return {
      title: "No tasks yet",
      description: "Get started by creating your first task to organize your work.",
      icon: FileText,
    }
  })
</script>

<div class="space-y-4">
  {#if $tasks.length === 0}
    <!-- Responsive empty state -->
    <div class="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4">
      <emptyStateMessage.icon class="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
      <h3 class="text-base sm:text-lg font-semibold text-foreground mb-2">{emptyStateMessage.title}</h3>
      <p class="text-sm sm:text-base text-muted-foreground max-w-sm">
        {emptyStateMessage.description}
      </p>
    </div>
  {:else}
    <!-- Responsive task count display -->
    <div class="flex items-center justify-between px-1">
      <p class="text-xs sm:text-sm text-muted-foreground">
        {$tasks.length} task{$tasks.length === 1 ? '' : 's'} found
      </p>
    </div>

    <!-- Fully responsive task grid with better mobile layout -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
      {#each $tasks as task (task.id)}
        <TaskCard {task} />
      {/each}
    </div>
  {/if}
</div>
