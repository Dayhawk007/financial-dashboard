"use client";
import { navBarData } from "@/data/nav_data"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePathname } from "next/navigation"
import Image from "next/image";
import { AccountBalanceWallet, AccountCircle, BarChart, Dashboard, Settings } from "@material-ui/icons";

type Props = {}

const Navbar = (props: Props) => {

  const path = usePathname()
  return (
    <div className={`flex flex-col w-20 space-y-6 py-12 items-center h-full text-lightestgray bg-white rounded-r-2xl`}>
            <Image src="/images/logo.svg" alt="Logo" className="pb-6" width={36} height={36} />
            <div className={`${path==="/dashboard"?"border-l-4 border-accent rounded-l-sm text-accent":""} w-full py-2 text-center`}>
              <Dashboard fontSize="large" className={`  text-accent`} />
            </div>
            <div className={`${path==="/xyz"?"border-l-4 border-accent rounded-l-sm text-accent":""}   w-full py-2 text-center`}>
              <BarChart fontSize="large" className={`  `} />
            </div>
            <div className={`${path==="/abc"?"border-l-4 border-accent rounded-l-sm text-accent":""}   w-full py-2 text-center`}>
              <AccountBalanceWallet fontSize="large" className={`  `} />
            </div>
            <div className={`${path==="/abc"?"border-l-4 border-accent rounded-l-sm text-accent":""}   w-full py-2 text-center pt-48`}>
              <AccountCircle fontSize="large" className={`  `} />
            </div>
            <div className={`${path==="/abc"?"border-l-4 border-accent rounded-l-sm text-accent":""}   w-full py-2 text-center`}>
              <Settings fontSize="large" className={`  `} />
            </div>
            
    </div>
  )
}

export default Navbar