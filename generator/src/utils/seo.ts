export interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    publishDate?: string;
    author?: string;
}

export function generateSchema(props: SEOProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': props.type === 'profile' ? 'Person' : 'WebSite',
        url: props.url,
        name: props.title,
        description: props.description,
        image: props.image,
        ...(props.author && { author: { '@type': 'Person', name: props.author } }),
        ...(props.publishDate && { datePublished: props.publishDate }),
    };

    return JSON.stringify(schema);
}
