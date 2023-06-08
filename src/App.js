import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./home";

function App() {
    document.title = 'Учет телефонных звонков'
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' exact={true} element={<Home/>}/>
                    <Route path='/:tab' exact={true} element={<Home/>}/>
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

