import red from "@material-ui/core/colors/red";

export const styles = theme => ({

    editWrap: {
        backgroundColor:'#fff'
    },
    editCard: {
        paddingBottom:150,
        position:'relative'
    },
    headline: {
        marginBottom: 10,
    },
    textField: {
        marginBottom:46,
        marginTop:0,
        width: '100%',
        boxSizing: 'border-box',
        color:theme.palette.secondary.main,
        '& label': {
            fontSize:16,
            color:theme.palette.secondary.main,
        },
    },
    buttonWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.09), 0 2px 8px 5px rgba(0,0,0,0.02)',
        marginTop:70,
        padding:'16px 0',
        position:'fixed',
        bottom:0,
        width:'100%',
        backgroundColor:theme.palette.white,
    },
    userPhoto: {
        height: 64,
        width: '100%',
        padding:'0 16px 0 8px',
        display: 'flex',
        alignItems:'center',
        justifyContent:'space-between',
        margin: '0 auto',
        marginTop:'46px',
        overflow: 'hidden',
        zIndex: 2,
        backgroundColor:'#FAFAFA'
    },
    userPhotoItem: {
        width: 48,
        height: 48,
        borderRadius:100,
        objectFit: 'cover',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    uploadHidden: {
        display: 'none',
    },
    deleteIcon: {
        zIndex: 99,
        float: 'right',
    },
    errorMsg: {
        marginTop: 20,
        marginBottom: 20,
        color: red[500],
    },
    formControl: {
        width:'100%',
        marginBottom:46,
        marginTop:0,
    },
    formControlGender: {
        width:'100%',
        marginBottom:46,
        marginTop: 20,
        },
    formControlLabel: {
        fontSize:16,
        color:theme.palette.secondary.main,
    },
    title: {
        marginTop:78,
        marginBottom:42,
        fontWeight:500
    },
    inputWrap: {
        marginTop:-8
    },
    root: theme.root,
    formSelectEven: {
        marginLeft:5,
    },
    formSelectOdd: {
        marginRight:5,
    },
    button: {
        padding: '14px 55px',
        height:48,
        textTransform:'capitalize',
        fontSize:16
    },
    inputButton: {
        fontSize:12,
        textTransform:'none',
        minHeight:32,
        minWidth:80
    },
    rootAlign: {
        display:'flex',
        justifyContent:'center'
    },
    tooltip: {
        padding:'12px 35px',
        backgroundColor:theme.palette.white,
        boxShadow: '0 0 8px 0 rgba(0,0,0,0.13), 0 8px 8px 0 rgba(0,0,0,0.06)',
        position:'absolute',
        top:-55,
        right:0,
        transform:'translate(-69px)',
        '&:after': {
            content:'""',
            position:'absolute',
            bottom:-8,
            left:'50%',
            transform:'translate(-13px)',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '10px 10px 0 10px',
            borderColor: '#fff transparent transparent transparent',
        },
        '&:before': {
            content:'""',
            position:'absolute',
            top:0,
            left:0,
            width: '100%',
            height: 4,
            backgroundColor:'#00EA6B'
        },
    },
    buttonAlign: {
        position:'relative',
    },
    input: {
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: '#616161',
            opacity:1
        }
    },
    textFieldCustom: {
        marginBottom:46,
        marginTop:0,
        marginLeft:10,
        width: '94%',
        boxSizing: 'border-box',
        color:theme.palette.secondary.main,
        '& label': {
            fontSize:16,
            color:theme.palette.secondary.main,
        },
    },
    formHelperText:{
        fontSize:'12px'
    },
    inputLabelReg:{
        color:'#616161 !important'
    },
    menuItemStyle:{
        color:'#616161'
    }
});