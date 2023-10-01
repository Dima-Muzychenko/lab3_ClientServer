//щоб усе прауювали - потрібно запустити також бекенд (сервер)
import React from "react";
import { BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NovBar from "./components/Novbar";
function App() {
    return (
        <BrowserRouter>
            <NovBar/>
            <AppRouter/>
        </BrowserRouter> );
} export default App;
