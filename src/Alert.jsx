import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const interval = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(interval);
  }, [list]);
  return <div className={`alerts ${type}`}>{msg}</div>;
};

export default Alert;
