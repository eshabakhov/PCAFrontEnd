import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useStyles from "../../style";
import {change, submit} from "../../handles";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {addCity} from "../../redux/action";
import {connect, useDispatch} from "react-redux";

function CityAdd(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    useEffect(() => {
    }, []);
    const handleChange = event => {
        change(event, setCity, city)
    }
    console.log(city)
    const title = <h2>{'Добавить город'}</h2>;
    return <div className={classes.modal}>
        <FormGroup>
            <Button className={classes.button_cancel} tag={Link} to={"/?tab=" + 1}>←</Button>
        </FormGroup>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.addCity, city);
                navigate("/?tab=" + 1)
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
    addCity
}

export default connect(mapStateToProps, mapDispatchToProps)(CityAdd);