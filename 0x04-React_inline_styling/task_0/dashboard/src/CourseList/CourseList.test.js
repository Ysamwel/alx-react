import React from "react";
import CourseList from "./CourseList";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";

const listCourses = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];

describe("CourseList component tests", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders 5 different rows", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("thead").children()).toHaveLength(2);
    expect(wrapper.find("thead").childAt(0).find("tr").prop("style")).toEqual({ backgroundColor: "#deb5b545" });
    expect(wrapper.find("thead").childAt(1).find("tr").prop("style")).toEqual({ backgroundColor: "#deb5b545" });

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find("tbody").childAt(0).find("tr").prop("style")).toEqual({ backgroundColor: "#f5f5f5ab" });
    expect(wrapper.find("tbody").childAt(1).find("tr").prop("style")).toEqual({ backgroundColor: "#f5f5f5ab" });
    expect(wrapper.find("tbody").childAt(2).find("tr").prop("style")).toEqual({ backgroundColor: "#f5f5f5ab" });

    expect(wrapper.find("tbody").childAt(0).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>ES6</td><td>60</td></tr>');
    expect(wrapper.find("tbody").childAt(1).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>Webpack</td><td>20</td></tr>');
    expect(wrapper.find("tbody").childAt(2).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>React</td><td>40</td></tr>');
  });

  it("renders correctly when passed a list of courses", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find("tbody").childAt(0).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>ES6</td><td>60</td></tr>');
    expect(wrapper.find("tbody").childAt(1).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>Webpack</td><td>20</td></tr>');
    expect(wrapper.find("tbody").childAt(2).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>React</td><td>40</td></tr>');
  });
});