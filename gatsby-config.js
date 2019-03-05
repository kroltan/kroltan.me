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
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/me.jpg`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
        {
            resolve: "gatsby-source-airtable",
            options: {
                tables: [
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Contacts",
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Projects",
                        mapping: {
                            "content": "text/markdown"
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
                            "description": "text/markdown"
                        },
                        tableLinks: ["technologies"],
                    },
                    {
                        baseId: "appe0HhALnyweY9Xi",
                        tableName: "Technologies",
                    }
                ]
            }
        }
    ],
};
