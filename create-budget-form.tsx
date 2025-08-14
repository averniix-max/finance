"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateBudgetFormProps {
  onClose: () => void
}

export function CreateBudgetForm({ onClose }: CreateBudgetFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    allocatedAmount: "",
    periodStart: "",
    periodEnd: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating budget category:", formData)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g., Office Supplies, Marketing, Travel"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief description of what this budget covers..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allocatedAmount">Budget Amount</Label>
        <Input
          id="allocatedAmount"
          type="number"
          min="0"
          step="0.01"
          value={formData.allocatedAmount}
          onChange={(e) => handleChange("allocatedAmount", e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="periodStart">Period Start</Label>
          <Input
            id="periodStart"
            type="date"
            value={formData.periodStart}
            onChange={(e) => handleChange("periodStart", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="periodEnd">Period End</Label>
          <Input
            id="periodEnd"
            type="date"
            value={formData.periodEnd}
            onChange={(e) => handleChange("periodEnd", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Budget Type</Label>
        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select budget type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="operational">Operational</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="travel">Travel & Entertainment</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="training">Training & Development</SelectItem>
            <SelectItem value="facilities">Facilities</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Budget</Button>
      </div>
    </form>
  )
}
