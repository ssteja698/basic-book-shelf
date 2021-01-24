import React, { PureComponent } from 'react';
import { Header, Loader } from './common';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import _ from 'lodash';

import { isMobileDevice } from '../helpers/Utils.js';

const IS_MOBILE = isMobileDevice();

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            filteredBooks: [],
            searchedValue: '',
            pageCount: 10,
            startIndex: 0,
            currentPage: 1,
            isSearched: false,
            cart: '',
            selectedBookIds: [],
        };
        this.handleSearch = _.debounce(this.handleSearch.bind(this), 500);
    }

    componentDidMount() {
        axios.get(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json`)
        .then(res => {
            const books = res.data;
            this.setState({ books });
        })
        window.scrollTo(0, 0);
    }

    handleSearch(event) {
        const { value } = event.target;
        const lowercasedValue = value.toLowerCase();

        this.setState(prevState => {
          const details = Object.keys(prevState.books[0]);
          const filteredBooks = prevState.books.filter((book) =>
            {
                let answer = false;
                details.forEach((detail) => {
                    answer = answer || book[detail].toString().toLowerCase().includes(lowercasedValue);
                })
                return answer;
            }
          );
          return { filteredBooks, currentPage: 1 };
        });
    };

    handleSelectedBooks(bookID) {
        let { selectedBookIds } = this.state;
        if (selectedBookIds.indexOf(bookID) > -1) {
          selectedBookIds = selectedBookIds.filter((selectedBookId) => selectedBookId !== bookID);
        } else {
          selectedBookIds = [...selectedBookIds, bookID];
        }
        this.setState({ selectedBookIds });
    }

    getSelectedBooks(selectedBookIds) {
        const { books } = this.state;
        return books.filter((book) => {
            return selectedBookIds.includes(book.bookID);
        })
    }

    renderBooks() {
        const { currentPage, pageCount, books, filteredBooks, searchedValue, isSearched } = this.state;
        const headings = ['Mark', 'BookID', 'Title', 'Authors', 'Average Rating', 'ISBN', 'Language Code', 'Ratings', 'Price'];
        const booksList = isSearched ? filteredBooks.slice((currentPage - 1) * pageCount, currentPage * pageCount) : books.slice((currentPage - 1) * pageCount, currentPage * pageCount);

        return (
            <>
                <input
                    style={{ margin: '80px auto 0px', padding: 5, width: '89%', display: 'flex' }}
                    value={searchedValue}
                    onChange={(event) => {
                        this.setState({ searchedValue: event.target.value, isSearched: event.target.value.length > 0 })
                        this.handleSearch(event)
                    }}
                    placeholder="Search"
                />
                <div style={{ margin: 'auto', width: '90%', overflowX: 'auto' }}>
                    <table
                        className='table table-hover'
                        style={{
                            width: '100%', margin: '10px auto', boxShadow: '1px 2px 6px #8B9DAF33', borderRadius: 4, backgroundColor: '#FFFFFF', border: '1px solid #CDCFD6',
                        }}
                    >
                        <thead style={{ width: '100%', display: 'flex', background: '#F6F8FA', color: '#23394C' }}>
                            <tr
                                style={{
                                    width: '100%', fontSize: '18px', fontWeight: '700', color: '#11426C',
                                }}
                            >
                                {headings.map((heading, columnIndex) => (
                                    <th
                                        style={{
                                            overflow: 'auto', minWidth: columnIndex === 2 ? '58%' : '9%', textAlign: 'left', border: '1px solid #DFE3EA', paddingRight: 10, paddingLeft: 10,
                                        }}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {booksList.map((book, index) => {
                                const rowData = Object.values(book);
                                return (
                                    <tr
                                        style={{
                                            width: '100%', display: 'flex', background: '#F6F8FA', color: '#23394C'
                                        }}
                                    >
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input
                                                type="checkbox"
                                                checked={this.state.selectedBookIds.indexOf(book.bookID) > -1}
                                                onChange={() => this.handleSelectedBooks(book.bookID)}
                                            />
                                        </td>
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
                <div style={{ display: 'flex', justifyContent: IS_MOBILE ? 'flex-start' : 'center', margin: 'auto', width: '90%', overflowX: 'auto' }}>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={pageCount}
                        totalItemsCount={isSearched ? filteredBooks.length : books.length}
                        pageRangeDisplayed={10}
                        onChange={(pageNumber) => this.setState({ currentPage: pageNumber })}
                    />
                </div>
            </>
        );
    }

    render() {
        const { books, isSearched, selectedBookIds } = this.state;

        if(books.length === 0 && !isSearched) {
            return <Loader />;
        }

        return (
            <Header selectedBooks={this.getSelectedBooks(selectedBookIds)}>
                {this.renderBooks()}
            </Header>
        );
    }
}

export default Home;