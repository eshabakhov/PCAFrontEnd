import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useStyles from "../../style";
import {change, submit} from "../../handles";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {addAbonent} from "../../redux/action";
import {connect, useDispatch} from "react-redux";

function AbonentAdd(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emptyAbonent = {
        phoneNumber: '',
        inn: '',
        address: '',
    };
    const [city, setAbonent] = useState(emptyAbonent)

    const classes = useStyles();
    useEffect(() => {
    }, []);
    const handleChange = event => {
        change(event, setAbonent, city)
    }
    console.log(city)
    const title = <h2>{'Добавить абонента'}</h2>;
    return <div className={classes.modal}>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.addAbonent, city);
                navigate("/?tab=" + 0)
            }}>
                <FormGroup>
                    <Label className={classes.label} for="phoneNumber">Номер телефона</Label><br/>
                    <Input className={classes.input} type="text" name="phoneNumber" id="phoneNumber"
                           value={city.phoneNumber || ''}
                           onChange={handleChange} autoComplete="phoneNumber" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="inn">ИНН</Label><br/>
                    <Input className={classes.input} type="text" name="inn" id="inn" value={city.inn || ''}
                           onChange={handleChange} autoComplete="inn" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="surname">Адрес</Label><br/>
                    <Input className={classes.input} type="text" name="address" id="address" value={city.address || ''}
                           onChange={handleChange} autoComplete="address" required/>
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                    <Button className={classes.button_delete} tag={Link} to="/">Отменить</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {cityReducer} = state;
    return {
        cities: cityReducer.cities,
    }
}

const mapDispatchToProps = {
    addAbonent
}

export default connect(mapStateToProps, mapDispatchToProps)(AbonentAdd);