import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotRequireAuth from "./components/auth/NotRequireAuth";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import RequireAuth from "./components/auth/RequireAuth";
import HomePage from "./components/pages/HomePage";
import ErrorPage from "./components/pages/ErrorPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


function App() {
  return (
    <div>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route
                    path='/login'
                    element={<NotRequireAuth>
                        <LoginPage/>
                    </NotRequireAuth>}>
                </Route>
                <Route
                    path='/register'
                    element={<NotRequireAuth>
                        <RegisterPage/>
                    </NotRequireAuth>}>
                </Route>
                <Route
                    path='/'
                    element={<RequireAuth>
                        <HomePage/>
                    </RequireAuth>}>
                </Route>
                <Route
                    path="*"
                    element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>


  );
}

export default App;
