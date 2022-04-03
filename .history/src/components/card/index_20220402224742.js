import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Card({}) {
  return (
    <div className="card">
      <div className="card-title">
        <h1>{props.title}</h1>
        <h3>{props.subtitle}</h3>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

Card.propTypes = {

}

export default Card;
