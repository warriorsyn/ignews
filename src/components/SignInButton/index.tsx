import { signIn, useSession } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';


import styles from './styles.module.scss';

export function SignInButton() {

    const [session] = useSession();

    const isUserLoggedIn = session;

    return (
        <button type="button" className={styles.signInButton} onClick={() => !isUserLoggedIn && signIn('github')}>
            <FaGithub color={isUserLoggedIn ? '#4eba41' : '#eba417'} />
            { !isUserLoggedIn ? 'Sign in with Github' : isUserLoggedIn.user.name}
            { isUserLoggedIn && <FiX  color="#737380" className={styles.closeIcon}/> }
        </button>
    )
}
