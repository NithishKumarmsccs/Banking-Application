import NavBar from './navbar';
import {Route, HashRouter} from 'react-router-dom';
import Home from './components/Home/home';
import CreateAccount from './components/CreateAccount/createaccount';
import Login from './components/Login/login.js';
// import Logout from './components/logout';
import menu from './components/menu.js';
import Deposit from './components/Deposit/deposit';
import Withdraw from './components/Withdraw/withdraw';
import AllData from './components/AllData/alldata';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HelpCenter from './components/helpcenter.js';
// import Logout from './components/logout.js';

function App() {
  return (
   <HashRouter>
    <div className="container-fluid">
    <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/CreateAccount/" component={CreateAccount} />
      <Route path="/login/" component={Login} />
      {/* <Route path="/logot/" component={Logout} /> */}
      <Route path="/helpcenter/" component={HelpCenter} />
      <Route path="/deposit/" component={Deposit}/>
      <Route path="/withdraw/" component={Withdraw} />
      <Route path="/alldata/" component={AllData} />
      {/* <Route path="/logout/" component={Logout} />   */}
    </div>
   </HashRouter>
  );
}

export default App;
