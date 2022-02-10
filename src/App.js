import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// package imports

import Landing from "./Pages/Landing";
import NotFound from "./Pages/NotFound";
import Tips from "./Pages/Tips";
import Monitoring from "./Pages/Monitoring";
//local imports

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path="/consultation/:id" exact component={Landing} />
          <Route path="/tips" exact component={Tips} />
          <Route path="/user/:id" component={Monitoring} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
