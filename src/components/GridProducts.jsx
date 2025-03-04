import { client } from "../../sanity/lib/client"
import { useEffect, useState } from "react"
import { urlForImage } from "../../sanity/lib/image"



export function GridProducts({ sortOption, categorySelected }) {
  const [productsList, setProdutcList] = useState()
  const queryProductsByCategory = `*[_type == "product"][categories[0]._ref == "${categorySelected.ref}"]`
  const queryAllProducts = '*[_type == "product"]'

  const fetchData = async (query) => {
    const products = await client.fetch(query)

    if (sortOption.name) {
      switch (sortOption.name) {
        case 'Preço: Menor':
          products.sort((a, b) => a.price - b.price)
          break;
        case 'Preço: Maior':
          products.sort((a, b) => b.price - a.price)
          break;

        default:
          break;
      }
    }

    setProdutcList(products)
    console.log(products)
  }

  useEffect(() => {
    categorySelected.ref
      ? (async () => await fetchData(queryProductsByCategory))()
      : (async () => await fetchData(queryAllProducts))()
  }, [categorySelected.ref, sortOption])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-0">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{categorySelected.name}</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-12 md:gap-x-4 lg:grid-cols-3 xl:gap-x-6">

          {productsList && productsList.map((product) => (
            <a key={product._id} href={`/product/${product.slug.current}`}>
              <article className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={urlForImage(product.mainImage)}
                    alt={product.mainImage.alt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-md text-gray-700">
                      {product.name}
                    </h3>
                    {/*SE TIVER TAG DE PROMOÇÃO <p className="mt-1 text-sm text-gray-500">{product?.tags || ''}</p> */}
                  </div>
                  <p className="text-md font-medium text-gray-900">
                    {product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
                  </p>
                </div>
              </article>
            </a>
          ))}

        </div>
      </div>
    </div>
  )
}
