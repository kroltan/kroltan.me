<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">
    <xsl:output method="html"/>
    <xsl:template match="/root">
        <html>
            <head>
                <title>
                    <xsl:value-of select="profile/name"/>
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="theme.css"/>
                <link rel="stylesheet" href="wei.css"/>
                <link rel="stylesheet" media="screen and (prefers-color-scheme: dark)" href="dark.css"/>
                <link rel="stylesheet" media="print" href="print.css"/>
                <script src="pretty.js" async="async"/>
                <script src="wei.js" async="async"/>
                <script>
                    const backgroundFragmentSource = fetch("assets/background.frag")
                            .then(response => response.text());

                    window.onPrettyReady = async function() {
                        const isWei = () => document.querySelector(".wei") != null;

                        const background = document.getElementById("background");

                        makePretty(await backgroundFragmentSource, background, [
                            ["TimeScale", (gl, uniform) => gl.uniform1f(uniform, isWei() ? 50 : 1)],
                            ["FromColor", (gl, uniform) => gl.uniform3fv(uniform, isWei() ? [0, 1, 1] : [1, 1, 1])],
                            ["ToColor", (gl, uniform) => gl.uniform3fv(uniform, isWei() ? [0, 0, 1] : [0, 0, 0])]
                        ]);

                        background.classList.add("loaded");
                    };
                </script>
            </head>
            <body>
                <canvas id="background"/>
                <div id="about">
                    <xsl:apply-templates select="profile"/>
                </div>
                <main>
                    <section class="gallery">
                        <xsl:for-each select="*[@cover]">
                            <a>
                                <xsl:if test="self::job">
                                    <xsl:attribute name="class">emphasis</xsl:attribute>
                                </xsl:if>
                                <xsl:attribute name="href">
                                    #<xsl:value-of select="@id"/>
                                </xsl:attribute>
                                <img>
                                    <xsl:attribute name="src">
                                        <xsl:value-of select="@cover"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="alt">
                                        <xsl:value-of select="@name"/>
                                    </xsl:attribute>
                                </img>
                            </a>
                        </xsl:for-each>
                    </section>
                    <aside class="summary">
                        This is just a handy summary! More details at <a href="https://kroltan.me">kroltan.me</a>
                    </aside>
                    <h2>Work Experience</h2>
                    <section class="work">
                        <xsl:for-each select="job">
                            <article>
                                <xsl:attribute name="id">
                                    <xsl:value-of select="@id"/>
                                </xsl:attribute>
                                <h3>
                                    <xsl:value-of select="@title"/>
                                    at
                                    <xsl:value-of select="@company"/>
                                </h3>
                                <div class="extra">
                                    <xsl:if test="not(@end)">
                                        Started
                                    </xsl:if>
                                    <xsl:value-of select="@start"/>
                                    <xsl:if test="@end">
                                        to
                                        <xsl:value-of select="@end"/>
                                    </xsl:if>
                                </div>
                                <xsl:copy-of select="*[not(self::summary)]"/>
                            </article>
                        </xsl:for-each>
                    </section>
                    <h2>Personal Project Details</h2>
                    <section class="projects">
                        <xsl:for-each select="project">
                            <article>
                                <xsl:attribute name="id">
                                    <xsl:value-of select="@id"/>
                                </xsl:attribute>
                                <h3>
                                    <xsl:value-of select="@name"/>
                                </h3>
                                <xsl:copy-of select="*"/>
                            </article>
                        </xsl:for-each>
                    </section>
                </main>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="topic">
        <h2>
            <xsl:value-of select="@title"/>
        </h2>
        <section>
            <xsl:attribute name="class">
                <xsl:value-of select="@class"/>
            </xsl:attribute>
            <xsl:for-each select="*">
                <xsl:apply-templates select="."/>
            </xsl:for-each>
        </section>
    </xsl:template>

    <xsl:template match="profile">
        <xsl:apply-templates select="picture"/>
        <h1>
            <xsl:value-of select="name"/>
        </h1>
        <p>
            <xsl:value-of select="introduction"/>
        </p>
        <table>
            <thead>
                <tr>
                    <td>Network</td>
                    <td>Alias</td>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="contact">
                    <tr>
                        <td>
                            <xsl:value-of select="@name"/>
                        </td>
                        <td>
                            <xsl:apply-templates select="."/>
                        </td>
                    </tr>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>

    <xsl:template match="contact">
        <a>
            <xsl:attribute name="rel">
                <xsl:text>noopener noreferrer</xsl:text>
                <xsl:if test="@kind = 'identity'">me</xsl:if>
            </xsl:attribute>

            <xsl:attribute name="href">
                <xsl:value-of select="@href"/>
            </xsl:attribute>

            <xsl:value-of select="@value"/>
        </a>
    </xsl:template>

    <xsl:template match="picture">
        <img src="">
            <xsl:attribute name="src">
                <xsl:value-of select="@href"/>
            </xsl:attribute>
            <xsl:attribute name="alt">
                <xsl:value-of select="normalize-space(.)"/>
            </xsl:attribute>
        </img>
    </xsl:template>

    <xsl:template match="text()"/>
</xsl:stylesheet>
