/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async function({actions, graphql}) {
    const {data: {posts, tags}} = await graphql(`{
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
                            html
                            timeToRead
                        }
                    }
                }
            }
        }
        tags: allAirtable(filter: {table: {eq: "Tags"}}) {
            nodes {
                data {
                    name
                    slug
                    posts {
                        data {
                            title
                            slug
                        }
                    }
                }
            }
        }
    }`);

    posts.nodes.forEach(({data: post}) => {
        actions.createPage({
            path: `/blog/${post.slug}`,
            component: require.resolve("./src/templates/post.js"),
            context: {
                slug: post.slug
            }
        });
    });

    tags.nodes.forEach(({data: tag}) => {
        actions.createPage({
            path: `/blog/tag/${tag.slug}`,
            component: require.resolve("./src/templates/tag.js"),
            context: tag
        })
    });
};