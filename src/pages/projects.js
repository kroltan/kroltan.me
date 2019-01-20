import React from 'react';
import {StaticQuery, graphql} from "gatsby";

import {Layout} from '../components/Layout';
import {Meta} from '../components/Meta';
import {Article} from "../components/Article";

export default () => (
    <Layout>
        <Meta title="Projects" keywords={[]}/>
        <h2>Projects</h2>
        <StaticQuery
            query={graphql`
                    {
                        allAirtable(filter: {table: {eq: "Projects"}}) {
                            edges {
                                node {
                                    id
                                    data {
                                        name
                                        links {
                                            data {
                                                title
                                                href
                                            }
                                        }
                                        content {
                                            raw
                                            childMarkdownRemark {
                                                html
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `}
            render={({allAirtable}) => allAirtable.edges.map(({node: {data: project, id}}) => (
                <Article
                    key={id}
                    title={project.name}
                    aside={(
                        <nav>
                            {project.links.map(({data: {title, href}}) => (
                                <a
                                    key={href}
                                    href={href}
                                >
                                    {title}
                                </a>
                            ))}
                        </nav>
                    )}
                    content={project.content}
                />
            ))}
        />
    </Layout>
);
