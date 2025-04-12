import { JSDOM } from "jsdom"

export default async function handler(req, res) {
  try {
    // Fetch exchange rates from eltoque.com
    const response = await fetch("https://eltoque.com/tasas-de-cambio-de-moneda-en-cuba-hoy")
    const html = await response.text()

    // Parse the HTML to extract exchange rates
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Find the exchange rate elements - this selector might need adjustment based on the actual website structure
    const rateElements = document.querySelectorAll(".exchange-rate-card")

    const rates = {
      USD: { buy: 0, sell: 0, date: new Date().toISOString() },
      EUR: { buy: 0, sell: 0, date: new Date().toISOString() },
      MLC: { buy: 0, sell: 0, date: new Date().toISOString() },
      CUP: { buy: 1, sell: 1, date: new Date().toISOString() },
    }

    // Extract rates from the elements
    rateElements.forEach((element) => {
      const currencyName = element.querySelector(".currency-name")?.textContent?.trim()
      const buyRate = element.querySelector(".buy-rate")?.textContent?.replace(/[^\d.]/g, "")
      const sellRate = element.querySelector(".sell-rate")?.textContent?.replace(/[^\d.]/g, "")

      if (currencyName && buyRate && sellRate) {
        if (currencyName.includes("USD") || currencyName.includes("Dólar")) {
          rates.USD.buy = Number.parseFloat(buyRate)
          rates.USD.sell = Number.parseFloat(sellRate)
        } else if (currencyName.includes("EUR") || currencyName.includes("Euro")) {
          rates.EUR.buy = Number.parseFloat(buyRate)
          rates.EUR.sell = Number.parseFloat(sellRate)
        } else if (currencyName.includes("MLC")) {
          rates.MLC.buy = Number.parseFloat(buyRate)
          rates.MLC.sell = Number.parseFloat(sellRate)
        }
      }
    })

    // If we couldn't parse the rates, use fallback values
    if (rates.USD.buy === 0) {
      rates.USD = { buy: 250, sell: 255, date: new Date().toISOString() }
      rates.EUR = { buy: 265, sell: 275, date: new Date().toISOString() }
      rates.MLC = { buy: 245, sell: 250, date: new Date().toISOString() }
    }

    // Calculate inverse rates (for converting from CUP to other currencies)
    const inverseRates = {
      USD: 1 / rates.USD.sell,
      EUR: 1 / rates.EUR.sell,
      MLC: 1 / rates.MLC.sell,
      CUP: 1,
    }

    res.status(200).json({
      rates,
      inverseRates,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)

    // Return fallback rates if there's an error
    const fallbackRates = {
      rates: {
        USD: { buy: 250, sell: 255, date: new Date().toISOString() },
        EUR: { buy: 265, sell: 275, date: new Date().toISOString() },
        MLC: { buy: 245, sell: 250, date: new Date().toISOString() },
        CUP: { buy: 1, sell: 1, date: new Date().toISOString() },
      },
      inverseRates: {
        USD: 1 / 255,
        EUR: 1 / 275,
        MLC: 1 / 250,
        CUP: 1,
      },
      lastUpdated: new Date().toISOString(),
      isOffline: true,
    }

    res.status(200).json(fallbackRates)
  }
}
