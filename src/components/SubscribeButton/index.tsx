import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';


import styles from './styles.module.scss';

export function SubscribeButton() {

    const [session] = useSession();
    async function handleSubscribe() {
        if (!session) {
            signIn('github');
            return;
        }

        try {
            const response = await api.post<{ sessionId: string }>('/subscribe');

            const { sessionId } = response.data;

            const stripe = getStripeJs();

            (await stripe).redirectToCheckout({
                sessionId: sessionId
            });

        } catch(err) {
            alert(err.message)
        }
    }
    return (
        <button type="button" className={styles.subscribeButton}onClick={() => handleSubscribe()}>
            Subscribe now
        </button>
    );
}
