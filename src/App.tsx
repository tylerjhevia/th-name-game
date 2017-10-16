import * as React from 'react';
import { PersonContainer } from './PersonContainer';
import { PersonInfo } from './PersonContainer';

export interface AppState {
  selectedPeople: Array<PersonInfo>;
  currentPerson: String;
  feedback: String;
  fetchedPeople: Array<PersonInfo>;
}

export interface EmptyPerson {
  firstName: String;
}

export interface PeopleResponse {
  length: Number;
  people: Array<PersonInfo>;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      selectedPeople: [],
      currentPerson: '',
      feedback: '',
      fetchedPeople: []
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople() {
    fetch('https://willowtreeapps.com/api/v1.0/profiles/')
      .then(peopleData => peopleData.json())
      .then(peopleData => {
        this.setState({ fetchedPeople: peopleData });
        return this.getRandomHeadshots(peopleData);
      })
      .then(randomPeople => this.setState({ selectedPeople: randomPeople }))
      .catch(error => error);
  }

  getFiveRandom(people: Array<PersonInfo>): Array<PersonInfo> {
    let randomRange = Math.round(Math.random() * people.length - 6);
    return people.slice(randomRange, randomRange + 5);
  }

  getRandomHeadshots(people: Array<PersonInfo>): Array<PersonInfo> {
    people = people.filter(
      person =>
        person.headshot.url !== undefined && person.firstName !== undefined
    );
    console.log('people', people);
    let randomPeople = this.getFiveRandom(people);
    let randomPerson = this.selectRandomPerson(randomPeople);
    this.setState({ currentPerson: randomPerson.firstName });
    return randomPeople;
  }

  selectRandomPerson(people: Array<PersonInfo>): PersonInfo {
    return people[Math.round(Math.random() * people.length - 1)];
  }

  checkAnswer(name: string, headshot: string): any {
    return name === this.state.currentPerson ||
    headshot === this.state.currentPerson
      ? this.setState({ feedback: 'Correct!' })
      : this.setState({ feedback: 'Try again!' });
  }

  restartGame() {
    const newSelection = this.getRandomHeadshots(this.state.fetchedPeople);
    return this.setState({ selectedPeople: newSelection });
  }

  render() {
    return (
      <div className="main">
        <PersonContainer
          people={this.state.selectedPeople}
          checkAnswer={this.checkAnswer.bind(this)}
        />

        <h2 className="current-name">
          {this.state.currentPerson}
        </h2>

        <h2 className="feedback">
          {this.state.feedback}
        </h2>
        {this.state.feedback === 'Correct!'
          ? <button
              className="play-again-button"
              onClick={() => this.restartGame()}
            >
              Play Again
            </button>
          : null}
      </div>
    );
  }
}
