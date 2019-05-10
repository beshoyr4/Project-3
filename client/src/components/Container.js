import React from "react";

const Container = ({ id, fluid, children, ...props }) => 
    <div id={id} className={`container${fluid ? "-fluid" : ""}`} { ...props }>
        { children }
    </div>;


export default Container;