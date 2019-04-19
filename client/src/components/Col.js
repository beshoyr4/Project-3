import React from "react";

// This Col component offers the convenience of setting a column's Column prop instead of its className

const Col = props => {
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");

    return (
        <div className={size}>
        {props.children}
        </div>
    );
};

export default Col;