import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthUserCtx } from "./context/authUser";
import { Auth } from "./screens/auth/Auth";
import { Home } from "./screens/home/Home";

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  const authUserCtxValue = {
    authUser: authUser,
    setAuthUser: setAuthUser,
  };
  return (
    <div>
      <AuthUserCtx.Provider value={authUserCtxValue}>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </AuthUserCtx.Provider>
    </div>
  );
};

export default App;
