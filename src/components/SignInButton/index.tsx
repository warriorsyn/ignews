import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
    const isUserLoggedIn = true;

    return (
        <button type="button" className={styles.signInButton}>
            <FaGithub color={isUserLoggedIn ? '#4eba41' : '#eba417'} />
            { !isUserLoggedIn ? 'Sign in with Github' : 'Diego Fernandes' }
            { isUserLoggedIn && <FiX  color="#737380" className={styles.closeIcon}/> }
        </button>
    )
}
