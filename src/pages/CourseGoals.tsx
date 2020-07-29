import React, { useState, useRef, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon,
  IonFabButton,
  IonFab,
  isPlatform,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { add } from "ionicons/icons";

import { useParams } from "react-router-dom";

import { COURSE_DATA } from "./Courses";
import EditModal from "../component/EditModal";
import EditableGoalItem from "../component/EditableGoalItem";
// import CourseContext from "../data/courses-context";
import { useSubscription, useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import CourseContext from "../data/courses-context";

const GET_COURSE_GOALS = gql`
  query coursegoal($id: uuid!) {
    goals(where: { course_id: { _eq: $id } }) {
      id
      text
      course_id
      course {
        id
        title
      }
    }
  }
`;


const CourseGoals: React.FC = () => {
  const courseCtx = useContext(CourseContext);
  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  console.log("selected course params");
  console.log(selectedCourseId);
  

  const { loading, error, data } = useQuery(GET_COURSE_GOALS, {
    variables: { id: selectedCourseId },
  });

  //
  const addGoalHandler = (text : string)=>{
    courseCtx.addGoal(selectedCourseId,text);
    setIsEditing(false);
  }
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>();
  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);

  const startDeleteGoalHandler = () => {
    setStartedDeleting(true);
  };

  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    setToastMessage("Goal Delteted");
  };
  const startEditGoalHandler = (goalId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    slidingOptionRef.current?.closeOpened();
    const goal = data?.goals.find((g: any) => g.id === goalId);
    if (!goal) {
      return;
    }
    setIsEditing(true);
    setSelectedGoal(goal);
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal(null);
  };
  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  };
  // const {data,error,loading} = useQuery(GET_COURSES);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return `Error! ${error}`;
  console.log(data);
  const k = data.goals
    .map((j: any) => j.course)
    .map((f: any) => f.title)
    .find((e:any) => true);
  const selectedCourse = k;
  console.log(selectedCourse);
  
  

  return (
    <React.Fragment>
      <EditModal
        show={isEditing}
        onCancel={cancelEditGoalHandler}
        editedGoal={selectedGoal}
        onSave={addGoalHandler}
      />
      <IonToast
        isOpen={!!toastMessage}
        duration={2000}
        message={toastMessage}
        onDidDismiss={() => {
          setToastMessage("");
        }}
      />
      <IonAlert
        isOpen={startedDeleting}
        header="Are You Sure ?"
        message="Do you want to delete a goal?"
        buttons={[
          {
            text: "No",
            role: "cancel",
            handler: () => {
              setStartedDeleting(false);
            },
          },
          {
            text: "Yes",
            handler: deleteGoalHandler,
          },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse : "No Course Found"}
            </IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddGoalHandler}>
                  <IonIcon slot="icon-only" icon={add} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* {selectedCourse && ( */}
          <IonList>
            {data.goals.map((goal: any) => (
              <EditableGoalItem
                key={goal.id}
                slidingRef={slidingOptionRef}
                text={goal.text}
                onStartDelete={startDeleteGoalHandler}
                onStartEdit={startEditGoalHandler.bind(null, goal.id)}
              />
            ))}
          </IonList>
          {/* )} */}
          {isPlatform("android") && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddGoalHandler}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default CourseGoals;
