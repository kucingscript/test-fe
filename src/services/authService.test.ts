import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginUser, registerUser } from "./authService";
import apiClient from "@/lib/api";

vi.mock("@/lib/api");

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loginUser calls /login and returns data", async () => {
    const mockData = {
      code: 0,
      message: "ok",
      request_id: "1",
      data: { token: "abc" },
    };
    (apiClient.post as any).mockResolvedValue({ data: mockData });
    const result = await loginUser({ email: "a@mail.com", password: "pw" });
    expect(apiClient.post).toHaveBeenCalledWith("/login", {
      email: "a@mail.com",
      password: "pw",
    });
    expect(result).toBe(mockData);
  });

  it("registerUser calls /register and returns data", async () => {
    const mockData = {
      code: 0,
      message: "ok",
      request_id: "2",
      data: { user_id: "1" },
    };
    (apiClient.post as any).mockResolvedValue({ data: mockData });
    const result = await registerUser({
      email: "a@mail.com",
      password: "pw",
      nickname: "nick",
      fullname: "Full Name",
      corporate_name: "Corp",
      corporate_code: "CODE",
      corporate_address: "Addr",
      corporate_type_id: "2",
    });
    expect(apiClient.post).toHaveBeenCalledWith("/register", {
      email: "a@mail.com",
      password: "pw",
      nickname: "nick",
      fullname: "Full Name",
      corporate_name: "Corp",
      corporate_code: "CODE",
      corporate_address: "Addr",
      corporate_type_id: "2",
    });
    expect(result).toBe(mockData);
  });
});
