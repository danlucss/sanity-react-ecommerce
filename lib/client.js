import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'kehwwp6d',
    dataset: 'production',
    apiVersion: '2022-10-12',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,

}

)

const buider = imageUrlBuilder(client)

export const urlFor = (source) => {
    return buider.image(source)
}