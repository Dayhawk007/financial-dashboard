"use client";
import { navBarData } from "@/data/nav_data"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"

type Props = {}

const Navbar = (props: Props) => {

  const path = usePathname()
  return (
    <div className="flex flex-col w-16 space-y-6 py-12 items-center h-full bg-white rounded-r-[40px]">
            <h3 className="text-4xl font-bold text-primary pt-4 pb-8">KS</h3>
            {navBarData.map((item) => (
              <Link href={item.link} key={item.name} className={`${path==="/dashboard"?"border-l-accent":"" }  py-2 flex-col flex items-center w-full border-l-[6px] rounded-l-sm transition duration-300 ease-in-out hover:bg-primary-bg`}>
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-2xl text-primary text-accent w-10 h-10"
                  />
              </Link>
            ))
              }
    </div>
  )
}

export default Navbar