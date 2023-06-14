import Animal from './entities/users/user';
import {useEffect, useState} from 'react';
import useStyles from "./style";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Container} from 'reactstrap';
import {connect} from "react-redux";
import User from "./entities/users/user";
import Abonent from "./entities/abonents/abonent";

function Home(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const search = useLocation().search;
    const tab = new URLSearchParams(search).get('tab');
    const [activeTab, setActiveTab] = useState(tab ? Number(tab) : 0);

    useEffect(() => {
    })

    const tabs = [
        {title: 'Пользователи', component: <User/>},
        {title: 'Абоненты', component: <Abonent/>},
    ];
    // Смена вкладки
    const openTab = event => {
        setActiveTab(Number(event.target.id));
    }

    const TabContent = ({title, component}) => (
        <div>
            <h3>{title}</h3>
            {component}
        </div>
    );

    return <div>
        <Container className={classes.cont}>
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
    const {authReducer} = state;
    return {
    }
}


const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
