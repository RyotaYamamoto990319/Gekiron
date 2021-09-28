import React from "react";
import { io } from "socket.io-client";
import queryString from 'query-string';

class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io('localhost:3000');
        const query = queryString.parse(this.props.location.search);
        this.state = { view: 0, roomid:query.roomid, players:[], theme:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    componentDidMount() {
        // すべてのプレイヤーを取得
        this.socket.on('getPlayers', (data) => {
            console.log("getPlayers");
            if (this.state.view == 1) {
                this.setState({ players: data.players })
            }
        })

        // ゲーム開始
        this.socket.on('startGame', (data) => {
            this.setState({ players: data.players }, () => {
                this.setState({ theme: data.theme }, () => {
                    this.setState({ view: 2 });
                });
            });
        });

        // 答えを受け取る
        this.socket.on('sendAns', (data) => {
            console.log(data)
            var update_players = this.state.players;
            for (let i=0; i<update_players.length; i++) {
                if (update_players[i].id == data.playerid) {
                    update_players[i].answer = data.answer;
                    const update_player = update_players[i];
                    console.log(update_player);
                    update_players.splice(i, 1);
                    update_players.unshift(update_player);
                    break;
                }
            }
            console.log(update_players);
            this.setState({ players: update_players });
        });
    }

    // プレイヤーとして登録
    handleSubmit() {
        console.log("submit");
        const username = document.forms[0].username.value;
        this.socket.emit('join', {
            roomid: this.state.roomid,
            name: username
        });
        this.setState({ view: 1 });
    }

    // 答えを送信
    handleAnswer() {
        const ans = document.forms[0].answer.value;
        this.socket.emit('answer', {
            roomid: this.state.roomid,
            answer: ans
        });
    }

    // 待機画面でプレイヤーを表示させる
    setPlayers() {
        var players = this.state.players.map((player) => 
            <li>{player.name}</li>
        );
        return players;
    }

    // プレイヤーのテキストを表示
    setPlayerTexts() {
        console.log(this.state.players);
        return this.state.players.map((player) => 
            <tr>
                <td class="playerName">{player.name}</td>
                <td class="playerAnswer">{player.answer}</td>
            </tr>
        )
    }

    render() {
        switch(this.state.view) {
            case 0:
                console.log('initial screen');
                return (
                    <div class="top-wrapper">
                        <form>
                            <div class="input">
                                名前を入力してください<input name="username" type="text" required/>
                            </div>
                        </form>
                        <button onClick={() => {this.handleSubmit()}}>参加</button>
                    </div>
                )
            case 1:
                console.log('待機ルーム');
                return (
                    <><h1>待機ルーム</h1>
                    <div class="top-wrapper">
                        <p>プレイヤー：</p>
                        <ul>{this.setPlayers()}</ul>
                    </div></>
                )
            case 2:
                console.log('ゲーム開始');
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

export default Guest;