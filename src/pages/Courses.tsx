import React, { useState, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  isPlatform,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import AddCourseModal from "../component/AddCourseModal";
import { addOutline } from "ionicons/icons";
import CourseItem from "../component/CourseItem";
import { useSubscription } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import CourseContext from "../data/courses-context";



export const COURSE_DATA = [
  {
    id: "c1",
    title: "Ionic React ",
    enrolled: new Date("09/10/2010"),
    goals: [
      { id: "c1g1", text: "finish the course" },
      { id: "c1g2", text: "learn alot!" },
    ],
  },
  {
    id: "c2",
    title: "Java Script",
    enrolled: new Date("03/20/2019"),
    goals: [
      { id: "c2g1", text: "work hard" },
      { id: "c2g2", text: "write code!" },
    ],
  },
  {
    id: "c3",
    title: "React",
    enrolled: new Date("05/16/2022"),
    goals: [
      { id: "c3g1", text: "finish the course" },
      { id: "c3g2", text: "learn alot!" },
    ],
  },
];
const GET_COURSES=gql`
subscription MySubscription {
  courses {
    id
    title
    enrolled
  }
}
`

const Courses: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
 const courseCtx =  useContext(CourseContext)
  const startAddCourseHandler = () => {
    setIsAdding(true);
  };

   const {data,error,loading} = useSubscription(GET_COURSES);
  if(loading){
    return <div>loading...</div>
}
if(error){
    return <div>Error...</div>
}


  const cancelAddCourseHandler = () => {
    setIsAdding(false);
  };
  const courseAddHandler = (title: string, date: Date) => {
    courseCtx.addCourse(title,date);
    setIsAdding(false);
  };
  return (
    <React.Fragment>
      {/* <EditModal show={isEditing} onCancel={cancelEditGoalHandler} editedGoal={selectedGoal} /> */}
      <AddCourseModal
        show={isAdding}
        onCancel={cancelAddCourseHandler}
        onSave={courseAddHandler}
      />

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Courses</IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddCourseHandler}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            {data.courses.map((course : any) => (
              <IonRow key={course.id}>
                <IonCol size-md="4" offset-md="4">
                  <CourseItem
                    title={course.title}
                    id={course.id}
                    enrolmentDate={course.enrolled}
                  />
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          {isPlatform("android") && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddCourseHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default Courses;
