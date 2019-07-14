import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchInfo } from './duck';


class Photos extends React.Component {
  constructor(props) {
    super(props);
    if (!props.info) {
      this.props.dispatch(fetchInfo())
    }
    console.log('CONSTRUCTOR')
  }
  static propTypes = {
    info: PropTypes.object
  }

  render () {
    console.log(this.props)
    return (
      <div>
        Photos
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.photos;
}

export default connect(mapStateToProps)(Photos);