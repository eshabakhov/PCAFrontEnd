import React, {useEffect, useState} from 'react';
import useStyles from "../../style";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {change, getEntity, submit} from "../../handles";
import {connect, useDispatch} from "react-redux";
import {deleteUser, editUser, loadUsers} from "../../redux/action";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Checkbox, FormControlLabel} from "@mui/material";

let orderDir = "desc";
let orderBy = "";
function UserEdit(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();

    const emptyUser = {
        login: '',
        passwordHash: '',
        passwordCheck:'',
        name: '',
        surname: '',
        patronymic: '',
        isAdmin: '',
    };
    const [user, setUser] = useState(emptyUser)
    const [checked, setChecked] = useState(true)

    const classes = useStyles();
    // Получаем редактируемую задачу
    useEffect(() => {
        getEntity('users', id, setUser);
    }, []);
    const handleChange = event => {
        change(event, setUser, user)
    }
    const handleRemoveClick = event => {
        props.deleteUser(Number(event.target.id))
        navigate("/users/")
    }
    const handleChangeCheckBox = event => {
        console.log(event.target.checked)
        setChecked(event.target.checked)
        user.isAdmin=event.target.checked
    }

    console.log(user)
    const title = <h2>{'Редактировать пользователя'}</h2>;
    return <div className={classes.modal}>
        <FormGroup>
            <Button className={classes.button_cancel} tag={Link} to={"/?tab=" + 3}>←</Button>
        </FormGroup>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                if (user.passwordHash !== user.passwordCheck) {
                    alert("Пароли не совпадают");
                } else {
                    submit(event, props.editUser, user);
                    navigate("/?tab=" + 3)
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
                    <Input className={classes.input} type="password" name="passwordHash" id="passwordHash" value={user.passwordHash || ''}
                           onChange={handleChange} autoComplete="passwordHash" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="passwordCheck">Подтверждение пароля</Label><br/>
                    <Input className={classes.input} type="password" name="passwordCheck" id="passwordCheck" value={user.passwordCheck || ''}
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
                    <Button id={user.id} className={classes.button_delete}
                            onClick={handleRemoveClick}>Удалить</Button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => {
            dispatch(deleteUser(id))
            dispatch(loadUsers(1, orderBy, orderDir))
        },
        editUser: (id)=> {
            dispatch(editUser(id))
            dispatch(loadUsers(1, orderBy, orderDir))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);