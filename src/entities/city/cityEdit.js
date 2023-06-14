import React, {useEffect, useState} from 'react';
import useStyles from "../../style";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {change, getEntity, submit} from "../../handles";
import {connect, useDispatch} from "react-redux";
import {editCity} from "../../redux/action";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

function CityEdit(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();

    const emptyCity = {
        phoneNumber: '',
        inn: '',
        address: '',
    };
    const [city, setCity] = useState(emptyCity)
    const classes = useStyles();
    // Получаем редактируемую задачу
    useEffect(() => {
        getEntity('cities', id, setCity);
    }, []);
    const handleChange = event => {
        change(event, setCity, city)
    }

    console.log(city)
    const title = <h2>{'Редактировать абонента'}</h2>;
    return <div className={classes.modal}>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.editCity, city);
                navigate("/")
            }}>
                <FormGroup>
                    <Label className={classes.label} for="phoneNumber">Номер телефона</Label><br/>
                    <Input className={classes.input} type="text" name="phoneNumber" id="phoneNumber" value={city.phoneNumber || ''}
                           onChange={handleChange} autoComplete="phoneNumber" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="inn">Инн</Label><br/>
                    <Input className={classes.input} type="text" name="inn" id="inn" value={city.inn || ''}
                           onChange={handleChange} autoComplete="inn" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="address">Адрес</Label><br/>
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
    editCity
}

export default connect(mapStateToProps, mapDispatchToProps)(CityEdit);