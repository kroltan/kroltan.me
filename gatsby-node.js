/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async function({ actions, graphql }) {
    const { data: { posts, tags, drafts } } = await graphql(`{
        drafts: allFile(filter: {sourceInstanceName: {eq: "drafts"}}) {
            nodes {
                name
                childMarkdownRemark {
                    html
                    excerpt
                    timeToRead
                }
            }
        }
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
                            excerpt
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

    drafts.nodes.forEach(draft => {
        actions.createPage({
            path: `/blog/${draft.name}`,
            component: require.resolve("./src/templates/post.js"),
            context: {
                title: draft.name,
                slug: draft.name,
                tags: [],
                content: {
                    childMarkdownRemark: draft.childMarkdownRemark,
                },
            }
        });
    })

    posts.nodes.forEach(({ data: post }) => {
        actions.createPage({
            path: `/blog/${post.slug}`,
            component: require.resolve("./src/templates/post.js"),
            context: post,
        });
    });

    tags.nodes.forEach(({ data: tag }) => {
        actions.createPage({
            path: `/blog/tag/${tag.slug}`,
            component: require.resolve("./src/templates/tag.js"),
            context: tag,
        });
    });
};