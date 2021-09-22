import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Chart } from './pages/Chart/Chart';
import { Header } from './cmps/Header';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route component={Chart} path="/chart"></Route>
          <Route component={Home} path="/"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
