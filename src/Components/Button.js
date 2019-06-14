import React from 'react';

const Button = (props) => (
  <button className="btn btn-info" {...props}>
    {props.label}
  </button>
);

export default Button