export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'year', title: 'Year', type: 'number' },
    { name: 'medium', title: 'Medium', type: 'string' },
    { name: 'dimensions', title: 'Dimensions', type: 'string' },
    { 
      name: 'images', 
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.min(1)
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
  ],
}; 