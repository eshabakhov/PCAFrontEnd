import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useStyles from "../../style";
import {change, submit} from "../../handles";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {addCall, loadAbonents, loadCities} from "../../redux/action";
import {connect, useDispatch} from "react-redux";
import {abonentReducer} from "../../redux/abonentReducer";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {cityReducer} from "../../redux/cityReducer";

function CallAdd(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    useEffect(() => {
        dispatch(loadAbonents());
        dispatch(loadCities());
    }, []);
    const handleChange = event => {
        change(event, setCall, call)
    }
    console.log(call)
    const title = <h2>{'Добавить переговор'}</h2>;
    return <div className={classes.modal}>
        <FormGroup>
            <Button className={classes.button_cancel} tag={Link} to={"/?tab=" + 2}>←</Button>
        </FormGroup>
        <Container align="center">
            {title}
            <Form onSubmit={async (event) => {
                let data = await submit(event, props.addCall, call);
                if (data.call !== false) {
                    navigate("/?tab=" + 2)
                }
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

const mapDispatchToProps = {
    addCall
}

export default connect(mapStateToProps, mapDispatchToProps)(CallAdd);