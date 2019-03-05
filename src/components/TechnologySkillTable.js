import React from "react";
import {StaticQuery, graphql} from "gatsby";

import styles from "./TechnologySkillTable.module.css";

export const TechnologySkillTable = () => (
    <table className={`${styles.root} minimal-center`}>
        <thead>
            <tr>
                <td>Technology</td>
                <td>Skill</td>
            </tr>
        </thead>
        <tbody>
            <StaticQuery
                query={graphql`
                    {
                        allAirtable(filter: {table: {eq: "Technologies"}}) {
                            edges {
                                node {
                                    data {
                                        name
                                        skillLevel
                                    }
                                }
                            }
                        }
                    }
                `}
                render={({allAirtable}) => {
                    allAirtable.edges.sort((a, b) => b.node.data.skillLevel - a.node.data.skillLevel);
                    return allAirtable.edges.map(({
                        node: {data: {name, skillLevel}}
                    }) => (
                        <tr key={name}>
                            <td>{name}</td>
                            <td className={styles.value}>
                                <div
                                    className={styles.bar}
                                    style={{width: `${skillLevel * 100}%`}}
                                />
                            </td>
                        </tr>
                    ));
                }}
            />
        </tbody>
    </table>
);