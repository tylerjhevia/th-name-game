import * as React from 'react';
import { Person } from '../Components/Person';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { mockPerson } from '../test-helpers/MockData';

Enzyme.configure({ adapter: new Adapter() });

describe('Person component', () => {
  const mockFn = jest.fn();
  const wrapper = mount(
    <Person
      name={mockPerson.firstName}
      headshot={mockPerson.headshot.url}
      checkAnswer={mockFn}
      reverseMode={false}
    />
  );

  it('should receive the correct props', () => {
    expect(wrapper.props().name).toEqual(mockPerson.firstName);
    expect(wrapper.props().checkAnswer).toEqual(mockFn);
    expect(wrapper.props().headshot).toEqual(mockPerson.headshot.url);
    expect(wrapper.props().reverseMode).toEqual(false);
  });

  it('should render a div element with a class of "person"', () => {
    expect(wrapper.find('div.person').length).toEqual(1);
  });

  it('should render an img element with a class of "headshot" when reverseMode is false', () => {
    expect(wrapper.find('img.headshot').length).toEqual(1);
  });

  it('should render an h2 element with a class of "person-name" when reverseMode is true', () => {
    const reverseWrapper = mount(
      <Person
        name={mockPerson.firstName}
        headshot={mockPerson.headshot.url}
        checkAnswer={mockFn}
        reverseMode={true}
      />
    );
    expect(reverseWrapper.props().reverseMode).toEqual(true);
    expect(reverseWrapper.find('h2.person-name').length).toEqual(1);
  });

  it('should call the checkAnswer function when clicked', () => {
    const person = wrapper.find('div.person');

    expect(wrapper.props().checkAnswer).toHaveBeenCalledTimes(0);

    person.simulate('click');

    expect(wrapper.props().checkAnswer).toHaveBeenCalledTimes(1);
  });
});
