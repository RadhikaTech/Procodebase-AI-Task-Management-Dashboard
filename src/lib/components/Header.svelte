<script lang="ts">
  import { uiActions, isDarkMode, isSidebarOpen } from "$lib/stores/ui"
  import Button from "./ui/Button.svelte"
  import { CheckSquare, Plus, Moon, Sun, Menu, X } from "lucide-svelte"
</script>

<!-- Responsive header with mobile menu toggle -->
<header class="bg-card border-b border-border">
  <div class="px-4 sm:px-6 py-3 sm:py-4">
    <div class="flex items-center justify-between">
      <!-- Mobile menu button and title section -->
      <div class="flex items-center gap-3">
        <!-- Mobile sidebar toggle button -->
        <Button
          variant="ghost"
          size="icon"
          onclick={uiActions.toggleSidebar}
          aria-label="Toggle sidebar"
          class="h-8 w-8 lg:hidden"
        >
          {#if $isSidebarOpen}
            <X class="h-4 w-4" />
          {:else}
            <Menu class="h-4 w-4" />
          {/if}
        </Button>

        <!-- Responsive title section -->
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="p-1.5 sm:p-2 bg-primary rounded-md sm:rounded-lg">
            <CheckSquare class="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-lg sm:text-xl font-semibold text-foreground">Task Dashboard</h1>
            <p class="text-xs sm:text-sm text-muted-foreground">Manage and track your tasks efficiently</p>
          </div>
          <!-- Mobile title -->
          <div class="block sm:hidden">
            <h1 class="text-base font-semibold text-foreground">TaskFlow</h1>
          </div>
        </div>
      </div>

      <!-- Responsive action buttons -->
      <div class="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="icon"
          onclick={() => uiActions.toggleDarkMode()}
          aria-label="Toggle theme"
          class="h-8 w-8 sm:h-9 sm:w-9 hover:border-primary hover:text-primary"
        >
          {#if $isDarkMode}
            <Sun class="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
          {:else}
            <Moon class="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          {/if}
        </Button>
        
        <Button
          variant="default"
          onclick={() => uiActions.openCreateModal()}
          class="font-medium bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base px-3 sm:px-4 h-8 sm:h-10"
        >
          <Plus class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span class="hidden sm:inline">New Task</span>
          <span class="sm:hidden">New</span>
        </Button>
      </div>
    </div>
  </div>
</header>
