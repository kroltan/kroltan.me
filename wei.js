const EXPLAINER_URL = "https://github.com/RupertBenWiser/Web-Environment-Integrity/blob/main/explainer.md";
const FIREFOX_URL = "https://www.mozilla.org/firefox/new/";
const ARS_URL = "https://arstechnica.com/gadgets/2023/07/googles-web-integrity-api-sounds-like-drm-for-the-web/";
const REGISTER_URL = "https://www.theregister.com/2023/07/25/google_web_environment_integrity/";

const LINKS = [
    {text: "Google: Be Evil™", href: EXPLAINER_URL},
    {text: "Google is restricting your internet freedom.", href: EXPLAINER_URL},
    {text: "With WEI, this site might one day not exist.", href: EXPLAINER_URL},
    {text: "Your browser supports DRM that kills the open web.", href: REGISTER_URL},
    {text: "Google wants you to be digital cattle.", href: ARS_URL},
    {text: "The web should not be an app store.", href: REGISTER_URL},
    {text: "For all that is good, use a browser that is YOUR User Agent.", href: FIREFOX_URL},
    {text: "Your browser wants every website to be individually blessed by a cabal of corporate overlords.", href: ARS_URL},
    {text: "Your browser is murdering the beautiful part of the web.", href: EXPLAINER_URL},
    {text: "Google wants to own your computer, so it can own you.", href: ARS_URL},
];

const HEADINGS = [
    "Read this while you can",
    "It's the Google way or the high way",
    () => {
        const repeat = ["ḥ̶̛̯̳̦̜̦̖̬͈̫̗̈̂̈́̿͝͝͝͝e̸͉̣̝̭͇̹̞̗̔̄̋͛̅͜l̶̺̼̞̱̱̰̥̂͗p̸͓̗̯͙̹̼̙͕͔̝̒͐̾ͅ", "help", "help"].sort(() => Math.random() - 0.5);
        return `Help ${repeat.join(" ")}`;
    },
    "This website seems to have been compromised. Only browse websites from our list of pre-authorized websites! ơ̸̧̳̞͓̮͓͔̭̰̹̟͓͈̣͚̮̺̯͔̗͇͓̦̫̣̟̿̒̑̍͆̃͊͗͛͑̂͆͜͝͝ͅŗ̵̡̢͖̦͔͖͎̻̦̺͕̰͚͈̲̪̺͌̒͐̈́͑͜͜͝ͅ ̶̡͕̻̥̲̻͔̦̩̝̥̖̣͐̆̋̕̕͜ͅd̸̗̤̮̰̳̯̞̟̤̽̈́̏͛̂̀̈́͝ͅi̸̛̛̪̪̩̤̖͔̳̝͙̺͉͕̞͉̙̙͍̪̻̱̙̟̙͉͙̗͉̎̈́́͆̍̆̐̋̆͘͜ę̶̧̤̗̞̬͖͕̭̳́̀",
];

const PARAGRAPHS = [
    "DRM is evil and unethical. Especially when applied to platforms and not products. The web is a platform.",
    "Your browser supports centralized DRM. The browser provider will chain you to their systems.",
    "Please disable Web Environment Integrity support on your browser, or use a browser that serves humans not corporations.",
    "Google wants the Web to die, so I want Google to die.",
    `<a href="${FIREFOX_URL}">Use a browser that respects humans.</a>`,
];

/**
 * @template T
 * @param {T[]} options
 * @return T
 * */
function randomFromList(options) {
    const index = Math.floor(Math.random() * options.length);
    const chosen = options[index];
    return (typeof chosen === "function") ? chosen() : chosen;
}

function comply() {
    document.querySelector("#about h1").innerHTML = "The Free Web Is Being Murdered";
    document.querySelector("#about p").innerHTML = 'The Web Environment Integrity "standard" is being forced onto the web by the browser monoculture engineered by Google. Call your representatives. The web is not a public commons anymore. A weapon to surpass Metal Gear.';
    document.querySelectorAll("h2, h3")
        .forEach(element => element.innerHTML = randomFromList(HEADINGS));
    document.querySelectorAll("#about tbody td:first-child")
        .forEach(element => element.innerHTML = "We're Dying");
    document.querySelectorAll("section p, section li")
        .forEach(element => element.innerHTML = randomFromList(PARAGRAPHS));
    document.querySelectorAll("*:not(:empty)")
        .forEach(element => element.style.transform = `rotate(${(Math.random() - 0.5) * 2}deg)`);

    document.querySelectorAll("img, a").forEach(element => {
        const {href, text} = randomFromList(LINKS);

        element.classList.add("wei");
        element.style.animationDelay = `${(Math.random() * 5000).toFixed(0)}ms`;
        element.style.transform = `rotate(${(Math.random() * 20 - 10).toFixed(0)}deg) translate(${(Math.random() * 100).toFixed(0)}px, ${(Math.random() * 100).toFixed(0)}px)`;

        if (element.href != null) {
            element.href = href;
        }

        if (element.childElementCount === 0) {
            element.innerText = text;
        }
    });
}

if ("getEnvironmentIntegrity" in navigator) {
    if (document.readyState !== "loading") {
        comply();
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            comply();
        });
    }
}