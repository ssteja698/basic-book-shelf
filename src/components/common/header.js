import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import './header.css';

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
    <div style={{ margin: '40px 0px' }}>
      <div onClick={() => this.setState({ showCart: false })} style={{ cursor: 'pointer', padding: 5, borderRadius: '50%', position: 'absolute', left: 70, top: 40, fontSize: 20 }}>
        {"<- Back"}
      </div>
      <div style={{ fontSize: 24, textDecoration: 'underline' }}>
        You added the following items into the Cart:
      </div>
      <div style={{ margin: 'auto', width: '90%', overflowX: 'auto' }}>
        <table
            className='table table-hover'
            style={{
                width: '100%', margin: '10px auto', boxShadow: '1px 2px 6px #8B9DAF33', borderRadius: 4, backgroundColor: '#FFFFFF', border: '1px solid #CDCFD6',
            }}
        >
            <thead style={{ display: 'flex', background: '#F6F8FA', color: '#23394C' }}>
                <tr
                    style={{
                        width: '100%', fontSize: '18px', fontWeight: '700', color: '#11426C',
                    }}
                >
                    {headings.map((heading, columnIndex) => (
                        <th
                            style={{
                                minWidth: columnIndex === 1 ? '58%' : '9%', textAlign: 'left', border: '1px solid #DFE3EA', paddingRight: 10, paddingLeft: 10,
                            }}
                        >
                          {heading}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {selectedBooks.map((book, index) => {
                    const rowData = Object.values(book);
                    return (
                        <tr
                            style={{
                              width: '100%', display: 'flex', background: '#F6F8FA', color: '#23394C'
                            }}
                        >
                            {rowData.map((data, columnIndex) => {
                                return (
                                    <td
                                        key={`${index} - ${columnIndex}`}
                                        style={{
                                            overflow: 'auto', width: columnIndex === 1 ? '60%' : '8%', textAlign: 'left', paddingRight: 10, paddingLeft: 10, border: '1px solid #DFE3EA',
                                        }}
                                    >
                                        {data}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>
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
            <span style={{ color: '#282726' }}>BOOK</span>
            <span style={{ color: '#6A8A82' }}>POINT</span>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { children, selectedBooks } = this.props;

    if(this.state.showCart) {
      return this.renderCart();
    }

    return (
      <>
        <div className="Header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="headerLeft" style={{ display: 'flex', alignItems: 'center', paddingLeft: '5%' }}>
            {this.renderHeaderLogo()}
          </div>
          <div 
            className="Button" 
            style={{ color: '#FFF', padding: '5px 2%', marginRight: '5%', backgroundColor: '#6465A5' }}
            onClick={() => this.setState({ showCart: true })}
          >
            Add to Cart
          </div>
        </div>
        <div style={{ marginTop: 70 }}>
          {children}
        </div>
      </>
    );
  }
}

export default Header;
