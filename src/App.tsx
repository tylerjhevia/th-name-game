import * as React from 'react';
import { PersonContainer } from './PersonContainer';
import { PersonInfo } from './PersonContainer';

export interface AppState {
  people: Array<PersonInfo>;
  currentPerson: String;
  feedback: String;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      people: [],
      currentPerson: '',
      feedback: ''
    };
  }

  componentDidMount() {
    this.fetchPeople();
  }

  fetchPeople() {
    fetch('https://willowtreeapps.com/api/v1.0/profiles/')
      .then(peopleData => peopleData.json())
      .then(peopleData => this.getRandomHeadshots(peopleData))
      .then(randomPeople => this.setState({ people: randomPeople }))
      .catch(error => error);
  }

  getFiveRandom(people: Array<PersonInfo>): Array<PersonInfo> {
    let randomRange = Math.round(Math.random() * people.length - 6);
    return people.slice(randomRange, randomRange + 5);
  }

  getRandomHeadshots(people: Array<PersonInfo>): Array<PersonInfo> {
    people = people.filter(person => person.headshot.url !== undefined);
    let randomPeople = this.getFiveRandom(people);
    this.setState({
      currentPerson: this.selectRandomPerson(randomPeople).firstName
    });
    return randomPeople;
  }

  selectRandomPerson(people: Array<PersonInfo>): PersonInfo {
    return people[Math.round(Math.random() * people.length - 1)];
  }

  checkAnswer(name: string): any {
    return name === this.state.currentPerson
      ? this.setState({ feedback: 'Correct!' })
      : this.setState({ feedback: 'Try again!' });
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
        {this.state.feedback === 'Correct!'
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
