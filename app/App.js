import React from 'react';
import styles from './css/App.css';
import Header from './view_components/Header.js'
var io = require('socket.io-client');
//var createFragment = require('react-addons-create-fragment');



export default class App extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {test: 'foo'};

    //set state values
    this.state = {
          status: 'disconnected',
          title: 'default title from appJS',
          chartData: []
    }


    //In ES6 these io methods must be bound in the constructor
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.welcome = this.welcome.bind(this);


  }  

 componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
  }

   connect() {
        this.setState({ status: 'connected' });
    }

    disconnect() {
        this.setState({ status: 'disconnected' });
    }

    welcome(serverState) {
        this.setState({ title: serverState.title });
        this.setState({ chartData: serverState.chartData });
        // console.log('>>chartData : ' + JSON.parse(this.state.chartData));
    }

  render() {
    console.log(this.state.chartData);
    return (
      <div className={styles.app}>
        <Header status={this.state.status}/>
        <ul>

            {
              this.state.chartData.map
              (function(x){return <li key={x.index}>loan index: {x.index} has loan amount: {x.loanAmount}</li>})

            }
          </ul> 
      </div>
    );
  }
  
}


