import { enqueueSnackbar } from "notistack";
import { useState, useEffect, useCallback } from "react";

import { PaginationComponent } from "@/shared/components/Pagination";

import { adminFetchOwners, adminToggleOwnerStatus } from "../../api/admin.api";

type OwnerType = {
  _id: string;
  createdAt: string;
  email: string;
  isBlocked: boolean;
  isVerified: boolean;
  name: string;
  password?: string;
  refreshToken: string;
  stripe_customer_id: string;
  updatedAt: string;
  subscription?: {
    planName?: string;
    status?: string;
    renewalDate?: string;
    // Extend as needed
  };
};

// Skeleton Loader Component
const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={`skeleton-${i}`} className="px-6 py-4">
        <div
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
            i === 1 ? "w-12 h-12 rounded-full" : "w-3/4"
          }`}
        ></div>
      </td>
    ))}
  </tr>
);

const OwnersTable = () => {
  const [owners, setOwners] = useState<OwnerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedOwner, setUpdatedOwner] = useState<boolean>(false);

  useEffect(() => {
    async function fetchOwner() {
      const res = await adminFetchOwners(page, itemPerPage);
      if (res.success) {
        return res.data.data;
      } else {
        throw new Error(res.message);
      }
    }

    let timer: NodeJS.Timeout;
    fetchOwner()
      .then((data) => {
        timer = setTimeout(() => {
          setOwners(data.users);
          setTotalPages(data.totalPage);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Owner data fetching failed, try again later", {
          variant: "error",
        });
      });

    return () => clearTimeout(timer);
  }, [page, itemPerPage, updatedOwner]);

  const memoisedPageUpdater = useCallback((page: number) => {
    setPage(page);
  }, []);

  const toggleStatusHandler = async (id: string) => {
    const res = await adminToggleOwnerStatus(id);
    if (res.success) {
      enqueueSnackbar("owner status updated successfully", {
        variant: "success",
      });
      setUpdatedOwner(!updatedOwner);
    } else {
      enqueueSnackbar("owner status updation failed !", {
        variant: "error",
      });
      console.error(res.message);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Owners
        </h1>
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {[
                    "Name",
                    "Profile Pic",
                    "Email",
                    "Account Created",
                    "Subscription",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={`loading-${i}`} />
                    ))
                  : owners.map((owner) => (
                      <tr
                        key={owner._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          {owner.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`https://i.pravatar.cc/150?u=${owner._id}`}
                            alt={`${owner.name}'s profile`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {owner.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {new Date(owner.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {owner.subscription?.planName ?? "No Plan"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              owner.isBlocked
                                ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                                : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            }`}
                          >
                            {owner.isBlocked ? "Inactive" : "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          <button
                            className="px-2 py-1 rounded-full text-xs font-medium "
                            onClick={() => toggleStatusHandler(owner._id)}
                          >
                            {!owner.isBlocked ? "Block" : "Unblock"}
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={page}
        paginationHandler={memoisedPageUpdater}
      ></PaginationComponent>
    </>
  );
};

export default OwnersTable;
