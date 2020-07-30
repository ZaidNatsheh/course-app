import React, { useContext } from "react";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonList,
  IonLabel,
  IonToggle,
  IonSpinner,
} from "@ionic/react";
import CourseContext from "../data/courses-context";
import { useSubscription, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_COURSES = gql`
query myQuery {
    courses {
      id
      title
      enrolled
      isIncluded
    }
  }
`;
const Filter: React.FC = () => {
  const coursesCtx = useContext(CourseContext);

  const { data, error, loading } = useQuery(GET_COURSES);
 

  const courseFilterChangeHandler = (event: CustomEvent) => {
    coursesCtx.changeCourseFilter(event.detail.value, event.detail.checked);
    console.log(event);
  };
  if (loading) {
    return (
      <div className="spin">
        <IonSpinner className="ion-spinner" color="medium" />
      </div>
    );
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {data.courses.map((course: any) => (
            <IonItem key={course.id}>
              <IonLabel>{course.title}</IonLabel>
              {console.log(course.isIncluded)}
              {console.log(course.title)}
              <IonToggle
              checked={course.isIncluded}
                value={course.id}
                onIonChange={courseFilterChangeHandler}
              ></IonToggle>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Filter;
