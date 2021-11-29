import React, { lazy, useState, Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import {
//   StylesProvider,
//   createGenerateClassName,
// } from "@material-ui/core/styles";

// import App3 from "app3/app";
// import "./index.css";

// const App3 = lazy(() => import("app3/App"));
const App2 = lazy(() => import("app2/App2"));

// const Unrelease = lazy(() => import("unrelease/app"));
// import Unrelease from 'app2/App';

// const generateClassName = createGenerateClassName({
//   seed: "App1",
// });

// import { StylesProvider, createGenerateClassName } from '@mui/styles';

// const generateClassName = createGenerateClassName({
//   productionPrefix: 'c',
// });

const Wrapper = styled("div")`
  margin: 10px;
  padding: 10px;
  color: green;
`;

const App = () => {
  return (
    <React.StrictMode>
      <Wrapper>App 1</Wrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Route path="/" render={() => <App2 />} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
