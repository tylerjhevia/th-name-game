import * as React from 'react';
import './Person.css';

export interface PersonProps {
  name: string;
  headshot: string;
  checkAnswer: Function;
}

export const Person = (props: PersonProps) => {
  let { name, checkAnswer, headshot } = props;

  return (
    <div className="person" onClick={(e: any) => checkAnswer(name, headshot)}>
      <img className="headshot" src={`http:${headshot}`} alt={headshot} />
    </div>
  );
};
