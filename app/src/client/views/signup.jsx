import React from "react";
import { userSignUp } from "../functions/firebase-auth";

export default class SignUp extends React.Component {
    handleSubmit() {
        var myform = document.forms[0];
        if (myform.password.value === myform.re_password.value) {
            userSignUp(myform.mailaddress.value, myform.password.value, function(user) {
                console.log(user);

                fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: myform.username.value,
                        email: myform.mailaddress.value,
                    })
                }).then((res) => {
                    window.location.href = '/main';
                });
            });
        } else {
            alert('パスワードが一致しません');
            myform.elements[1].value = '';
            myform.elements[2].value = '';
        }
    }

    render() {
        return (
            <div class="top-wrapper">
                <form id = "myform">
                    <div class="input">
                        メールアドレス<input name="mailaddress" type="mailAddress" required/>
                    </div>
                    <div class="input">
                        ユーザ名<input name="username" type="text" required/>
                    </div>
                    <div class="input">
                        パスワード<input name="password" type="password" required/>
                    </div>
                    <div class="input">
                        パスワード再確認<input name="re_password" type="password" required/>
                    </div>
                </form>
                <button onClick={this.handleSubmit}>新規登録</button>
            </div>
        )
    }
}