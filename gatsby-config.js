require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: `Leonardo Giovanni Scur`,
        description: ``,
        author: `@kroltan`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-katex",
                        options: {
                            trust: false,
                            output: "mathml"
                        }
                    },
                    {
                        resolve: "gatsby-remark-mermaid",
                        options: {
                            theme: null,
                            mermaidOptions: {
                                htmlLabels: false,
                                themeCSS: "",
                                flowchart: {
                                    htmlLabels: false
                                }
                            }
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#272422`,
                theme_color: `#ffffff`,
                display: `minimal-ui`,
                icon: `src/images/me.png`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
        {
            resolve: "gatsby-source-airtable",
            options: {
                apiKey: process.env.AIRTABLE_API_KEY,
                tables: [
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Contacts",
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Projects",
                        mapping: {
                            "content": "text/markdown",
                        },
                        tableLinks: ["links", "technologies"],
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "ProjectLinks",
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "WorkHistory",
                        mapping: {
                            "description": "text/markdown",
                        },
                        tableLinks: ["technologies"],
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Technologies",
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Blog",
                        mapping: {
                            "content": "text/markdown",
                        },
                        tableLinks: ["tags"],
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Tags",
                        tableLinks: ["posts"],
                    },
                ],
            },
        },
    ],
};

if (process.env.NODE_ENV !== "production") {
    module.exports.plugins.push({
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `drafts`,
            path: `${__dirname}/drafts`,
        },
    });
}