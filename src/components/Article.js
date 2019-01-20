import React from "react";

export const Article = ({title, aside, content}) => {
    let html = content.raw;
    if ("childMarkdownRemark" in content) {
        html = content.childMarkdownRemark.html;
    }

    return (
        <article>
            <header>
                <h3>{title}</h3>
                {aside}
            </header>
            <div
                className="content"
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
            />
        </article>
    );
};