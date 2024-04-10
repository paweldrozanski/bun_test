import { Hono } from "hono";
import bookRouter from "./routes/books";
import helloRouter from "./routes/hello";
import streamRouter from "./routes/stream";
import { logger } from "hono/logger";
import Top from "./page.tsx";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.use("*", logger());

const route = app.post(
  "/posts",
  zValidator(
    "json",
    z.object({
      body: z.string(),
    }),
  ),
  (c) => {
    return c.json({ hello: "world!" });
  },
);

app.route("/book", bookRouter);
app.route("/hello", helloRouter);
app.route("/stream", streamRouter);

app.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});

export default app;
