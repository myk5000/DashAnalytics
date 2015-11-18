import React from 'react';
import styles from './css/App.css';
import Header from './view_components/Header.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }
  render() {
    return (
      <div className={styles.app} >
        bar3
        <Header/>
      </div>
    );
  }
}


