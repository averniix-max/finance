-- Sample data for Finance Management App

-- Insert sample company
INSERT INTO companies (name, email, phone, address) VALUES 
('TechCorp Solutions', 'info@techcorp.com', '+1-555-0123', '123 Business Ave, Tech City, TC 12345');

-- Insert sample employees
INSERT INTO employees (company_id, first_name, last_name, email, phone, position, department, salary, hire_date) VALUES 
(1, 'John', 'Smith', 'john.smith@techcorp.com', '+1-555-0124', 'Software Engineer', 'Engineering', 85000.00, '2023-01-15'),
(1, 'Sarah', 'Johnson', 'sarah.johnson@techcorp.com', '+1-555-0125', 'Product Manager', 'Product', 95000.00, '2023-02-01'),
(1, 'Mike', 'Davis', 'mike.davis@techcorp.com', '+1-555-0126', 'Designer', 'Design', 75000.00, '2023-03-10'),
(1, 'Emily', 'Brown', 'emily.brown@techcorp.com', '+1-555-0127', 'Marketing Manager', 'Marketing', 80000.00, '2023-01-20');

-- Insert sample clients
INSERT INTO clients (company_id, name, email, phone, contact_person) VALUES 
(1, 'Acme Corporation', 'contact@acme.com', '+1-555-0200', 'Robert Wilson'),
(1, 'Global Industries', 'info@global.com', '+1-555-0201', 'Lisa Anderson'),
(1, 'StartupXYZ', 'hello@startupxyz.com', '+1-555-0202', 'David Chen');

-- Insert sample projects
INSERT INTO projects (company_id, client_id, name, description, start_date, end_date, budget) VALUES 
(1, 1, 'Website Redesign', 'Complete redesign of company website', '2024-01-01', '2024-03-31', 50000.00),
(1, 2, 'Mobile App Development', 'Native iOS and Android app', '2024-02-01', '2024-06-30', 120000.00),
(1, 3, 'Brand Identity', 'Logo and brand guidelines', '2024-01-15', '2024-02-28', 25000.00);

-- Insert sample budget categories
INSERT INTO budget_categories (company_id, name, description, allocated_amount, period_start, period_end) VALUES 
(1, 'Office Supplies', 'General office supplies and equipment', 5000.00, '2024-01-01', '2024-12-31'),
(1, 'Marketing', 'Marketing and advertising expenses', 15000.00, '2024-01-01', '2024-12-31'),
(1, 'Travel', 'Business travel and accommodation', 8000.00, '2024-01-01', '2024-12-31'),
(1, 'Software', 'Software licenses and subscriptions', 12000.00, '2024-01-01', '2024-12-31');

-- Insert sample expenses
INSERT INTO expenses (company_id, employee_id, category, description, amount, expense_date, status) VALUES 
(1, 1, 'Software', 'Adobe Creative Suite License', 599.99, '2024-01-15', 'approved'),
(1, 2, 'Travel', 'Client meeting in NYC', 1250.00, '2024-01-20', 'approved'),
(1, 3, 'Office Supplies', 'Design equipment and supplies', 450.00, '2024-01-25', 'pending'),
(1, 4, 'Marketing', 'Social media advertising', 800.00, '2024-02-01', 'approved');
