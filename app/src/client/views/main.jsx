import React from "react";
import { withRouter } from 'react-router-dom';
import { getUser } from "../functions/firebase-auth";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        getUser((user) => {
            if(user == null) {
                window.location.href = '/';
            } 
        });
    }

    handleSubmit() {
        var username = document.forms[0].username.value;
        this.props.history.push({pathname: '/host', state:{name: username}});
    } 

    render() {
      return (
        <div class="top-wrapper">
            <form>
                <div class="input">
                    ユーザ名<input name="username" type="text" required/>
                </div>
            </form>
            <button onClick={this.handleSubmit}>ルーム作成</button>
        </div>
      )
    }      
}

export default withRouter(Main);