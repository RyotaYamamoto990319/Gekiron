import React from "react";
import { getUser, userSignOut } from "../functions/firebase-auth";

export default class Header extends React.Component {
    state = {isLogin: false};
    componentDidMount(){
        getUser((user) => {
            if(user) {
                console.log("setState");
                this.setState({isLogin:true});
            } else {
                this.setState({isLogin:false});
            }
        });
    };

    signOut() {
        userSignOut(() => {
            // 再読み込み
            window.location.reload();
        });
    };

    render() {
        console.log("render");
        if(this.state.isLogin) {
            return (
                <header>
                    <div class="header-left">
                        <a href="/">{this.props.title}</a>
                    </div>
                    <div class="header-right">
                        <a onClick={this.signOut}>ログアウト</a>
                    </div>
                    <div class="header-right">
                        <a href="/main">メイン</a>
                    </div>
                </header>
            )
        } else {
            return (
                <header>
                    <div class="header-left">
                        <a href="/">{this.props.title}</a>
                    </div>
                    <div class="header-right">
                        <a href="/signup">新規登録</a>
                    </div>
                    <div class="header-right">
                        <a href="/signin">ログイン</a>
                    </div>
                </header>
            )
        }
        
    }
}