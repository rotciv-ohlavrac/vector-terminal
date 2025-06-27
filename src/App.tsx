import {
  Container,
  Input,
  Terminal,
  TerminalContextProvider,
} from "../lib/main";
import type { TerminalCommand } from "../lib/types/TerminalCommand";

import "./App.css";

function App() {
  const commands: Array<TerminalCommand> = [
    {
      input: "whois",
      arguments: [],
      execute: () => "Victor Rodrigues (Gelado)",
    },
  ];
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <Container size="full">
          <TerminalContextProvider commands={commands}>
            <Terminal>
              <Input />
            </Terminal>
          </TerminalContextProvider>
        </Container>
      </div>
    </>
  );
}

export default App;
