import React, { useState } from "react";
import "./App.css";
import { ActorMovies } from "./ActorMovies";

const App = () => {
  const [actor, setActor] = useState("Tomasz Karolak");
  const [formActor, setFormActor] = useState();
  const handleSubmit = e => {
    e.preventDefault();
    setActor(formActor);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Actor name
          <input type="text" onChange={e => setFormActor(e.target.value)} />
        </label>
        <input type="submit" value="Search" />
      </form>
      <ActorMovies name={actor} />
    </div>
  );
};

export default App;
