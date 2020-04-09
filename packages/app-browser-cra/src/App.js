import React from "react";
import { getFirstFormattedDate } from "@ecma-modules/lib-date";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{getFirstFormattedDate()}</p>
      </header>
    </div>
  );
}

export default App;
