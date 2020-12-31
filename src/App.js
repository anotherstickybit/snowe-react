/* global chrome */
import React from "react"
import './App.css';
import SimpleTabs from "./component/Tabs";
import {SnackbarProvider} from "notistack";

const App = () => {
    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
            <div>
                <SimpleTabs/>
            </div>
        </SnackbarProvider>
    );
}

export default App;
