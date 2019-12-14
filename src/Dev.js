import React from "react";
import { Client } from "./Client";
import { Form, Button, Box } from "react-bulma-components";

export const Dev = React.memo(({ name }) => {
  const sources = ["https://fragments.dbpedia.org/2016-04/en"];
  const context = {
    label: { "@id": "http://www.w3.org/2000/01/rdf-schema#label" },
    label_en: {
      "@id": "http://www.w3.org/2000/01/rdf-schema#label",
      "@language": "en"
    },
    developer: { "@id": "http://dbpedia.org/ontology/developer" },
    country: { "@id": "http://dbpedia.org/ontology/locationCountry" }
  };
  const query = `{
  softwareName: label @single
  developer @single(scope: all) {
    label
    country(label_en: "Poland")
  }  }`;
  const displayField = "softwareName";
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
