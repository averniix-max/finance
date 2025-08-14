"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Calendar, FileText, Send, Download } from "lucide-react"

interface Invoice {
  id: number
  invoiceNumber: string
  clientName: string
  projectName: string
  issueDate: string
  dueDate: string
  subtotal: number
  taxAmount: number
  totalAmount: number
  status: string
  paidAmount: number
}

interface InvoiceDetailsProps {
  invoice: Invoice
  onClose: () => void
}

// Mock invoice items
const invoiceItems = [
  {
    id: 1,
    description: "UI/UX Design Services",
    quantity: 40,
    unitPrice: 125,
    total: 5000,
  },
  {
    id: 2,
    description: "Frontend Development",
    quantity: 60,
    unitPrice: 100,
    total: 6000,
  },
  {
    id: 3,
    description: "Backend Integration",
    quantity: 32,
    unitPrice: 125,
    total: 4000,
  },
]

export function InvoiceDetails({ invoice, onClose }: InvoiceDetailsProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Invoice Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{invoice.invoiceNumber}</h3>
          <p className="text-muted-foreground">{invoice.projectName}</p>
          <Badge variant={getStatusColor(invoice.status)} className="mt-2">
            {invoice.status}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${invoice.totalAmount.toLocaleString()}</div>
          {invoice.paidAmount > 0 && (
            <div className="text-sm text-muted-foreground">${invoice.paidAmount.toLocaleString()} paid</div>
          )}
        </div>
      </div>

      <Separator />

      {/* Invoice Information */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Client:</strong> {invoice.clientName}
              </div>
              <div>
                <strong>Project:</strong> {invoice.projectName}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Invoice Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <strong>Issue Date:</strong> {formatDate(invoice.issueDate)}
              </div>
              <div>
                <strong>Due Date:</strong> {formatDate(invoice.dueDate)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Invoice Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.unitPrice}</TableCell>
                  <TableCell className="text-right">${item.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%):</span>
              <span>${invoice.taxAmount.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send Invoice
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}
