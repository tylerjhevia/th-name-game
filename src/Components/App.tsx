import * as React from 'react';
import { Game } from './Game';
import { PersonInfo } from './Game';
import { Error } from './Error';

export interface AppState {
  selectedPeople: Array<PersonInfo>;
  currentPerson: String;
  feedback: String;
  fetchedPeople: Array<PersonInfo>;
  reverseMode: Boolean;
  score: any;
}

export interface EmptyPerson {
  firstName: String;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      selectedPeople: [],
      currentPerson: '',
      feedback: '',
      fetchedPeople: [],
      reverseMode: false,
      score: 0
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
      .catch(error => <Error />);
  }

  getRandomHeadshots(people: Array<PersonInfo>): Array<PersonInfo> {
    let filteredPeople = this.filterPeople(people);
    let randomPeople = this.getFiveRandom(filteredPeople);
    this.selectRandomPerson(randomPeople);
    return randomPeople;
  }

  filterPeople(people: Array<PersonInfo>) {
    return people.filter(
      (person: PersonInfo) =>
        person.headshot.url !== undefined &&
        !person.headshot.url.includes('TEST')
    );
  }

  getFiveRandom(people: Array<PersonInfo>): Array<PersonInfo> {
    let randomRange = Math.round(Math.random() * people.length - 6);
    return people.slice(randomRange, randomRange + 5);
  }

  selectRandomPerson(people: Array<PersonInfo>): PersonInfo | void {
    const person = people[Math.round(Math.random() * (people.length - 1))];

    if (!person) {
      return location.reload();
    }

    if (this.state.reverseMode === false) {
      this.setState({ currentPerson: person.firstName });
    } else {
      this.setState({ currentPerson: person.headshot.url });
    }

    return person;
  }

  checkAnswer(name: string, headshot: string): void {
    if (
      name === this.state.currentPerson ||
      headshot === this.state.currentPerson
    ) {
      this.setState({ feedback: 'Correct!', score: this.state.score + 1 });
    } else {
      this.setState({ feedback: 'Try again!', score: this.state.score - 1 });
    }
  }

  restartGame(): void {
    const newSelection = this.getRandomHeadshots(this.state.fetchedPeople);
    this.selectRandomPerson(newSelection);
    return this.setState({
      selectedPeople: newSelection,
      feedback: ''
    });
  }

  changeMode() {
    this.setState({ reverseMode: !this.state.reverseMode }, () =>
      this.restartGame()
    );
  }

  render() {
    if (!this.state.currentPerson) {
      return <Error />;
    }

    const {
      selectedPeople,
      currentPerson,
      feedback,
      score,
      reverseMode
    } = this.state;

    return (
      <div className="main">
        <Game
          people={selectedPeople}
          checkAnswer={this.checkAnswer.bind(this)}
          reverseMode={reverseMode}
        />

        {this.state.reverseMode === false
          ? <h2 className="current-name">
              {currentPerson}
            </h2>
          : <img className="current-photo" src={`http:${currentPerson}`} />}

        <h2 className="feedback">
          {feedback}
        </h2>

        {feedback === 'Correct!'
          ? <button
              className="play-again-button"
              onClick={() => this.restartGame()}
            >
              Play Again
            </button>
          : null}
        <div className="controls">
          <button className="reverse-button" onClick={() => this.changeMode()}>
            Change Mode
          </button>

          <p className="score">
            Score: {score}
          </p>
          <button
            className="reset-button"
            onClick={() => this.setState({ score: 0 })}
          >
            Reset Score
          </button>
        </div>
      </div>
    );
  }
}
