import React from "react";
import {graphql} from "gatsby";

import {Layout} from "../components/Layout";
import {Meta} from "../components/Meta";
import {Article} from "../components/Article";

export const query = graphql`
    query($slug: String!) {
        airtable(table: {eq: "Blog"}, data: {slug: {eq: $slug}}) {
            data {
                title
                tags {
                    data {
                        name
                    }
                }
                content {
                    childMarkdownRemark {
                        excerpt
                        html
                    }
                }
            }
        }
    }
`;

export default ({data: {airtable: {data: post}}}) => {
    return (
        <Layout>
            <Meta
                title={post.title}
                description={post.content.childMarkdownRemark.excerpt}
                keywords={post.tags.map(tag => tag.data.name)}
            />
            <Article
                title={post.title}
                content={post.content}
            />
        </Layout>
    );
};