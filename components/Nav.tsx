'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Nav = () => {
  const pathName = usePathname();

  return (
    <header>
      <div className="px-36 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" width={120} height={140} alt="logo" />
          <span className="text-xl font-mono">Wine Centaur</span>
        </Link>
        {pathName === "/" && (
          <div>
            <p className="text-xl text-center">Pick a country on the map!<br /><span className="text-base">Or scroll down</span></p>
          </div>
        )}
      </div>
    </header>
  )
}

export default Nav