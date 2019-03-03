import React from 'react'

class TextLengthCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    }
  }

  componentDidUpdate() {
    const { current, max, onError } = this.props;
    if (onError) {
      const before = this.state.error;
      let after = before;

      if (current > max) {
        after = true
      } else {
        after = false
      }

      if (before !== after) {
        this.setState({
          error: after
        });
        onError({
          target: {
            value: after
          }
        })
      }
    }
  }

  render() {
    const { current, max } = this.props;
    return (
      <span>
        {current} / {max}
      </span>
    )
  }
}

export default TextLengthCounter;