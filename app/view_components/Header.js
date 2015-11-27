//header div
import React from 'react';
import styles from '../css/App.css';

export default class Header extends React.Component {
  constructor(props) {
  		super(props);
  		this.state = {
  			status:'disconnected'
  		}
  }  
 

  render() {
    return (
    	<header>
	      <div className={styles.bap} >
	        <h1>header div {this.props.title}</h1>
	      </div>
	      <div>
	      	<span id="connection-status">
	      		this client is: {this.props.status}
	      	</span>
	      </div>
      	</header>
    );
  }
}