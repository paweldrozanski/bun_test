import { Hono } from "hono";
import { streamText } from "hono/streaming";

const stream = new Hono();

stream.get("/stream", (c) => {
  return streamText(c, async (stream) => {
    for (let i = 0; i < 10; i++) {
      await stream.writeln(`Hello ${i}`);
      await stream.sleep(1000);
    }
  });
});

export default stream;
