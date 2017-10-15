import * as React from "react";
const styles = require("style-loader!css-loader!../../styles.css");

export interface PersonProps {
  name: string;
  headshot: string;
}

export const Person = (props: PersonProps) => {
  let { name } = props;
  let headshot;
  props.headshot
    ? (headshot = props.headshot.slice(2, props.headshot.length))
    : (headshot = "no headshot");
  return (
    <div className="person">
      <div className="person-pic">Here is my pic</div>
      <p className="person-name">
        {name}
      </p>
      <img className="headshot" src={`http://${headshot}`} alt={headshot} />
    </div>
  );
};
