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
        return <tr onClick={()=> { if(cookies.get('isAdmin') === 'true') navigate("/calls/"+call.id)}} className={classes.t_row} key={call.id}>
            <td width="7%">{call.id}</td>
            <td width="13%">{call.abonentName}</td>
            <td width="13%">{call.cityName}</td>
            <td width="13%">{call.date}</td>
            <td width="13%">{call.time}</td>
            <td width="13%">{call.minutes}</td>
            <td width="13%">{call.price}</td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th id="callId" width="7%">№</th>
                        <th id="abonentName" width="13%">Имя абонента</th>
                        <th id="cityName" width="13%">Название города</th>
                        <th id="date" width="13%">Дата</th>
                        <th id="time" width="13%">Время</th>
                        <th id="minutes" width="13%">Минут</th>
                        <th id="minutes" width="13%">Стоимость</th>
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
                        {cookies.get('isAdmin') === 'true' &&
                                                <td width="12%">
                            <Button align="left" className={classes.button_com} onClick={() => navigate("/calls/new")}>
                                Добавить переговор
                            </Button>
                        </td>
                        }
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
