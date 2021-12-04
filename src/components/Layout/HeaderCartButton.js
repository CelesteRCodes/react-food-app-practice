import React, {useContext, useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/card-context";

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const {items } = cartCtx;

  const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`;

  useEffect (() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    const timer = setTiemout(() => {setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button 
    className={btnClasses}
    onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
      <span>
        Your Cart
      </span>
    </button>
  )
};

export default HeaderCartButton;