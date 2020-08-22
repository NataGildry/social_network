import React, {FC} from 'react';
import styles from './ProfileInfo.module.css';

type PropsType = {
    contactTitle: string
    contactValue: string | undefined | any
};

const Contact: FC<PropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={styles.contact}>
            <b>{contactTitle}</b> : {contactValue}
        </div>
    );
};

export default Contact;
