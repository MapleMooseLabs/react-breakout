import React from 'react';
import ReactDOM from 'react-dom';

import Breakout from '../src/Breakout';

class App extends React.Component {

  render() {
    return (
      <div>
        <Breakout />
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
