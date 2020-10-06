import React, { useState } from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const token = useState(() => {
    return localStorage.getItem("@ModeraVaca/token");
  });
  const isSigned = !!token;

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isSigned ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/login" : "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
