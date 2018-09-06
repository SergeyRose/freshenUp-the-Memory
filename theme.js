import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const theme = (outerTheme) => {
    const typography = {
        ...outerTheme.typography,
        fontFamily: 'Rubik',
        fontSize: 16,
        fontWeight: 'normal',
        color: '#212121',
        [outerTheme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
        title: {
            fontSize: 24,
            fontFamily: 'Rubik',
            fontWeight: 'normal',
            lineHeight: "1.33",
            color: '#212121',
        },
        subheading: {
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Rubik',
            // color:'#fff',
            color: '#212121',
        },
        body1: {
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Rubik',
            color: '#616161',
        },
        button:{
            fontFamily: 'Rubik',
            fontSize: 16,
            fontWeight: 'normal',
            color: '#212121',
        },
        caption: {
            fontFamily: 'Rubik',
            fontSize: 12,
            fontWeight: 'normal',
            lineHeight: "1.75",
            letterSpacing: "0.4px",
            color: '#212121',
        },
    };
    const palette = {
        ...outerTheme.palette,
        primary: {
            ...outerTheme.palette.primary,
            main: '#304FFE',
            activity: '#FE9A10',
        },
        secondary: {
            ...outerTheme.palette.secondary,
            light: '#F6F6F6',
            main: '#616161',
            dark: '#212121',
        },
        black: '#212121',
        white: '#fff',
    };
    return {
        ...outerTheme,
        palette,
        typography,

        root: {
            margin: '0 auto',
            maxWidth: '1281px',
            width: '100%',
        },
        overrides: {
            MuiLinearProgress: {
                root: {
                    height: 8,
                },
                colorPrimary: {
                    backgroundColor: '#E0E0E0',
                    borderRadius: 3,
                },
                barColorPrimary: {
                    backgroundColor: palette.primary.activity,
                },
            },
            MuiCircularProgress: {
                colorPrimary: {
                    color: '#304FFE',
                }
            },
            MuiMobileStepper: {
                progress: {
                    width: '100%',
                }
            },
            MuiFormControlLabel: {
                label: {
                    fontSize: 14
                }
            },
            MuiFormLabel: {
                root: {
                    color: '#616161 !important',
                },
                focused: {
                    color: '#616161 !important'
                },
                // asterisk: {
                //     display:'none'
                // },
            },
            MuiButton: {
                contained: {
                    backgroundColor: '#fafafa'
                }
            },
            MuiPaper: {
                elevation4: {
                    boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 2px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
                }
            },
        },
    }
};


const outerTheme = createMuiTheme();

const Theme = (sheetsManager) => ({children, ...props}) => (
    <MuiThemeProvider theme={outerTheme} sheetsManager={sheetsManager}>
        <MuiThemeProvider theme={theme} {...props}>
            <CssBaseline/>
            {children}
        </MuiThemeProvider>
    </MuiThemeProvider>
);

export default Theme;

