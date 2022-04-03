import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

export default function Header({ title, children }) {
  return (
    <div className="page-header">
      <div className="header-container">
        <div className="title">
          <Link to="/">
            {' '}
            <h1>{title}</h1>
          </Link>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

Header.defaultProps = {
  title: '',
  children: null,
};
