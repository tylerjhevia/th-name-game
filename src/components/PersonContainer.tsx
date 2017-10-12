import * as React from "react";
import { Person } from "./Person";

export interface PersonContainerProps {}

export const PersonContainer = (props: PersonContainerProps) => {
  const names = ["Han", "Chewie", "Leia", "Luke", "Lando"];
  return (
    <div className="person-container">
      {names.map(name => <Person name={name} key={name} />)}
    </div>
  );
};
