import React from 'react';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import useStyles from "../style";
import {change} from '../handles'
import {context} from "../redux/action";
// import {useHistory} from "react-router-dom";


function Login(props) {

    const emptyLogin = {
        username: '',
        password: '',
    };

    // let history = useHistory();

    const [login, setLogin] = useState(emptyLogin);

    const classes = useStyles();

    const dispatch = useDispatch();

    const handleChange = event => {
        change(event, setLogin, login)
    }

    const enter = (event, login) => {
        event.preventDefault();

        let formData = new FormData();
        formData.set("username", login.username);
        formData.set("password", login.password);

        fetch('/api/login', {
            method: 'POST',
            body: formData
        }).then(async response => {
            if (response.status === 200) {
                dispatch(context());
                window.location.href="/";
            } else {
                alert("Не удалось войти");
            }
        }).catch(error => {
            alert("Не удалось войти");
        });
    }

    return <div>
        <Container align="center">
            <Form onSubmit={(event) => enter(event, login)}>
                <FormGroup>
                    <Label className={classes.label} for="Login">Логин:</Label><br/>
                    <Input className={classes.input} type="text" name="username" id="username"
                           onChange={handleChange} value={login.username} autoComplete="username" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="password">Пароль:</Label><br/>
                    <Input type="password" className={classes.input} name="password" id="password"
                           onChange={handleChange} value={login.password} autoComplete="password"/>
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Войти</Button>{' '}
                </FormGroup>
            </Form>
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        is_admin: userReducer.is_admin,
    }
}

const mapDispatchToProps = {
    context
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);