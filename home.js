const LoginFailMsg = (props) => {
    if(!props.warn) return null;
    const msg = (props.warn.loginTimeout) ?
        "Too many failed attempts, try again later" :
        "Incorrect username And/Or password";

    return (
        <div className='warning'>
            {msg}
        </div>
    );
}
class Login extends React.Component{
    state = {failedLogin:null}
    onLogin = (event) =>{
        event.preventDefault();
        let serverResponse = {status: 'fail'};

        if(serverResponse.status == 200){
            //  route to new page, probably just have server do it
        }

        else if(serverResponse.status === 'failTimeout')
            this.setState({failedLogin:{loginTimeout: true}});
        else //else simple fail message
            this.setState({failedLogin:{loginFailure: true}});
    }

    render(){
        return(
            <form onSubmit={this.onLogin} className='row'>
                <input type='text'
                       placeholder="User Name" required/>
                <br />
                <input type='password'
                       placeholder="Password" required/>
                <button type='submit'>Login
                </button>
                <LoginFailMsg warn={this.state.failedLogin}/>

            </form>
        );
    }
}

class Signup extends React.Component{

    onSignup = (event) =>{
        event.preventDefault();
        axios.get(`https://api.github.com/users/${"zpao"}`)
            .then(
                (resp) => {
                    // each mod win.loc.href to the new page
                    // or submit a form to get new page
                    // or use ajax to load new page like a new req to serer(possible issues) w/ how ajax works
                },
                (err) => {

                }
            );
    }

    render(){

        return(
            <form onSubmit={this.onSignup} className='col'>

                <input id='email' type='email' placeholder='email:' />
                <input id='name' type='text' placeholder = 'name:' />
                <br/>
                <input id='pwd' type='password' placeholder='password:' />
                <input id='pwdVerify' type='password' placeholder='password:' />
                <br />
                <button type='submit'>Dab on the haters </button>
            </form>
        );
    }
}

//  TODO, get max width of biggest button text, and programatically set height/width //based off that

const ClassList = (props) =>{
    const clickClass = (event) =>{

        event.preventDefault();
    }
    return(
        <form onSubmit={clickClass}>
            <ul  className='col' >
                {props.classes.map((classObj) => <button style={{width: 350, height:100}} className='fa-button' type='submit' key= {classObj.className} > <ClassComp {... classObj } /></button>)}

            </ul>
        </form>
    )
}
const ClassComp = (props) =>{

    return(<div> <p> {props.name} </p> <p> {props.classSession} </p> </div>);
}

const Footer = (props) => {
    return (
        <div><hr style={{}}/>
            <p> School Space: powered by Node.js, Psql, And React.js <br/> copyright
                don't @ me bro &lt;current year&gt;
            </p>
        </div>
    );
}
const SignOutButton = (props) => {

}
const Header = (props) => {

    return (
        <div style={{ height: '50px', width: '100%', borderStyle: "solid", borderColor: "#ff0000 "}} >
            <SignOutButton/>
            This is the dumbest thing ive ever seen. Peace out
        </div>
    );
}
const About = (props) => {
    return(
        <div>
            <p> <b>School Space</b> is a website that allows teachers and students
                to interact outside the classroom. Students can ask questions and
                engage in conversation with each other. Teachers can also post helpful 								links, notes, as well as a calander for upcoming lessons and due dates
            </p>
            <Footer />
        </div>
    );
}
class Home extends React.Component{

    render(){
        return(
            <div className='fa'>
                <title> School Space </title>
                <Header />
                <h1> School Space </h1>
                <h4> Your classroom, outside of school </h4>
                <Login />
                <br/><br/><br/>
                <ClassList classes={[{name:'db', classSession: 'spring 2015'}, {name:'sex ed', classSession: 'fall 2016'}]} />
                <br/><br/><br/>
                <Signup />
                <br/><br/><br/><br/><br/>
                <About />
            </div>
        )
    }
}

ReactDOM.render(<Home />, mountNode);