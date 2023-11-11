/*
   File Name: AdvancedWebApp.js

   Description: A sophisticated and elaborate JavaScript code that creates a complex web application.
   This code demonstrates advanced concepts such as asynchronous programming, error handling, modularization, and more.
*/

// Global variables
let currentUserId = null;
let loggedInUser = null;

// Authenticating a user
async function authenticateUser(username, password) {
   try {
      const response = await fetch('/authenticate', {
         method: 'POST',
         body: JSON.stringify({ username, password }),
         headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
         throw new Error('Error in authentication');
      }

      const data = await response.json();
      currentUserId = data.userId;
   } catch (error) {
      console.error('User authentication failed:', error.message);
   }
}

// Fetch user details
async function fetchUserDetails() {
   try {
      const response = await fetch(`/users/${currentUserId}`, {
         method: 'GET',
         headers: { Authorization: `Bearer ${loggedInUser.token}` }
      });

      if (!response.ok) {
         throw new Error('Error in fetching user details');
      }

      const userDetails = await response.json();
      console.log('User details:', userDetails);
   } catch (error) {
      console.error('Error fetching user details:', error.message);
   }
}

// Module: Cart
const Cart = (function() {
   let cartItems = [];

   function addItem(item) {
      cartItems.push(item);
   }

   function removeItem(item) {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (itemIndex !== -1) {
         cartItems.splice(itemIndex, 1);
      }
   }

   function getItems() {
      return cartItems;
   }

   return {
      addItem,
      removeItem,
      getItems
   };
})();

// Sample usage
(async function() {
   await authenticateUser('john.doe', 'password123');
   loggedInUser = { token: 'abcd1234' };

   Cart.addItem({ id: 1, name: 'Product 1', price: 9.99 });
   Cart.addItem({ id: 2, name: 'Product 2', price: 19.99 });
   console.log('Cart items:', Cart.getItems());

   Cart.removeItem({ id: 1 });
   console.log('Cart items after removal:', Cart.getItems());

   fetchUserDetails();
})();