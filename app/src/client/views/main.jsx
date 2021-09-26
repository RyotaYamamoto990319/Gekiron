import React from "react";
import { getUser } from "../functions/firebase-auth";

export default class Main extends React.Component {
    componentDidMount(){
        getUser((user) => {
            if(user == null) {
                window.location.href = '/';
            } 
        });
    }

    render() {
      return (
        <div class="top-wrapper">
            <button id="create room">ルーム作成</button>
        </div>
      )
    }      
}