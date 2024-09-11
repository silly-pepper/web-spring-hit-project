import {Navbar, Image, Form} from "react-bootstrap";
import LogOutButton from "../auth/LogOutButton";
import {useSelector} from "react-redux";
import {selectAuthenticated} from "../../features/auth/userSlice";
const Header = () => {
    const auth = useSelector(selectAuthenticated);
    return (
        <Navbar  className="fw-bold bg-success fs-5 d-flex flex-row justify-content-center flex-wrap rounded" >

            <div className=" d-flex flex-row w-50 justify-content-evenly flex-wrap">
                <div className="navbar  navbar-text text-white">P32302</div>
                <div className="navbar-text text-white">Чернова Елизавета Александровна</div>
            </div>
            {/*<Form inline="true" className="">*/}
            {/*    <LogOutButton/>*/}
            {/*</Form>*/}
            {auth?<LogOutButton/>:<></>}
        </Navbar>

    )
};

export default Header;