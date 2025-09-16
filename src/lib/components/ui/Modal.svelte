<script lang="ts">
  import { cn } from "$lib/utils"
  import { X } from "lucide-svelte"
  import Button from "./Button.svelte"

  interface Props {
    open?: boolean
    onClose?: () => void
    title?: string
    description?: string
    class?: string
    children?: any
  }

  let { open = false, onClose, title, description, class: className, children }: Props = $props()

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && onClose) {
      onClose()
    }
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget && onClose) {
      onClose()
    }
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? "modal-title" : undefined}
    aria-describedby={description ? "modal-description" : undefined}
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
    onkeydown={handleKeydown}
    onclick={handleBackdropClick}
    tabindex="0"
  >
    <!-- Enhanced backdrop with better dark mode styling -->
    <div class="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm"></div>

    <!-- Fully responsive modal content -->
    <div
      class={cn(
        "relative z-50 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto",
        "bg-white dark:bg-gray-900", 
        "border border-gray-200 dark:border-gray-700",
        "rounded-lg sm:rounded-xl shadow-2xl dark:shadow-2xl dark:shadow-black/50",
        "text-gray-900 dark:text-gray-100",
        "backdrop-blur-sm",
        "max-h-[90vh] overflow-hidden flex flex-col",
        className,
      )}
    >
      <!-- Responsive header -->
      {#if title || onClose}
        <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 rounded-t-lg sm:rounded-t-xl backdrop-blur-sm flex-shrink-0">
          {#if title}
            <h2 id="modal-title" class="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 pr-2">{title}</h2>
          {/if}
          {#if onClose}
            <Button 
              variant="ghost" 
              size="icon" 
              onclick={onClose} 
              aria-label="Close modal"
              class="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
            >
              <X class="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          {/if}
        </div>
      {/if}

      <!-- Responsive description -->
      {#if description}
        <div class="px-4 sm:px-6 py-2 bg-white dark:bg-gray-900 flex-shrink-0">
          <p id="modal-description" class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      {/if}

      <!-- Responsive content area with scroll -->
      <div class="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-b-lg sm:rounded-b-xl overflow-y-auto flex-1">
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
