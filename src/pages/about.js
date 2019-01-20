import React from 'react';

import {Layout} from '../components/Layout';
import {Meta} from '../components/Meta';
import {ContactsTable} from "../components/ContactsTable";
import me from "../images/me.jpg";

export default () => (
    <Layout>
        <Meta title="Home" keywords={[]}/>
        <h2>About</h2>
        <img src={me} alt="a young smiling me in grayscale, wearing a slightly worn t-shirt" />
        <p>
            Hi! I'm Leonardo, a web developer who also makes games in his spare time.
            Maybe someday I'll make them full-time!
        </p>
        <p>
            Currently I'm located in Florianópolis, Santa Catarina, Brazil, which is a
            naturally beautiful island city.
        </p>
        <p>
            If you need to talk to me, I'm available at a variety of services.
            Don't expect an immediate response in instant messagers!
        </p>
        <ContactsTable />
    </Layout>
);
