"use client"
import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useParams } from 'next/navigation'
import { client } from '../../../../sanity/lib/client'
import { urlForImage } from '../../../../sanity/lib/image'
import { handleColor } from '@/utils/handleColors'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {

  const { slug } = useParams()
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [product, setProduct] = useState({})
  const [isRenderingInClient, setIsRenderingInClient] = useState(false)

  const query = `*[_type == "product"][slug.current == '${slug}']`

  const fetchData = async () => {
    (typeof window === 'undefined') ? setIsRenderingInClient(false) : setIsRenderingInClient(true)
    const response = await client.fetch(query)
    const productData = [{ ...response[0], colorsOptions: [] }]

    //to Create the colors to show in product details
    productData[0].colors.forEach(color => {
      handleColor(productData[0], color)
    })

    console.log(productData[0])
    setProduct(productData[0])
  }

  const encoded = encodeURI(`Nome: ${product?.name}\nTamanho: ${selectedSize ?? ''}\ncor: ${selectedColor.name ?? ''}\nlink: ${isRenderingInClient && window.location}`)


  useEffect(() => { fetchData() }, [])

  return (
    <div className="bg-white">
      {product?.image &&
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 md:grid md:grid-cols-2 md:gap-x-6 md:max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {product?.image[0] &&
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={urlForImage(product?.image[0])}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            }
            <div className="hidden md:grid md:grid-cols-1 md:gap-y-8">
              {product?.image[1] &&
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={urlForImage(product?.image[1])}

                    className="h-full w-full object-cover object-center"
                  />
                </div>
              }
              {product?.image[2] &&
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={urlForImage(product?.image[2])}

                    className="h-full w-full object-cover object-center"
                  />
                </div>
              }
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-3 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={urlForImage(product?.mainImage)}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}</p>

              <form className="mt-10 md:grid md:grid-cols-2 lg:block">
                {/* Colors */
                  product?.colorsOptions.length > 0 &&
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Cores</h3>

                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                      <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product?.colorsOptions && product?.colorsOptions.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            title={`cor: ${color.name}`}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                'h-8 w-8 rounded-full border border-black border-opacity-10'
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                }

                {/* Sizes */
                  product.sizes.length > 0 &&
                  <div className="mt-10">
                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4 md:grid-cols-3">
                        {product?.sizes && product?.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size}
                            value={size}
                            title={`Tamanho ${size}`}
                            className={({ active }) =>
                              classNames(
                                'cursor-pointer bg-white text-gray-900 shadow-sm',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                }

                <a target='_blank'
                  href={`https://wa.me//5584996450132?text=${encoded}`}
                  rel='noopener noreferrer'
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Pedir no Whats
                </a>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">Descrição</h3>
                <div className="space-y-6 mt-6">
                  <p className="text-base text-gray-900">{product?.description}</p>
                </div>
              </div>

              {/* Highligths */
                product?.highlights &&
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Especificações</h3>
                  <div className="mt-4">
                    <ul role="list" className="list-decimal max-w-max space-y-2 pl-4 text-sm">
                      {product?.highlights && product?.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400 hover:list-disc">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              }

              {/*SE HOUVER NECESSIDADE DE UMA SEÇÃO PARA DETALHES */
                product?.details &&
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Detalhes</h2>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product?.details}</p>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      }
    </div>
  )
}