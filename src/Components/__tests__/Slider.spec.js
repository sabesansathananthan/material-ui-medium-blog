import React from "react";
import { shallow } from "enzyme";
import Slider from "../Slider";
import toJson from "enzyme-to-json";
import axios from "axios";

describe("Slider component", () => {
  let wrapper;
  let getSpy;
  beforeAll(() => {
    getSpy = jest.spyOn(axios, "get");
    wrapper = shallow(<Slider />);
  });

  it("should render without errors", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly - snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should fetch a list of posts", () => {
    expect(getSpy).toBeCalled();
  });
});
