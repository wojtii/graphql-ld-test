import React from "react";
import { Client } from "./Client";

export const Nobles = React.memo(({ name }) => {
  const sources = ["https://fragments.dbpedia.org/2016-04/en"];
  const context = {
    nobel: { "@id": "http://purl.org/dc/terms/subject" },
    subject: {
      "@id":
        "http://dbpedia.org/resource/Category:Nobel_laureates_in_Literature"
    },
    name: { "@id": "http://dbpedia.org/property/name" },
    birthDate: { "@id": "http://dbpedia.org/ontology/birthDate" },
    deathDate: { "@id": "http://dbpedia.org/ontology/deathDate" }
  };
  const query = `{
  nobel(first: 20, offset: 2, nobel: subject){ name birthDate deathDate }
}`;
  const display = data => {
    const nobels = data[0]["nobel"][0];
    return nobels["name"].map((e, i) => {
      return (
        <li key={i}>
          {e}, {nobels["birthDate"][i]} = {nobels["deathDate"][i]}
        </li>
      );
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
