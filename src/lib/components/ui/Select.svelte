<script lang="ts">
  import { cn } from "$lib/utils"
  import type { HTMLSelectAttributes } from "svelte/elements"

  interface Props extends HTMLSelectAttributes {
    class?: string
    value?: string
    children?: any
  }

  let { class: className, value = $bindable(), children, ...restProps }: Props = $props()
</script>

<!-- Improved select styling with proper alignment -->
<select
  bind:value
  class={cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className,
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</select>
