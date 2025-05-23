export default {
  name: 'design',
  title: 'Design',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'publisher', title: 'Publisher', type: 'string' },
    { name: 'year', title: 'Year', type: 'number' },
    { 
      name: 'cover', 
      title: 'Design Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.min(1)
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
  ],
}; 