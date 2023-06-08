import React, {useEffect, useState} from 'react';
import useStyles from "../../style";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {change, getEntity, submit} from "../../handles";
import {connect, useDispatch} from "react-redux";
import {editUser} from "../../redux/action";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Checkbox, FormControlLabel} from "@mui/material";

function UserEdit(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();

    const emptyUser = {
        login: '',
        passwordHash: '',
        name: '',
        surname: '',
        patronymic: '',
        isAdmin: '',
    };
    const [user, setUser] = useState(emptyUser)
    const classes = useStyles();
    // Получаем редактируемую задачу
    useEffect(() => {
        getEntity('users', id, setUser);
    }, []);
    const handleChange = event => {
        change(event, setUser, user)
    }

    console.log(user)
    const title = <h2>{'Редактировать пользователя'}</h2>;
    return <div className={classes.modal}>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.editUser, user);
                navigate("/")
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
                    <Label className={classes.label} for="checkPassword">Подтверждение пароля</Label><br/>
                    <Input className={classes.input} type="text" name="checkPassword" id="checkPassword" value={user.passwordHash || ''}
                           onChange={handleChange} autoComplete="checkPassword" required/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel required control={<Checkbox value={user.isAdmin || ''}/>} label="Администратор" />
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                    <Button className={classes.button_delete} tag={Link} to="/">Отменить</Button>
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
    editUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);