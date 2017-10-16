import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('App component', () => {
  const wrapper = shallow(<App />);
  it('should have the correct state properties with the correct default values', () => {
    expect(wrapper.state().selectedPeople).toEqual([]);
    expect(wrapper.state().fetchedPeople).toEqual([]);
    expect(wrapper.state().currentPerson).toEqual('');
    expect(wrapper.state().feedback).toEqual('');
    expect(wrapper.state().reverseMode).toEqual(false);
  });

  it("should render a div element with a class of 'main'", () => {
    expect(wrapper.find('div.main').length).toEqual(1);
  });

  it('should render two h2 elements with the correct classes', () => {
    expect(wrapper.find('h2.current-name').length).toEqual(1);
    expect(wrapper.find('h2.feedback').length).toEqual(1);
  });

  it("should render a div element with a class of 'main'", () => {
    expect(wrapper.find('div.main').length).toEqual(1);
  });
});
