import React from "react";
import {StaticQuery, graphql} from "gatsby";

const ContactValue = ({display, link}) => {
    if (link == null) {
        return display;
    }

    return <a href={link}>{display}</a>;
};

export const ContactsTable = () => (
    <table className="minimal-center">
        <thead>
            <tr>
                <td>Service</td>
                <td>Alias</td>
            </tr>
        </thead>
        <tbody>
            <StaticQuery
                query={graphql`
                    {
                        allAirtable(filter: {table: {eq: "Contacts"}}) {
                            edges {
                                node {
                                    data {
                                        service
                                        display
                                        link
                                    }
                                }
                            }
                        }
                    }
                `}
                render={({allAirtable}) => allAirtable.edges.map(({
                    node: {data: {service, display, link}}
                }) => (
                    <tr key={service}>
                        <td>{service}</td>
                        <td>
                            <ContactValue
                                display={display}
                                link={link}
                            />
                        </td>
                    </tr>
                ))}
            />
        </tbody>
    </table>
);