import React, { useRef } from "react";
import Button from "@material-ui/core/Button";

const FloatingEdit = ({ onUpdate }) => {
  const username = useRef();

  return (
    <div style={{ paddingBottom: "10px" }}>
      <h3 style={{ fontWeight: "bold", marginBottom: "5px" }}>Edit</h3>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <p>Full Name *</p>
        <input
          ref={username}
          id="username"
          style={{ width: "90px", marginBottom: "10px" }}
        ></input>
      </form>
      <Button
        style={{ margin: "auto" }}
        variant="contained"
        color="primary"
        onClick={() => onUpdate(username.current.value)}
      >
        UPDATE
      </Button>
    </div>
  );
};

export default FloatingEdit;
