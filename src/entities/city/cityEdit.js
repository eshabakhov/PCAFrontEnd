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
        id: '',
        nightRate: '',
        dayRate: '',
        name: '',
        discountPercent: '',
        discountCallMinutes: ''
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
    const title = <h2>{'Редактировать города'}</h2>;
    return <div className={classes.modal}>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.editCity, city);
                navigate("/")
            }}>
                <FormGroup>
                    <Label className={classes.label} for="name">Название города</Label><br/>
                    <Input className={classes.input} type="text" name="name" id="name"
                           value={city.name || ''}
                           onChange={handleChange} autoComplete="phoneNumber" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="nightRate">Тариф ночной</Label><br/>
                    <Input className={classes.input} type="text" name="nightRate" id="nightRate"
                           value={city.nightRate || ''}
                           onChange={handleChange} autoComplete="nightRate" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="dayRate">Тариф дневной</Label><br/>
                    <Input className={classes.input} type="text" name="dayRate" id="dayRate" value={city.dayRate || ''}
                           onChange={handleChange} autoComplete="dayRate" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="discountPercent">Размер скидки</Label><br/>
                    <Input className={classes.input} type="text" name="discountPercent" id="discountPercent"
                           value={city.discountPercent || ''}
                           onChange={handleChange} autoComplete="discountPercent" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="discountCallMinutes">Порог скидки</Label><br/>
                    <Input className={classes.input} type="text" name="discountCallMinutes" id="discountCallMinutes"
                           value={city.discountCallMinutes || ''}
                           onChange={handleChange} autoComplete="discountCallMinutes" required/>
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