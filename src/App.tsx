import { TerminalContextProvider } from "../lib/components/contexts/TerminalContext";
import { Terminal } from "../lib/main";
import type { TerminalCommand } from "../lib/types/TerminalCommand";

import "./App.css";

function App() {
  // A helper function to simulate async work by pausing execution.
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const commands: Array<TerminalCommand> = [
    {
      input: "whois",
      execute: () => "Victor Rodrigues (Gelado)",
    },
    {
      input: "ping",
      description: "Simulates pinging a server and streams the output.",
      execute: async function (api, host = "localhost") {
        if (host === "--help" || host === "-h") {
          api.write(
            "Usage: ping [host]\n  Pings a specified host, defaults to localhost."
          );
          return;
        }

        api.write(`Pinging ${host} with 32 bytes of data:\n`);

        for (let i = 0; i < 4; i++) {
          await sleep(800);
          const time = Math.floor(Math.random() * 50) + 10;
          api.write(`Reply from ${host}: bytes=32 time=${time}ms TTL=116\n`);
        }

        api.write(
          `\nPing statistics for ${host}:\n    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)\n`
        );
      },
    },
  ];
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <TerminalContextProvider commands={commands}>
          <Terminal />
        </TerminalContextProvider>
      </div>
    </>
  );
}

export default App;
