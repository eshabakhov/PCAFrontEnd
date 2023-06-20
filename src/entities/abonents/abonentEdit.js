import React, {useEffect, useState} from 'react';
import useStyles from "../../style";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {change, getEntity, submit} from "../../handles";
import {connect, useDispatch} from "react-redux";
import {editAbonent} from "../../redux/action";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Checkbox, FormControlLabel} from "@mui/material";

function AbonentEdit(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {id} = useParams();

    const emptyAbonent = {
        id: '',
        phoneNumber: '',
        inn: '',
        address: '',
        name: '',
    };
    const [abonent, setAbonent] = useState(emptyAbonent)
    const classes = useStyles();
    // Получаем редактируемую задачу
    useEffect(() => {
        getEntity('abonents', id, setAbonent);
    }, []);
    const handleChange = event => {
        change(event, setAbonent, abonent)
    }

    console.log(abonent)
    const title = <h2>{'Редактировать абонента'}</h2>;
    return <div className={classes.modal}>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => {
                submit(event, props.editAbonent, abonent);
                navigate("/")
            }}>
                <FormGroup>
                    <Label className={classes.label} for="phoneNumber">Номер телефона</Label><br/>
                    <Input className={classes.input} type="text" name="phoneNumber" id="phoneNumber" value={abonent.phoneNumber || ''}
                           onChange={handleChange} autoComplete="phoneNumber" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="inn">ИНН</Label><br/>
                    <Input className={classes.input} type="text" name="inn" id="inn" value={abonent.inn || ''}
                           onChange={handleChange} autoComplete="inn" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="address">Адрес</Label><br/>
                    <Input className={classes.input} type="text" name="address" id="address" value={abonent.address || ''}
                           onChange={handleChange} autoComplete="address" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="name">Имя</Label><br/>
                    <Input className={classes.input} type="text" name="name" id="name" value={abonent.name || ''}
                           onChange={handleChange} autoComplete="name" required/>
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                    <Button className={classes.button_cancel} tag={Link} to="/">Отменить</Button>
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
    editAbonent
}

export default connect(mapStateToProps, mapDispatchToProps)(AbonentEdit);