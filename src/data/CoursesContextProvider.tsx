import React, { useState } from "react";
import CoursesContext, { Course } from "./courses-context";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_COURSE = gql`
  mutation MyMutation($title: String!, $date: date!) {
    insert_courses(objects: { title: $title, enrolled: $date }) {
      affected_rows
    }
  }
`;

const ADD_GOAL = gql`
  mutation addGoal($id: uuid!, $text: String!) {
    insert_goals(objects: {course_id: $id ,text: $text}) {
      affected_rows
    }
  }
`;
const CoursesContextProvider: React.FC = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [AddCourse] = useMutation(ADD_COURSE, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("add  completed!"),
  });

  
  
  const addCourse = (title: string, date: Date) => {
    AddCourse({ variables: { title, date } });
  };
  const [AddingGoal] = useMutation(ADD_GOAL, {
    onError: () => (error: any) => console.error(error),
    onCompleted: () => console.log("add goal   completed!"),
  });
  console.log("here we r ",AddingGoal);

  const addGoal = (courseId: string, text: string) => {
    AddingGoal({ variables: { courseId, text } });
  };
  const deleteGoal = () => {};
  const updateGoal = () => {};

  return (
    <CoursesContext.Provider
      value={{ courses, addCourse, addGoal, deleteGoal, updateGoal }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesContextProvider;
