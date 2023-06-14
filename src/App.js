import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./home";
import UserAdd from "./entities/users/userAdd";
import UserEdit from "./entities/users/userEdit";
import AbonentAdd from "./entities/abonents/abonentAdd";
import AbonentEdit from "./entities/abonents/abonentEdit";

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
                </Routes>
            </Router>
        </div>
    )
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        users: userReducer.users,
    }
}

export default connect(mapStateToProps)(App);

