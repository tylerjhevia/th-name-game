import * as React from "react";
import { PersonContainer } from "./PersonContainer";
import { Person } from "./PersonContainer";

export interface AppState {
  people: Array<Person>;
  currentPerson: String;
  feedback: String;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      people: [],
      currentPerson: null,
      feedback: ""
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
    if (name === this.state.currentPerson) {
      this.setState({ feedback: "Correct!" });
    } else {
      this.setState({ feedback: "Try again!" });
    }
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
        <h2 className="feedback">
          {this.state.feedback}
        </h2>
        {this.state.feedback === "Correct!"
          ? <button
              className="play-again-button"
              onClick={() => location.reload()}
            >
              Play Again
            </button>
          : null}
      </div>
    );
  }
}
