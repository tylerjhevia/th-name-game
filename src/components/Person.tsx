import * as React from "react";
const styles = require("style-loader!css-loader!../../styles.css");

export interface PersonProps {
  name: string;
  headshot: string;
}

export const Person = (props: PersonProps) => {
  let { name } = props;
  let headshot;
  console.log("name", name);
  console.log("headshot", props.headshot);
  props.headshot
    ? (headshot = props.headshot.slice(2, props.headshot.length))
    : (headshot = "no headshot");
  return (
    <div className="person">
      <img className="headshot" src={`http://${headshot}`} alt={headshot} />
      <p className="person-name">
        {name}
      </p>
    </div>
  );
};
