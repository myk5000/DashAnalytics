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
    	<header className={styles.header}>
	      <div>
	        <h3>this client is: {this.props.status}</h3>
	      </div>
	      <div>
	      	
	      </div>
      	</header>
    );
  }
}