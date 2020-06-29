import React from "react";
import {Link} from "gatsby";
import {Helmet} from "react-helmet";

import favicon from "../images/me.png";
import './Layout.css';
import './Layout.mermaid.css';

export const Layout = ({children, complete = true}) => (
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
        {complete && (
            <header>
                <h1>Leonardo Giovanni Scur</h1>
                <nav role="navigation">
                    <Link to="/">Home</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/work">Work</Link>
                    <Link to="/cv">CV</Link>
                </nav>
            </header>
        )}
        <main>
            {children}
        </main>
        {complete && (
            <footer id="footer" role="contentinfo">
                &copy; Leonardo Giovanni Scur, 2019~{new Date().getUTCFullYear()}
                <br/>
                <small>
                    Copyright reserved for content. Code snippets <Link to="/mit">MIT</Link> licensed, unless stated otherwise.
                </small>
            </footer>
        )}
    </>
);
