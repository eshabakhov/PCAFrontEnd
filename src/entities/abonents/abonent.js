import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteAbonent, loadAbonents} from "../../redux/action";
import {useNavigate} from "react-router-dom";

let currentPage = 1;
let orderDir = "desc";
let orderBy = "";
let firstRenderRef = true

function Abonent(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();

    const handleRemoveClick = event => {
        props.deleteAbonent(Number(event.target.id))
    }

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        //dispatch(loadAbonents())
        firstRenderRef = false
    }, [])

    console.log(props);
    const abonentList = props.abonents.map(abonent => {
        return <tr className={classes.t_row} key={abonent.id}>
            <td width="16%">{abonent.phoneNumber}</td>
            <td width="16%">{abonent.inn}</td>
            <td width="16%">{abonent.address}</td>
            <td width="16%">
                <ButtonGroup>
                    <Button className={classes.button_com} onClick={() =>
                        navigate("/abonents/" + abonent.id)}>Изменить</Button>
                    <Button id={abonent.id} className={classes.button_delete}
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
                        <th onClick={(event) => props.ls(event)} id="phoneNumber" width="16%">Номер телефона</th>
                        <th onClick={(event) => props.ls(event)} id="inn" width="16%">ИНН</th>
                        <th onClick={(event) => props.ls(event)} id="address" width="16%">Адрес</th>
                        <th name="operations" width="16%"> Операции</th>
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
                            <Button align="left" className={classes.button_com} onClick={() => navigate("/abonents/new")}>
                                Добавить пользователя
                            </Button>
                        </td>
                        <td width="78%"/>{/* убрать эту штуку*/}
                        <td width="10%">
                            <Pagination align="right" className={classes.mt}
                                        count={props.abonentsPageCount} shape="rounded"
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
    const {abonentReducer} = state;
    return {
        abonents: abonentReducer.abonents,
        abonentsCount: abonentReducer.abonentsCount,
        abonentsPageCount: abonentReducer.abonentsPageCount,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteAbonent: (id) => {
            dispatch(deleteAbonent(id))
            dispatch(loadAbonents(1, orderBy, orderDir))
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
            dispatch(loadAbonents(page, orderBy, orderDir))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Abonent);
