import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from 'next-auth/client';
import { query as q } from 'faunadb';

import { fauna } from '../../services/funa';
import { stripe } from '../../services/Stripe';

type User = {
    ref: {
        id: string
    },
    data: {
        stripe_customer_id: string
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        const session = await getSession({ req });

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        );

        let customerId = user.data.stripe_customer_id;

        if (!customerId) {
            const stripeCustumer = await stripe.customers.create({
                email: session.user.email,
                name: session.user.email
            });

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustumer.id
                        }
                    }
                )
            )

            customerId = stripeCustumer.id;
        }





        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [{
                price: 'price_1IseljGbFNzxPe91yLjdL5zN', quantity: 1
            }],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: 'http://localhost:3000/posts',
            cancel_url: 'http://localhost:3000/posts'
        })

        return res.status(200).json({ sessionId: checkoutSession.id });
    }

    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
}