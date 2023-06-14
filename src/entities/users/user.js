import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteUser, loadUsers} from "../../redux/action";
import {useNavigate} from "react-router-dom";

let currentPage = 1;
let orderDir = "desc";
let orderBy = "";
let firstRenderRef = true

function User(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();

    const handleRemoveClick = event => {
        props.deleteUser(Number(event.target.id))
    }

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        dispatch(loadUsers())
        firstRenderRef = false
    }, [])

    console.log(props);
    const userList = props.users.map(user => {
        return <tr className={classes.t_row} key={user.id}>
            <td width="16%">{user.login}</td>
            <td width="16%">{user.name}</td>
            <td width="16%">{user.surname}</td>
            <td width="16%">{user.patronymic}</td>
            <td width="16%">{user.isAdmin || ""}</td>
            <td width="16%">
                <ButtonGroup>
                    <Button className={classes.button_com} onClick={() =>
                        navigate("/users/" + user.id)}>Изменить</Button>
                    <Button id={user.id} className={classes.button_delete}
                            onClick={handleRemoveClick}>Удалить</Button>
                </ButtonGroup>
            </td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th name="login" width="16%">Логин</th>
                        <th onClick={(event) => props.ls(event)} id="name" width="16%">Имя</th>
                        <th onClick={(event) => props.ls(event)} id="surname" width="16%">Фамилия</th>
                        <th onClick={(event) => props.ls(event)} id="patronymic" width="16%">Отчество</th>
                        <th onClick={(event) => props.ls(event)} id="isAdmin" width="16%">Роль</th>
                        <th name="operations" width="16%"> Операции</th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table}>
                        <tbody>
                        {userList}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Container>
                <Table className={classes.table}>
                    <tbody>
                        <tr>
                            <td width="12%">
                                <Button align="left" className={classes.button_com} onClick={() => navigate("/users/new")}>
                                    Добавить пользователя
                                </Button>
                            </td>
                            <td width="78%"/> {/* убрать эту штуку*/}
                            <td width="10%">
                                <Pagination align="right" className={classes.mt}
                                            count={props.usersPageCount} shape="rounded"
                                            onChange={(event, page) => props.ls(event, page)}
                                            page={currentPage}
                                            defaultPage={currentPage}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        users: userReducer.users,
        usersCount: userReducer.usersCount,
        usersPageCount: userReducer.usersPageCount,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => {
            dispatch(deleteUser(id))
            dispatch(loadUsers(1, orderBy, orderDir))
        },
        ls: (event, page = 1) => {
            currentPage = page;
            if (event.target.id !== "") {
                if (event.target.id !== orderBy) {
                    orderBy = event.target.id;
                    orderDir = 'asc';
                }
                if (orderBy !== "") {
                    if (orderDir === 'desc') {
                        orderDir = 'asc'
                    } else {
                        orderDir = 'desc'
                    }
                }
            }
            dispatch(loadUsers(page, orderBy, orderDir))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
