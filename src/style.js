import {createUseStyles} from "react-jss";

const def = {
    border: 0,
    color: "white",
    fontWeight: 500,
    textDecoration: 'none',
    transition: '0.3s',
    fontFamily: 'Segoe UI',
    "&:hover": {
        backgroundColor: "#8183CD"
    }
}
const button = {
    ...def,
    border: 0,
    borderRadius: 4,
    margin: 4,
    cursor: 'pointer',
    fontSize: 15,
    padding: 7
}

const mt = {
    marginTop: 10
}

const tab = {
    ...def,
    width: '10%',
    fontSize: 15,
    padding: 5
}

const useStyles = createUseStyles({
    tab_nonactive: {
        ...tab,
        backgroundColor: "#9596CD"
    },

    mt: {
        ...mt,
    },

    tab_active: {
        ...tab,
        backgroundColor: "#4e4f9b"
    },

    button_com: {
        ...button,
        backgroundColor: "#4e4f9b"
    },

    button_exit: {
        ...button,
        fontSize: 25,
        backgroundColor: "#4e4f9b",
        marginLeft: 'auto',
    },

    button_cancel: {
        ...button,
        fontSize: 40,
        backgroundColor: "#8e8e8e",
        "&:hover": {
            backgroundColor: "#c9c9c9"
        }
    },

    button_delete: {
        ...button,
        backgroundColor: "#ad0606"
    },

    label: {
        fontSize: 20,
        fontWeight: 500,
    },

    input: {
        borderRadius: 4,
        padding: 5,
        fontSize: 20,
        boxSizing: 'border-box',
        margin: 8,
    },

    control: {
        m: 1,
        display: 'block',
        width: '20%',
        minWidth: 120
    },

    titleLabel: {
        top: 10,
        fontSize: 30,
        fontWeight: 400,
        alignSelf: 'flex-start',
    },

    header_row: {
        display: 'flex',
        alignContent: 'space-between',
    },

    inputLabel: {
        top: 10,
        fontSize: 20,
        fontWeight: 400,
    },

    select: {
        height: 40,
        width: '100%',
    },

    table: {
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
        border: '1px solid #eeeeee',
        borderSpacing: '0px 15px',
        borderCollapse: 'collapse'
    },

    t_head: {
        fontWeight: 500,
        padding: 5,
        height: 40,
        background: '#efefef',
        border: '1px solid #eeeeee',
        cursor: 'pointer'
    },

    t_row: {
        height: 40,
        border: '1px solid #eeeeee',
        '&:hover': {
            background: '#f0f0ff',
        }
    },

    cont: {
        margin: 15,
        textAlign: 'left',
    },

    table_header: {
        margin: 15,
        textAlign: 'center',
    },

    bottomborder: {
        borderBottomWidth: 3,
        borderBottomStyle: 'solid',
        borderBottomColor: '#4e4f9b'
    },

    scroll_table: {
        overflowY: 'auto',
        maxHeight: '700px',
        width: '100%'
    }
});
export default useStyles;
