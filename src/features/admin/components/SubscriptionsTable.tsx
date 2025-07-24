import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SubscriptionTable = () => {
  const dummyTableData = [
    {
      id: "sub_001",
      customer: "John Doe",
      status: "Active",
      amount: "$120",
      nextPayment: "2025-08-01",
    },
    {
      id: "sub_002",
      customer: "Jane Smith",
      status: "Cancelled",
      amount: "$80",
      nextPayment: "-",
    },
    {
      id: "sub_003",
      customer: "Alice Brown",
      status: "Past Due",
      amount: "$100",
      nextPayment: "2025-08-05",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto m-5">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Next Payment</th>
              </tr>
            </thead>
            <tbody>
              {dummyTableData.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.customer}</td>
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">{row.amount}</td>
                  <td className="px-4 py-2">{row.nextPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionTable;
