import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2")
  })

  it("should handle conditional classes", () => {
    expect(cn("base", true && "conditional", false && "hidden")).toBe("base conditional")
  })

  it("should handle Tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6")
  })

  it("should handle empty inputs", () => {
    expect(cn()).toBe("")
    expect(cn("")).toBe("")
    expect(cn(null, undefined)).toBe("")
  })
})
