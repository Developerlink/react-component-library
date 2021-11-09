import React from "react";
import Styles from "./Table.module.css";

const Table = (props) => {
  return (
    <table className={`${Styles.table} ${props.className}`}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((item, index) => (
          <tr key={item.id}>
            <th>{item.id}</th>
            <td id={index}>{item.name}</td>
            <td id={index}>{item.age}</td>
          </tr>
        ))}
        ;
      </tbody>
    </table>
  );
};

export default Table;
