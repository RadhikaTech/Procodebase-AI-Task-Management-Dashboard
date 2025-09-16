<script lang="ts">
  import { cn } from "$lib/utils"

  interface Props {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
    class?: string
    children?: any
  }

  let { variant = "default", class: className, children }: Props = $props()

  const variants = {
    default: "bg-green-500 hover:bg-green-600 text-white shadow-sm",
    secondary: "bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm",
    destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-sm",
    outline: "text-orange-600 border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 bg-orange-50/50",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-sm",
    warning: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm",
  }
</script>

<div
  class={cn(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    variants[variant],
    className,
  )}
>
  {@render children?.()}
</div>
