import * as React from 'react';
import { Game } from '../Components/Game';
import { Person } from '../Components/Person';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { mockPeople } from '../test-helpers/MockData';

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();

describe('Game Component', () => {
  const wrapper = mount(
    <Game reverseMode={false} checkAnswer={mockFn} people={mockPeople} />
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

    expect(personProps[0]).toEqual('reverseMode');
    expect(personProps[1]).toEqual('name');
    expect(personProps[2]).toEqual('headshot');
    expect(personProps[3]).toEqual('checkAnswer');
  });

  it('should pass props with the correct values to Person components', () => {
    const personProps = wrapper.children().props().children[0].props;

    expect(personProps.reverseMode).toEqual(false);
    expect(personProps.name).toEqual(mockPeople[0].firstName);
    expect(personProps.headshot.url);
    expect(personProps.checkAnswer).toEqual(mockFn);
  });
});
