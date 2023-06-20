import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteCity, loadCities} from "../../redux/action";
import {useNavigate} from "react-router-dom";
import {Cookies} from "react-cookie";

let currentPage = 1;
let firstRenderRef = true

function City(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleRemoveClick = event => {
        props.deleteCity(Number(event.target.id))
    }

    useEffect(() => {
        if (!firstRenderRef) {
            return
        }
        dispatch(loadCities())
        firstRenderRef = false
    }, [])

    console.log(props);
    const cityList = props.cities.map(city => {
        return <tr onClick={()=>navigate("/cities/"+city.id)} className={classes.t_row} key={city.id}>
            <td width="10%">{city.id}</td>
            <td width="15%">{city.name}</td>
            <td width="15%">{city.nightRate}</td>
            <td width="15%">{city.dayRate}</td>
            <td width="15%">{city.discountPercent}</td>
            <td width="15%">{city.discountCallMinutes}</td>
        </tr>
    });
    return (
        <div>
            <Container>
                <Table className={classes.table}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th id="id" width="10%">ID</th>
                        <th id="name" width="15%">Название города</th>
                        <th id="nightRate" width="15%">Тариф ночной</th>
                        <th id="dayRate" width="15%">Тариф дневной</th>
                        <th id="discountPercent" width="15%">Размер скидки</th>
                        <th id="discountCallMinutes" width="15%">Порог скидки</th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table}>
                        <tbody>
                        {cityList}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Container>
                <Table className={classes.table}>
                    <tbody>
                    <tr>
                        <td width="12%">
                            <Button align="left" className={classes.button_com} onClick={() => navigate("/cities/new")}>
                                Добавить город
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
    const {cityReducer,userReducer} = state;
    return {
        is_admin: userReducer.is_admin,
        cities: cityReducer.cities,
        currentPage: cityReducer.currentPage,
        pageSize: cityReducer.pageSize,
        total: cityReducer.total
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteCity: (id) => {
            dispatch(deleteCity(id))
            dispatch(loadCities(1))
        },
        ls: (event, page = 1) => {
            currentPage = page;
            dispatch(loadCities(page))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(City);
