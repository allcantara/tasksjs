import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import List from "./views/Container";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/tasksjs" exact component={List} />
      </Switch>
    </BrowserRouter>
  );
};