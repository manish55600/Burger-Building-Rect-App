import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() });

describe('NavigationItems', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should redner two NavigationItems elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should redner three NavigationItems elements if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should check having logout button', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(<NavigationItem link="/logout">LogOut</NavigationItem>)).toEqual(true)
    })
})