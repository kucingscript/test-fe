import { describe, it, expect, vi } from "vitest";
import { isTokenValid } from "./token";
import { jwtDecode } from "jwt-decode";

vi.mock("jwt-decode");

describe("isTokenValid", () => {
  it("returns false if token is null", () => {
    expect(isTokenValid(null)).toBe(false);
  });

  it("returns false if jwtDecode throws", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    (jwtDecode as any).mockImplementation(() => {
      throw new Error("bad token");
    });
    expect(isTokenValid("bad.token")).toBe(false);
    spy.mockRestore();
  });

  it("returns false if token is expired", () => {
    const now = Math.floor(Date.now() / 1000);
    (jwtDecode as any).mockReturnValue({ exp: now - 10 });
    expect(isTokenValid("expired.token")).toBe(false);
  });

  it("returns true if token is valid and not expired", () => {
    const now = Math.floor(Date.now() / 1000);
    (jwtDecode as any).mockReturnValue({ exp: now + 1000 });
    expect(isTokenValid("valid.token")).toBe(true);
  });
});
