export const handleColor = (productData, color) => {
  switch (color.toLowerCase()) {
    case 'preto':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-gray-900',
        selectedColor: 'ring-gray-900'
      })
      break;
    case 'cinza':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-gray-200',
        selectedColor: 'ring-gray-400'
      })
      break;
    case 'branco':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-white',
        selectedColor: 'ring-gray-400'
      })
      break;
    case 'vermelho':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-red-600',
        selectedColor: 'ring-gray-400'
      })
      break;
    case 'amarelo':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-yellow-400',
        selectedColor: 'ring-gray-400'
      })
      break;
    case 'marrom':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-amber-800',
        selectedColor: 'ring-gray-400'
      })
      break;
    case 'azul':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-blue-400',
        selectedColor: 'ring-gray-400'
      })
      break;
    case 'verde':
      productData.colorsOptions.push({
        name: color,
        class: 'bg-green-500',
        selectedColor: 'ring-gray-400'
      })
      break;

    default:
      break;
  }
}