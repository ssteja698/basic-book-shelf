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
            pageCount: 7,
            startIndex: 0,
            currentPage: 1,
            isSearched: false,
            cart: '',
            selectedBookIds: [],
        };
        this.handleSearch = _.debounce(this.handleSearch.bind(this), 200);
    }

    componentDidMount() {
        axios.get('https://raw.githubusercontent.com/ssteja698/basic-book-shelf/main/book-data.json')
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
        const headings = ['Add to Cart', 'BookID', 'Title', 'Authors', 'Average Rating', 'ISBN', 'Language Code', 'Ratings', 'Price'];
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
                            {booksList.map((book) => {
                            const rowData = Object.values(book);
                            return (
                                <tr style={{ fontSize: 16, fontWeight: '400', borderBottom: '1px solid #DFE3EA' }}>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <input
                                            type="checkbox"
                                            style={{ cursor: 'pointer' }}
                                            checked={this.state.selectedBookIds.indexOf(book.bookID) > -1}
                                            onChange={() => this.handleSelectedBooks(book.bookID)}
                                        />
                                    </td>
                                    {
                                        rowData.map((key, columnIndex) => {
                                        return (
                                            <td
                                                role="presentation"
                                                style={{
                                                    padding: '12px', borderRight: (columnIndex !== rowData.length - 1) && '1px solid #DFE3EA', borderBottom: '1px solid #DFE3EA',
                                                }}
                                                >
                                                {key}
                                            </td>
                                        );})
                                    }
                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: IS_MOBILE ? 'flex-start' : 'center', margin: '0px auto', width: '90%', overflowX: 'auto' }}>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={pageCount}
                        totalItemsCount={isSearched ? filteredBooks.length : books.length}
                        pageRangeDisplayed={IS_MOBILE ? 3 : 10}
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