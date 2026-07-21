import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  priceNum: number;
  priceStr: string;
  imageUrl: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: '"God\'s Gangster" Luxury Hoodie',
    priceNum: 28500,
    priceStr: '₦28,500',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    category: 'Apparel'
  },
  {
    id: 'm2',
    name: 'Kingdom Drill Premium Tee',
    priceNum: 14500,
    priceStr: '₦14,500',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    category: 'Apparel'
  },
  {
    id: 'm3',
    name: 'Soli Deo Gloria Snapback',
    priceNum: 9500,
    priceStr: '₦9,500',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories'
  },
  {
    id: 'm4',
    name: 'Acoustic Sessions Vinyl Disc',
    priceNum: 18000,
    priceStr: '₦18,000',
    imageUrl: 'https://images.unsplash.com/photo-1539628399243-7340073e6ee0?auto=format&fit=crop&w=600&q=80',
    category: 'Media'
  }
];

const Merch: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // Checkout Modal State
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<'Paystack' | 'Flutterwave'>('Paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  // Cart Management
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsProcessing(true);
    // Simulate safe API transaction loading wheel
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
    }, 2500);
  };

  const resetAllCheckout = () => {
    setCheckoutOpen(false);
    setPaymentDone(false);
    setCart([]);
    setEmailInput('');
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '90vh', background: '#030303' }}>
      
      {/* Cover Header */}
      <section style={styles.headerSection}>
        <div style={styles.headerOverlay} />
        <div className="container" style={styles.headerContent}>
          <div style={styles.topHeaderRow}>
            <span style={styles.sectionLabel} className="gradient-text">EXCLUSIVE BRAND STORE</span>
            
            {/* Header Cart Trigger */}
            <button onClick={() => setCartOpen(true)} style={styles.cartTriggerBtn} aria-label="Open Shopping Cart">
              <ShoppingBag size={18} color="var(--gold)" />
              <span style={styles.cartTriggerLabel}>MY CART</span>
              {cart.length > 0 && (
                <span style={styles.cartCountBadge}>
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
          <h1 style={styles.headerTitle}>Kingdom Wear Concept</h1>
          <p style={styles.headerSubtext}>
            Premium high-contrast visual apparel, accessories, and vinyl prints. Express your conviction through structural aesthetic excellence.
          </p>
        </div>
      </section>

      {/* Catalog Listing */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-4">
            {PRODUCTS.map((prod) => (
              <div key={prod.id} className="product-card animate-fade-in" style={styles.productCard}>
                
                {/* Product Thumbnail */}
                <div style={styles.productImageWrapper}>
                  <img src={prod.imageUrl} alt={prod.name} style={styles.productImage} />
                  <span style={styles.productCategory}>{prod.category}</span>
                </div>

                {/* Info & Add-to-cart Button */}
                <div style={styles.productInfo}>
                  <h4 style={styles.productName}>{prod.name}</h4>
                  <div style={styles.productPriceRow}>
                    <span style={styles.productPrice}>{prod.priceStr}</span>
                    <span style={styles.stockStatus}>IN STOCK</span>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.75rem', padding: '10px 14px', marginTop: '10px' }}
                  >
                    ADD TO CART
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slide-out Shopping Cart Drawer Backdrop */}
      {cartOpen && (
        <div style={styles.backdrop} onClick={() => setCartOpen(false)} />
      )}

      {/* Shopping Cart Drawer Panel */}
      <div
        className="cart-drawer"
        style={{
          ...styles.cartDrawer,
          transform: cartOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div style={styles.drawerHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={18} color="var(--gold)" />
            <span style={styles.drawerTitle}>SHOPPING CART</span>
          </div>
          <button onClick={() => setCartOpen(false)} style={styles.closeBtn} aria-label="Close Cart">
            <X size={20} color="var(--text-secondary)" />
          </button>
        </div>

        {/* Drawer Body Content */}
        <div style={styles.drawerBody}>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <ShoppingBag size={36} color="var(--text-muted)" style={{ margin: '0 auto 15px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Your shopping cart is empty.</p>
              <button onClick={() => setCartOpen(false)} style={styles.continueBtn}>
                Browse Catalog
              </button>
            </div>
          ) : (
            <div style={styles.cartItemsList}>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItemCard}>
                  <img src={item.imageUrl} alt="" style={styles.cartItemThumb} />
                  <div style={styles.cartItemMeta}>
                    <span style={styles.cartItemName}>{item.name}</span>
                    <span style={styles.cartItemPrice}>{item.priceStr}</span>
                    
                    {/* Quantity selectors */}
                    <div style={styles.qtyControlRow}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>-</button>
                      <span style={styles.qtyVal}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="trash-btn" style={styles.trashBtn} aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Subtotal & Checkout Footer */}
        {cart.length > 0 && (
          <div style={styles.drawerFooter}>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Subtotal:</span>
              <span style={styles.totalVal}>₦{getSubtotal().toLocaleString()}</span>
            </div>
            <p style={styles.taxNotice}>Shipping fees and taxes computed at checkout.</p>
            <button
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '15px' }}
            >
              PROCEED TO SECURE CHECKOUT
            </button>
          </div>
        )}
      </div>

      {/* Paystack / Flutterwave Secured Checkout Modal */}
      {checkoutOpen && (
        <div style={styles.backdrop} onClick={() => setCheckoutOpen(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--gold)" />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>SECURE GATEWAY CHECKOUT</span>
              </div>
              <button onClick={() => setCheckoutOpen(false)} style={styles.closeBtn} aria-label="Close Checkout">
                <X size={18} color="var(--text-secondary)" />
              </button>
            </div>

            {paymentDone ? (
              /* Payment Success Screen */
              <div style={styles.paymentSuccess}>
                <div style={styles.successBadge}>
                  <Sparkles size={36} color="black" />
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '600', color: '#fff', margin: '20px 0 10px' }}>
                  Transaction Approved
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  Thank you! Your transaction was secured and processed successfully via **{paymentGateway}**. Order ID reference receipt: <span style={{ color: 'var(--gold)', fontFamily: 'monospace', fontWeight: 'bold' }}>#REF-{Math.floor(100000 + Math.random() * 900000)}</span>.
                </p>

                {/* Invoice Table Mock */}
                <div style={styles.invoiceCard}>
                  <span style={styles.invoiceLabel}>Amount Paid:</span>
                  <span style={styles.invoiceVal}>₦{getSubtotal().toLocaleString()}</span>
                </div>

                <button onClick={resetAllCheckout} className="btn btn-primary" style={{ width: '100%' }}>
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : isProcessing ? (
              /* Loading Spinner Mock */
              <div style={styles.processingPane}>
                <div style={styles.spinner} />
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>Verifying Transaction...</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Connecting securely to **{paymentGateway}** servers in Nigeria. Do not reload or close this frame.
                </p>
              </div>
            ) : (
              /* Main Payment Gateway Selection Panel */
              <form onSubmit={handleCheckoutSubmit} style={{ padding: '30px' }}>
                <div style={styles.checkoutMetaRow}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Securing:</span>
                  <span style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '1rem' }}>
                    ₦{getSubtotal().toLocaleString()}
                  </span>
                </div>

                {/* Gateway Switch Buttons */}
                <div className="gateway-toggle-row" style={styles.gatewayToggleRow}>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('Paystack')}
                    style={{
                      ...styles.gatewayBtn,
                      borderColor: paymentGateway === 'Paystack' ? 'var(--gold)' : '#222',
                      background: paymentGateway === 'Paystack' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                      color: paymentGateway === 'Paystack' ? 'var(--gold)' : 'var(--text-secondary)'
                    }}
                  >
                    🚀 PAY WITH PAYSTACK
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('Flutterwave')}
                    style={{
                      ...styles.gatewayBtn,
                      borderColor: paymentGateway === 'Flutterwave' ? 'var(--gold)' : '#222',
                      background: paymentGateway === 'Flutterwave' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                      color: paymentGateway === 'Flutterwave' ? 'var(--gold)' : 'var(--text-secondary)'
                    }}
                  >
                    🦋 PAY WITH FLUTTERWAVE
                  </button>
                </div>

                {/* Form fields */}
                <div style={{ marginTop: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">EMAIL ADDRESS FOR BILLING</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. buyer@domain.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">SECURED CARD HOLDER</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="form-input"
                    />
                  </div>

                  <div style={styles.cardDetailsRow}>
                    <div className="form-group" style={{ flexGrow: 1 }}>
                      <label className="form-label">CARD NUMBER</label>
                      <input
                        type="text"
                        required
                        placeholder="•••• •••• •••• ••••"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ width: '80px' }}>
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        required
                        placeholder="•••"
                        maxLength={3}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.securitySeal}>
                  <ShieldCheck size={14} color="var(--gold)" />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Secured by TLS 1.3 Bank-grade Encryption keys.
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '16px', marginTop: '10px' }}
                >
                  <CreditCard size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  <span>AUTHORIZE ₦{getSubtotal().toLocaleString()} PAYMENT</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  headerSection: {
    position: 'relative',
    background: 'url("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80") no-repeat center center',
    backgroundSize: 'cover',
    padding: '80px 0',
    borderBottom: '1px solid #111'
  },
  headerOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(to bottom, rgba(5,5,5,0.9), rgba(3,3,3,0.95))',
    zIndex: 1
  },
  headerContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '750px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  topHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  sectionLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    textTransform: 'uppercase'
  },
  headerTitle: {
    fontSize: '3rem',
    fontWeight: '600',
    color: '#fff'
  },
  headerSubtext: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)'
  },
  cartTriggerBtn: {
    background: 'rgba(20, 20, 20, 0.8)',
    border: '1px solid #222',
    borderRadius: '4px',
    padding: '8px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    position: 'relative'
  },
  cartTriggerLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: 'var(--text-primary)'
  },
  cartCountBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'var(--gold)',
    color: '#000',
    fontSize: '0.65rem',
    fontWeight: '700',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productCard: {
    background: '#0a0a0a',
    border: '1px solid #151515',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    textAlign: 'left',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  productImageWrapper: {
    position: 'relative',
    height: '240px',
    background: '#000'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  },
  productCategory: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: '0.6rem',
    fontWeight: '600',
    color: 'var(--gold)',
    padding: '2px 6px',
    borderRadius: '2px',
    letterSpacing: '0.05em'
  },
  productInfo: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  productName: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#fff'
  },
  productPriceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--gold)',
    fontFamily: 'var(--font-serif)'
  },
  stockStatus: {
    fontSize: '0.6rem',
    color: 'green',
    fontWeight: '700',
    border: '1px solid green',
    padding: '2px 6px',
    borderRadius: '2px'
  },
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    zIndex: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartDrawer: {
    position: 'fixed',
    top: 0, right: 0, bottom: 0,
    width: '380px',
    zIndex: 160,
    background: '#0d0d0d',
    borderLeft: '1px solid #1a1a1a',
    boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  drawerHeader: {
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1a1a1a'
  },
  drawerTitle: {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: '#fff'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  },
  drawerBody: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '24px'
  },
  emptyCart: {
    textAlign: 'center',
    paddingTop: '60px'
  },
  continueBtn: {
    background: 'transparent',
    border: '1px solid var(--gold)',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '15px'
  },
  cartItemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  cartItemCard: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    background: '#050505',
    border: '1px solid #151515',
    borderRadius: 'var(--radius-sm)',
    padding: '12px',
    position: 'relative'
  },
  cartItemThumb: {
    width: '60px',
    height: '60px',
    borderRadius: '4px',
    objectFit: 'cover'
  },
  cartItemMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left',
    flexGrow: 1
  },
  cartItemName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff'
  },
  cartItemPrice: {
    fontSize: '0.8rem',
    color: 'var(--gold)',
    fontFamily: 'monospace'
  },
  qtyControlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '4px'
  },
  qtyBtn: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#151515',
    border: '1px solid #222',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem'
  },
  qtyVal: {
    fontSize: '0.8rem',
    color: '#fff'
  },
  trashBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'color 0.2s ease'
  },
  drawerFooter: {
    borderTop: '1px solid #1a1a1a',
    padding: '24px',
    background: '#050505'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  totalLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  totalVal: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--gold)',
    fontFamily: 'var(--font-serif)'
  },
  taxNotice: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textAlign: 'center'
  },
  modal: {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 10px 45px rgba(0,0,0,0.9)'
  },
  modalHeader: {
    borderBottom: '1px solid #1a1a1a',
    padding: '20px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff'
  },
  checkoutMetaRow: {
    padding: '20px 30px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gatewayToggleRow: {
    padding: '0 30px',
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  },
  gatewayBtn: {
    flexGrow: 1,
    border: '1px solid #222',
    borderRadius: '4px',
    padding: '12px 6px',
    fontSize: '0.7rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    letterSpacing: '0.02em'
  },
  cardDetailsRow: {
    display: 'flex',
    gap: '15px'
  },
  securitySeal: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
    margin: '15px 0'
  },
  processingPane: {
    padding: '50px 30px',
    textAlign: 'center'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #222',
    borderTop: '3px solid var(--gold)',
    borderRadius: '50%',
    margin: '0 auto 20px',
    animation: 'spin 1s linear infinite'
  },
  paymentSuccess: {
    padding: '50px 30px',
    textAlign: 'center'
  },
  successBadge: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: 'var(--gold-gradient)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    boxShadow: '0 0 20px var(--gold-glow)'
  },
  invoiceCard: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#050505',
    border: '1px solid #1a1a1a',
    borderRadius: 'var(--radius-sm)',
    padding: '16px',
    margin: '20px 0 30px'
  },
  invoiceLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  invoiceVal: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--gold)',
    fontFamily: 'monospace'
  }
};

// Responsive design and dynamic animation rules are handled natively via index.css

export default Merch;
