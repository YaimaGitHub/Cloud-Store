const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { 
      name: 'title',
      title: 'Nome para uso interno',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        }
      ]
    },
    {
      name: 'image',
      title: 'Imagem extra',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'name',
      title: 'Nome',
      type: 'string',
    },
    { 
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      }
    },
    {
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    { 
      name: 'price',
      title: 'Preço',
      type: 'number',
    },
    { 
      name: 'description',
      title: 'Descrição',
      type: 'string',
    },
    {
      name: 'highlights',
      title: 'Destaques',
      type: 'array',
      of: [{
        type: 'string'
      }]
    },
    {
      name: 'details',
      title: 'Detalhes',
      type: 'string',
    },
    {
      name: 'colors',
      title: 'Cor',
      type: 'array',
      of: [{
        type: 'string'
      }]
    },
    {
      name: 'sizes',
      title: 'Tamanhos',
      type: 'array',
      of: [{
        type: 'string'
      }]
    }
  ]
}

export default product