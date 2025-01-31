import {styled} from "../../styles";

export const HomeContainer = styled('main', {
    display: "flex",
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px)/2))',
    marginLeft: 'auto',
    minHeight: 656,
})

export const Product = styled('h1', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    minWidth: 540,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        transform: 'translateY(110%)',
        opacity: '0',
        transition: 'all 0.2s ease-in-out',

        borderRadius: 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgb(0, 0, 0, 0.6)',

        strong: {
            fontSize: '$lg',
            color: '$gray100',
        },

        span : {
            fontSize: '$xl',
            fontWeight: 'bold',
            color: '$gray300'
        }
    },


    '&:hover' : {
        footer : {
            transform: 'translateY(0%)',
            opacity: '1',
        }
    }
})
