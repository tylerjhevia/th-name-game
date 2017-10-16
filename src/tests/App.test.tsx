import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../Components/App';
import { Error } from '../Components/Error';
import { Game } from '../Components/Game';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('App component', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.setState({ currentPerson: 'Tyler' });
  });

  it('should have the correct state properties with the correct default values', () => {
    expect(wrapper.state().selectedPeople).toEqual([]);
    expect(wrapper.state().fetchedPeople).toEqual([]);
    expect(wrapper.state().currentPerson).toEqual('Tyler');
    expect(wrapper.state().feedback).toEqual('');
    expect(wrapper.state().reverseMode).toEqual(false);
    expect(wrapper.state().score).toEqual(0);
  });

  it("should render a div element with a class of 'main'", () => {
    expect(wrapper.find('div.main').length).toEqual(1);
  });

  it('should render a Game component', () => {
    expect(wrapper.find(Game).length).toEqual(1);
  });

  it('should pass the correct props to Game component', () => {
    const game = wrapper.find(Game);

    expect(game.props().people).toEqual([]);
    expect(game.props().checkAnswer).toBeInstanceOf(Function);
    expect(game.props().reverseMode).toEqual(false);
  });

  it('should render an h2 elements with a class of feedback', () => {
    expect(wrapper.find('h2.feedback').length).toEqual(1);
  });

  it('should render a button element with a class of "reverse-button"', () => {
    expect(wrapper.find('button.reverse-button').length).toEqual(1);
  });

  it('should render an h2 element with a class of "current-name" only when state.reverseMode is equal to false', () => {
    expect(wrapper.find('h2.current-name').length).toEqual(1);

    wrapper.setState({ reverseMode: true });

    expect(wrapper.find('h2.current-name').length).toEqual(0);
  });

  it('should render an img element only when state.reverseMode is equal to true', () => {
    expect(wrapper.find('img').length).toEqual(0);

    wrapper.setState({ reverseMode: true });

    expect(wrapper.find('img').length).toEqual(1);
  });

  it('should render a button element with a class of "play-again-button" if state.feedback is equal to "Correct!"', () => {
    expect(wrapper.find('button.play-again-button').length).toEqual(0);

    wrapper.setState({ feedback: 'Correct!' });

    expect(wrapper.find('button.play-again-button').length).toEqual(1);
  });

  it('should render a p element with a class of "score"', () => {
    expect(wrapper.find('p.score').length).toEqual(1);
  });

  it('should render a button element with a class of "reset-button"', () => {
    expect(wrapper.find('button.reset-button').length).toEqual(1);
  });

  it('should render an Error component if state.person is an empty string', () => {
    expect(wrapper.find(Error).length).toEqual(0);

    wrapper.setState({ currentPerson: '' });

    expect(wrapper.find(Error).length).toEqual(1);
  });
});
