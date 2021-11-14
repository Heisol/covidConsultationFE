import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// package imports

import Landing from "./Pages/Landing";
import NotFound from "./Pages/NotFound";
//local imports

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
