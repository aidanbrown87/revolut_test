import React from 'react';
import PropTypes from 'prop-types';
import './quantity.css'

const QuantityInput = props => {
  const { quantity, onChange, prefix } = props;

  const validateAndChangeQuantity = (event) => {
    const { value } = event.target
    if (value === "") return onChange(undefined)
    
    onChange(value)

  };

  return (
    <div className='quantity'>
      <span>{prefix}</span>
      <input
        type='number'
        value={quantity}
        onChange={validateAndChangeQuantity}
        placeholder='0'
        min={0}
        step={0.01}
      />
    </div>
  );
};

QuantityInput.propTypes = {
  quantity: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

QuantityInput.defaultProps = {
  quantity: undefined,
}

export default QuantityInput;