import "../style.css";
import { startApp } from "./app";

void bootstrap();

async function bootstrap(): Promise<void> {
  await import("../data.js");
  startApp();
}
