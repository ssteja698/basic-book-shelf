import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../common';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: '',
    };
  }

  componentDidMount() {
    this.setState({ screenHeight: global.innerHeight });
  }

  render() {
    const { screenHeight } = this.state;
    const { children, hideHeader, selectedBooks } = this.props;
    const searchParams = new URLSearchParams(window.location.search);
    const forceRemoveHeader = searchParams.get('force_hide_header') === 'true';
    return (
      <div style={{
        backgroundColor: '#FCFCFC', minHeight: screenHeight, maxWidth: '100%', overflowX: 'hidden', paddingTop: forceRemoveHeader ? 15 : 0,
      }}
      >
        {!forceRemoveHeader && !hideHeader && <Header selectedBooks={selectedBooks} />}
        <div style={{ marginTop: 70 }}>
          {children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  hideHeader: PropTypes.bool,
  hideFooter: PropTypes.bool,
};


Layout.defaultProps = {
  hideHeader: false,
  hideFooter: false,
};

export default Layout;
