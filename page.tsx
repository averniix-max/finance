"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Edit, Eye, Send, FileText, DollarSign, Clock, CheckCircle } from "lucide-react"
import { CreateInvoiceForm } from "@/components/create-invoice-form"
import { InvoiceDetails } from "@/components/invoice-details"

// Mock invoice data
const invoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    clientName: "Acme Corporation",
    projectName: "Website Redesign",
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    subtotal: 15000,
    taxAmount: 1200,
    totalAmount: 16200,
    status: "paid",
    paidAmount: 16200,
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    clientName: "Global Industries",
    projectName: "Mobile App Development",
    issueDate: "2024-01-20",
    dueDate: "2024-02-19",
    subtotal: 25000,
    taxAmount: 2000,
    totalAmount: 27000,
    status: "sent",
    paidAmount: 0,
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    clientName: "StartupXYZ",
    projectName: "Brand Identity",
    issueDate: "2024-02-01",
    dueDate: "2024-03-02",
    subtotal: 8500,
    taxAmount: 680,
    totalAmount: 9180,
    status: "overdue",
    paidAmount: 0,
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    clientName: "Tech Solutions Inc",
    projectName: "E-commerce Platform",
    issueDate: "2024-02-10",
    dueDate: "2024-03-11",
    subtotal: 35000,
    taxAmount: 2800,
    totalAmount: 37800,
    status: "draft",
    paidAmount: 0,
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-005",
    clientName: "Digital Agency",
    projectName: "Marketing Campaign",
    issueDate: "2024-02-15",
    dueDate: "2024-03-16",
    subtotal: 12000,
    taxAmount: 960,
    totalAmount: 12960,
    status: "partial",
    paidAmount: 6000,
  },
]

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (invoice: (typeof invoices)[0]) => {
    setSelectedInvoice(invoice)
    setIsDetailsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "sent":
        return "secondary"
      case "overdue":
        return "destructive"
      case "draft":
        return "outline"
      case "partial":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "sent":
        return <Send className="h-4 w-4" />
      case "overdue":
        return <Clock className="h-4 w-4" />
      case "draft":
        return <FileText className="h-4 w-4" />
      case "partial":
        return <DollarSign className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0)
  const pendingAmount = invoices.reduce((sum, invoice) => sum + (invoice.totalAmount - invoice.paidAmount), 0)
  const overdueInvoices = invoices.filter((invoice) => invoice.status === "overdue").length

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage invoices and track payments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Generate a new invoice for your client.</DialogDescription>
            </DialogHeader>
            <CreateInvoiceForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">from paid invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueInvoices}</div>
            <p className="text-xs text-muted-foreground">need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Manage all your invoices and their payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>{invoice.projectName}</TableCell>
                    <TableCell>${invoice.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(invoice.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(invoice.status)}
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(invoice)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Record Payment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>Complete invoice information and line items.</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <InvoiceDetails invoice={selectedInvoice} onClose={() => setIsDetailsDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
