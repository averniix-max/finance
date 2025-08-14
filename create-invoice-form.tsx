"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface CreateInvoiceFormProps {
  onClose: () => void
}

export function CreateInvoiceForm({ onClose }: CreateInvoiceFormProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    projectName: "",
    issueDate: "",
    dueDate: "",
    notes: "",
    taxRate: 8,
  })

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const taxAmount = (subtotal * formData.taxRate) / 100
    const totalAmount = subtotal + taxAmount

    console.log("Creating invoice:", {
      ...formData,
      items,
      subtotal,
      taxAmount,
      totalAmount,
    })
    onClose()
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
          }
          return updatedItem
        }
        return item
      }),
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const taxAmount = (subtotal * formData.taxRate) / 100
  const totalAmount = subtotal + taxAmount

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Select value={formData.clientName} onValueChange={(value) => handleChange("clientName", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Acme Corporation">Acme Corporation</SelectItem>
              <SelectItem value="Global Industries">Global Industries</SelectItem>
              <SelectItem value="StartupXYZ">StartupXYZ</SelectItem>
              <SelectItem value="Tech Solutions Inc">Tech Solutions Inc</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="issueDate">Issue Date</Label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Invoice Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Items</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                <Label htmlFor={`description-${item.id}`}>Description</Label>
                <Input
                  id={`description-${item.id}`}
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Service or product description"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                <Input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor={`unitPrice-${item.id}`}>Unit Price</Label>
                <Input
                  id={`unitPrice-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="col-span-2">
                <Label>Total</Label>
                <div className="h-10 px-3 py-2 border rounded-md bg-muted text-sm">${item.total.toFixed(2)}</div>
              </div>
              <div className="col-span-1">
                {items.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Totals */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span>Tax Rate:</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.taxRate}
                  onChange={(e) => handleChange("taxRate", Number.parseFloat(e.target.value) || 0)}
                  className="w-20"
                />
                <span>%</span>
              </div>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional notes or terms..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  )
}
