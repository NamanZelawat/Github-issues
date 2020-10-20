import React from 'react';
import { shallow } from "enzyme";
import App from './App';
import Search from "./search"
import Loader from "./loader"

it("<App />",function(){
	const wrapper = shallow(<App/>);
	const loading = wrapper.state().loading;
	const data = wrapper.state().data;
	expect(loading).toBe(2);
	expect(data.length).toBe(0);
});

it("<Search />", function(){
	const wrapper = shallow(<Search/>);
	const data = wrapper.state().data;
	expect(data.length).toBe(0);
});

