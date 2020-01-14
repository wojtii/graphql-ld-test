import React, { useState } from "react";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Container } from "react-bulma-components";
import { Navbar } from "./Navbar";
import { Actor } from "./ActorMovies";
import { Dev } from "./Dev";
import { Nobles } from "./Nobles";
import { SongWriter } from "./SongWriters";

const App = () => {
  const [item, setItem] = useState("actor");
  const getExample = itemName => {
    switch (itemName) {
      case "actor":
        return <Actor />;
      case "software":
        return <Dev />;
      case "nobles":
        return <Nobles />;
      case "musicians":
        return <SongWriter />;
      default:
        return <p>Not implemented</p>;
    }
  };

  return (
    <div className="App">
      <Navbar setItem={setItem} />
      <Container>{getExample(item)}</Container>
    </div>
  );
};

export default App;
