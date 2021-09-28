import React from "react";
import { io } from "socket.io-client";

class Host extends React.Component {

    constructor(props) {
        super(props);
        this.socket = io('localhost:3000');
        this.state = {view:1, roomid:"", roomURL:"", players:[]};
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
            console.log(data);
            this.setState({ roomid: data.roomid });
            this.setState({ roomURL: "http://localhost:3000/guest?roomid=" + data.roomid })
            this.setState({ players: [{ id: data.roomid, name: this.props.location.state.name }] });
        });

        this.socket.on('getPlayers', (data) => {
            console.log(data);
            if (this.state.view == 1) {
                this.setState({ players: data.players })
            }
        });

        this.socket.on('startGame', (data) => {
            this.setState({ players: data.players }, () => {
                this.setState({ view: 2 });
            });
        });

        this.socket.on('sendAns', (data) => {
            console.log(data);
            var update_players = this.state.players;
            for (let i=0; i<update_players.length; i++) {
                if (update_players[i].id == data.playerid) {
                    update_players[i].answer = data.answer;
                    const player = update_players[i];
                    update_players.splice(i);
                    update_players.unshift(player);
                    break;
                }
            }
            console.log(update_players);
            this.setState({ players: update_players });
        });
    }

    setStart() {
        console.log('start');
        this.socket.emit('setStart', {
            roomid: this.state.roomid
        });
    }

    openAns(playerid) {
        console.log('openAns');
        this.socket.emit('getAns', {
            roomid: this.state.roomid,
            id: playerid
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
                    <><table>
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