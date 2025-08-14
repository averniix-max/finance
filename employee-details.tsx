"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, DollarSign, Building, User } from "lucide-react"

interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  department: string
  salary: number
  hireDate: string
  status: string
}

interface EmployeeDetailsProps {
  employee: Employee
  onClose: () => void
}

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateTenure = (hireDate: string) => {
    const hire = new Date(hireDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - hire.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`
    }
    return `${months} month${months > 1 ? "s" : ""}`
  }

  return (
    <div className="space-y-6">
      {/* Employee Header */}
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`/abstract-geometric-shapes.png?height=64&width=64&query=${employee.firstName}+${employee.lastName}`}
          />
          <AvatarFallback className="text-lg">{getInitials(employee.firstName, employee.lastName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-muted-foreground">{employee.position}</p>
          <Badge variant={employee.status === "active" ? "default" : "secondary"} className="mt-1">
            {employee.status}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{employee.phone}</span>
          </div>
        </CardContent>
      </Card>

      {/* Employment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Position:</strong> {employee.position}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Department:</strong> {employee.department}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Annual Salary:</strong> ${employee.salary.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Hire Date:</strong> {formatDate(employee.hireDate)}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              <strong>Tenure:</strong> {calculateTenure(employee.hireDate)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Summary</CardTitle>
          <CardDescription>Recent performance metrics and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.8</div>
              <div className="text-sm text-muted-foreground">Performance Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}
