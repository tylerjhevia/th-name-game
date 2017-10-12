import * as React from "react";

export interface PersonProps {
  name: string;
}

export const Person = (props: PersonProps) => {
  const { name } = props;
  return (
    <div className="person">
      <div className="person-pic">Here is my pic</div>
      <p className="person-name">
        {name}
      </p>
    </div>
  );
};
