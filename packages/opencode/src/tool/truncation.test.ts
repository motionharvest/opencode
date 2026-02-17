import { describe, expect, test } from "bun:test"
import { Truncate } from "./truncation"

describe("Truncate.output", () => {
  test("handles string input", async () => {
    const result = await Truncate.output("hello\nworld")
    expect(result.truncated).toBe(false)
    expect(result.content).toBe("hello\nworld")
  })

  test("handles undefined input", async () => {
    const result = await Truncate.output(undefined as any)
    expect(result.truncated).toBe(false)
    expect(result.content).toBe("undefined")
  })

  test("handles null input", async () => {
    const result = await Truncate.output(null as any)
    expect(result.truncated).toBe(false)
    expect(result.content).toBe("null")
  })

  test("handles number input", async () => {
    const result = await Truncate.output(123 as any)
    expect(result.truncated).toBe(false)
    expect(result.content).toBe("123")
  })

  test("handles object input", async () => {
    const result = await Truncate.output({ foo: "bar" } as any)
    expect(result.truncated).toBe(false)
    expect(result.content).toBe("[object Object]")
  })

  test("handles empty string", async () => {
    const result = await Truncate.output("")
    expect(result.truncated).toBe(false)
    expect(result.content).toBe("")
  })

  test("truncates long content", async () => {
    const longText = "line\n".repeat(100)
    const result = await Truncate.output(longText, { maxLines: 50 })
    expect(result.truncated).toBe(true)
    expect(result.content).toContain("truncated")
  })
})
