import React from 'react';
import {StaticQuery, graphql} from "gatsby";

import {Layout} from '../components/Layout';
import {Meta} from '../components/Meta';

export default () => (
    <Layout>
        <Meta title="Page not found"/>
        <h2>Page not found</h2>
        <p>
            The page you attempted to visit does not exist.
        </p>
        <p>
            If you think this is an error, please contact me at
            {" "}
            <StaticQuery
                query={graphql`
                    {
                        airtable(table: {eq:"Contacts"}, data: {service: {eq: "E-mail"}}) {
                            data {
                                display
                                link
                            }
                        }
                    }
                `}
                render={data => <a href={data.airtable.data.link}>{data.airtable.data.display}</a>}
            />
        </p>
    </Layout>
);
