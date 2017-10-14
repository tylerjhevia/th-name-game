import * as React from "react";

export interface PersonProps {
  name: string;
  headshot: string;
}

export const Person = (props: PersonProps) => {
  let { name } = props;
  let headshot = props.headshot.slice(2, props.headshot.length);
  console.log(headshot);
  return (
    <div className="person">
      <div className="person-pic">Here is my pic</div>
      <p className="person-name">
        {name}
      </p>
      <img src={`http://${headshot}`} />
    </div>
  );
};
