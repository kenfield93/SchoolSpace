/**
 * Created by kyle on 9/24/17.
 */
//TODO mod initstate fields so there is a way to tell if it's loaded from DB or now
// maybe have element 0 of list or index 'default' of dict
export default {
    userCourses: [],
    threads: null,
    posts: {'-1': []},
    numAjaxCallsInProgress: 0
};
