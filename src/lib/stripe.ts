import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-09-30.acacia",
    appInfo: {
        name: 'Ignite Shop',
    }
})
