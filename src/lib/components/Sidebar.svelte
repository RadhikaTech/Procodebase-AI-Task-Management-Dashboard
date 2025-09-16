<script lang="ts">
  import { isDarkMode, uiActions } from "$lib/stores/ui"
  import { filteredTasks, tasks, filterActions, filters } from "$lib/stores/tasks"
  import Button from "./ui/Button.svelte"
  import { CheckSquare, Moon, Sun, Plus, Filter, BarChart3, Target, Clock, CheckCircle } from "lucide-svelte"

  const allTasks = tasks
  const filteredTasksStore = filteredTasks
  const currentFilters = filters

  let taskStats = $derived.by(() => {
    const all = $allTasks
    return {
      total: all.length,
      pending: all.filter(t => t.status === "pending").length,
      inProgress: all.filter(t => t.status === "in-progress").length,
      completed: all.filter(t => t.status === "completed").length,
    }
  })

  function quickFilterByStatus(status: "pending" | "in-progress" | "completed" | "all") {
    filterActions.setStatus(status)
    if (window.innerWidth < 1024) {
      uiActions.closeSidebar()
    }
  }

  function handleCreateTask() {
    uiActions.openCreateModal()
    if (window.innerWidth < 1024) {
      uiActions.closeSidebar()
    }
  }
</script>

<!-- Enhanced sidebar with proper mobile overlay background and shadow -->
<aside class="w-72 bg-sidebar border-r border-sidebar-border h-full flex flex-col
  lg:bg-sidebar lg:shadow-none
  max-lg:bg-white max-lg:text-black max-lg:shadow-2xl max-lg:shadow-black/20 
  dark:max-lg:bg-background dark:max-lg:text-foreground dark:max-lg:shadow-2xl dark:max-lg:shadow-black/40
  max-lg:border-r-0 max-lg:border max-lg:border-border/50
  max-lg:backdrop-blur-xl max-lg:rounded-r-2xl">
  <!-- Responsive header with mobile-optimized padding -->
  <div class="p-4 sm:p-6 border-b border-sidebar-border">
    <div class="flex items-center gap-2 sm:gap-3">
      <div class="p-1.5 sm:p-2 bg-sidebar-primary rounded-md sm:rounded-lg">
        <CheckSquare class="h-4 w-4 sm:h-5 sm:w-5 text-sidebar-primary-foreground" />
      </div>
      <div>
        <h1 class="text-base sm:text-lg font-semibold text-sidebar-foreground">TaskFlow</h1>
        <p class="text-xs text-sidebar-foreground/70">Productivity Suite</p>
      </div>
    </div>
  </div>

  <!-- Responsive navigation with mobile-optimized spacing -->
  <nav class="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
    <Button
      variant="default"
      class="w-full justify-start h-10 sm:h-11 font-medium bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground text-sm sm:text-base"
      onclick={handleCreateTask}
    >
      <Plus class="h-4 w-4 mr-2 sm:mr-3 text-sidebar-primary-foreground" />
      Create New Task
    </Button>

    <!-- Responsive quick filters -->
    <div class="space-y-3 sm:space-y-4">
      <div class="flex items-center gap-2">
        <BarChart3 class="h-4 w-4 text-sidebar-primary" />
        <h3 class="text-xs sm:text-sm font-medium text-sidebar-foreground uppercase tracking-wide">
          Quick Filters
        </h3>
      </div>
      
      <div class="space-y-1">
        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-between h-9 sm:h-10 font-normal text-sm {$currentFilters.status === 'all' ? 'bg-sidebar-selected text-sidebar-selected-foreground shadow-md dark:shadow-lg dark:shadow-blue-500/20' : 'text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:shadow-sm'}"
          onclick={() => quickFilterByStatus("all")}
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <Filter class="h-3 w-3 sm:h-4 sm:w-4 {$currentFilters.status === 'all' ? 'text-sidebar-selected-foreground' : 'text-sidebar-primary'}" />
            <span>All Tasks</span>
          </div>
          <span class="text-xs bg-sidebar-foreground/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
            {taskStats.total}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-between h-9 sm:h-10 font-normal text-sm {$currentFilters.status === 'pending' ? 'bg-sidebar-selected text-sidebar-selected-foreground shadow-md dark:shadow-lg dark:shadow-blue-500/20' : 'text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:shadow-sm'}"
          onclick={() => quickFilterByStatus("pending")}
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <Target class="h-3 w-3 sm:h-4 sm:w-4 {$currentFilters.status === 'pending' ? 'text-sidebar-selected-foreground' : 'text-orange-500'}" />
            <span>Pending</span>
          </div>
          <span class="text-xs bg-sidebar-foreground/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
            {taskStats.pending}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-between h-9 sm:h-10 font-normal text-sm {$currentFilters.status === 'in-progress' ? 'bg-sidebar-selected text-sidebar-selected-foreground shadow-md dark:shadow-lg dark:shadow-blue-500/20' : 'text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:shadow-sm'}"
          onclick={() => quickFilterByStatus("in-progress")}
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <Clock class="h-3 w-3 sm:h-4 sm:w-4 {$currentFilters.status === 'in-progress' ? 'text-sidebar-selected-foreground' : 'text-yellow-500'}" />
            <span>In Progress</span>
          </div>
          <span class="text-xs bg-sidebar-foreground/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
            {taskStats.inProgress}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-between h-9 sm:h-10 font-normal text-sm {$currentFilters.status === 'completed' ? 'bg-sidebar-selected text-sidebar-selected-foreground shadow-md dark:shadow-lg dark:shadow-blue-500/20' : 'text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:shadow-sm'}"
          onclick={() => quickFilterByStatus("completed")}
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <CheckCircle class="h-3 w-3 sm:h-4 sm:w-4 {$currentFilters.status === 'completed' ? 'text-sidebar-selected-foreground' : 'text-green-500'}" />
            <span>Completed</span>
          </div>
          <span class="text-xs bg-sidebar-foreground/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
            {taskStats.completed}
          </span>
        </Button>
      </div>
    </div>
  </nav>

  <!-- Responsive stats section -->
  <div class="p-4 sm:p-6 border-t border-sidebar-border">
    <div class="bg-sidebar-foreground/10 rounded-lg p-3 sm:p-4">
      <div class="flex justify-between items-center">
        <span class="text-xs sm:text-sm font-medium text-sidebar-foreground/70">Filtered Results</span>
        <span class="text-base sm:text-lg font-semibold text-sidebar-foreground">{$filteredTasksStore.length}</span>
      </div>
    </div>
  </div>

  <!-- Responsive theme toggle -->
  <div class="p-4 sm:p-6 border-t border-sidebar-border">
    <Button
      variant="outline"
      size="sm"
      class="w-full justify-start h-9 sm:h-10 font-medium border-sidebar-foreground/20 text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:shadow-sm text-sm"
      onclick={uiActions.toggleDarkMode}
    >
      {#if $isDarkMode}
        <Sun class="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-yellow-500" />
        Switch to Light
      {:else}
        <Moon class="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-sidebar-primary" />
        Switch to Dark
      {/if}
    </Button>
  </div>
</aside>
