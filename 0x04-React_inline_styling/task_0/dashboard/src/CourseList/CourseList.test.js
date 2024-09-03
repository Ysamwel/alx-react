<<<<<<< HEAD
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
    wrapper.find("thead").forEach((node) => {
      expect(node.equals(<CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />));
    });

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find("tbody").childAt(0).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>ES6</td><td>60</td></tr>');
    expect(wrapper.find("tbody").childAt(1).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>Webpack</td><td>20</td></tr>');
    expect(wrapper.find("tbody").childAt(2).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>React</td><td>40</td></tr>');
  });

  it("renders correctely when passed a list of courses", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find("tbody").childAt(0).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>ES6</td><td>60</td></tr>');
    expect(wrapper.find("tbody").childAt(1).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>Webpack</td><td>20</td></tr>');
    expect(wrapper.find("tbody").childAt(2).html()).toEqual('<tr style="background-color:#f5f5f5ab"><td>React</td><td>40</td></tr>');
  });
});
=======
import React from "react";
import { shallow, mount } from "enzyme";
import CourseList from "./CourseList";

describe("Testing <CourseList />", () => {
  it("Renders CourseList component without crashing", () => {
    let wrapper = shallow(<CourseList />);
    expect(wrapper.exists());
  });

  it("CourseList renders the 3 different rows", () => {
    let wrapper = shallow(<CourseList />);
    expect(wrapper.find("CourseListRow")).toHaveLength(3);
  });

  it("verify that CourseList renders correctly if you pass an empty array or if you don’t pass the listCourses property", () => {
    const listCourses = [];
    let wrapper = shallow(<CourseList />);
    expect(wrapper.find('CourseListRow').last().props().textFirstCell).toEqual("No course available yet");
    wrapper = shallow(<CourseList listCourses={[]}/>);
    expect(wrapper.find('CourseListRow').last().props().textFirstCell).toEqual("No course available yet");
  });

});

describe("Testing <CourseList listCourses={listCourses}/>", () => {
  let wrapper;

  beforeEach(() => {
    const listCourses = [
      {id: 1, name: 'ES6', credit: 60},
      {id: 2, name: 'Webpack', credit: 20},
      {id: 3, name: 'React', credit: 40}
    ];
    wrapper = shallow(<CourseList listCourses={listCourses}/>);
  });

  it("verify that when you pass a list of courses, the component renders it correctly", () => {
    expect(wrapper.findWhere((node)=>{return node.props().textFirstCell === "ES6"})).toHaveLength(1);
    expect(wrapper.findWhere((node)=>{return node.props().textFirstCell === "Webpack"})).toHaveLength(1);
    expect(wrapper.findWhere((node)=>{return node.props().textFirstCell === "React"})).toHaveLength(1);
  });
});
>>>>>>> origin/main
