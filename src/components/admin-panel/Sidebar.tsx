"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { MdDashboard, MdManageAccounts } from 'react-icons/md'
import { GrTransaction } from 'react-icons/gr'
import { IoAnalytics, IoSettings } from 'react-icons/io5'
import { RiShoppingCartLine } from 'react-icons/ri'
import { FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'


const menus = [
    {
        title: "Dashboard",
        icon: <MdDashboard />,
        href: "/admin/dashboard",
    },
    {
        title: "Products",
        icon: <RiShoppingCartLine />,
        href: "/admin/products",
    },
    {
        title: "Accounts",
        icon: <MdManageAccounts />,
        href: "/admin/accounts",
    },
    {
        title: "Transactions",
        icon: <GrTransaction />,
        href: "/admin/transactions",
    },
    {
        title: "Analytics",
        icon: <IoAnalytics />,
        href: "/admin/analytics",
    },
    {
        title: "Settings",
        icon: <IoSettings />,
        href: "/admin/settings",
    },
]

const Sidebar = () => {
    const pathName = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clear authentication tokens or session data

        // Redirect to the main page
        router.push('/')
    }

    return (
        <div className='bg-white w-[300px] min-h-screen p-4 shrink-0'>
            <div className='flex items-center gap-4'>
                <Image className="size-12 rounded-lg" width={48} height={48} src="/logo.png" alt="logo" />
                <h2 className='text-[20px] font-semibold'>Admin Panel</h2>
            </div>

            <ul className='space-y-4 mt-6'>
                {menus.map(menu => (
                    <Link
                        key={menu.title}
                        href={menu.href}
                        className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-accent hover:text-white ${pathName === menu.href ? "bg-accent text-white" : "bg-gray-200"}`}
                    >
                        <div className='text-[20px]'>
                            {menu.icon}
                            <p>{menu.title}</p>
                        </div>
                    </Link>
                ))}
            </ul>

            <button
                onClick={handleLogout}
                className="flex gap-2 items-center p-4 mt-6 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white bg-gray-200 text-black w-full"
            >
                <FaSignOutAlt className="text-[20px]" />
                <p>Logout</p>
            </button>
        </div>
    )
}

export default Sidebar
