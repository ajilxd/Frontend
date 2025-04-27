// imports...
import { Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Product", href: "/product" },
  { name: "Features", href: "/features" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Company", href: "/company" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-transparent dark:from-gray-900/80 dark:via-gray-950 dark:to-transparent pointer-events-none" />

      <header className="absolute inset-x-0 top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/5 via-purple-100/5 to-indigo-100/5 dark:from-indigo-900/5 dark:via-purple-900/5 dark:to-indigo-900/5 opacity-30 pointer-events-none" />
        <nav
          aria-label="Global"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-6"
        >
          <div className="flex">
            <span
              onClick={() => navigate("/")}
              className="flex items-center group cursor-pointer"
            >
              <span className="sr-only">FluentaWork</span>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                FluentaWork
              </p>
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <span
                key={item.name}
                onClick={() => navigate(item.href)}
                className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600/70 dark:after:bg-indigo-400/70 after:transition-all"
              >
                {item.name}
              </span>
            ))}
          </div>

          {/* Desktop login buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <span
              onClick={() => navigate("/owner/signin")}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Log in as owner
            </span>
            <span
              onClick={() => navigate("/auth/login-email")}
              className="cursor-pointer px-4 py-2 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md transition-colors"
            >
              Log in with email
            </span>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div
              className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-40 w-full max-w-xs overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10">
              <div className="flex items-center justify-between">
                <span
                  onClick={() => navigate("/")}
                  className="flex items-center cursor-pointer"
                >
                  <span className="sr-only">FluentaWork</span>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    FluentaWork
                  </p>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
                  <div className="space-y-1 py-6">
                    {navigation.map((item) => (
                      <span
                        key={item.name}
                        onClick={() => {
                          navigate(item.href);
                          setMobileMenuOpen(false);
                        }}
                        className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                  <div className="py-6 space-y-1">
                    <span
                      onClick={() => {
                        navigate("/owner/signin");
                        setMobileMenuOpen(false);
                      }}
                      className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Log in as owner
                    </span>
                    <span
                      onClick={() => {
                        navigate("/auth/login-email");
                        setMobileMenuOpen(false);
                      }}
                      className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Log in with email
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero section */}
      <div className="relative isolate px-4 sm:px-6 lg:px-8 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-full max-w-lg -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-300/30 via-purple-300/20 to-pink-300/10 dark:from-indigo-700/30 dark:via-purple-700/20 dark:to-pink-700/10 opacity-20 sm:left-[calc(50%-30rem)] sm:w-full sm:max-w-3xl" />
        </div>
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full mb-6">
              Productivity Platform
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-gray-900 dark:text-white">
              Streamline Your Workflow, Empower Your Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              FluentaWork simplifies task management, helping users track
              progress and meet deadlines efficiently. It promotes seamless
              collaboration, keeping projects on track. With customizable setups
              and role-based access, FluentaWork enhances productivity for every
              team.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <span
                onClick={() => navigate("/signup")}
                className="cursor-pointer w-full sm:w-auto rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center"
              >
                Get started
              </span>
              <span
                onClick={() => navigate("/learn-more")}
                className="cursor-pointer w-full sm:w-auto rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 dark:focus-visible:outline-gray-700 text-center inline-flex items-center justify-center"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4" />
              </span>
            </div>
            <div className="mt-16 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-400 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20">
                New feature available.{" "}
                <span
                  onClick={() => navigate("/read-more")}
                  className="cursor-pointer font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-full max-w-lg -translate-x-1/2 bg-gradient-to-tr from-indigo-300/20 via-purple-300/10 to-pink-300/5 dark:from-indigo-700/20 dark:via-purple-700/10 dark:to-pink-700/5 opacity-20 sm:left-[calc(50%+10rem)] sm:w-full sm:max-w-3xl" />
        </div>
      </div>
    </div>
  );
}
