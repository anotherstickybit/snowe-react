import React from "react"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {makeStyles} from "@material-ui/styles";
import TemplatesPage from "./TemplatesPage";
import NewTemplatePage from "./NewTemplatePage";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    tabPanel: {
        marginBottom: '5px'
    }
}));

const SimpleTabs = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="absolute">
                <Tabs value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                      centered
                >
                    <Tab label="Templates" {...a11yProps(0)} color={'#fff5c0'}/>
                    <Tab label="Add Custom Template" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
               <TemplatesPage />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <NewTemplatePage />
            </TabPanel>
        </div>
    );
}

export default SimpleTabs;