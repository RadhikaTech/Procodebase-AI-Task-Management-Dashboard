<script lang="ts">
  import "../app.css"
  import { isDarkMode } from "$lib/stores/ui"
  import { taskActions, error } from "$lib/stores/tasks"
  import { onMount } from "svelte"
  import Button from "$lib/components/ui/Button.svelte"
  import { AlertCircle, X } from "lucide-svelte"

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  onMount(async () => {
    await taskActions.initialize()
  })

  // Apply dark mode class
  $effect(() => {
    if ($isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  })

  function dismissError() {
    taskActions.clearError()
  }
</script>

<div class="min-h-screen bg-background text-foreground">
  <!-- Global Error Toast -->
  {#if $error}
    <div class="fixed top-4 right-4 z-50 max-w-md">
      <div class="bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg border flex items-start gap-3">
        <AlertCircle class="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div class="flex-1">
          <h4 class="font-medium">Error</h4>
          <p class="text-sm mt-1">{$error}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="h-6 w-6 text-destructive-foreground hover:bg-destructive-foreground/10"
          onclick={dismissError}
          aria-label="Dismiss error"
        >
          <X class="h-3 w-3" />
        </Button>
      </div>
    </div>
  {/if}

  {@render children?.()}
</div>
