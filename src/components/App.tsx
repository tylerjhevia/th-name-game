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
    this.fetchPeople();
  }

  fetchPeople() {
    fetch("https://willowtreeapps.com/api/v1.0/profiles/")
      .then(peopleData => peopleData.json())
      .then(peopleData => this.setState({ people: peopleData }))
      .catch(error => console.log(error));
  }
  render() {
    return <PersonContainer people={this.state.people} />;
  }
}
