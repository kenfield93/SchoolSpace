 /**
 * Created by kyle on 9/18/17.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppTemplate from './components/AppTemplate';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
//import CoursesPage from './components/course/.CoursesPage';
import ClassDirectory from './components/users/students/ClassDirectory';
import CoursePage from './components/course/CoursePage';

 /*Always load AppTemplate since its on / path, then the specific comonent
   will get passed to it as it's children, depending on what path we're on
 */
export default (
    <Route path="/" component={AppTemplate}>
        <IndexRoute component={HomePage}/>
        <Route path="about" component={AboutPage} />
        <Route path="course/:id" component={CoursePage} />
        <Route path="classDirectory" component={ClassDirectory} />
    </Route>
);
