/**
 * Created by kyle on 9/20/17.
 */
import delay from './delay';
// classes is merger of class table and schoolsession table. SInce just testing assume they're the class for curr student
// real API would obvoiusly have to find related classes to student, then the schoolsession of those classes and combine
const classes =
[
    { id: 1,
      name: 'db-180',
      classSession: 'Winter 15',
      starttime: '2015-01-04'
    },
    { id: 2,
        name: 'alg-102',
        classSession: 'Spring 15',
        starttime: '2015-04-04'
    },
    { id: 33,
        name: 'soc-90',
        classSession: 'Winter 13',
        starttime: '2013-01-05'
    },
    { id: 23,
        name: 'bio-3',
        classSession: 'Spring 16',
        starttime: '2016-04-04'
    },
    { id: 123,
        name: 'under water basket weaving',
        classSession: 'Fall 13',
        starttime: '2013-09-17'
    }
]  ;

const threads =
[
    { id: 1,
      title: "How do i configure the db?",
      classId: 1,
      isStickied: true,
      categories: ['pa1', 'setup']
    },
    {
      id: 2,
      title: " how are babies made?",
      classId: 23,
        isStickied: true,
        categories: ['sexy time']
    },
    {
      id: 3,
      title: "SQL vs NOSQL???",
      classId: 1,
        isStickied: false,
        categories: ['dbTypes', 'Lesson', 'NoSQL']
    },
    {
      id: 4,
      title: "Why am i so oppressed?",
      classId: 23,
      isStickied: false,
      categories: ['soc']
    },
    {
      id: 5,
      title: 'what is a basketweave?',
      classId: 123,
      isStickied: false,
      categories: []
    },
    {
      id: 6,
      title: "why ALL men are sexists. (no it isn't sexist for me to generalize all men, sheesh you dumb boy)",
      classId: 69,
      isStickied: true,
      categories:['kill all me', 'white = evil', 'boop']
    }
];
let nextThreadId= 7;

const posts = [
    {
        id:1,
        threadId: 1,
        text: "hey whats up, this is some data cause im really boring and stuff. so we visited one of heathers ",
        date: new Date()
    },
    {
        id:2,
        threadId: 1,
        text: "you are such a simpleton, plz end ur life",
        date: new Date()
    },
    {
        id:4,
        threadId: 1,
        text: "these people are crazy, who wants that. oh lord no ",
        date: new Date()
    },
    {
        id:1,
        threadId: 1,
        text: "we're going to put a chess board up here, im so excited about this ",
        date: new Date()
    },
    {
        id:4,
        threadId: 5,
        text: "no way jose, gtfo out of here neehowma. so we visited one of heathers ",
        date: new Date()
    },
    {
        id:1,
        threadId: 6,
        text: "wtf did you say to me you little punk, ill let you know i graduated at the top of my class ",
        date: new Date()
    },
    {
        id:1,
        threadId: 1,
        text: "I feel like people get worked up over stuff for no reason, not everything has to be concrete, you can choose to or not to be offended. Just think, is it affecting you, no? Don't worry about it.﻿",
        date: new Date()
    },
    {
        id:1,
        threadId: 4,
        text: "what you dumb, dumb ",
        date: new Date()
    },
    {
        id:1,
        threadId: 1,
        text: "oh god, oh th.. that is not good",
        date: new Date()
    },
    {
        id:33,
        threadId: 6,
        text: "fuck you teacher scum ",
        date: new Date()
    }


];

    //not sure we need to worry about auth for mockAPI
class classAPI{
    //backend server would get userId from OAuth or session or something. need to verify anyway
    static getUserClasses(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], classes));
            }, delay);
        });
    }

    static getThreadsForClass(classId){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
               const classThreads = threads.filter((thread) => thread.classId == classId );
               resolve( classThreads );
            }, delay);
        });
    }

    static addThreadToClass(threadObj, classId){
        let thread = Object.assign({}, threadObj);
        const minTitleLength = 4, maxTitleLength = 50;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                thread = {id: nextThreadId++};
                // would probably need auth if user is teacher
                thread.isStickied = !!thread.isStickied;
                if(!thread.title || thread.title.trim().length < minTitleLength ){
                    reject(` Title must have at least ${minTitleLength} letters`);
                }
                thread.title = thread.title.trim();
                if(thread.title > maxTitleLength){
                    reject(` Title can't be larger than ${maxTitleLength} letters`);
                }

                //db would tell if classId is valid. would be attatched by react compoent code but can still be modded by attacker
                if(isNaN(classId) || classId < 0)
                    reject('Invalid Class');
                thread.classId = classId;

                (!thread.categories) ? thread.categories = [] : null ;

                threads.push(thread);
                resolve(thread);
            }, delay);
        });
    }

    // for this mock we'll just allow deleting, not editing
    static deleteThread(threadId, classId){
        return new Promise((resolve, reject) => {
           setTimeout( () => {
               let threadIndex = threads.findIndex( thread => thread.id === threadId && thread.classId === classId );
               if( threadIndex < 0)
                    reject("Error when deleting thread");
               threads.splice(threadIndex, 1);
               resolve(true);
           }, delay);
        });
    }

    static getPosts(threadId){
        return new Promise((resolve, reject) => {
           setTimeout(() => {
                resolve(posts.filter(post => post.threadId == threadId));
           },delay);
        });
    }

}

export default classAPI;