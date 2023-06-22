import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteUser, loadUsers} from "../../redux/action";
import {useNavigate} from "react-router-dom";

let currentPage = 1;
let firstRenderRef = true

function User(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        dispatch(loadUsers())
        firstRenderRef = false
    }, [])

    console.log(props);
    const userList = props.users.map(user => {
        return <tr onClick={()=>navigate("/users/"+user.id)} className={classes.t_row} key={user.id}>
            <td width="10%">{user.id}</td>
            <td width="18%">{user.login}</td>
            <td width="18%">{user.name}</td>
            <td width="18%">{user.surname}</td>
            <td width="18%">{user.patronymic}</td>
            <td width="18%">{user.isAdmin || ""}</td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th name="ID" width="10%">№</th>
                        <th name="login" width="18%">Логин</th>
                        <th id="name" width="18%">Имя</th>
                        <th id="surname" width="18%">Фамилия</th>
                        <th id="patronymic" width="18%">Отчество</th>
                        <th id="isAdmin" width="18%">Роль</th>
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
                            <td width="70%"/>{/* убрать эту штуку*/}
                            <td width="18%">
                                <Pagination align="right" className={classes.mt}
                                            count={Math.ceil(props.total / props.pageSize)} shape="rounded"
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
        currentPage: userReducer.currentPage,
        pageSize: userReducer.pageSize,
        total: userReducer.total
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => {
            dispatch(deleteUser(id))
            dispatch(loadUsers(1))
        },
        ls: (event, page = 1) => {
            currentPage = page;
            dispatch(loadUsers(page))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
