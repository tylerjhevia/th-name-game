import * as React from "react";
import { PersonContainer } from "./PersonContainer";
import { Person } from "./PersonContainer";

export interface AppState {
  people: Array<Person>;
  currentPerson: String;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      people: [],
      currentPerson: null
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

  getRandomHeadshots(people: Array<Person>): Array<Person> {
    people = people.filter(person => person.headshot.url !== undefined);
    let randomPeople: Array<Person> = [];

    for (let i = 0; randomPeople.length < 5; i++) {
      let randomPerson = this.selectRandomPerson(people);
      let duplicate = randomPeople.filter(
        person => person.slug === randomPerson.slug
      );
      if (duplicate.length === 0 && randomPerson.slug) {
        randomPeople.push(randomPerson);
      }
    }
    this.setState({
      currentPerson: this.selectRandomPerson(randomPeople).firstName
    });
    return randomPeople;
  }

  selectRandomPerson(people: Array<Person>): Person {
    return people[Math.round(Math.random() * people.length - 1)];
  }

  checkAnswer(name: string): any {
    console.log("name", name);
    if (name === this.state.currentPerson) {
      alert("Winner!");
    } else {
      alert("WRONG!");
    }
    location.reload();
  }

  render() {
    return (
      <div className="main">
        <PersonContainer
          people={this.state.people}
          checkAnswer={this.checkAnswer.bind(this)}
        />
        <h2 className="current-name">
          {this.state.currentPerson}
        </h2>
      </div>
    );
  }
}
