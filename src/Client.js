import React from "react";
import gql from "graphql-tag";
import { GraphQlLdProvider, Query } from "solid-react-graphql-ld";
import { Converter } from "graphql-to-sparql";
import { toSparql } from "sparqlalgebrajs";
import { Columns, Loader, Box, Content } from "react-bulma-components";

export const Client = ({ sources, context, query, displayField }) => {
  const sparqlQuery = toSparql(
    new Converter().graphqlToSparqlAlgebraRawContext(query, context)
  );

  return (
    <div>
      <Box>
        <Columns>
          <Columns.Column>
            <Content>
              <strong>GraphQL query</strong>
              <p>{query}</p>
              <strong>JSON-LD context</strong>
              <p>{JSON.stringify(context)}</p>
            </Content>
          </Columns.Column>
          <Columns.Column>
            <Content>
              <strong>SparQL query</strong>
              <p>{sparqlQuery}</p>
            </Content>
          </Columns.Column>
        </Columns>
      </Box>
      <GraphQlLdProvider sources={sources} context={context}>
        <Query
          query={gql`
            ${query}
          `}
        >
          {({ loading, err, data }) => {
            if (loading) {
              return <Loader style={{ margin: "0 auto" }} />;
            }
            if (err) {
              console.error(err);
              return <p>Error</p>;
            }
            console.log(data);
            return (
              <Box>
                <strong>Results</strong>
                <dl>
                  <dd>
                    <ul>
                      {data &&
                        data.map((a, idx) => (
                          <li key={idx}>{a[displayField]}</li>
                        ))}
                    </ul>
                  </dd>
                </dl>
              </Box>
            );
          }}
        </Query>
      </GraphQlLdProvider>
    </div>
  );
};
