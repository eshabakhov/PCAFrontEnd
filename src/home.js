import User from './entities/users/user';
import React, {useEffect, useState} from 'react';
import useStyles from "./style";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container, FormGroup, Input, Label} from 'reactstrap';
import {connect, useDispatch} from "react-redux";
import Abonent from "./entities/abonents/abonent";
import Call from "./entities/calls/call";
import City from "./entities/city/city";
import Audit from "./entities/audit/audit";
import {logout} from "./redux/action";
import {Cookies} from "react-cookie";
import Pagination from "@mui/material/Pagination";

function Home(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const search = useLocation().search;
    const tab = new URLSearchParams(search).get('tab');
    const [activeTab, setActiveTab] = useState(tab ? Number(tab) : 0);
    const dispatch = useDispatch()
    const cookies = new Cookies();

    useEffect(() => {
    })

    const tabs = [
        {title: 'Абоненты', component: <Abonent/>},
        {title: 'Города', component: <City/>},
        {title: 'Переговоры', component: <Call/>},
    ];

    if (cookies.get('isAdmin') === 'true') {
        tabs.push({title: 'Пользователи', component: <User/>});
        tabs.push({title: 'Аудит', component: <Audit/>});

    }
    // Смена вкладки
    const openTab = event => {
        setActiveTab(Number(event.target.id));
    }

    const TabContent = ({title, component}) => (
        <div>
            <h3 className={classes.table_header}>{title}</h3>
            {component}
        </div>
    );

    return <div>
        <Container className={classes.cont}>
            <div className={classes.header_row}>
                <Label className={classes.titleLabel} for="title">Болтушка</Label><br/>
                <Button className={classes.button_exit} onClick={() => {dispatch(logout);navigate('/login')}}>➥</Button>
            </div>
            <div className={classes.bottomborder}>
                {tabs.map((tab, i) => (
                    <Button key={i} id={i} onClick={openTab}
                            className={i === activeTab ? classes.tab_active : classes.tab_nonactive}>
                        {tab.title}
                    </Button>
                ))}
            </div>
            {<TabContent {...tabs[activeTab]} />}
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        is_admin: userReducer.is_admin
    }
}


const mapDispatchToProps = (dispatch) => {
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
