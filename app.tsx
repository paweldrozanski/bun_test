import { Hono } from "hono";
import { streamText } from "hono/streaming";
import bookRouter from "./routes/books.ts";
import { logger } from "hono/logger";
import Top from "./page.tsx";

const app = new Hono();

app.use("*", logger());

app.route("/book", bookRouter);

app.get("/hello", (c) => {
  return c.json({ hello: "world!" });
});

app.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});

app.get("/stream", (c) => {
  return streamText(c, async (stream) => {
    for (let i = 0; i < 10; i++) {
      await stream.writeln(`Hello ${i}`);
      await stream.sleep(1000);
    }
  });
});

export default app;
