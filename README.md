# pannukakku-osa-3
The application allows users to create pancake orders. Each order is saved and later displayed on the All Orders page, where the order status can be updated.  Different order statuses are shown using different colours.

🥞 Pancake Order Project

In this project, pancake orders are handled and stored in an array.
In addition, a new “All Orders” page was created, where the chef can manage the status of each order.

📋 Project Description

The application allows users to create pancake orders.
Each order is saved and later displayed on the All Orders page, where the order status can be updated.

Different order statuses are shown using different colours.

🧾 Order Data Structure

Each order is saved as an object with the following information:

id – unique order ID

customerName – customer’s name

selectedPancake – chosen pancake type

toppings – toppings (array)

extras – extras (array)

deliveryMethod – delivery or pickup

totalPrice – total price

📄 “All Orders” Page

A new HTML page called All Orders was created from scratch.

On this page:

All saved orders are displayed

The chef can update the order status

Orders are styled differently based on their status

Order Status Styles

waiting – yellow 🟡

ready – blue 🔵

delivered – green 🟢

⚙️ Implementation Details

Orders are stored in an orders array

When an order is confirmed:

A unique ID is created using Date.now()

An order object is created

The order is added to the orders array

Orders are saved to localStorage

Orders are loaded from localStorage when the page is refreshed

All orders are shown on the All Orders page

Each order displays:

Order ID

Customer name

Pancake type

Toppings and extras

Delivery method

Total price

Order status (with buttons or dropdown to change status)

When the status is changed:

The correct order object is updated

Changes are saved to localStorage

The order colour updates based on the new status

🔍 Extra Features

Search orders by:

Customer name

Order ID

Sorting (for example, waiting orders shown first)

Delivered orders can be deleted

Login system for the All Orders page

Password: pannukakku123

🔐 Access to “All Orders” Page

A link to the All Orders page is added to the bottom of the Pannukakkusivu3 page.

To access the page, a password is required:

Password: pannukakku123

🎓 Learning Outcome

This project helped me practice the topics we learned during the course at Business College.

The project was challenging, interesting, and useful.
I used artificial intelligence to help understand topics I am still learning, especially in JavaScript.
HTML and CSS were mostly done independently.

status – order status (default: "waiting")

Example order object:
