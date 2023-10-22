import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef(({ label, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = visible ? { display: "" } : { display: "none" };
  const showWhenHidden = visible ? { display: "none" } : { display: "" };

  useImperativeHandle(ref, () => ({
    toggleVisibility: () => setVisible(!visible),
  }));

  return (
    <div>
      <Button
        type="button"
        style={showWhenHidden}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {label}
      </Button>
      <div style={showWhenVisible}>
        {children}
        <Button
          type="button"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          close
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;
