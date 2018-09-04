import React from 'react'

import grey from '@material-ui/core/colors/grey';

export const styles = theme => ({


    textField: {
        width: '256px',
        objectFit: 'contain',
        margin: '0 auto',
        marginTop: '34px',
        color: '#616161'
    },

    list: {
        width: 260
    },
    textInPaper: {
        color: 'black',
        fontSize: '16px',
        fontFamily: 'Rubik',
        borderRadius: '4px !important',
    },

    inputLabel: {
        marginTop: '0px'
    },
    studentOption: {
        padding: '5px',
        cursor: 'pointer',
        position: 'relative',
        width: '260px',
        display: 'flex',
        '&:hover': {
            backgroundColor: '#fafafa',
            '& $studentOptionCheck': {
                display: 'block'
            }
        }
    },
    studentOptionCheck: {
        position: 'absolute',
        right: '0px',
        top: '19px',
        paddingBottom: '12px',
        display: 'none'
    },
    studentOptionImg: {
        height: '32px',
        width: '32px',
        borderRadius: '20px',
        marginRight: '20px',
        marginTop: '10px',
        marginLeft: '5px'
    },
    isStudentOptionCheck: {
        display: 'block'
    },
    overflow:{
        whiteSpace: "nowrap",
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width:'10rem'
    }
});
