import React, {useEffect, useState} from 'react';
import useStyles from "../../style";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {change, getEntity, submit} from "../../handles";
import {connect, useDispatch} from "react-redux";
import {deleteCall, deleteCity, editCall, editCity, loadCalls, loadCities} from "../../redux/action";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

let orderDir = "desc";
let orderBy = "";
function CallEdit(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();

    const emptyCall = {
        id: '',
        abonentName: '',
        cityName: '',
        date: '',
        time: '',
        minutes: '',
        price: ''
    };
    const [call, setCall] = useState(emptyCall)
    const classes = useStyles();
    // Получаем редактируемую задачу
    useEffect(() => {
        getEntity('calls', id, setCall);
    }, []);
    const handleChange = event => {
        change(event, setCall, call)
    }
    const handleRemoveClick = event => {
        props.deleteCall(Number(event.target.id))
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
            <Form onSubmit={async (event) => {
                let data = await submit(event, props.editCall, call);
                if (data.call !== false) {
                    navigate("/?tab=" + 2)
                }
            }}>
                <FormGroup>
                    <Label className={classes.label} for="login">Имя абонента</Label><br/>
                    <Input className={classes.input} type="text" name="abonentName" id="abonentName"
                           value={call.abonentName || ''}
                           onChange={handleChange} autoComplete="abonentName" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="inn">Город</Label><br/>
                    <Input className={classes.input} type="text" name="cityName" id="cityName"
                           value={call.cityName || ''}
                           onChange={handleChange} autoComplete="cityName" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="surname">Дата</Label><br/>
                    <Input className={classes.input} type="text" name="date" id="date" value={call.date || ''}
                           onChange={handleChange} autoComplete="date" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="surname">Продолжительность</Label><br/>
                    <Input className={classes.input} type="text" name="minutes" id="minutes" value={call.minutes || ''}
                           onChange={handleChange} autoComplete="minutes" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="surname">Время</Label><br/>
                    <Input className={classes.input} type="text" name="time" id="time" value={call.time || ''}
                           onChange={handleChange} autoComplete="time" required/>
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
    const {callReducer} = state;
    return {
        calls: callReducer.calls,
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