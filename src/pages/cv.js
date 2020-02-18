import React from "react";
import {graphql, StaticQuery} from "gatsby";

import {Layout} from "../components/Layout";
import {Meta} from "../components/Meta";
import {Article} from "../components/Article";
import {PrintNotice} from "../components/PrintNotice";

const ContactItem = ({name, link: {text, url}}) => (
    <div>
        <b>{name}</b>
        <a href={url}>{text}</a>
    </div>
);

export default () => (
    <Layout>
        <Meta title="Curriculum Vitae" keywords={[]}/>
        <PrintNotice />
        <StaticQuery
            query={graphql`
                    {
                        log: allAirtable(filter: {table: {in: ["WorkHistory", "Projects"]}, data: {showOnCv: {eq: true}}}) {
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
                                        showOnCv
                                    }
                                }
                            }
                        }
                        
                        contact: allAirtable(filter: {table: {eq: "Contacts"}, data: {showOnCv: {eq: true}}}) {
                            edges {
                                node {
                                    data {
                                        service
                                        display
                                        link
                                        showOnCv
                                    }
                                }
                            }
                        }
                    }
                `}
            render={({log, contact}) => {
                const logData = log.edges
                    .map(({
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

                logData.sort((a, b) => b.sort - a.sort);

                const contactData = contact.edges
                    .map(({
                        node: {data: {service, display, link}}
                    }) => ({
                        name: service,
                        link: {
                            text: display,
                            url: link,
                        },
                    }));

                return <>
                  <div className="infobar">
                    {contactData.map(data => <ContactItem key={data.name} {...data}/>)}
                  </div>
                  {logData.map(({title, aside, technologies}) => (
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
                  ))}
                </>
            }}
        />
    </Layout>
);
