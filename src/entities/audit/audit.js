import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {loadAudits} from "../../redux/action";
import {useNavigate} from "react-router-dom";

let currentPage = 1;
let orderDir = "desc";
let orderBy = "";
let firstRenderRef = true

function Audit(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        dispatch(loadAudits())
        firstRenderRef = false
    }, [])

    console.log(33333, props);
    const auditList = props.audits.map(audit => {
        return <tr className={classes.t_row} key={audit.id}>
            <td width="5%">{audit.id}</td>
            <td width="16%">{audit.username}</td>
            <td width="16%">{audit.endpoint}</td>
            <td width="16%">{audit.method}</td>
            <td width="16%">{audit.datetime}</td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th onClick={(event) => props.ls(event)} id="id" width="5%">ID</th>
                        <th onClick={(event) => props.ls(event)} id="username" width="16%">Имя пользователя</th>
                        <th onClick={(event) => props.ls(event)} id="endpoint" width="16%">Адрес</th>
                        <th onClick={(event) => props.ls(event)} id="method" width="16%">Метод</th>
                        <th onClick={(event) => props.ls(event)} id="datetime" width="16%">Дата и время</th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table}>
                        <tbody>
                        {auditList}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Container>
                <Table className={classes.table}>
                    <tbody>
                    <tr>
                        <td>
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
    const {auditReducer} = state;
    return {
        audits: auditReducer.audits,
        currentPage: auditReducer.currentPage,
        pageSize: auditReducer.pageSize,
        total: auditReducer.total
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
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
            dispatch(loadAudits(page, orderBy, orderDir))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Audit);
