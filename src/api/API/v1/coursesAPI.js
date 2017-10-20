/**
 * Created by kyle on 10/19/17.
 */
import courseModel from '../../../../model/course';

export function getCourses( responseStream, userId){
    courseModel.getCourses(userId)
        .then(result => {
            responseStream.status(200).send(result);
        }).catch(err => {  responseStream.status(500).send([]);});
}
export function getSchoolSessions( responseStream, orgId){
    courseModel.loadSchoolSessions(orgId)
        .then( result => {
            responseStream.status(200).send(result);
        }).catch(err => {
        responseStream.status(500).send(err);
    });
}

export function createCourse(responseStream, orgId, usrId, title, ssId){
    if(isNaN(orgId) || orgId < 0 ) {
        return responseStream.status(422).send("Invalid  oganization");
    }
    if(isNaN(usrId) || usrId < 0) {
        return responseStream.status(422).send("Invalid teacher ");
    }
    if(!title|| title.trim().length < 3 ) {
        return responseStream.status(422).send("Course needs name with at least 3 characters");
    }
    if( isNaN(ssId) || ssId < 0) {
        return responseStream.status(422).send("Invalid  school session");
    }
    courseModel.createCourse(title, usrId, ssId, orgId)
        .then( classid => {
            const course = {classid};
            course.classname = title;
            course.ssid = ssId;
            responseStream.status(200).send(course);
        }).catch(err => {
        responseStream.status(500).send(err);
    });
}

