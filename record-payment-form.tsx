"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RecordPaymentFormProps {
  onClose: () => void
}

export function RecordPaymentForm({ onClose }: RecordPaymentFormProps) {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    referenceNumber: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Recording payment:", formData)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="invoiceNumber">Invoice Number</Label>
        <Select value={formData.invoiceNumber} onValueChange={(value) => handleChange("invoiceNumber", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select invoice" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INV-2024-002">INV-2024-002 - Global Industries ($27,000)</SelectItem>
            <SelectItem value="INV-2024-003">INV-2024-003 - StartupXYZ ($9,180)</SelectItem>
            <SelectItem value="INV-2024-004">INV-2024-004 - Tech Solutions Inc ($37,800)</SelectItem>
            <SelectItem value="INV-2024-005">INV-2024-005 - Digital Agency ($6,960 remaining)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Payment Amount</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentDate">Payment Date</Label>
          <Input
            id="paymentDate"
            type="date"
            value={formData.paymentDate}
            onChange={(e) => handleChange("paymentDate", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select value={formData.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
            <SelectItem value="Credit Card">Credit Card</SelectItem>
            <SelectItem value="Check">Check</SelectItem>
            <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
            <SelectItem value="PayPal">PayPal</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="referenceNumber">Reference Number</Label>
        <Input
          id="referenceNumber"
          value={formData.referenceNumber}
          onChange={(e) => handleChange("referenceNumber", e.target.value)}
          placeholder="Transaction ID, check number, etc."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Additional payment details..."
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Record Payment</Button>
      </div>
    </form>
  )
}
