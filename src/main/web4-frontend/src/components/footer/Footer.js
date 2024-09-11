import React from 'react';

const Footer = () => {
    return (
        <footer className="row row-cols-5">


            <div className="col">

            </div>

            <div className="col">
                <h5>Technologies</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="https://reactjs.org/" className="nav-link p-0 text-muted">React</a></li>
                    <li className="nav-item mb-2"><a href="https://redux-toolkit.js.org/" className="nav-link p-0 text-muted">Redux Toolkit, RTK Query</a></li>
                    <li className="nav-item mb-2"><a href="https://spring.io/projects/spring-boot" className="nav-link p-0 text-muted">Spring boot</a></li>
                </ul>
            </div>

            <div className="col">
                <h5>Contact</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="t.me/sillypepper" className="nav-link p-0 text-muted">tg</a></li>
                </ul>
            </div>

        </footer>
    );
};

export default Footer;