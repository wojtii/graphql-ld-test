import React, { useState, useEffect } from "react";
import { GraphQlLdProvider, Query } from "solid-react-graphql-ld";
import gql from "graphql-tag";

export const ActorMovies = React.memo(({ name }) => {
  const [fullName, setFullName] = useState(name);
  useEffect(() => {
    setFullName(name);
  }, [name]);
  return (
    <div>
      <h1>{fullName}</h1>
      <GraphQlLdProvider
        sources={["http://dbpedia.org/sparql"]}
        context={{
          Film: "http://dbpedia.org/ontology/Film",
          label: {
            "@id": "http://www.w3.org/2000/01/rdf-schema#label",
            "@language": "en"
          },
          starring: "http://dbpedia.org/ontology/starring"
        }}
      >
        <Query
          query={gql`
            {
              id @single
              ... on Film {
                starring(label: "${fullName}") @single
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              console.log(error);
              return <p>Error</p>;
            }
            console.log(data);
            return (
              <dl>
                <dd>
                  <ul>
                    {data && data.map((a, idx) => <li key={idx}>{a.id}</li>)}
                  </ul>
                </dd>
              </dl>
            );
          }}
        </Query>
      </GraphQlLdProvider>
    </div>
  );
});
