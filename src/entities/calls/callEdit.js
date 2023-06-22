import React, {useEffect, useState} from 'react';
import useStyles from "../../style";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {change, getEntity, submit} from "../../handles";
import {connect, useDispatch} from "react-redux";
import {deleteCall, deleteCity, editCall, editCity, loadAbonents, loadCalls, loadCities} from "../../redux/action";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

let orderDir = "desc";
let orderBy = "";
function CallEdit(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();

    const emptyCall = {
        id: '',
        abonentId: '',
        cityId: '',
        datetime: '',
        minutes: '',
        price: '',
    };
    const [call, setCall] = useState(emptyCall)
    const classes = useStyles();
    // Получаем редактируемую задачу
    useEffect(() => {
        dispatch(loadAbonents());
        dispatch(loadCities());
        getEntity('calls', id, setCall);
    }, []);
    const handleChange = event => {
        change(event, setCall, call)
    }
    const handleRemoveClick = event => {
        props.deleteCall(Number(event.target.id))
        dispatch(loadCalls())
        navigate("/?tab=" + 2)
    }

    console.log(call)
    const title = <h2>{'Редактировать переговор'}</h2>;
    return <div className={classes.modal}>
        <FormGroup>
            <Button className={classes.button_cancel} tag={Link} to={"/?tab=" + 2}>←</Button>
        </FormGroup>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.editCall, call);
                dispatch(loadCalls())
                navigate("/")
            }}>
                <FormControl className={classes.control}>
                    <InputLabel className={classes.inputLabel} for="abonentId">Имя абонента</InputLabel><br/>
                    <Select className={classes.select} name="abonentId" id="abonentId"
                            value={call.abonentId || ''} dispayEmpty
                            onChange={handleChange} required>
                        {props.abonents.map(c => {
                                return (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.name}
                                    </MenuItem>)
                            }
                        )};
                    </Select>
                </FormControl>
                <FormControl className={classes.control}>
                    <InputLabel className={classes.inputLabel} for="cityId">Город</InputLabel><br/>
                    <Select className={classes.select} name="cityId" id="cityId"
                            value={call.cityId || ''} dispayEmpty
                            onChange={handleChange} required>
                        {props.cities.map(c => {
                                return (
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.name}
                                    </MenuItem>)
                            }
                        )};
                    </Select>
                </FormControl>
                <FormGroup>
                    <Label className={classes.label} for="datetime">Дата</Label><br/>
                    <Input className={classes.input} type="text" name="datetime" id="datetime" value={call.datetime || ''}
                           onChange={handleChange} autoComplete="datetime" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="minutes">Продолжительность</Label><br/>
                    <Input className={classes.input} type="text" name="minutes" id="minutes" value={call.minutes || ''}
                           onChange={handleChange} autoComplete="minutes" required/>
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                    <Button id={call.id} className={classes.button_delete}
                            onClick={handleRemoveClick}>Удалить</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {callReducer, abonentReducer, cityReducer} = state;
    return {
        abonents: abonentReducer.abonents,
        calls: callReducer.calls,
        cities: cityReducer.cities,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCall: (id) => {
            dispatch(deleteCall(id))
            dispatch(loadCalls(1, orderBy, orderDir))
        },
        editCall: (id)=> {
            dispatch(editCall(id))
            dispatch(loadCalls(1, orderBy, orderDir))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallEdit);