import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import { AppContext } from '../App/AppContext';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('does not display contact link when user is logged out', () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ user: null, logOut: () => {} }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('footer a')).toHaveLength(0);
  });

  it('displays contact link when user is logged in', () => {
    const wrapper = shallow(
      <AppContext.Provider value={{ user: { email: 'user@example.com' }, logOut: () => {} }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('footer a')).toHaveLength(1);
    expect(wrapper.find('footer a').text()).toContain('Contact us');
  });
});
