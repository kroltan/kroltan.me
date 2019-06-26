import React from 'react';
import {Link} from 'gatsby';
import {Helmet} from "react-helmet";

import favicon from "../images/me.png";
import './Layout.css';

export const Layout = ({children}) => (
    <>
        <Helmet
            link={[
                {
                    rel: "shortcut icon",
                    type: "image/jpg",
                    href: favicon,
                }
            ]}
        />
        <header>
            <h1>Leonardo Giovanni Scur</h1>
            <nav role="navigation">
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/work">Work</Link>
                <Link to="/cv">CV</Link>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer id="footer" role="contentinfo">
            &copy; Leonardo Giovanni Scur, {new Date().getUTCFullYear()}
        </footer>
    </>
);
