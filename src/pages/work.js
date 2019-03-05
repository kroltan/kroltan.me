import React from 'react';
import {StaticQuery, graphql} from "gatsby";

import {Layout} from '../components/Layout';
import {Meta} from '../components/Meta';
import {Article} from "../components/Article";

export default () => (
    <Layout>
        <Meta title="Work History" keywords={[]}/>
        <h2>Work History</h2>
        <StaticQuery
            query={graphql`
                {
                    allAirtable(
                        filter: {table: {eq:"WorkHistory"}},
                        sort: {
                            fields: [data___startYear],
                            order: DESC
                        }
                    ) {
                        edges {
                            node {
                                data {
                                    company
                                    startYear
                                    endYear
                                    title
                                    description {
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
            render={({allAirtable}) => allAirtable.edges.map(({node: {data: work, id}}) => (
                <Article
                    key={id}
                    title={work.company}
                    aside={(
                        <>
                            {work.title},
                            {" "}
                            {work.startYear}
                            {" ~ "}
                            {work.endYear || "current"}
                        </>
                    )}
                    content={work.description}
                />
            ))}
        />
    </Layout>
);
