import * as React from "react";
import { PersonContainer } from "./PersonContainer";
import { Person } from "./PersonContainer";

export interface AppState {
  people: Array<Person>;
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
    people = people.filter(person => person.headshot.url !== undefined);
    let randomPeople: Array<Person> = [];

    for (let i = 0; randomPeople.length < 5; i++) {
      let randomPerson = this.selectRandomPerson(people);
      if (randomPeople.filter(person => person.slug !== randomPerson.slug)) {
        randomPeople.push(randomPerson);
      }
    }
    return randomPeople;
  }

  selectRandomPerson(people: Array<Person>) {
    return people[Math.round(Math.random() * people.length)];
  }

  render() {
    return (
      <div className="main">
        <PersonContainer people={this.state.people} />
      </div>
    );
  }
}
