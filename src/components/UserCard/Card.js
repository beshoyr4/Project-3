import React from "react";
import "./style.css";

// this is just an example

function Card(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Location:</strong> {props.locaton}
          </li>
          <li>
            <strong>Email:</strong> {props.email}
          </li>
          <li>
            <strong>Looking For:</strong> {props.looking}
          </li>
          <li>
            <strong>Instruments:</strong> {props.instruments}
          </li>
          <li>
            <strong>Proficiency:</strong> {props.proficiency}
          </li>
          <li>
            <strong>Influences:</strong> {props.influences}
          </li>

        </ul>
      </div>
      <span onClick={() => props.removeCard(props.id)} className="remove">
        𝘅
      </span>
    </div>
  );
}

export default Card;
