"use client";

import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Avatar from "boring-avatars";

export default function Example() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsClient(true);

    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        router.push("/signin");
      }
      if (error) {
        console.log(error);
      }
    }
    fetchSession();

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setUser(data.user);
      }
    }
    fetchUser();
  }, [router]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      router.push("/signin");
    }
  }

  if (!isClient) {
    return null;
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <span className="text-white">Chatr</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4"></div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <span className="m-3 text-white">
                    Welcome, {user?.user_metadata?.userName || " "}
                  </span>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Avatar
                          name={user?.user_metadata?.userName || " "}
                          size={40}
                          variant="beam"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <MenuItem>
                        <a
                          href={"/profile"}
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Your Profile
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href={"/settings"}
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Settings
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <span
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Sign out
                        </span>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <Avatar
                    name={user?.user_metadata?.userName || " "}
                    size={40}
                    variant="beam"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user?.user_metadata?.userName}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user?.user_metadata?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as="a"
                  href={"/profile"}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Your Profile
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href={"/settings"}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </DisclosureButton>
                <DisclosureButton
                  as="span"
                  onClick={handleSignOut}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            Hi
          </div>
        </main>
      </div>
    </>
  );
}
