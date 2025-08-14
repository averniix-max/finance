"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddExpenseFormProps {
  onClose: () => void
}

export function AddExpenseForm({ onClose }: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    employeeName: "",
    category: "",
    description: "",
    amount: "",
    expenseDate: "",
    receiptFile: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding expense:", formData)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, receiptFile: file }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employeeName">Employee</Label>
        <Select value={formData.employeeName} onValueChange={(value) => handleChange("employeeName", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="John Smith">John Smith</SelectItem>
            <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
            <SelectItem value="Mike Davis">Mike Davis</SelectItem>
            <SelectItem value="Emily Brown">Emily Brown</SelectItem>
            <SelectItem value="David Wilson">David Wilson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
            <SelectItem value="Meals">Meals & Entertainment</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Detailed description of the expense..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
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
          <Label htmlFor="expenseDate">Expense Date</Label>
          <Input
            id="expenseDate"
            type="date"
            value={formData.expenseDate}
            onChange={(e) => handleChange("expenseDate", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="receipt">Receipt (Optional)</Label>
        <Input
          id="receipt"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
        />
        <p className="text-xs text-muted-foreground">Upload receipt as PDF, JPG, or PNG (max 10MB)</p>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Expense</Button>
      </div>
    </form>
  )
}
