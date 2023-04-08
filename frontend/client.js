
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: 'g9xzybh4',
    dataset: 'production',
    useCdn: true,
})

export default client

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}