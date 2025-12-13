
# Technology Choices
  
# Which technologies did you use and why?

React: Used for building the frontend UI and managing pages easily.
Node.js & Express.js: Used to build a simple and fast backend API.
MongoDB: Used to store user, leave, and balance data.
JWT (JSON Web Token): Used for secure authentication.
Axios: Used to connect frontend with backend APIs.

# Why this database over others?

MongoDB was chosen because:

It is easy to work with JavaScript applications.
Flexible schema is suitable for rapid development.
Easy integration with Node.js using Mongoose.
Good for small to medium-sized applications.

# Implementation Decisions
How did you structure your database schema?

User collection:
Stores name, email, password, role (employee/manager), and manager reference.

Leave collection:
Stores leave dates, leave type, reason, status, and linked employee and manager.

LeaveBalance collection:
Stores casual, sick, and earned leave balances for each employee.

# What assumptions did you make about the requirements?

Each employee is assigned to only one manager.
Leave balance is updated only after manager approval.
Only managers can approve or reject leave requests.
Employees cannot approve their own leaves.

# Which features did you prioritize and why?

Core leave workflow (Apply → Approve → Reject) because it is the main requirement.
Authentication and role-based access for security.
Leave balance tracking to reflect real-world systems.
Error handling to prevent incorrect actions.

# Challenges

# What was the most difficult part?

Handling role-based access for employee and manager.
Connecting leave requests correctly to the assigned manager.
Preventing duplicate leave requests.

# How did you solve it?

Used middleware for authentication and role checking.
Stored manager ID in employee and leave records.
Added backend validation to prevent duplicate leave applications.

# What would you improve with more time?

Add email notifications for leave status.
Improve UI design and user experience.
Add public holiday and weekend handling.

# Trade-offs

# What features did you skip and why?

Email notifications were skipped due to time limitations.
Password reset functionality was skipped as it was not required.
Advanced reports were skipped to focus on core features.

# What shortcuts did you take due to time constraints?

Used simple CSS instead of advanced UI frameworks.
Focused on functionality over animations.
Used basic error messages instead of detailed user notifications.









