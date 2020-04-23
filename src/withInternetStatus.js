import { InternetStatusContext } from "./InternetStatusContext";
import React from "react";

export const withInternetStatus = (Component) => {
  return (props) => {
    return (
      <InternetStatusContext.Consumer>
        {(isConnected) => {
          return <Component {...props} isConnected={isConnected} />;
        }}
      </InternetStatusContext.Consumer>
    );
  };
};
