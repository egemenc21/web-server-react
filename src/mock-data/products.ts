import axios from "axios";

export interface Product {
  productId: number;
  productName: string;
  description: string;
  price: number;
  quantity: number;
}

const products:Product[] = [
  {
    productId: 1,
    productName: "Laptop",
    description: "Powerful laptop for work and play.",
    price: 1099.99,
    quantity: 5,
  },
  {
    productId: 2,
    productName: "Smartphone",
    description: "The latest smartphone with advanced features.",
    price: 799.99,
    quantity: 10,
  },
  {
    productId: 3,
    productName: "Tablet",
    description: "Lightweight tablet for entertainment on the go.",
    price: 399.99,
    quantity: 7,
  },
  {
    productId: 4,
    productName: "Headphones",
    description: "Premium headphones for an immersive audio experience.",
    price: 199.99,
    quantity: 15,
  },
  {
    productId: 5,
    productName: "Smartwatch",
    description: "Stay connected and track your fitness with this smartwatch.",
    price: 299.99,
    quantity: 3,
  },
  {
    productId: 6,
    productName: "Camera",
    description: "Capture your moments with this high-quality camera.",
    price: 499.99,
    quantity: 8,
  },
  {
    productId: 7,
    productName: "Wireless Speaker",
    description: "Portable wireless speaker for music on the go.",
    price: 129.99,
    quantity: 12,
  },
  {
    productId: 8,
    productName: "Gaming Console",
    description: "Experience gaming like never before with this console.",
    price: 399.99,
    quantity: 4,
  },
  {
    productId: 9,
    productName: "External Hard Drive",
    description: "Expand your storage with this reliable external hard drive.",
    price: 89.99,
    quantity: 9,
  },
  {
    productId: 10,
    productName: "Fitness Tracker",
    description: "Track your fitness goals and stay motivated.",
    price: 79.99,
    quantity: 6,
  },
];


export const addProductsToDB = async () => {
    try {
      for (const product of products) {
        await axios.post('/product/add', product, {
          headers: {
            'Content-Type': 'application/json',
            // Include any other headers if required
          },
        });
      }
      console.log('All products added successfully');
    } catch (error) {
      console.error('Error adding products:', error);
    }
  };
  
  


export default products;
