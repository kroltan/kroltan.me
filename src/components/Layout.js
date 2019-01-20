import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import {Helmet} from "react-helmet";

import favicon from "../images/me.jpg";
import './Layout.css';

export const Layout = ({children}) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={data => (
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
                        <a href="/about">About</a>
                        <a href="/projects">Projects</a>
                        <a href="/work">Work</a>
                    </nav>
                </header>
                <main>
                    {children}
                </main>
                <footer id="footer" role="contentinfo">
                    &copy; Leonardo Giovanni Scur, {new Date().getUTCFullYear()}
                </footer>
            </>
        )}
    />
);
