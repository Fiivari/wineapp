import { countries } from "@/constants"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="mt-12 bg-wine-red text-white">
      <div className="p-12 grid grid-cols-5">
        {countries.map((country) => (
          <Link 
            key={country} 
            href={`/${country.toLowerCase().replace(/\s+/g, '-')}`}
            className="mt-2 text-lg hover:underline"
          >
            {country}
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer