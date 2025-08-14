"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, DollarSign, FileText, Receipt, Check, X } from "lucide-react"

interface Expense {
  id: number
  employeeName: string
  category: string
  description: string
  amount: number
  expenseDate: string
  status: string
  receiptUrl: string
}

interface ExpenseDetailsProps {
  expense: Expense
  onClose: () => void
}

export function ExpenseDetails({ expense, onClose }: ExpenseDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
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
      {/* Expense Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/abstract-geometric-shapes.png?height=48&width=48&query=${expense.employeeName}`} />
            <AvatarFallback>{getInitials(expense.employeeName)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{expense.employeeName}</h3>
            <p className="text-muted-foreground">{expense.category}</p>
            <Badge variant={getStatusColor(expense.status)} className="mt-1">
              {expense.status}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${expense.amount.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">{formatDate(expense.expenseDate)}</div>
        </div>
      </div>

      <Separator />

      {/* Expense Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Expense Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Employee:</strong> {expense.employeeName}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Category:</strong> {expense.category}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Amount:</strong> ${expense.amount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Date:</strong> {formatDate(expense.expenseDate)}
            </span>
          </div>
          <div className="space-y-2">
            <strong>Description:</strong>
            <p className="text-muted-foreground">{expense.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Receipt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Receipt className="h-4 w-4 mr-2" />
            Receipt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Receipt className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Receipt.pdf</div>
                <div className="text-sm text-muted-foreground">Uploaded with expense</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Receipt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="space-x-2">
          {expense.status === "pending" && (
            <>
              <Button variant="default" className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </>
          )}
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}
