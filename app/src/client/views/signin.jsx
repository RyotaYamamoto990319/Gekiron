import React from "react";
import { userSignIn } from "../functions/firebase-auth";

export default class SignIn extends React.Component {
    handleSubmit() {
        var myform = document.forms[0];
        userSignIn(myform.mailaddress.value, myform.password.value, function(user) {
            console.log(user);
            window.location.href = '/main';
        });
    }

    render() {
        return (
            <div class="top-wrapper">
            <form> 
                <div class="input">
                    メールアドレス<input name="mailaddress" type="mailAddress" required/>
                </div>
                <div class="input">
                    パスワード<input name="password" type="password" required/>
                </div>
            </form>
            <button onClick={this.handleSubmit}>ログイン</button>
            </div>
        )
    }
}