import { atom, selector } from "recoil"
import { fetcher, getLocationFees } from "../helpers"

//ATOMS
export const selectedCategory = atom({
  key: "selectedCategory",
  default: "all",
})

export const orderOptions = atom({
  key: "orderOptions",
  default: ["Ascendente", "Descendente", "Precio mínimo", "Precio máximo"],
})

export const sortMode = atom({
  key: "sortMode",
  default: "Ascendente",
})

export const searchValue = atom({
  key: "searchValue",
  default: "",
})

export const cart = atom({
  key: "cart",
  default: {},
})

export const cartLength = atom({
  key: "cartLength",
  default: 0,
})

export const cartTotal = atom({
  key: "cartTotal",
  default: 0,
})

// New atom for currency selection
export const selectedCurrency = atom({
  key: "selectedCurrency",
  default: "CUP", // Default to Cuban Peso
})

// Currency exchange rates
export const currencyRates = atom({
  key: "currencyRates",
  default: {
    USD: 0.04, // 1 CUP = 0.04 USD
    EUR: 0.037, // 1 CUP = 0.037 EUR
    MLC: 0.04, // 1 CUP = 0.04 MLC
    CUP: 1, // 1 CUP = 1 CUP
  },
})

// Delivery location
export const deliveryLocation = atom({
  key: "deliveryLocation",
  default: "",
})

export const formState = atom({
  key: "formState",
  default: {},
})

// New atoms for pagination
export const itemsPerPage = atom({
  key: "itemsPerPage",
  default: 12,
})

export const currentPage = atom({
  key: "currentPage",
  default: 1,
})

//SELECTORS
export const itemsList = selector({
  key: "itemsList",
  get: async ({ get }) => {
    const category = get(selectedCategory)
    const sort = get(sortMode)
    const search = get(searchValue)
    let url = `/api?category=${category}&sort=${sort}`

    if (search.length > 0) {
      url += `&search=${search}`
    }

    return await fetcher(url)
  },
})

export const refreshCart = selector({
  key: "refreshCart",
  set: ({ get, set }, { item, n }) => {
    const currentCart = { ...get(cart) }

    if (n === 1) {
      // add item to cart
      currentCart[item.id] = { ...item, qty: 1 }
    } else if (n > 0 && n <= item.stock) {
      // refresh item in cart
      currentCart[item.id] = { ...item, qty: n }
    } else if (n < 1) {
      // remove item to cart
      delete currentCart[item.id]
    }

    const cartToArray = Object.values(currentCart)
    let total = 0
    cartToArray.forEach((item) => {
      const actualPrice = item.offerPrice || item.price
      total += actualPrice * item.qty
    })

    set(cart, currentCart) //set cart state
    set(cartLength, cartToArray.length) //set cart lenght
    set(cartTotal, total) //set cart total
  },
})

export const orderDetails = selector({
  key: "orderDetails",
  get: ({ get }) => {
    const cartItems = get(cart)
    const subTotal = get(cartTotal)
    const location = get(deliveryLocation)
    const formData = get(formState)
    const currency = get(selectedCurrency)

    // Get delivery fee based on location
    const locationFees = getLocationFees()
    const deliveryFee = location ? locationFees[location] : 0

    // Calculate total with delivery fee
    const total = subTotal + deliveryFee

    return {
      cartItems,
      subTotal: subTotal.toFixed(2),
      deliveryLocation: location,
      deliveryFee: deliveryFee.toFixed(2),
      total: total.toFixed(2),
      formData,
      currency,
    }
  },
})

export const resetState = selector({
  key: "resetState",
  set: ({ get, set }) => {
    set(selectedCategory, "all")
    set(sortMode, "Ascendente")
    set(deliveryLocation, "")
    set(cart, {})
    set(cartLength, 0)
    set(cartTotal, 0)
    set(formState, {})
  },
})
