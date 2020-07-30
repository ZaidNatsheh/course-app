import React from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonItem,IonSpinner
} from "@ionic/react";
import { COURSE_DATA } from "./Courses";
import { useSubscription,useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

 const Filter_Goals = gql`
 subscription mysub {
  goals(where: {course: {isIncluded: {_eq: true}}}) {
    text
    course_id
    id
    course {
      isIncluded
    }
  }
}
`; 
const AllGoals: any = () => {

  const { data, error, loading } = useSubscription(Filter_Goals);  if(loading){
   return  <div className="spin">
       <IonSpinner  className="ion-spinner" color="medium"   />
    </div>
   
   
}

  if (error) return `Error! ${error}`;

  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.goals.map( (goal : any)=> (<IonItem key={goal.id}>{goal.text}</IonItem>))}
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;
