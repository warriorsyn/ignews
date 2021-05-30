import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from '@prismicio/client';


import { getPrismicClient } from "../../services/prismic";

import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>POSTS | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Moneropo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Moneropo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Moneropo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                    <a>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Moneropo with Lerna & Yarn workspaces</strong>
                        <p>In this guide, you will learn how to create a monorepo to manage multiple packages with a shared build, test, and release process.</p>
                    </a>
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ req }) => {
     const prismic = getPrismicClient(req);

     const response = await prismic.query(
         Prismic.predicates.at('document.type', 'post'),
         {
             fetch: ['post.title', 'post.content'],
             pageSize: 100
         }
     );

     console.log(JSON.stringify(response, null, 2));

     return {
         props: {}
     }
}
