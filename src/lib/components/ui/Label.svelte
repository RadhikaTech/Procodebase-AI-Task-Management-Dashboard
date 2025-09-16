<script lang="ts">
  import { cn } from "$lib/utils"

  interface Props {
    class?: string
    htmlFor?: string
    children?: any
  }

  let { class: className, htmlFor, children }: Props = $props()
</script>

<label
  for={htmlFor}
  class={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
>
  <!-- Fixed children rendering to handle both text and snippet content -->
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</label>
