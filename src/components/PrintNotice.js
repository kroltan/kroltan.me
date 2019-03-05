import React from "react";

import styles from "./PrintNotice.module.css";

export const PrintNotice = () => (
    <div className={`${styles.root} minimal-center`}>
        This page is print-friendly.
        {" "}
        <button onClick={() => window.print()}>
            Print it!
        </button>
        <br />
        <span className={styles.green}>
            Computers can also print to PDF, be green!
        </span>
    </div>
);