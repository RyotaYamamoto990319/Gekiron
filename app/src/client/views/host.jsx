import React from "react";
import { io } from "socket.io-client";
import { getUser } from "../functions/firebase-auth";

class Host extends React.Component {

    constructor(props) {
        super(props);
        this.socket = io('localhost:3000');
        this.state = {view:1, roomid:"", roomURL:"", players:[], themeid:0, theme:""};
        this.setStart = this.setStart.bind(this);
        this.openAns = this.openAns.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    componentDidMount() {
        console.log('connect');
        this.socket.emit('create', {
            name: this.props.location.state.name
        });

        this.socket.on('getInfo', (data) => {
            this.setState({ roomid: data.roomid });
            this.setState({ roomURL: "http://localhost:3000/guest?roomid=" + data.roomid })
            this.setState({ players: [{ id: data.roomid, name: this.props.location.state.name }] });
        });

        this.socket.on('getPlayers', (data) => {
            if (this.state.view == 1) {
                this.setState({ players: data.players })
            }
        });

        this.socket.on('startGame', (data) => {
            this.setState({ players: data.players }, () => {
                this.setState({ theme: data.theme }, () => {
                    this.setState({ view: 2 });
                });
            });
        });

        this.socket.on('sendAns', (data) => {
            var update_players = this.state.players;
            for (let i=0; i<update_players.length; i++) {
                if (update_players[i].id == data.playerid) {
                    update_players[i].answer = data.answer;
                    const update_player = update_players[i];
                    update_players.splice(i, 1);
                    update_players.unshift(update_player);
                    break;
                }
            }
            this.setState({ players: update_players });
        });
    }

    setStart() {
        console.log('start');
        getUser((user) => {
            fetch('/api/theme', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email
                })
            }).then(res => { 
                res.json().then(data => {
                    this.setState({ themeid: data.id }, () => {
                        this.socket.emit('setStart', {
                            roomid: this.state.roomid,
                            theme: data.theme
                        });    
                    });     
                })
            });
        });
    }

    openAns(playerid) {
        this.socket.emit('getAns', {
            roomid: this.state.roomid,
            id: playerid
        });
    }

    submitAns(playerid) {
        const player = this.state.players.find((p) => p.id == playerid);
        console.log(player);
        getUser((user) => {
            fetch('/api/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    themeid: this.state.themeid,
                    answer: player.answer
                })
            }).then(res => {
                this.setStart();
            });
        });
    }

    handleAnswer() {
        const ans = document.forms[0].answer.value;
        this.socket.emit('answer', {
            roomid: this.state.roomid,
            answer: ans
        });
    }

    setPlayers() {
        var players = this.state.players.map((player) => 
            <li>{player.name}</li>
        );
        return players;
    }

    setPlayerTexts() {
        return this.state.players.map((player) => 
            <tr>
                <td class="playerName">{player.name}</td>
                <td class="playerAnswer">{player.answer}</td>
                <td><a class="open" onClick={() => {this.openAns(player.id)}}>答えを見る</a></td>
                <td><a class="correct" onClick={() => {this.submitAns(player.id)}}>これ正解！</a></td>
            </tr>
        )
    }    

    render() {
        switch(this.state.view) {
            case 1:
                return (
                    <><h1>待機ルーム</h1>
                    <div class="top-wrapper">
                        <p>ルームURL:</p>
                        <p>{this.state.roomURL}</p>
                    </div>
                    <div class="top-wrapper">
                        <p>プレイヤー：</p>
                        <ul>{this.setPlayers()}</ul>
                    </div>
                    <div class="top-wrapper">
                        <button onClick={() => {this.setStart()}}>開始</button>
                    </div></>   
                )
            
            case 2:
                return (
                    <><h2>{this.state.theme}</h2>
                    <table>
                        {this.setPlayerTexts()}
                    </table>
                    <form>
                        <div class="input">
                            <p>あなたの答えを入力してください：<br />
                                <textarea name="answer" required></textarea>
                            </p>
                        </div>
                    </form>
                    <button onClick={() => {this.handleAnswer()}}>送信</button></>
                )
        }
    }
}

export default Host;