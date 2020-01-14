import React, { useState, useEffect } from "react";
import { Client } from "./Client";
import { Form, Button, Box } from "react-bulma-components";

export const SongWriters = React.memo(({ name }) => {
  const [fullName, setFullName] = useState(name);
  useEffect(() => {
    setFullName(name);
  }, [name]);

  const sources = ["https://fragments.dbpedia.org/2016-04/en"];
  const context = {
    label: "http://www.w3.org/2000/01/rdf-schema#label",
    label_en: {
      "@id": "http://www.w3.org/2000/01/rdf-schema#label",
      "@language": "en"
    },
    writer: "http://dbpedia.org/ontology/writer",
    artist: "http://dbpedia.org/ontology/musicalArtist"
  };
  const query = `{
  label
  writer(label_en: "${fullName}")
  artist { label }
}`;
  const display = data => {
    return data[0]["label"].map((e, i) => {
      return <li key={i}>{e}</li>;
    });
  };

  return (
    <div>
      <Client
        sources={sources}
        context={context}
        query={query}
        display={display}
      />
    </div>
  );
});

export const SongWriter = () => {
  const [name, setName] = useState("");
  const [formName, setFormName] = useState();
  const handleSubmit = e => {
    e.preventDefault();
    setName(formName);
  };
  return (
    <div>
      <Box style={{ marginTop: "1em" }}>
        <form onSubmit={handleSubmit}>
          <Form.Field className="has-addons">
            <Form.Input
              type="text"
              placeholder="Artist name"
              onChange={e => setFormName(e.target.value)}
              value={formName}
            />
            <Button className="is-primary" onClick={handleSubmit}>
              Run
            </Button>
          </Form.Field>
        </form>
      </Box>

      {name !== "" && <SongWriters name={name} />}
    </div>
  );
};
