import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { query as q } from 'faunadb';
import { fauna } from '../../../services/funa';


export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            scope: 'read:user'
        }),
    ],
    jwt: {
        signingKey: process.env.SIGNIN_KEY
    },
    callbacks: {
        async signIn(user, account, profile) {
            try {
                const { email } = user;

                await fauna.query(
                    q.Create(
                        q.Collection('users'),
                        { data: { email } }
                    )
                )
                return true
            } catch {
                return false;
            }
        }
    }
});

