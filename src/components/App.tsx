import * as React from "react";
import { PersonContainer } from "./PersonContainer";

export interface AppState {
  people: any;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      people: []
    };
  }

  componentDidMount() {
    return this.fetchPeople();
  }

  fetchPeople() {
    fetch("https://willowtreeapps.com/api/v1.0/profiles/")
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }
  render() {
    return <PersonContainer />;
  }
}
