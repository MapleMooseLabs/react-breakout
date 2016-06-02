import React from 'react';

export default class MessageCenter extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      visible: false,
      message: null,
      actionLabel: null,
      action: null
    };

    this.state = this.initialState;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.state.visible !== nextState.visible
  //   );
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible !== this.state.visible && this.state.visible) {
      this.draw();
    }
  }

  show(message, actionLabel, action) {
    console.log('show()');
    this.setState({
      visible: true,
      message: message,
      actionLabel: actionLabel,
      action: action
    });
  }

  dismiss() {
    this.setState(this.initialState);
  }

  draw() {
    if (this.state.visible) {
      let timer = setTimeout(() => {
        this.state.action();
      }, 1000);
    }
  }

  render() {
    return null;
  }
}
