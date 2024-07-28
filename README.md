Frontend Developer Entrance Exam

This project demonstrates a responsive web page built using Angular (version 18) that fetches and displays user data from the JSONPlaceholder API,
implements sorting, allows editing details through a modal, and ensures mobile-friendliness.

Key Features:

Data Fetching and Display:
Leverages Angular's HTTP client to fetch user data from https://jsonplaceholder.typicode.com/users.
Presents the data in a user-friendly, responsive table with columns for name, email, phone, and website.
Website links open in new tabs.

Sorting Functionality:
Users can sort data in ascending or descending order by clicking on name and email column headers.
Implements sorting logic to efficiently rearrange data based on the selected criteria.

User Details Editing:
Double-clicking a row opens a modal for editing user details.
Displays name, email (disabled), phone, and website.
Name, phone, and website are editable.

Input Validation:
Name field is required and accepts only English characters.
Phone field is required and validates Israel mobile phone numbers (e.g., +972527021155).
Website field accepts valid URLs.

Modal Handling:
Employs Material Design's MatDialog to manage modal opening, closing, and user interactions.

Mobile-Friendly Design:
Utilizes flexbox and CSS grid to adjust the layout and ensure responsiveness for various screen sizes.

Technologies Used:

Angular 18
Angular Material 
JSONPlaceholder API
HTML, CSS, JavaScript (TypeScript)


Running the Project:

Clone this repository.
Install dependencies: npm install
Start the development server: ng serve
Further Enhancements:
