import React from 'react'
import { configure, shallow } from 'enzyme';

import { BurgerBuilder } from './BurgerBuilder'
import { BuildControls } from '../../components/Burger/BuildControls/BuildControls'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() });

describe('BurgerBuilder', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })

    it('it should render ingredients', () => {
        wrapper.setProps({ings: null})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})