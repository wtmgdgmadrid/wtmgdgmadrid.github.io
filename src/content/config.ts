import { z, defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/data/team' }),
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    social: z.object({
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      bluesky: z.string().url().optional(),
    }),
    order: z.number().optional(),
  }),
});

const partnerCollection = defineCollection({
  loader: file('src/data/partners.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    url: z.string().url(),
    order: z.number().optional(),
    iwdPartner: z.boolean().optional(),
  }),
});

const sponsorCollection = defineCollection({
  loader: file('src/data/sponsors.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    url: z.string().url(),
    order: z.number().optional(),
  }),
});

export const collections = {
  post: postCollection,
  team: teamCollection,
  partner: partnerCollection,
  sponsor: sponsorCollection,
};
