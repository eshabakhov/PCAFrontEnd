import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';

import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import Pagination from '@mui/material/Pagination';
import useStyles from "../../style";
import {deleteCity, loadCities} from "../../redux/action";
import {useNavigate} from "react-router-dom";

let currentPage = 1;
let orderDir = "desc";
let orderBy = "";
let firstRenderRef = true

function City(props) {
    const dispatch = useDispatch()

    const classes = useStyles();
    const navigate = useNavigate();

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
        return <tr className={classes.t_row} key={city.id}>
            <td width="5%">{city.id}</td>
            <td width="16%">{city.name}</td>
            <td width="16%">{city.nightRate}</td>
            <td width="16%">{city.dayRate}</td>
            <td width="16%">{city.discountPercent}</td>
            <td width="16%">{city.discountCallMinutes}</td>
            <td width="16%">
                <ButtonGroup>
                    <Button className={classes.button_com} onClick={() =>
                        navigate("/cities/" + city.id)}>Изменить</Button>
                    <Button id={city.id} className={classes.button_delete}
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
                        <th onClick={(event) => props.ls(event)} id="id" width="5%">ID</th>
                        <th onClick={(event) => props.ls(event)} id="name" width="16%">Название города</th>
                        <th onClick={(event) => props.ls(event)} id="nightRate" width="16%">Тариф ночной</th>
                        <th onClick={(event) => props.ls(event)} id="dayRate" width="16%">Тариф дневной</th>
                        <th onClick={(event) => props.ls(event)} id="discountPercent" width="16%">Размер скидки</th>
                        <th onClick={(event) => props.ls(event)} id="discountCallMinutes" width="16%">Порог скидки</th>
                        <th name="operations" width="16%"></th>
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
                        <td width="78%"/>
                        <td width="10%">
                            <Pagination align="right" className={classes.mt}
                                        count={props.citiesPageCount} shape="rounded"
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
    const {cityReducer} = state;
    return {
        cities: cityReducer.cities,
        citiesCount: cityReducer.citiesCount,
        citiesPageCount: cityReducer.citiesPageCount,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteCity: (id) => {
            dispatch(deleteCity(id))
            dispatch(loadCities(1, orderBy, orderDir))
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
            dispatch(loadCities(page, orderBy, orderDir))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(City);
