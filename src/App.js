import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./home";
import Login from "./entities/auth/login"

function App() {
    document.title = 'Животные'
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact={true} element={<Home/>}/>
                    <Route path='/:tab' exact={true} element={<Home/>}/>
                    <Route path='/users/new' exact={true} element={<UserAdd/>}/>
                    <Route path='/users/:id' element={<UserEdit/>}/>
                    <Route path='/login' exact={true} element={<Login/>}/>
                </Routes>
            </Router>
        </div>
    )
}

function mapStateToProps(state) {
    const {userReducer, authReducer} = state;
    return {
        users: userReducer.users,
        token: authReducer.token
    }
}

export default connect(mapStateToProps)(App);

