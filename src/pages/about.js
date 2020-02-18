import React from 'react';

import {Layout} from '../components/Layout';
import {Meta} from '../components/Meta';
import {ContactsTable} from "../components/ContactsTable";
import me from "../images/me.png";

export default () => (
    <Layout>
        <Meta title="Home" keywords={[]}/>
        <h2>About</h2>
        <img src={me} alt="a young smiling me in grayscale, wearing a slightly worn t-shirt" />
        <p>
            Hi! I'm Leonardo, a game developer who also makes web things in his spare time.
        </p>
        <p>
            Currently I'm located in Florianópolis, Santa Catarina, Brazil, which is a
            naturally beautiful island city.
        </p>
        <p>
            If you need to talk to me, I'm available at a variety of services.
        </p>
        <ContactsTable />
    </Layout>
);
