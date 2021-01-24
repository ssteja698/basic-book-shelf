import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import './header.css';

import { isMobileDevice } from '../../helpers/Utils.js';

const IS_MOBILE = isMobileDevice();

const history = createBrowserHistory({
  forceRefresh: true,
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
    };
  }

  renderCart() {
    const { selectedBooks } = this.props;
    const headings = ['BookID', 'Title', 'Authors', 'Average Rating', 'ISBN', 'Language Code', 'Ratings', 'Price'];

    return (
    <div style={{ margin: IS_MOBILE ? '140px 0px' : '100px 0px' }}>
      <div onClick={() => this.setState({ showCart: false })} style={{ color: '#23394C', cursor: 'pointer', padding: 5, borderRadius: '50%', position: 'absolute', left: IS_MOBILE ? 30 : 70, top: 100, fontSize: 20 }}>
        {"<- Back"}
      </div>
      {(selectedBooks.length === 0) && (
        <div style={{ color: '#23394C', fontSize: IS_MOBILE ? 18 : 24, textDecoration: 'underline' }}>
          Your Cart is Empty
        </div>
      )}
      {(selectedBooks.length > 0) && (
        <>
          <div style={{ color: '#23394C', fontSize: IS_MOBILE ? 18 : 24, textDecoration: 'underline' }}>
            You added the following items into the Cart:
          </div>
          <div style={{ width: '90%', display: 'flex', flexDirection: 'column', margin: '10px auto', overflowX: 'auto' }}>
            <table
                className="table table-hover"
                style={{
                    width: '100%', boxShadow: '1px 2px 6px #8B9DAF33', borderRadius: 4, backgroundColor: '#FFFFFF', border: '1px solid #CDCFD6',
                }}
            >
                <thead>
                    <tr
                        className="table-header"
                        style={{
                            fontSize: '18px', fontWeight: '700', height: 55, color: '#6465A5',
                        }}
                    >
                        {headings.map((heading, index) => {
                            let width = '10%';
                            if (index === 0) {
                            width = '5%';
                            } else if (index === 2) {
                            width = '30%';
                            }
                            return (
                            <th style={{
                                width, borderRight: (index !== headings.length - 1) && '1px solid #DFE3EA', textAlign: 'center', borderBottom: '1px solid #DFE3EA',
                            }}
                            >
                                {heading.toLocaleUpperCase()}
                            </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {selectedBooks.map((book) => {
                    const rowData = Object.values(book);
                    return (
                        <tr style={{ fontSize: 16, fontWeight: '400', borderBottom: '1px solid #DFE3EA' }}>
                            {rowData.map((key, columnIndex) => {
                              return (
                                  <td
                                      role="presentation"
                                      style={{
                                          padding: '12px', borderRight: (columnIndex !== rowData.length - 1) && '1px solid #DFE3EA', borderBottom: '1px solid #DFE3EA',
                                      }}
                                      >
                                      {key}
                                  </td>
                              );})}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
          </div>
        </>
      )}
    </div>
    )
  }

  renderHeaderLogo() {
    return (
      <div
        id="Header-Logo"
        role="presentation"
        style={{
          height: 60, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
        }}
        onClick={() => history.push('/')}
      >
        <div style={{ fontWeight: 800 }}>
          <span style={{ fontSize: 30 }}>
            <span style={{ color: '#F1E0D6' }}>BOOK</span>
            <span style={{ color: '#BF988F' }}>PLAZA</span>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <div className="Header" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#6465A5' }}>
          <div className="headerLeft" style={{ display: 'flex', alignItems: 'center', paddingLeft: '5%' }}>
            {this.renderHeaderLogo()}
          </div>
          {!this.state.showCart && (
            <div 
              className="Button" 
              style={{ color: '#FFF', padding: '5px 2%', marginRight: '5%', backgroundColor: '#BF988F' }}
              onClick={() => this.setState({ showCart: true })}
            >
              Cart
            </div>
          )}
        </div>
        {this.state.showCart && this.renderCart()}
        {!this.state.showCart && (
          <div style={{ marginTop: 70 }}>
            {children}
          </div>
        )}
      </>
    );
  }
}

export default Header;
