import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useStyles from "../../style";
import {change, submit} from "../../handles";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {addUser} from "../../redux/action";
import {connect, useDispatch} from "react-redux";
import {Checkbox, FormControlLabel} from "@mui/material";

function UserAdd(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const label = { inputProps: { 'aria-label': 'Администратор' } };

    const emptyUser = {
        login: '',
        passwordHash: '',
        passwordCheck: '',
        name: '',
        surname: '',
        patronymic: '',
        isAdmin: false,
    };
    const [user, setUser] = useState(emptyUser)
    const [checked, setChecked] = useState(true)

    const classes = useStyles();
    useEffect(() => {
    }, []);
    const handleChange = event => {
        change(event, setUser, user)
        console.log(event)
    }
    const handleChangeCheckBox = event => {
        console.log(event.target.checked)
        setChecked(event.target.checked)
        user.isAdmin=event.target.checked
    }

    console.log(user)
    const title = <h2>{'Добавить пользователя'}</h2>;
    return <div className={classes.modal}>
        <FormGroup>
            <Button className={classes.button_cancel} tag={Link} to="/">←</Button>
        </FormGroup>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                if (user.passwordHash !== user.passwordCheck) {
                    alert("Пароли не совпадают");
                } else {
                    submit(event, props.addUser, user);
                    navigate("/users/")
                }
            }}>
                <FormGroup>
                    <Label className={classes.label} for="login">Логин</Label><br/>
                    <Input className={classes.input} type="text" name="login" id="login" value={user.login || ''}
                           onChange={handleChange} autoComplete="login" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="name">Имя</Label><br/>
                    <Input className={classes.input} type="text" name="name" id="name" value={user.name || ''}
                           onChange={handleChange} autoComplete="name" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="surname">Фамилия</Label><br/>
                    <Input className={classes.input} type="text" name="surname" id="surname" value={user.surname || ''}
                           onChange={handleChange} autoComplete="surname" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="patronymic">Отчество</Label><br/>
                    <Input className={classes.input} type="text" name="patronymic" id="patronymic" value={user.patronymic || ''}
                           onChange={handleChange} autoComplete="patronymic" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="passwordHash">Пароль</Label><br/>
                    <Input className={classes.input} type="text" name="passwordHash" id="passwordHash" value={user.passwordHash || ''}
                           onChange={handleChange} autoComplete="passwordHash" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="passwordCheck">Подтверждение пароля</Label><br/>
                    <Input className={classes.input} type="text" name="passwordCheck" id="passwordCheck" value={user.passwordCheck || ''}
                           onChange={handleChange} autoComplete="passwordCheck" required/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control=
                        {
                            <Checkbox className={classes.input} type="checkbox" onChange={handleChangeCheckBox}
                            value={user.isAdmin} name="isAdmin" id="isAdmin" autoComplete="isAdmin"/>
                        }
                        label="Администратор"
                   />
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                </FormGroup>
            </Form>
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        users: userReducer.users,
    }
}

const mapDispatchToProps = {
    addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);