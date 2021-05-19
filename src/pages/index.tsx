import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/Stripe';

interface HomeProps {
  product: { priceId: string, amount: number }
}
function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.homeContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>  
          <h1>New about the <span>React</span> world.</h1>
          <p>
            Get access to all publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton />
        </section>  

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main> 
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IseljGbFNzxPe91yLjdL5zN', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 8 * 8
  }
}

export default Home;
