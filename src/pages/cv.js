import React from "react";
import {StaticQuery, graphql} from "gatsby";

import {Layout} from "../components/Layout";
import {Meta} from "../components/Meta";
import {TechnologySkillTable} from "../components/TechnologySkillTable";
import {Article} from "../components/Article";
import {PrintNotice} from "../components/PrintNotice";

export default () => (
    <Layout>
        <Meta title="Curriculum Vitae" keywords={[]}/>
        <PrintNotice />
        <TechnologySkillTable />
        <StaticQuery
            query={graphql`
                    {
                        allAirtable(filter: {table: {in: ["WorkHistory", "Projects"]}}) {
                            edges {
                                node {
                                    data {
                                        name
                                        company
                                        technologies {
                                            data {
                                                name
                                            }
                                        }
                                        title
                                        year
                                        startYear
                                        endYear
                                    }
                                }
                            }
                        }
                    }
                `}
            render={({allAirtable}) => {
                const data = allAirtable.edges.map(({
                    node: {data: {name, company, technologies, title, year, startYear, endYear}}
                }) => {
                    const tech = technologies.map(({data: {name}}) => name);
                    if (company == null) {
                        return {
                            title: name,
                            aside: `${year}`,
                            technologies: tech,
                            sort: year,
                        };
                    } else {
                        return {
                            title: `${title} at ${company}`,
                            aside: `${startYear} ~ ${endYear || "current"}`,
                            technologies: tech,
                            sort: startYear + 0.5,
                        };
                    }
                });

                data.sort((a, b) => b.sort - a.sort);

                return data.map(({title, aside, technologies}) => (
                    <Article
                        key={title}
                        title={title}
                        aside={aside}
                        content={
                            <>
                                Technologies used:
                                {" "}
                                {technologies.join(", ")}
                            </>
                        }
                    />
                ));
            }}
        />
    </Layout>
);
