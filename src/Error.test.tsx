import * as React from 'react';
import { Error } from './Error';
import * as Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Error component', () => {
  const wrapper = shallow(<Error />);
  it('should render a div element with a class of "error"', () => {
    expect(wrapper.find('div.error').length).toEqual(1);
  });

  it('should render an h1 element with a class of "error-text"', () => {
    expect(wrapper.find('h1.error-text').length).toEqual(1);
  });

  it('should render a button element with a class of "error-button"', () => {
    expect(wrapper.find('button.error-button').length).toEqual(1);
  });
});
