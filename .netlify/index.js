export function onPreBuild({ inputs, netlifyConfig }) {
    for (const [origin, destination] of Object.entries(inputs)) {
        netlifyConfig.redirects.push({
            from: `https://${origin}/*`,
            to: `https://${destination}/:splat`,
            force: true,
            signed: inputs.forwards_key_env,
            status: 200,
            headers: { "X-Forwarded-Host": origin },
        });
    }
}