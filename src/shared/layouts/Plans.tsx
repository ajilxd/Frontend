import { CheckIcon } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    priceMonthly: "$19",
    description: "Ideal for small teams starting with project management.",
    features: [
      "5 active projects",
      "Up to 20 team members",
      "Task management",
      "Basic reporting",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    priceMonthly: "$49",
    description:
      "Advanced tools for growing teams to manage multiple projects.",
    features: [
      "Unlimited active projects",
      "Up to 100 team members",
      "Advanced reporting",
      "Time tracking",
      "Priority email support",
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Plans() {
  return (
    <div className="relative isolate bg-white dark:bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 dark:opacity-20"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
          Pricing
        </h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 dark:text-gray-300 sm:text-xl/8">
        Choose an affordable plan that's packed with the best features for
        engaging your audience, creating customer loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 dark:bg-gray-800 shadow-2xl"
                : "bg-white/60 dark:bg-gray-950/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 dark:ring-white/10 sm:p-10"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured
                  ? "text-indigo-400"
                  : "text-indigo-600 dark:text-indigo-400",
                "text-base font-semibold leading-7"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured
                    ? "text-white"
                    : "text-gray-900 dark:text-white",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured
                    ? "text-gray-400"
                    : "text-gray-500 dark:text-gray-400",
                  "text-base"
                )}
              >
                /month
              </span>
            </p>
            <p
              className={classNames(
                tier.featured
                  ? "text-gray-300"
                  : "text-gray-600 dark:text-gray-300",
                "mt-6 text-base leading-7"
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured
                  ? "text-gray-300"
                  : "text-gray-600 dark:text-gray-300",
                "mt-8 space-y-3 text-sm leading-6 sm:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured
                        ? "text-indigo-400"
                        : "text-indigo-600 dark:text-indigo-400",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
