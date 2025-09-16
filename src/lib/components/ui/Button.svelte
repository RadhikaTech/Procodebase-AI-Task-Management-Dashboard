<script lang="ts">
  import { cn } from "$lib/utils"
  import type { HTMLButtonAttributes } from "svelte/elements"

  interface Props extends HTMLButtonAttributes {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "success" | "warning"
    size?: "default" | "sm" | "lg" | "icon"
    class?: string
  }

  let {
    variant = "default",
    size = "default",
    class: className,
    children,
    ...restProps
  }: Props = $props()

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
    gradient: "bg-gradient-primary text-white hover:shadow-lg hover:scale-[1.02] shadow-md",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 text-foreground hover:text-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md",
    ghost: "hover:bg-primary/10 hover:text-primary text-muted-foreground",
    link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
    success: "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md dark:bg-green-600 dark:hover:bg-green-700",
    warning: "bg-orange-600 text-white hover:bg-orange-700 shadow-sm hover:shadow-md dark:bg-orange-600 dark:hover:bg-orange-700",
  }

  const sizes = {
    default: "h-11 px-6 py-2 text-sm",
    sm: "h-9 rounded-lg px-4 text-sm",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  }
</script>

<button
  class={cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  )}
  {...restProps}
>
  <!-- Fixed snippet rendering for Svelte 5 -->
  {@render children?.()}
</button>
