import React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";

import {Layout} from "../../components/Layout";
import {Meta} from "../../components/Meta";

export default () => {
    const {
        posts: {nodes: posts},
        tags: {nodes: tags}
    } = useStaticQuery(graphql`{
        posts: allAirtable(filter: {table: {eq: "Blog"}}) {
            nodes {
                data {
                    title
                    slug
                    tags {
                        data {
                            name
                            slug
                        }
                    }
                    content {
                        childMarkdownRemark {
                            timeToRead
                        }
                    }
                }
            }
        }
        tags: allAirtable(filter: {table: {eq: "Tags"}}) {
            nodes {
                data {
                    slug
                    name
                    posts {
                        data {
                            slug
                        }
                    }
                }
            }
        }
    }`);

    return (
        <Layout>
            <Meta title="Blog" keywords={[]}/>
            <h2>Tags</h2>
            <ul>
                {tags
                    .filter(({data: tag}) => tag.posts != null)
                    .map(({data: tag}) => (
                        <li key={tag.slug}>
                            <Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                            : {(tag.posts || []).length} posts
                        </li>
                    ))
                }
            </ul>
            <h2>Blog Archive</h2>
            <table className="minimal-center">
                <thead>
                    <tr>
                        <td>Post</td>
                        <td>Length</td>
                        <td>Tags</td>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(({data: post}) => (
                        <tr key={post.slug}>
                            <td><Link to={`/blog/${post.slug}`}>{post.title}</Link></td>
                            <td>{post.content.childMarkdownRemark.timeToRead}min</td>
                            <td>
                                {post.tags.map(({data: tag}) => (
                                    <Link to={`/blog/tag/${tag.slug}`} key={tag.slug}>
                                        {tag.name}
                                    </Link>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};
