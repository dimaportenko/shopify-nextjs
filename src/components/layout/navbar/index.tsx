import { Suspense } from "react";
import { shopifyConfig } from "@/services/shopify/config/shopify-config";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export async function Navbar() {
  const [config, menu] = await Promise.all([
    shopifyConfig.fetchConfig(),
    shopifyConfig.getMenu("main-menu"),
  ]);

  return (
    <nav className="relative flex items-center justify-between bg-black p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Suspense fallback={null}>
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center text-white md:w-auto lg:mr-6"
            >
              {config.logo ? (
                <Image src={config.logo} alt="Logo" width={50} height={50} />
              ) : (
                config.shopName || "Dima Store"
              )}
            </Link>
          </Suspense>
          {menu && menu.items.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="underline-offset-4 hover:underline text-neutral-400 hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {/* <div className="hidden justify-center md:flex md:w-1/3"> */}
        {/*   <Suspense fallback={<SearchSkeleton />}> */}
        {/*     <Search /> */}
        {/*   </Suspense> */}
        {/* </div> */}

        {/* <div className="flex justify-end md:w-1/3"> */}
        {/*   <CartModal /> */}
        {/* </div> */}
      </div>
    </nav>
  );
}
