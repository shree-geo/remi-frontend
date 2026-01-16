"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChevronRight, Download, Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <>
        <Toaster position="top-right" richColors />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Enhanced sample data
const invoices = [
  {
    invoice: "INV-001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    date: "2024-01-15",
    customer: "Acme Corp",
  },
  {
    invoice: "INV-002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    date: "2024-01-14",
    customer: "Tech Solutions",
  },
  {
    invoice: "INV-003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    date: "2024-01-13",
    customer: "Global Industries",
  },
  {
    invoice: "INV-004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    date: "2024-01-12",
    customer: "Innovation Labs",
  },
  {
    invoice: "INV-005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    date: "2024-01-11",
    customer: "Future Ventures",
  },
];

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    Paid: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Unpaid: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status as keyof typeof statusStyles]
      }`}
    >
      <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-60" />
      {status}
    </span>
  );
};

// Basic Table
export const Basic: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
          <p className="text-slate-600 mt-2">
            Manage and track all your invoices
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableCaption className="text-slate-600 bg-slate-50 py-4">
              A list of your recent invoices.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                <TableHead className="font-semibold text-slate-700">
                  Invoice
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, idx) => (
                <TableRow
                  key={invoice.invoice}
                  className="hover:bg-blue-50 transition-colors duration-200 border-b border-slate-100"
                >
                  <TableCell className="font-semibold text-slate-900">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {invoice.customer}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="font-bold text-slate-900">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  ),
};

// Table with Actions
export const WithActions: Story = {
  render: () => {
    const handleEdit = (invoice: string) => {
      toast.success(`Editing invoice ${invoice}`);
    };

    const handleDelete = (invoice: string) => {
      toast.error(`Deleted invoice ${invoice}`);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Invoices</h1>
              <p className="text-slate-600 mt-2">
                Manage and track all your invoices
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              + New Invoice
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableCaption className="text-slate-600 bg-slate-50 py-4">
                Invoices with quick action buttons.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                  <TableHead className="font-semibold text-slate-700">
                    Invoice
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Amount
                  </TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.invoice}
                    className="hover:bg-blue-50 transition-colors duration-200 border-b border-slate-100"
                  >
                    <TableCell className="font-semibold text-slate-900">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.customer}
                    </TableCell>
                    <TableCell className="font-bold text-slate-900">
                      {invoice.totalAmount}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(invoice.invoice)}
                        className="hover:bg-blue-50"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(invoice.invoice)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  },
};

// Table with Footer
export const WithFooter: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Financial Summary
          </h1>
          <p className="text-slate-600 mt-2">
            Overview of all transactions and totals
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">$2,750.00</p>
            <p className="text-xs text-emerald-600 mt-2">
              ↑ 12% from last month
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <p className="text-slate-600 text-sm font-medium">Paid Invoices</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">3</p>
            <p className="text-xs text-slate-600 mt-2">60% of total</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
            <p className="text-slate-600 text-sm font-medium">
              Pending Payments
            </p>
            <p className="text-2xl font-bold text-amber-600 mt-2">$500.00</p>
            <p className="text-xs text-amber-600 mt-2">Expected this month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableCaption className="text-slate-600 bg-slate-50 py-4">
              Complete invoice list with financial totals.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                <TableHead className="font-semibold text-slate-700">
                  Invoice
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Status
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-700">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.invoice}
                  className="hover:bg-blue-50 transition-colors duration-200 border-b border-slate-100"
                >
                  <TableCell className="font-semibold text-slate-900">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {invoice.customer}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-900">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-slate-50 font-semibold text-slate-900 border-t-2 border-slate-200">
                <TableCell colSpan={3} className="text-slate-900">
                  Total Revenue
                </TableCell>
                <TableCell className="text-right text-lg text-emerald-600">
                  $2,750.00
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  ),
};

// Interactive Table with Selection
export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const toggleRow = (invoice: string) => {
      setSelectedRows((prev) =>
        prev.includes(invoice)
          ? prev.filter((i) => i !== invoice)
          : [...prev, invoice]
      );
      toast.success(`${invoice} selected`);
    };

    const toggleAll = () => {
      if (selectedRows.length === invoices.length) {
        setSelectedRows([]);
        toast.info("Deselected all");
      } else {
        setSelectedRows(invoices.map((inv) => inv.invoice));
        toast.success(`Selected all ${invoices.length} invoices`);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Bulk Operations
              </h1>
              <p className="text-slate-600 mt-2">
                Select invoices to perform batch actions
              </p>
            </div>
          </div>

          {/* Action Bar */}
          {selectedRows.length > 0 && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex justify-between items-center">
              <div className="text-sm font-medium text-blue-900">
                {selectedRows.length} invoice
                {selectedRows.length !== 1 ? "s" : ""} selected
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Exported selected invoices")}
                >
                  Export
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    toast.error("Deleted selected invoices");
                    setSelectedRows([]);
                  }}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableCaption className="text-slate-600 bg-slate-50 py-4">
                Select invoices to manage them in bulk.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === invoices.length}
                      onChange={toggleAll}
                      className="cursor-pointer w-4 h-4"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Invoice
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.invoice}
                    data-state={
                      selectedRows.includes(invoice.invoice) ? "selected" : ""
                    }
                    className={`hover:bg-blue-50 transition-colors duration-200 border-b border-slate-100 ${
                      selectedRows.includes(invoice.invoice)
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(invoice.invoice)}
                        onChange={() => toggleRow(invoice.invoice)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.customer}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.paymentStatus} />
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  },
};

