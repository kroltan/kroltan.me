import React from "react";

import { Layout } from "../components/Layout";
import { Meta } from "../components/Meta";
import { Article } from "../components/Article";


export default ({ pageContext: post }) => {
    return (
        <Layout>
            <Meta
                title={post.title}
                description={post.content.childMarkdownRemark.excerpt}
                keywords={(post.tags || []).map(tag => tag.data.name)}
            />
            <Article
                title={post.title}
                content={post.content}
            />
        </Layout>
    );
};