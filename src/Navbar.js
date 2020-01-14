import React from "react";
import { Navbar as BulmaNavbar } from "react-bulma-components";

export const Navbar = ({ setItem }) => {
  return (
    <BulmaNavbar color="primary">
      <BulmaNavbar.Brand>
        <BulmaNavbar.Item>GraphQL-LD</BulmaNavbar.Item>
        <BulmaNavbar.Burger />
      </BulmaNavbar.Brand>
      <BulmaNavbar.Menu>
        <BulmaNavbar.Container position="end">
          <BulmaNavbar.Item onClick={() => setItem("actor")}>
            Actors
          </BulmaNavbar.Item>
          <BulmaNavbar.Item onClick={() => setItem("software")}>
            Softwares
          </BulmaNavbar.Item>
          <BulmaNavbar.Item onClick={() => setItem("nobles")}>
            Nobles
          </BulmaNavbar.Item>
          <BulmaNavbar.Item onClick={() => setItem("musicians")}>
            Musicians
          </BulmaNavbar.Item>
        </BulmaNavbar.Container>
      </BulmaNavbar.Menu>
    </BulmaNavbar>
  );
};
