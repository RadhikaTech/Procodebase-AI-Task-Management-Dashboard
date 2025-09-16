import "@testing-library/jest-dom"
import { vi, beforeEach } from "vitest"

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Mock crypto.randomUUID
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: vi.fn(() => "test-uuid-" + Math.random().toString(36).substr(2, 9)),
  },
})

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})
