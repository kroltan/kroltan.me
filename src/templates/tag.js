import React from "react";
import {graphql, Link} from "gatsby";

import {Layout} from "../components/Layout";
import {Meta} from "../components/Meta";

const PostLink = ({slug, title}) => (
    <li>
        <Link to={`/blog/${slug}`}>
            {title}
        </Link>
    </li>
);

export const query = graphql`
    query($slug: String!) {
        airtable(table: {eq: "Blog"}, data: {slug: {eq: $slug}}) {
            data {
                title
                content {
                    childMarkdownRemark {
                        html
                    }
                }
            }
        }
    }
`;

export default ({pageContext: tag}) => {
    const posts = tag.posts || [];
    const content = posts.length === 0
        ? `No posts about ${tag.name} yet!`
        : (
            <ul>
                {tag.posts.map(post => (
                    <PostLink
                        {...post.data}
                        key={post.data.slug}
                    />
                ))}
            </ul>
        );

    return (
        <Layout>
            <Meta
                title={`${tag.name} posts`}
                description={`There are ${posts.length} posts about ${tag.name}`}
                keywords={[tag.name]}
            />
            <h2>Blog posts about {tag.name}</h2>
            {content}
        </Layout>
    );
};