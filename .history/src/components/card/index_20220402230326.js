import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Card({ title, subtitle, children }) {
  return (
    <div className="card">
      <div className="card-title">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.array,
};

Card.defaultProps = {
  title: '',
  subtitle: '',
  children: [],
};

export default Card;
