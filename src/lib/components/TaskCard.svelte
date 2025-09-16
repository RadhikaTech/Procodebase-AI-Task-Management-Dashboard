<script lang="ts">
  import type { Task } from "$lib/types"
  import { uiActions } from "$lib/stores/ui"
  import Card from "./ui/Card.svelte"
  import Button from "./ui/Button.svelte"
  import Badge from "./ui/Badge.svelte"
  import { Edit, Trash2, Calendar, Clock } from "lucide-svelte"
  import { cn } from "$lib/utils"

  interface Props {
    task: Task
  }

  let { task }: Props = $props()

  function getStatusVariant(status: Task["status"]) {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  function getStatusLabel(status: Task["status"]) {
    switch (status) {
      case "in-progress":
        return "In Progress"
      case "pending":
        return "Pending"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }
</script>

<!-- Professional card with colored icons and better visual hierarchy -->
<Card class="group p-4 sm:p-5 lg:p-6 hover:shadow-lg transition-all duration-200 border border-border bg-card hover:border-primary/20">
  <div class="space-y-3 sm:space-y-4">
    <!-- Header with colored status badge -->
    <div class="flex items-start justify-between gap-2 sm:gap-4">
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-base sm:text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors break-words">{task.title}</h3>
      </div>
      <Badge variant={getStatusVariant(task.status)} class="shrink-0 text-xs">
        {getStatusLabel(task.status)}
      </Badge>
    </div>

    <!-- Clean description -->
    {#if task.description}
      <p class="text-sm sm:text-base text-muted-foreground line-clamp-3 leading-relaxed break-words">{task.description}</p>
    {/if}

    <!-- Date display with colored icon -->
    <div class="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
      <Calendar class="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
      <span>Created {formatDate(task.createdAt)}</span>
    </div>

    <!-- Action buttons with colored icons -->
    <div class="flex items-center gap-2 pt-1 sm:pt-2">
      <Button
        variant="outline"
        size="sm"
        onclick={() => uiActions.openEditModal(task.id)}
        aria-label="Edit task"
        class="flex-1 hover:border-primary hover:text-primary h-8 sm:h-9 text-xs sm:text-sm"
      >
        <Edit class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
        <span class="hidden sm:inline">Edit</span>
        <span class="sm:hidden">Edit</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onclick={() => uiActions.openDeleteModal(task.id)}
        aria-label="Delete task"
        class="text-destructive hover:text-destructive hover:border-destructive hover:bg-destructive/5 h-8 sm:h-9 px-2 sm:px-3"
      >
        <Trash2 class="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
      </Button>
    </div>
  </div>
</Card>
