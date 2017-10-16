import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { PersonContainer } from './PersonContainer';
import { Person } from './Person';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { mockPeople } from './MockData';

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();

describe('PersonContainer Component', () => {
  const wrapper = mount(
    <PersonContainer
      reverseMode={false}
      checkAnswer={mockFn}
      people={mockPeople}
    />
  );
  it('should receive the correct props', () => {
    expect(wrapper.props().reverseMode).toEqual(false);
    expect(wrapper.props().checkAnswer).toEqual(mockFn);
    expect(wrapper.props().people).toEqual(mockPeople);
  });

  it('should render five Person components', () => {
    expect(wrapper.find(Person).length).toEqual(5);
  });

  it('should pass the correct four props to Person components', () => {
    const personProps: Array<String> = Object.keys(
      wrapper.children().props().children[0].props
    );

    expect(personProps.length).toEqual(4);

    // expect(personProps.includes('reverseMode')).toEqual(true);
    // expect(personProps.includes('headshot')).toEqual(true);
    // expect(personProps.includes('name')).toEqual(true);
    // expect(personProps.includes('checkAnswer')).toEqual(true);
  });

  it('should pass props with the correct values to Person components', () => {
    expect(wrapper.children().props().children[0].props.reverseMode).toEqual(
      false
    );
    expect(wrapper.children().props().children[0].props.name).toEqual(
      mockPeople[0].firstName
    );
    expect(wrapper.children().props().children[0].props.headshot).toEqual(
      mockPeople[0].headshot.url
    );
    expect(wrapper.children().props().children[0].props.checkAnswer).toEqual(
      mockFn
    );
  });
});
