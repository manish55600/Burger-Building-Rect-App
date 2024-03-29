import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Veggie", type: "veggie" },
    { label: "Cheese", type: "cheese" },
    { label: "Tikki", type: "tikki" },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Total Price: <strong>{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((ctrl) => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                type={ctrl.type}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>
            {props.isAuth ? 'Order Now' : 'SignUp to Order'}
        </button>
    </div>
);

export default buildControls;
