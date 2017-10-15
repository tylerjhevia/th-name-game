import * as React from "react";
import { PersonContainer } from "./PersonContainer";
import { Person } from "./PersonContainer";

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
      .then(peopleData => this.getRandomHeadshots(peopleData))
      .then(randomPeople => this.setState({ people: randomPeople }))
      .catch(error => console.log(error));
  }

  getRandomHeadshots(people: Array<Person>) {
    let randomPeople = [];
    while (randomPeople.length < 5) {
      let randomNumber = Math.round(Math.random() * people.length);
      randomPeople.push(people[Math.round(Math.random() * people.length)]);
    }
    return randomPeople;
  }

  render() {
    return <PersonContainer people={this.state.people} />;
  }
}