// Table with Status Badges
export const WithStatusBadges: Story = {
  render: () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Payment Status
            </h1>
            <p className="text-slate-600 mt-2">
              View payment status for all invoices
            </p>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <StatusBadge status="Paid" />
              <p className="text-sm text-slate-600 mt-2">Payment received</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <StatusBadge status="Pending" />
              <p className="text-sm text-slate-600 mt-2">Awaiting payment</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <StatusBadge status="Unpaid" />
              <p className="text-sm text-slate-600 mt-2">Payment overdue</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableCaption className="text-slate-600 bg-slate-50 py-4">
                All invoices with visual status indicators.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                  <TableHead className="font-semibold text-slate-700">
                    Invoice
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Method
                  </TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.invoice}
                    className="hover:bg-blue-50 transition-colors duration-200 border-b border-slate-100"
                  >
                    <TableCell className="font-semibold text-slate-900">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.customer}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.paymentStatus} />
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-900">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  },
};

// Table with Hover Actions
export const WithHoverActions: Story = {
  render: () => {
    const handleView = (invoice: string) => {
      toast.info(`Viewing details for ${invoice}`);
    };

    const handleDownload = (invoice: string) => {
      toast.success(`Downloaded ${invoice}`);
    };

    const handleExport = (invoice: string) => {
      toast.success(`Exported ${invoice}`);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Invoice Management
            </h1>
            <p className="text-slate-600 mt-2">
              Hover over invoices to see quick actions
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <Table>
              <TableCaption className="text-slate-600 bg-slate-50 py-4">
                Hover over rows to reveal quick action buttons.
              </TableCaption>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                  <TableHead className="font-semibold text-slate-700">
                    Invoice
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Amount
                  </TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">
                    Quick Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.invoice}
                    className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-slate-100"
                  >
                    <TableCell className="font-semibold text-slate-900">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {invoice.customer}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.paymentStatus} />
                    </TableCell>
                    <TableCell className="font-bold text-slate-900">
                      {invoice.totalAmount}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(invoice.invoice)}
                          className="hover:bg-blue-100 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(invoice.invoice)}
                          className="hover:bg-emerald-100 hover:text-emerald-700"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleExport(invoice.invoice)}
                          className="hover:bg-purple-100 hover:text-purple-700"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  },
};
