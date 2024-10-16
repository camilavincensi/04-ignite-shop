import {ImageContainer, ProductContainer, ProductDatails} from "@/src/styles/pages/product";
import {GetStaticPaths, GetStaticProps} from "next";
import {stripe} from '../../lib/stripe'
import Stripe from "stripe";
import Image from "next/image";
import axios from "axios";
import {useState} from "react";
import Head from "next/head";

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string
    }
}

export default function Product({product}: ProductProps) {

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleBuyButton() {
        try {
            setIsCreatingCheckoutSession(true);
            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            console.log(response)
            const {checkoutUrl} = response.data;
            window.location.href = checkoutUrl;
        } catch (err) {
            setIsCreatingCheckoutSession(false);
            alert('Falha ao redirecionar ao checkout!' + err)
        }
    }

    return (
        <>
            <Head>
                <title>{product.name}| Ignite Shop</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} alt={""} width={520} height={480}/>
                </ImageContainer>
                <ProductDatails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>
                    <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>Comprar Agora</button>
                </ProductDatails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({params}) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price


    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount / 100),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1,
    }
}
