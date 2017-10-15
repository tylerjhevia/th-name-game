import * as React from "react";
import { Person } from "./Person";

export interface PersonContainerProps {
  people: Array<Person>;
}

export interface Person {
  id: string;
  type: string;
  slug: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  headshot: Headshot;
  socialLinks: Array<any>;
}

export interface Headshot {
  type: string;
  mimeType: string;
  id: string;
  url: string;
  alt: string;
  height: number;
  width: number;
}

export const PersonContainer = (props: PersonContainerProps) => {
  const { people } = props;
  return (
    <div className="person-container">
      {people.map(person =>
        <Person
          name={person.firstName}
          key={person.id}
          headshot={person.headshot.url}
        />
      )}
    </div>
  );
};
