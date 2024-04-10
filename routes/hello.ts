import { Hono } from "hono";

const hello = new Hono();

hello.get("/hello", (c) => {
  return c.json({ hello: "world!" });
});

export default hello;
