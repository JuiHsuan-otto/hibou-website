
/**
 * HiBOU Cart System v1.0
 * Handles adding items, managing cart state in localStorage, and checkout redirection.
 */

const CartSystem = {
  storageKey: 'hibou_cart',

  getCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartBadge();
  },

  addToCart(item) {
    // item: { id, name, color, size, qty, price, image }
    let cart = this.getCart();
    
    // Check if same item already exists (same id, color, and size)
    const existingIndex = cart.findIndex(i => 
      i.id === item.id && i.color === item.color && i.size === item.size
    );

    if (existingIndex > -1) {
      cart[existingIndex].qty += item.qty;
    } else {
      cart.push(item);
    }

    this.saveCart(cart);
    this.showFloatingCart();
  },

  updateCartBadge() {
    const cart = this.getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  },

  showFloatingCart() {
    // Simple feedback that item was added
    const notice = document.createElement('div');
    notice.style.cssText = `
      position: fixed; top: 80px; right: 20px; z-index: 9999;
      background: #4a6b3e; color: white; padding: 12px 24px;
      border-radius: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      font-size: 14px; animation: slideIn 0.5s forwards;
    `;
    notice.innerHTML = '已加入購物車 🛒';
    document.body.appendChild(notice);
    
    setTimeout(() => {
      notice.style.animation = 'fadeOut 0.5s forwards';
      setTimeout(() => notice.remove(), 500);
    }, 2000);
  }
};

// Add basic animations for the notice
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
  .cart-count-badge {
    position: absolute; top: -5px; right: -10px;
    background: #D4845A; color: white; font-size: 10px;
    width: 18px; height: 18px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: bold; border: 2px solid white;
  }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => CartSystem.updateCartBadge());
