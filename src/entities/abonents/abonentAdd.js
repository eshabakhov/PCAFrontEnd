import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useStyles from "../../style";
import {change, submit} from "../../handles";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {addAbonent} from "../../redux/action";
import {connect, useDispatch} from "react-redux";
import {Checkbox, FormControlLabel} from "@mui/material";

function AbonentAdd(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emptyAbonent = {
        phoneNumber: '',
        inn: '',
        address: '',
    };
    const [abonent, setAbonent] = useState(emptyAbonent)

    const classes = useStyles();
    useEffect(() => {
    }, []);
    const handleChange = event => {
        change(event, setAbonent, abonent)
    }
    console.log(abonent)
    const title = <h2>{'Добавить абонента'}</h2>;
    return <div className={classes.modal}>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.addAbonent, abonent);
                navigate("/?tab=" + 0)
            }}>
                <FormGroup>
                    <Label className={classes.label} for="login">Номер телефона</Label><br/>
                    <Input className={classes.input} type="text" name="phonenumber" id="phonenumber" value={abonent.phoneNumber || ''}
                           onChange={handleChange} autoComplete="phoneNumber" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="inn">ИНН</Label><br/>
                    <Input className={classes.input} type="text" name="inn" id="inn" value={abonent.inn || ''}
                           onChange={handleChange} autoComplete="inn" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="surname">Адрес</Label><br/>
                    <Input className={classes.input} type="text" name="address" id="address" value={abonent.address || ''}
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
    const {abonentReducer} = state;
    return {
        abonents: abonentReducer.abonents,
    }
}

const mapDispatchToProps = {
    addAbonent
}

export default connect(mapStateToProps, mapDispatchToProps)(AbonentAdd);