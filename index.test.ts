import { expect, test, describe } from "bun:test";
import app from "./app";

describe("Example", () => {
  test("GET /hello", async () => {
    const res = await app.request("/hello");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ hello: "world!" });
  });
});
