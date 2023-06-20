import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteAbonent, loadAbonents} from "../../redux/action";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

let currentPage = 1;
let firstRenderRef = true

function Abonent(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleRemoveClick = event => {
        props.deleteAbonent(Number(event.target.id))
    }

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        dispatch(loadAbonents())
        firstRenderRef = false
    }, [])

    console.log(props);
    const abonentList = props.abonents.map(abonent => {
        return <tr className={classes.t_row} key={abonent.id}>
            <td width="5%">{abonent.id}</td>
            <td width="16%">{abonent.phoneNumber}</td>
            <td width="16%">{abonent.inn}</td>
            <td width="16%">{abonent.address}</td>
            <td width="16%">{abonent.name}</td>
            <td width="16%">
                {cookies.get('isAdmin') &&
                    <ButtonGroup>
                        <Button className={classes.button_com} onClick={() =>
                            navigate("/abonents/" + abonent.id)}>Изменить</Button>
                        <Button id={abonent.id} className={classes.button_delete}
                        onClick={handleRemoveClick}>Удалить</Button>
                </ButtonGroup>
                    }
            </td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th id="id" width="5%">ID</th>
                        <th id="phoneNumber" width="16%">Номер телефона</th>
                        <th id="inn" width="16%">ИНН</th>
                        <th id="address" width="16%">Адрес</th>
                        <th id="name" width="16%">Имя</th>
                        <th name="operations" width="16%"></th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table}>
                        <tbody>
                        {abonentList}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Container>
                <Table className={classes.table}>
                    <tbody>
                    <tr>
                        <td width="12%">
                            <Button align="left" className={classes.button_com}
                                    onClick={() => navigate("/abonents/new")}>
                                Добавить абонента
                            </Button>
                        </td>
                        <td width="70%"/>
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
    const {abonentReducer,userReducer} = state;
    return {
        is_admin: userReducer.is_admin,
        abonents: abonentReducer.abonents,
        currentPage: abonentReducer.currentPage,
        pageSize: abonentReducer.pageSize,
        total: abonentReducer.total
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteAbonent: (id) => {
            dispatch(deleteAbonent(id))
            dispatch(loadAbonents(1))
        },
        ls: (event, page = 1) => {
            currentPage = page;
            dispatch(loadAbonents(page))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Abonent);
