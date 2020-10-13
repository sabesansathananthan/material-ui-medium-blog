import React from "react";
import { shallow } from "enzyme";
import PostCard from "../PostCard";
import toJson from "enzyme-to-json";

describe("PostCard component", () => {
  let wrapper;
  let props;
  beforeAll(() => {
    Object.defineProperty(global.Element.prototype, "innerText", {
      get() {
        return this.textContent;
      },
    });
    props = {
      author: "John Doe",
      avatar: "https://picsum.photos/200/300",
      categories: [("react", "jest")],
      content: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                congue, ipsum quis dictum luctus, turpis diam scelerisque lacus, id
                elementum turpis dui id metus.
              `,
      description: `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                congue, ipsum quis dictum luctus, turpis diam scelerisque lacus, id
                elementum turpis dui id metus.
              `,
      enclosure: {},
      link: "https://picsum.photos/200/300",
      profilelink: "https://picsum.photos/200/300",
      pubDate: "2020-10-05 20:10:01",
      thumbnail: "https://picsum.photos/200/300",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean congue, ipsum quis dictum luctus, turpis diam scelerisque lacus, id elementum turpis dui id metus.",
    };

    wrapper = shallow(<PostCard {...props} />);
  });

  it("should render without errors", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly - snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
