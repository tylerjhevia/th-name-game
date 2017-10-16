import * as React from 'react';
import { Person } from './Person';

export interface GameProps {
  people: Array<PersonInfo>;
  checkAnswer: Function;
  reverseMode: Boolean;
}

export interface PersonInfo {
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

export const Game = (props: GameProps) => {
  const { people, checkAnswer, reverseMode } = props;
  return (
    <div className="game-container">
      {people.map(person =>
        <Person
          reverseMode={reverseMode}
          name={person.firstName}
          key={person.id}
          headshot={person.headshot.url}
          checkAnswer={checkAnswer}
        />
      )}
    </div>
  );
};
