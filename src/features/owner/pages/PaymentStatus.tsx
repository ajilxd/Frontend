import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const status = new URLSearchParams(window.location.search).get("status");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const getStatusDetails = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
          message: "Payment Successful",
          description: "Your transaction has been completed successfully.",
          color: "border-green-500/20 bg-green-500/5",
        };
      case "cancel":
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          message: "Payment Canceled",
          description: "Your transaction was canceled.",
          color: "border-red-500/20 bg-red-500/5",
        };
      default:
        return {
          icon: <AlertCircle className="w-12 h-12 text-gray-500" />,
          message: "No Payment Status",
          description: "Unable to retrieve payment information.",
          color: "border-gray-500/20 bg-gray-500/5",
        };
    }
  };

  const { icon, message, description, color } = getStatusDetails();

  const handleClose = () => {
    setIsOpen(false);
    window.location.href = "/owner/dashboard/subscriptions";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <Card
              className={`relative border ${color} bg-white dark:bg-white shadow-lg rounded-lg transition-all duration-300`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                <X className="w-5 h-5" />
              </Button>
              <CardHeader className="text-center pt-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex justify-center mb-4"
                >
                  {icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <CardTitle className="text-xl font-medium text-gray-900">
                    {message}
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-gray-600 text-sm"
                >
                  {description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Button variant="default" onClick={handleClose}>
                    Go Back
                  </Button>
                  {status === "success" && (
                    <Button
                      onClick={() =>
                        (window.location.href = "/owner/dashboard/invoices")
                      }
                    >
                      View Receipt
                    </Button>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentStatus;
