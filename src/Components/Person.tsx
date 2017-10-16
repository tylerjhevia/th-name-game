import * as React from 'react';
import '../styles/Person.css';

export interface PersonProps {
  name: string;
  headshot: string;
  checkAnswer: Function;
  reverseMode: Boolean;
}

export const Person = (props: PersonProps) => {
  let { name, checkAnswer, headshot, reverseMode } = props;

  return (
    <div className="person" onClick={(e: any) => checkAnswer(name, headshot)}>
      {reverseMode === false
        ? <img className="headshot" src={`http:${headshot}`} alt={headshot} />
        : <h2 className="person-name">
            {name}
          </h2>}
    </div>
  );
};
