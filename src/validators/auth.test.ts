import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "./auth";

describe("loginSchema", () => {
  it("validates correct data", async () => {
    const valid = {
      email: "user@mail.com",
      password: "password123",
    };
    await expect(loginSchema.validate(valid)).resolves.toEqual(valid);
  });

  it("fails for invalid email", async () => {
    await expect(
      loginSchema.validate({ email: "bad", password: "password123" })
    ).rejects.toThrow(/valid email/);
  });

  it("fails for short password", async () => {
    await expect(
      loginSchema.validate({ email: "user@mail.com", password: "123" })
    ).rejects.toThrow(/at least 8 characters/);
  });
});

describe("registerSchema", () => {
  const base = {
    email: "user@mail.com",
    password: "password123",
    nickname: "nick",
    fullname: "Full Name",
    corporate_name: "Corp Name",
    corporate_code: "CODE123",
    corporate_address: "Address",
  };

  it("validates correct data", async () => {
    await expect(registerSchema.validate({ ...base })).resolves.toMatchObject(
      base
    );
  });

  it("fails for missing required fields", async () => {
    await expect(registerSchema.validate({})).rejects.toThrow(/required/);
  });

  it("fails for invalid email", async () => {
    await expect(
      registerSchema.validate({ ...base, email: "bad" })
    ).rejects.toThrow(/valid email/);
  });

  it("fails for short nickname", async () => {
    await expect(
      registerSchema.validate({ ...base, nickname: "a" })
    ).rejects.toThrow(/at least 3 characters/);
  });

  it("fails for long corporate_code", async () => {
    await expect(
      registerSchema.validate({ ...base, corporate_code: "A".repeat(11) })
    ).rejects.toThrow(/Maximum 10 characters/);
  });
});
