import React, { useState, useEffect } from "react";
import { Client } from "./Client";
import { Form, Button, Box } from "react-bulma-components";

export const ActorMovies = React.memo(({ name }) => {
  const [fullName, setFullName] = useState(name);
  useEffect(() => {
    setFullName(name);
  }, [name]);

  const sources = ["https://fragments.dbpedia.org/2016-04/en"];
  const context = {
    Film: "http://dbpedia.org/ontology/Film",
    label: {
      "@id": "http://www.w3.org/2000/01/rdf-schema#label",
      "@language": "en"
    },
    starring: "http://dbpedia.org/ontology/starring"
  };
  const query = `{
    id @single
    ... on Film {
      starring(label: "${fullName}") @single
    }
  }`;
  const displayField = "id";
  return (
    <div>
      <Client
        sources={sources}
        context={context}
        query={query}
        displayField={displayField}
      />
    </div>
  );
});

export const Actor = () => {
  const [actor, setActor] = useState("");
  const [formActor, setFormActor] = useState();
  const handleSubmit = e => {
    e.preventDefault();
    setActor(formActor);
  };
  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit}>
          <Form.Field className="has-addons">
            <Form.Input
              type="text"
              placeholder="actor name"
              onChange={e => setFormActor(e.target.value)}
              value={formActor}
            />
            <Button className="is-primary" onClick={handleSubmit}>
              Run
            </Button>
          </Form.Field>
        </form>
      </Box>

      {actor !== "" && <ActorMovies name={actor} />}
    </div>
  );
};
