import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./home";
import UserAdd from "./entities/users/userAdd";
import UserEdit from "./entities/users/userEdit";
import AbonentAdd from "./entities/abonents/abonentAdd";
import AbonentEdit from "./entities/abonents/abonentEdit";
import CallAdd from "./entities/calls/callAdd";
import CallEdit from "./entities/calls/callEdit";
import CityEdit from "./entities/city/cityEdit";
import CityAdd from "./entities/city/cityAdd";

function App() {
    document.title = 'Учет телефонных звонков'
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact={true} element={<Home/>}/>
                    <Route path='/:tab' exact={true} element={<Home/>}/>
                    <Route path='/users/new' exact={true} element={<UserAdd/>}/>
                    <Route path='/users/:id' exact={true} element={<UserEdit/>}/>
                    <Route path='/abonents/new' exact={true} element={<AbonentAdd/>}/>
                    <Route path='/abonents/:id' exact={true} element={<AbonentEdit/>}/>
                    <Route path='/calls' exact={true} element={<CallAdd/>}/>
                    <Route path='/calls/:id' exact={true} element={<CallEdit/>}/>
                    <Route path='/cities/' exact={true} element={<CityEdit/>}/>
                    <Route path='/cities/:id' exact={true} element={<CityAdd/>}/>
                </Routes>
            </Router>
        </div>
    )
}

function mapStateToProps(state) {
    const {userReducer, callReducer, abonentReducer, cityReducer} = state;
    return {
        users: userReducer.users,
        calls: callReducer.calls,
        abonents: abonentReducer.abonents,
        cities: cityReducer.cities
    }
}

export default connect(mapStateToProps)(App);

