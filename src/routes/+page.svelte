<script lang="ts">
  import { isLoading } from "$lib/stores/tasks"
  import { isSidebarOpen, uiActions } from "$lib/stores/ui"
  import Sidebar from "$lib/components/Sidebar.svelte"
  import Header from "$lib/components/Header.svelte"
  import FilterBar from "$lib/components/FilterBar.svelte"
  import TaskGrid from "$lib/components/TaskGrid.svelte"
  import TaskModals from "$lib/components/TaskModals.svelte"
  import { Loader2 } from "lucide-svelte"
</script>

<!-- Enhanced responsive layout with mobile sidebar support -->
<div class="flex h-screen bg-gradient-to-br from-background via-muted/30 to-background">
  <!-- Mobile sidebar overlay -->
  {#if $isSidebarOpen}
    <div 
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      role="button"
      tabindex="0"
      aria-label="Close sidebar"
      onclick={uiActions.closeSidebar}
      onkeydown={(e) => { if (e.key === 'Enter') uiActions.closeSidebar() }}
    ></div>
  {/if}

  <!-- Sidebar - responsive positioning -->
  <div class="
    {$isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 ease-in-out
    lg:relative lg:translate-x-0 lg:block
  ">
    <Sidebar />
  </div>

  <!-- Main Content - responsive flex layout -->
  <div class="flex-1 flex flex-col overflow-hidden min-w-0">
    <!-- Header -->
    <Header />

    <!-- Content - responsive padding and spacing -->
    <main class="flex-1 overflow-auto">
      {#if $isLoading}
        <!-- Responsive loading state -->
        <div class="flex items-center justify-center h-full p-4 sm:p-8">
          <div class="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-card backdrop-blur-lg border border-border/50 shadow-card max-w-sm w-full">
            <div class="relative">
              <Loader2 class="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-primary" />
              <div class="absolute inset-0 h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-primary/20 animate-pulse"></div>
              <div class="absolute inset-1 sm:inset-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 animate-ping"></div>
            </div>
            <div class="text-center space-y-2">
              <h3 class="font-heading font-semibold text-base sm:text-lg text-foreground">Loading your workspace</h3>
              <p class="text-sm text-muted-foreground font-medium">Preparing your tasks...</p>
            </div>
          </div>
        </div>
      {:else}
        <!-- Responsive content area with mobile-first padding -->
        <div class="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          <!-- Filter Bar - responsive container -->
          <div class="bg-gradient-card backdrop-blur-md rounded-xl sm:rounded-2xl border border-border/50 p-1 sm:p-2 shadow-card">
            <FilterBar />
          </div>

          <!-- Task Grid -->
          <TaskGrid />
        </div>
      {/if}
    </main>
  </div>
</div>

<!-- Task Management Modals -->
<TaskModals />
