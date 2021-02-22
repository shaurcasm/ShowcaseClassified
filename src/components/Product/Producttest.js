import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';  // Smart Components
import products from '../../constants/products.js';

// Component to be tested
import Container from './index.js';

const mockStore = configureStore();
const initialState = {
    cartList: {
        cart: [...products]
    }
}

describe('Container <MainSection />', () => {
    let store;

    describe('render()', () => {

        beforeEach(() => {
            store = mockStore(initialState);
        })

        test('Renders the component', () => {

            const wrapper = shallow(<Container store={store} />);
            const component = wrapper.dive();

            expect(toJson(component)).toMatchSnapshot();
        })
    })
})