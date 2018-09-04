export const styles = theme => ({
    popper: {
        zIndex: 10,
        marginTop: 8,
        '&[x-placement*="bottom"] $arrowBlack': {
            '&::before': {
                borderColor: `${theme.palette.common.black} ${theme.palette.common.black} transparent  transparent`,
            }
        },
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-1.8em',
            width: '3em',
            height: '1.8em',

            '&::before': {
                borderColor: `${theme.palette.common.white} ${theme.palette.common.white} transparent  transparent`,
                marginTop: "2em",
                marginLeft: "0em",
                left: "50%",
                boxSizing: "border-box",
                border: "1em solid black",
                transformOrigin: "0 0",
                transform: "rotate(-45deg)",
                boxShadow: "0px 2px 2px 0 rgba(0, 0, 0, 0.12)",

            },
        },

        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-1.8em',
            width: '3em',
            height: '1.8em',

            '&::before': {
                marginLeft: "0em",
                bottom: "-2em",
                left: "50%",
                boxSizing: "border-box",
                border: "1em solid black",
                borderColor: `transparent transparent ${theme.palette.common.white} ${theme.palette.common.white}`,
                transformOrigin: "0 0",
                transform: "rotate(-45deg)",
                boxShadow: "-2px 2px 2px 0 rgba(0, 0, 0, 0.2)",
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-1.8em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-1.8em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
            },
        },

    },
    arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        overflow: "hidden",
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    arrowBlack: {},
    title: {
        textAlign: "center",
        padding: '11px 16px 11px 16px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        borderRadius: "4px 4px 0 0"
    }
});


export default styles;