import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label, Container} from 'reactstrap';
import {connect, useDispatch} from 'react-redux';
import useStyles from "../style";
import {change} from '../handles'
import {context} from "../redux/action";
import {useNavigate} from "react-router-dom";
import {Typography} from '@mui/material';
import Box from "@mui/material/Box";
import {Cookies} from "react-cookie";


function Login(props) {

    const emptyLogin = {
        username: '',
        password: '',
    };

    const navigate = useNavigate();

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
                const cookies = new Cookies();
                cookies.set('isAdmin', props.is_admin, { path: '/' });
                navigate("/");
            } else {
                alert("Не удалось войти");
            }
        }).catch(error => {
            alert("Не удалось войти");
        });
    }

    return <div>
        <Box display="flex"
             justifyContent="center"
             alignItems="center"
             minHeight="100vh">
            <Container align="center">
                <Typography variant="h2" component="h1"> Болтушка</Typography>
                <Form onSubmit={(event) => enter(event, login)} style={{margin:25}}>
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
        </Box>
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