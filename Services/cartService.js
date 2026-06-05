const Cart = require('../Model/cartModel');
const MenuItem = require('../Model/menuModel');

async function addToCart(userId, menuItemId, quantity = 1) {
    console.log('Service - addToCart:', { userId, menuItemId, quantity });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [], totalAmount: 0 });

    const existingItemIndex = cart.items.findIndex(
        item => item.menuItemId.toString() === menuItemId.toString()
    );

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) throw new Error('Menu item not found');

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({ menuItemId, quantity });
    }

    await cart.save();
    await cart.populate('items.menuItemId');
    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + ((item.menuItemId?.price || 0) * item.quantity);
    }, 0);
    await cart.save();
    return cart;
}

async function getCart(userId) {
    return await Cart.findOne({ userId }).populate('items.menuItemId') || { items: [], totalAmount: 0 };
}


async function updateQuantity(userId, cartItemId, quantity) {  // Renamed param
    console.log('🔍 updateQuantity:', { userId, cartItemId, quantity });
    
    const cart = await Cart.findOne({ userId }).populate('items.menuItemId');
    if (!cart?.items?.length) throw new Error('Cart empty');
    
    // ✅ FIXED: Handle BOTH cartItem._id OR menuItemId
    let index = -1;
    
    // First try cartItem._id match
    index = cart.items.findIndex(item => item._id?.toString() === cartItemId);
    
    // If no match, try menuItemId match
    if (index === -1) {
        index = cart.items.findIndex(item => 
            item.menuItemId?._id?.toString() === cartItemId ||
            item.menuItemId?.toString() === cartItemId
        );
    }
    
    if (index === -1) {
        console.log('Available menuItemIds:', cart.items.map(i => i.menuItemId?._id || i.menuItemId));
        throw new Error(`Item ${cartItemId} not in cart (${cart.items.length} items)`);
    }
    
    console.log(`✅ MATCHED item ${index}: ${cart.items[index].menuItemId?.name}`);
    
    if (quantity <= 0) {
        cart.items.splice(index, 1);
    } else {
        cart.items[index].quantity = quantity;
    }
    
    cart.totalAmount = cart.items.reduce((total, item) => {
        return total + ((item.menuItemId?.price || 0) * item.quantity);
    }, 0);
    
    await cart.save();
    return cart;
}




async function clearCart(userId) {
    return await Cart.findOneAndUpdate(
        { userId },
        { items: [], totalAmount: 0 },
        { new: true }
    ).populate('items.menuItemId') || { items: [], totalAmount: 0 };
}

module.exports = { addToCart, getCart, updateQuantity, clearCart };
