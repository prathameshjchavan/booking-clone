import { cn } from "@/lib/utils";
import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import products from "@/data/products";
import { callsToAction } from "@/data/callsToAction";
import { links } from "@/data/links";
import useMenuStore from "@/stores/useMenuStore";

const HeaderMobile = () => {
  const { mobileMenuOpen, setMobileMenuOpen } = useMenuStore();

  return (
    <Dialog
      as="div"
      className="lg:hideen"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />

      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#013B94] p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="#" className="-mt-1.5 p-1.5">
            <span className="sr-only">Booking.com</span>
            <Image src="/logo.svg" alt="logo" width={144} height={24} />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <Fragment>
                    <Disclosure.Button className="rounedd-lg flex w-full items-center justify-between py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                      Stays
                      <ChevronDownIcon
                        className={cn(
                          open ? "rotate-180" : "",
                          "h-5 w-5 flex-none",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                      {[...products, ...callsToAction].map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as={Link}
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-blue-800"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </Fragment>
                )}
              </Disclosure>

              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="disclosure-link"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="py-6">
              <Link href="#" className="disclosure-link">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default HeaderMobile;
