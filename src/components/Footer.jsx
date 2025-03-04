export function Footer() {
  return (
    <footer className="bg-gray-800 h-12 flex justify-center items-center bottom-0 w-full">
      <div className="flex justify-center items-center sm:justify-center sm:space-x-4 md:space-x-8">
        <div>
          <img
            className="hidden md:block h-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <span className="text-gray-50 text-center text-sm sm:text-md">© 2021 Afrodite-store. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
