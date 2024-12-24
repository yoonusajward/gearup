import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8800',
});

// Get all products
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    console.log(response.data);
    return response;
  } catch (err) {
    console.error('Error fetching products:', err);
    throw err;
  }
};

// Get cart items
export const getCart = (userId) => api.get(`/cart/${userId}`);

// Add product to cart
export const addToCart = (userId, productId, quantity) => 
  api.post('/cart', { user_id: userId, product_id: productId, quantity, status: 'added' });

// Update cart item
export const updateCart = (cartId, quantity) =>
  api.put(`/cart/${cartId}`, { quantity });

// Remove item from cart
export const removeFromCart = (cartId) =>
  api.delete(`/cart/${cartId}`);

