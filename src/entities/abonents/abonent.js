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
        return <tr  onClick={()=>navigate("/abonents/"+abonent.id)} className={classes.t_row} key={abonent.id}>
            <td width="14%">{abonent.id}</td>
            <td width="24%">{abonent.phoneNumber}</td>
            <td width="24%">{abonent.inn}</td>
            <td width="24%">{abonent.address}</td>
            <td width="24%">{abonent.name}</td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th id="id" width="14%">ID</th>
                        <th id="phoneNumber" width="24%">Номер телефона</th>
                        <th id="inn" width="24%">ИНН</th>
                        <th id="address" width="24%">Адрес</th>
                        <th id="name" width="24%">Имя</th>
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
