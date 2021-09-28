import React from "react";
import { withRouter } from 'react-router-dom';
import { getUser } from "../functions/firebase-auth";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: ""};
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        getUser((user) => {
            if(user == null) {
                window.location.href = '/';
            } else {
                this.setState({ email: user.email });
            }
        });
    }

    handleSubmit() {
        // var username = document.forms[0].username.value;
        console.log("submit");
        if (this.state.email != "") {
            fetch('/api/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email
                })
            }).then(res => { res.json()
            .then(data => {
                this.props.history.push({pathname: '/host', state:{name: data.name}});
            })});
            
        }
    } 

    render() {
      return (
        <div class="top-wrapper">
            {/* <form>
                <div class="input">
                    ユーザ名<input name="username" type="text" required/>
                </div>
            </form> */}
            <button onClick={() => {this.handleSubmit()}}>ルーム作成</button>
        </div>
      )
    }      
}

export default withRouter(Main);