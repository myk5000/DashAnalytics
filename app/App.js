import React from 'react';
import styles from './css/App.css';
import Header from './view_components/Header.js';
import io from 'socket.io-client';
import bs from 'bootstrap-webpack';
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
    }

  render() {
    
    return (
      <div className={styles.mainDiv, bs.container}>
        <Header status={this.state.status}/>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, quae. Sequi quisquam dolor debitis blanditiis nulla magni culpa quasi nobis explicabo nesciunt, saepe iste! Corporis hic accusamus minima, explicabo nam.
      </div>
    );
  }
  
}


