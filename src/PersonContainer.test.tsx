import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { PersonContainer } from './PersonContainer';
import { Person } from './Person';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

const mockFn = jest.fn();
const mockPeople = [
  {
    id: '4NCJTL13UkK0qEIAAcg4IQ',
    type: 'people',
    slug: 'joel-garrett',
    jobTitle: 'Senior Software Engineer',
    firstName: 'Joel',
    lastName: 'Garrett',
    headshot: {
      type: 'image',
      mimeType: 'image/jpeg',
      id: '4Mv2CONANym46UwuuCIgK',
      url:
        '//images.contentful.com/3cttzl4i3k1h/4Mv2CONANym46UwuuCIgK/cbeb43c93a843a43c07b1de9954795e2/headshot_joel_garrett.jpg',
      alt: 'headshot joel garrett',
      height: 340,
      width: 340
    },
    socialLinks: []
  },
  {
    id: '1X2lomt8iIYImCQysey6Eq',
    type: 'people',
    slug: 'jeffery-ward',
    jobTitle: 'Principal Software Engineer',
    firstName: 'Jeff',
    lastName: 'Ward',
    headshot: {
      type: 'image',
      mimeType: 'image/jpeg',
      id: '3BdQSQcuMgcs00qYoOuYSY',
      url:
        '//images.contentful.com/3cttzl4i3k1h/3BdQSQcuMgcs00qYoOuYSY/f0858540116928dc5fd0b2e84def8e19/headshot_jeff_ward.jpg',
      alt: 'headshot jeff ward',
      height: 340,
      width: 340
    },
    socialLinks: []
  },
  {
    id: '56zuFgdeoMqAOuIKe0M4AU',
    type: 'people',
    slug: 'ashley-joost',
    jobTitle: 'Senior Software Engineer',
    firstName: 'Ashley',
    lastName: 'Joost',
    headshot: {
      type: 'image',
      mimeType: 'image/jpeg',
      id: 'ezBlWGiV9ucqAsiOo0Iy2',
      url:
        '//images.contentful.com/3cttzl4i3k1h/ezBlWGiV9ucqAsiOo0Iy2/01a8ed75dd4a508b45defea73fef6e80/headshot_ashley_joost.jpg',
      alt: 'headshot ashley joost',
      height: 340,
      width: 340
    },
    socialLinks: []
  },
  {
    id: '29XgxedqmAO86mGeImqwEK',
    type: 'people',
    slug: 'ben-frye',
    jobTitle: 'Software Engineer',
    firstName: 'Ben',
    lastName: 'Frye',
    headshot: {
      type: 'image',
      mimeType: 'image/jpeg',
      id: '3SQLIq0Y36oYyaiwCSwOY8',
      url:
        '//images.contentful.com/3cttzl4i3k1h/3SQLIq0Y36oYyaiwCSwOY8/a65ae6620c8041b2773c1915156261d7/headshot_ben_frye.jpg',
      alt: 'headshot ben frye',
      height: 340,
      width: 340
    },
    socialLinks: []
  },
  {
    id: '2dMXmpIHPicQW6SW60qeKs',
    type: 'people',
    slug: 'christy-phillips',
    jobTitle: 'Chief Talent Officer',
    firstName: 'Christy',
    lastName: 'Phillips',
    headshot: {
      type: 'image',
      mimeType: 'image/jpeg',
      id: '64IBagkE0gga82G2W6cWsm',
      url:
        '//images.contentful.com/3cttzl4i3k1h/64IBagkE0gga82G2W6cWsm/e3e89bed4184c6b36c34fe852b6edbf6/IMG_1035.jpg',
      alt: 'Christy Phillips, Chief Talent Officer at WillowTree, Inc.',
      height: 692,
      width: 706
    },
    socialLinks: [
      {
        type: 'linkedin',
        callToAction: 'Follow Christy Phillips on LinkedIn',
        url: 'https://www.linkedin.com/in/christyphillips1/'
      }
    ]
  }
];

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
