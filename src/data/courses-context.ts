import React from "react";

export interface Goal {
  id: string;
  text: string;
}
export interface Course {
  id: string;
  title: String;
  enrolment: Date;
  goals: Goal[];
}
interface Context {
  courses: Course[];
  addCourse: (courseTitle : string,courseDate : Date) => void;
  addGoal: () => void;
  deleteGoal: () => void;
  updateGoal: () => void;
}

const CourseContext = React.createContext<Context>({
  courses: [],
  addCourse: () => {},
  addGoal: () => {},
  deleteGoal: () => {},
  updateGoal: () => {},
});

export default CourseContext;
