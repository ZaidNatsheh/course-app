import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect, Switch } from "react-router-dom";
import { list, trophyOutline } from "ionicons/icons";

import Courses from "./Courses";
import AllGoals from "./AllGoals";
import CourseGoals from "./CourseGoals";

const CourseTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
        <Redirect path="/courses" to="/courses/lists" exact />
        <Route path="/courses/lists" exact>
          <Courses />
        </Route>
        <Route path="/courses/all-goals" exact>
          <AllGoals />
        </Route>
        <Route path="/courses/:courseId">
          <CourseGoals />
        </Route>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="all-goals" href="/courses/all-goals">
          <IonIcon icon={list} />
          <IonLabel>All Goals</IonLabel>
        </IonTabButton>
        <IonTabButton tab="courses" href="/courses/lists">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Courses</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default CourseTabs;

/* import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabButton,
  IonTabBar,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { Route, Redirect, Switch } from "react-router-dom";
import { list, trophyOutline } from "ionicons/icons";

import Courses from "./Courses";
import AllGoals from "./AllGoals";
import CourseGoals from "./CourseGoals";

const CourseTabs: React.FC = () => {
  return (
    // <IonPage>
      <IonTabs>
        {/* <Switch> 
        <IonRouterOutlet>
          <Redirect path="/courses" to="/courses/all-goals" exact={true} />
          <Route path="/courses/list" exact component={Courses}>
            {/* <Courses /> 
          </Route>
          <Route path="/courses/all-goals" exact component={AllGoals}>
            {/* <AllGoals /> 
          </Route>
          <Route path="/courses/:courseId" component={CourseGoals}>
            {/* <CourseGoals /> 
          </Route>
        </IonRouterOutlet>
        {/* </Switch> 
        <IonTabBar slot="bottom">
          <IonTabButton tab="all-goals" href="/courses/all-goals">
            <IonIcon icon={list} />
            <IonLabel>All Goals</IonLabel>
          </IonTabButton>
          <IonTabButton tab="courses" href="/courses/list">
            <IonIcon icon={trophyOutline} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    // </IonPage>
  );
};

export default CourseTabs;
 */
