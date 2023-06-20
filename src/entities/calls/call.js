import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteCall, loadCalls} from "../../redux/action";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

let currentPage = 1;
let firstRenderRef = true

function Call(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleRemoveClick = event => {
        props.deleteCall(Number(event.target.id))
    }

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        dispatch(loadCalls())
        firstRenderRef = false
    }, [])

    console.log(props);
    const callList = props.calls.map(call => {
        return <tr className={classes.t_row} key={call.id}>
            <td width="5%">{call.id}</td>
            <td width="16%">{call.abonentName}</td>
            <td width="16%">{call.cityName}</td>
            <td width="16%">{call.date}</td>
            <td width="16%">{call.time}</td>
            <td width="16%">{call.minutes}</td>
            <td width="16%">
                {cookies.get('isAdmin') &&
                    <ButtonGroup>
                        <Button className={classes.button_com} onClick={() =>
                            navigate("/calls/" + call.id)}>Изменить</Button>
                        <Button id={call.id} className={classes.button_delete}
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
                        <th id="calId" width="5%">ID</th>
                        <th id="abonentName" width="16%">Имя абонента</th>
                        <th id="cityName" width="16%">Название города</th>
                        <th id="date" width="16%">Дата</th>
                        <th id="time" width="16%">Время</th>
                        <th id="minutes" width="16%">Минут</th>
                        <th name="operations" width="16%"></th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table}>
                        <tbody>
                        {callList}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Container>
                <Table className={classes.table}>
                    <tbody>
                    <tr>
                        <td width="12%">
                            <Button align="left" className={classes.button_com} onClick={() => navigate("/calls/new")}>
                                Добавить переговор
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
    const {callReducer, userReducer} = state;
    return {
        is_admin: userReducer.is_admin,
        calls: callReducer.calls,
        currentPage: callReducer.currentPage,
        pageSize: callReducer.pageSize,
        total: callReducer.total
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteCall: (id) => {
            dispatch(deleteCall(id))
            dispatch(loadCalls(1))
        },
        ls: (event, page = 1) => {
            currentPage = page;
            dispatch(loadCalls(page))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Call);
