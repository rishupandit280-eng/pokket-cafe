const fs = require('fs');
const path = require('path');

// Read data
const menuFile = fs.readFileSync(path.join(__dirname, 'brew-and-bloom/src/data/bakersMenu.js'), 'utf8');
const itemsFile = fs.readFileSync(path.join(__dirname, 'brew-and-bloom/src/data/bakersItems.js'), 'utf8');

// Strip export keywords for in-browser evaluation
const cleanMenu = menuFile.replace(/export const /g, 'const ');
const cleanItems = itemsFile.replace(/export const /g, 'const ');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Bakers Gallery — Indapur's Favorite Artisan Bakery & Café</title>
  <meta name="description" content="Order fresh cakes, pastries, hand-tossed pizza, burgers, cold coffee and shakes from Bakers Gallery, Indapur. Fast delivery and table ordering." />
  
  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎂</text></svg>" />

  <!-- Google Fonts: Playfair Display, Poppins, Caveat, DM Serif Display -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            espresso: {
              DEFAULT: '#3B2A20',
              dark: '#261A13',
              light: '#533C2E',
            },
            cream: {
              DEFAULT: '#FFF6E9',
              soft: '#FAF0E1',
              dark: '#F3E4CF',
            },
            caramel: {
              DEFAULT: '#C68B59',
              light: '#DB9E6E',
              dark: '#A66E3F',
            },
            matcha: {
              DEFAULT: '#7A9E7E',
              light: '#94B497',
              dark: '#5E8262',
            },
            blush: {
              DEFAULT: '#E8B4A0',
              light: '#F4CAC7',
              dark: '#D29A85',
            },
            night: {
              bg: '#18120F',
              card: '#241B16',
              border: '#3A2C24',
              surface: '#2D221C',
            }
          },
          fontFamily: {
            serif: ['"Playfair Display"', 'Georgia', 'serif'],
            display: ['"DM Serif Display"', 'Georgia', 'serif'],
            sans: ['Poppins', '-apple-system', 'sans-serif'],
            chalk: ['Caveat', 'cursive'],
          },
          boxShadow: {
            'cozy': '0 8px 30px -4px rgba(59, 42, 32, 0.12)',
            'cozy-lg': '0 16px 40px -6px rgba(59, 42, 32, 0.20)',
            'glow-caramel': '0 0 25px rgba(198, 139, 89, 0.45)',
          }
        }
      }
    }
  </script>

  <!-- React 18, ReactDOM & Babel for in-browser execution -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    :root {
      --font-body: 'Poppins', sans-serif;
      --font-heading: 'Playfair Display', serif;
      --font-chalk: 'Caveat', cursive;
    }

    body {
      font-family: var(--font-body);
      -webkit-tap-highlight-color: transparent;
      overflow-x: hidden;
    }

    /* Paper texture */
    .paper-texture {
      background-image: radial-gradient(#3b2a20 0.5px, transparent 0.5px), radial-gradient(#3b2a20 0.5px, #fff6e9 0.5px);
      background-size: 20px 20px;
      background-position: 0 0, 10px 10px;
    }

    .dark .paper-texture {
      background-image: radial-gradient(#533c2e 0.5px, transparent 0.5px), radial-gradient(#533c2e 0.5px, #18120f 0.5px);
    }

    /* Steam curl animations */
    @keyframes steam {
      0% { transform: translateY(0) scaleX(1); opacity: 0; }
      15% { opacity: 0.8; }
      50% { transform: translateY(-20px) scaleX(1.4); }
      95% { opacity: 0.1; }
      100% { transform: translateY(-38px) scaleX(2); opacity: 0; }
    }

    .steam-wisp { animation: steam 2.6s infinite ease-out; }
    .steam-wisp-2 { animation: steam 3.2s infinite ease-out 0.5s; }
    .steam-wisp-3 { animation: steam 2.9s infinite ease-out 1s; }

    /* Floating particles */
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
    }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .animate-float-delayed { animation: float 5s ease-in-out infinite 1.5s; }

    /* Coffee fill animation */
    @keyframes coffeeFill {
      0% { height: 0%; }
      100% { height: 75%; }
    }
    .animate-coffee-fill { animation: coffeeFill 1.8s ease-out forwards; }

    /* Flying particle to cart */
    @keyframes flyToCart {
      0% { transform: translate(0, 0) scale(1.2); opacity: 1; }
      60% { transform: translate(calc(var(--target-x) * 0.7), calc(var(--target-y) - 60px)) scale(0.9); opacity: 0.9; }
      100% { transform: translate(var(--target-x), var(--target-y)) scale(0.2); opacity: 0; }
    }
    .flying-crumb {
      animation: flyToCart 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      pointer-events: none;
    }

    /* Chalkboard style */
    .chalkboard-bg {
      background-color: #202722;
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0);
      background-size: 16px 16px;
    }

    /* Hide scrollbar for category tabs */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-cream dark:bg-night-bg text-espresso dark:text-cream transition-colors duration-300 selection:bg-caramel selection:text-white">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useMemo, useRef } = React;

    /* ============================================================
       EMBEDDED BAKERS GALLERY DATA
       ============================================================ */
    ${cleanMenu}
    ${cleanItems}

    const MENU_ITEMS = BAKERS_ITEMS;

    // Currency Formatter in Rupees (₹)
    const fmt = (val) => '₹' + Math.round(Number(val) || 0);

    /* ============================================================
       PHONE NUMBER & PROFILE NORMALIZATION HELPERS
       ============================================================ */
    function cleanIndianMobile(raw) {
      if (!raw) return '';
      let digits = String(raw).replace(/\D/g, '');
      // If 12 digits starting with 91, strip 91
      if (digits.length === 12 && digits.startsWith('91')) {
        digits = digits.slice(2);
      }
      // If 11 digits starting with 0, strip 0
      else if (digits.length === 11 && digits.startsWith('0')) {
        digits = digits.slice(1);
      }
      // If > 10 digits and starts with 91, take last 10 digits
      else if (digits.length > 10 && digits.startsWith('91')) {
        digits = digits.slice(-10);
      }
      return digits.slice(0, 10);
    }

    function isValidIndianMobile(input) {
      const c = cleanIndianMobile(input);
      return /^[6-9]\d{9}$/.test(c);
    }

    function loadSavedCustomerProfile() {
      const keys = ['bakers_customer_profile', 'bakers_user_profile_v1', 'bloom_user', 'bakers_profile'];
      for (const k of keys) {
        try {
          const raw = localStorage.getItem(k);
          if (raw) {
            const p = JSON.parse(raw);
            if (p && (p.name || p.phone || p.address || p.table)) {
              return {
                name: p.name || '',
                phone: cleanIndianMobile(p.phone || p.phoneDigits || ''),
                address: p.address || p.deliveryAddress || '',
                table: p.table || p.tableNo || '',
                orderType: p.orderType || 'dine-in',
              };
            }
          }
        } catch (e) {}
      }
      return { name: '', phone: '', address: '', table: '', orderType: 'dine-in' };
    }

    function saveCustomerProfile(profile) {
      const cleaned = {
        name: (profile.name || '').trim(),
        phone: cleanIndianMobile(profile.phone || ''),
        address: (profile.address || '').trim(),
        table: (profile.table || '').trim(),
        orderType: profile.orderType || 'dine-in',
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem('bakers_customer_profile', JSON.stringify(cleaned));
        localStorage.setItem('bakers_user_profile_v1', JSON.stringify(cleaned));
      } catch (e) {}
      return cleaned;
    }

    /* ============================================================
       AUDIO SYNTHESIZER (MICRO-INTERACTIONS)
       ============================================================ */
    function playSound(type) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();

        if (type === 'add') {
          // Warm cheerful bell chime
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0.14, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        } else if (type === 'success') {
          // Celebratory harmonic chord
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
            gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + i * 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.08);
            osc.stop(ctx.currentTime + 0.6 + i * 0.08);
          });
        }
      } catch (err) {}
    }

    /* ============================================================
       IMAGE COMPONENT WITH SKELETON SHIMMER & ARTISAN SVG FALLBACK
       ============================================================ */
    function CafeImage({ src, alt, className = '', loading = 'lazy', onClick }) {
      const [loaded, setLoaded] = useState(false);
      const [failed, setFailed] = useState(false);

      const fallbackSvg = \`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%233B2A20"/><circle cx="200" cy="120" r="48" fill="%23C68B59" opacity="0.4"/><text x="200" y="135" font-size="44" text-anchor="middle" dominant-baseline="middle">🎂</text><text x="200" y="200" font-family="sans-serif" font-size="15" font-weight="600" text-anchor="middle" fill="%23FAF0E1">\${encodeURIComponent(alt || 'Bakers Gallery')}</text><text x="200" y="225" font-family="sans-serif" font-size="11" text-anchor="middle" fill="%23C68B59">Indapur Oven Bake</text></svg>\`;

      return (
        <div className={\`relative overflow-hidden bg-espresso/5 dark:bg-night-surface \${className}\`} onClick={onClick}>
          {!loaded && !failed && (
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/5 via-caramel/10 to-espresso/5 animate-pulse pointer-events-none" />
          )}
          <img
            src={failed || !src ? fallbackSvg : src}
            alt={alt || 'Bakers Gallery Indapur'}
            loading={loading}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={\`w-full h-full object-cover transition-opacity duration-300 \${loaded || failed ? 'opacity-100' : 'opacity-0'}\`}
          />
        </div>
      );
    }

    /* ============================================================
       MAIN APP CONTAINER
       ============================================================ */
    function App() {
      // Theme Mode
      const [darkMode, setDarkMode] = useState(() => localStorage.getItem('bakers_theme') === 'dark');
      const [soundEnabled, setSoundEnabled] = useState(true);
      const [showSplash, setShowSplash] = useState(true);

      // Customer Profile (STARTS EMPTY, or automatically restores previously saved customer details)
      const [customerProfile, setCustomerProfile] = useState(() => {
        return loadSavedCustomerProfile();
      });

      // Order History (persisted from every order placed)
      const [orderHistory, setOrderHistory] = useState(() => {
        try {
          const saved = localStorage.getItem('bakers_order_history');
          return saved ? JSON.parse(saved) : [];
        } catch (e) {
          return [];
        }
      });

      // Cart State
      const [cart, setCart] = useState(() => {
        try {
          const saved = localStorage.getItem('bakers_cart');
          return saved ? JSON.parse(saved) : [];
        } catch (e) {
          return [];
        }
      });

      // Favorites
      const [favorites, setFavorites] = useState(() => {
        try {
          const saved = localStorage.getItem('bakers_favs');
          return saved ? JSON.parse(saved) : ['cake-truffle', 'pizza-paneer-tikka', 'shake-cold-coffee'];
        } catch (e) {
          return ['cake-truffle', 'pizza-paneer-tikka', 'shake-cold-coffee'];
        }
      });

      // Modals & Navigation
      const [activeCategory, setActiveCategory] = useState('cakes');
      const [searchQuery, setSearchQuery] = useState('');
      const [activeFilter, setActiveFilter] = useState('all'); // all, veg, non-veg, bestsellers, budget
      const [selectedItem, setSelectedItem] = useState(null); // Customization Sheet
      const [isCartOpen, setIsCartOpen] = useState(false);
      const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
      const [isProfileOpen, setIsProfileOpen] = useState(false);
      const [activeOrder, setActiveOrder] = useState(null); // Live Tracking Screen
      const [flyingParticles, setFlyingParticles] = useState([]);
      const [cartBounce, setCartBounce] = useState(false);

      // Persist state changes
      useEffect(() => {
        localStorage.setItem('bakers_cart', JSON.stringify(cart));
      }, [cart]);

      useEffect(() => {
        localStorage.setItem('bakers_favs', JSON.stringify(favorites));
      }, [favorites]);

      useEffect(() => {
        localStorage.setItem('bakers_customer_profile', JSON.stringify(customerProfile));
      }, [customerProfile]);

      useEffect(() => {
        localStorage.setItem('bakers_order_history', JSON.stringify(orderHistory));
      }, [orderHistory]);

      useEffect(() => {
        localStorage.setItem('bakers_theme', darkMode ? 'dark' : 'light');
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);

      // Dismiss splash
      useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2200);
        return () => clearTimeout(timer);
      }, []);

      const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
      const cartSubtotal = useMemo(() => cart.reduce((sum, item) => sum + item.totalPrice, 0), [cart]);

      // Fly to cart particle animation
      const triggerFlyToCart = (startX, startY) => {
        const cartEl = document.getElementById('floating-cart-btn') || document.getElementById('header-cart-btn');
        if (!cartEl) return;
        const rect = cartEl.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;

        const id = Date.now() + Math.random();
        const p = {
          id,
          x: startX || window.innerWidth / 2,
          y: startY || window.innerHeight / 2,
          tx: \`\${targetX - (startX || window.innerWidth / 2)}px\`,
          ty: \`\${targetY - (startY || window.innerHeight / 2)}px\`,
        };

        setFlyingParticles((prev) => [...prev, p]);
        setTimeout(() => {
          setFlyingParticles((prev) => prev.filter((item) => item.id !== id));
          setCartBounce(true);
          setTimeout(() => setCartBounce(false), 400);
        }, 750);
      };

      // Add to cart helper
      const addToCart = (customizedItem, clickEvent) => {
        if (soundEnabled) playSound('add');
        if (clickEvent) {
          triggerFlyToCart(clickEvent.clientX, clickEvent.clientY);
        } else {
          triggerFlyToCart();
        }

        setCart((prev) => {
          const existingIndex = prev.findIndex(
            (i) => i.id === customizedItem.id && JSON.stringify(i.options) === JSON.stringify(customizedItem.options)
          );
          if (existingIndex > -1) {
            const next = [...prev];
            next[existingIndex].qty += customizedItem.qty;
            next[existingIndex].totalPrice = next[existingIndex].unitPrice * next[existingIndex].qty;
            return next;
          }
          return [...prev, customizedItem];
        });
      };

      // Quick add default
      const handleQuickAdd = (item, e) => {
        e.stopPropagation();
        addToCart({
          id: item.id,
          name: item.name,
          image: item.image,
          basePrice: item.price,
          unitPrice: item.price,
          totalPrice: item.price,
          qty: 1,
          veg: item.veg,
          options: item.isCake ? { weight: '0.5 kg (Half Kg)' } : { size: 'Regular' },
        }, e);
      };

      // Toggle Favorites
      const toggleFavorite = (itemId) => {
        setFavorites((prev) =>
          prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
        );
      };

      // Filtered items
      const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter((item) => {
          const matchesSearch =
            !searchQuery ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());

          let matchesFilter = true;
          if (activeFilter === 'veg') matchesFilter = item.veg;
          if (activeFilter === 'non-veg') matchesFilter = !item.veg;
          if (activeFilter === 'bestsellers') matchesFilter = item.tags.includes('Bestseller') || item.tags.includes("Chef's Pick") || item.tags.includes('Popular');
          if (activeFilter === 'budget') matchesFilter = item.price <= 100;

          const matchesCat = searchQuery ? true : item.category === activeCategory;
          return matchesSearch && matchesFilter && matchesCat;
        });
      }, [activeCategory, searchQuery, activeFilter]);

      return (
        <div className="min-h-screen flex flex-col paper-texture pb-20 md:pb-0">
          {/* Splash Screen */}
          {showSplash && <SplashScreen onDismiss={() => setShowSplash(false)} />}

          {/* Flying Crumbs */}
          {flyingParticles.map((p) => (
            <div
              key={p.id}
              className="fixed z-50 flying-crumb w-4 h-4 rounded-full bg-caramel shadow-glow-caramel text-center text-xs flex items-center justify-center pointer-events-none"
              style={{
                left: \`\${p.x}px\`,
                top: \`\${p.y}px\`,
                '--target-x': p.tx,
                '--target-y': p.ty,
              }}
            >
              ✨
            </div>
          ))}

          {/* APP HEADER */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            customerProfile={customerProfile}
            onOpenProfile={() => setIsProfileOpen(true)}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
            cartBounce={cartBounce}
            favoritesCount={favorites.length}
            onShowFavorites={() => {
              setActiveFilter('bestsellers');
              const el = document.getElementById('menu-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* HERO SECTION */}
          <HeroSection
            onExploreMenu={() => {
              const el = document.getElementById('menu-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onViewSpecials={() => {
              const el = document.getElementById('specials-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* CHALKBOARD TODAY'S SPECIALS */}
          <ChalkboardSpecials
            specials={SPECIALS}
            onSelectItem={(spec) => {
              const fullItem = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(spec.name.toLowerCase())) || {
                ...spec,
                category: 'specials',
                tags: ['Chef Special'],
                calories: 'Chef Fresh',
              };
              setSelectedItem(fullItem);
            }}
            onQuickAdd={(spec, e) => {
              handleQuickAdd({ ...spec, tags: ['Special'] }, e);
            }}
          />

          {/* MAIN MENU SECTION */}
          <main id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
            {/* Category Tabs & Filter Chips */}
            <CategoryTabs
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            {/* Menu Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="py-20 text-center">
                <div className="text-6xl mb-4">🥐</div>
                <h3 className="font-serif text-2xl font-bold text-espresso dark:text-cream">No bakery items matched</h3>
                <p className="text-sm text-espresso/60 dark:text-cream/60 mt-1 max-w-sm mx-auto">
                  Try clearing your search or switching to another delicious category.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                  className="mt-5 px-6 py-2.5 rounded-full bg-caramel text-white font-semibold text-sm shadow hover:bg-caramel-dark transition"
                >
                  View All Items
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    isFav={favorites.includes(item.id)}
                    onToggleFav={() => toggleFavorite(item.id)}
                    onSelect={() => setSelectedItem(item)}
                    onQuickAdd={(e) => handleQuickAdd(item, e)}
                  />
                ))}
              </div>
            )}
          </main>

          {/* ITEM CUSTOMIZATION SHEET */}
          {selectedItem && (
            <ItemModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onAddToCart={(customized, e) => {
                addToCart(customized, e);
                setSelectedItem(null);
              }}
            />
          )}

          {/* CART DRAWER */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            setCart={setCart}
            onProceedCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />

          {/* CHECKOUT MODAL (UNPREFILLED & SAVES TO PROFILE) */}
          {isCheckoutOpen && (
            <CheckoutModal
              cart={cart}
              customerProfile={customerProfile}
              onSaveProfile={(updatedProfile) => {
                setCustomerProfile(updatedProfile);
              }}
              onClose={() => setIsCheckoutOpen(false)}
              onOrderSuccess={(order) => {
                if (soundEnabled) playSound('success');
                setActiveOrder(order);
                // Save order to history
                setOrderHistory((prev) => [order, ...prev]);
                // Clear active cart
                setCart([]);
                setIsCheckoutOpen(false);
              }}
            />
          )}

          {/* CUSTOMER PROFILE & ORDER HISTORY DRAWER */}
          {isProfileOpen && (
            <CustomerProfileDrawer
              customerProfile={customerProfile}
              onSaveProfile={setCustomerProfile}
              orderHistory={orderHistory}
              onReorder={(order) => {
                order.items.forEach((item) => {
                  addToCart(item);
                });
                setIsProfileOpen(false);
                setIsCartOpen(true);
              }}
              onClearProfile={() => {
                if (confirm('Clear saved customer details from this device?')) {
                  const empty = { name: '', phone: '', address: '', table: '', orderType: 'dine-in' };
                  setCustomerProfile(empty);
                  localStorage.removeItem('bakers_customer_profile');
                }
              }}
              onClose={() => setIsProfileOpen(false)}
            />
          )}

          {/* LIVE ORDER TRACKING SCREEN */}
          {activeOrder && (
            <OrderTracker
              order={activeOrder}
              onClose={() => setActiveOrder(null)}
            />
          )}

          {/* FOOTER */}
          <Footer onShowSpecial={() => {
            const el = document.getElementById('specials-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />

          {/* MOBILE BOTTOM NAVIGATION BAR */}
          <BottomBar
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenMenu={() => {
              const el = document.getElementById('menu-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenProfile={() => setIsProfileOpen(true)}
            customerName={customerProfile.name}
          />
        </div>
      );
    }

    /* ============================================================
       1. SPLASH SCREEN (OVEN STEAM & CAKE FILL)
       ============================================================ */
    function SplashScreen({ onDismiss }) {
      return (
        <div className="fixed inset-0 z-50 bg-espresso text-cream flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="relative mb-6">
            {/* Animated Rising Steam */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-1.5 h-7 rounded-full bg-cream/70 steam-wisp"></div>
              <div className="w-2 h-9 rounded-full bg-cream/80 steam-wisp-2"></div>
              <div className="w-1.5 h-6 rounded-full bg-cream/70 steam-wisp-3"></div>
            </div>

            {/* Stylized Coffee Cup / Cake Box */}
            <div className="relative w-28 h-24 border-4 border-cream rounded-b-3xl rounded-t-sm flex items-end justify-center p-1.5 overflow-hidden shadow-2xl">
              <div className="absolute top-3 -right-6 w-7 h-12 border-4 border-cream rounded-r-2xl"></div>
              <div className="w-full bg-caramel rounded-b-2xl animate-coffee-fill relative">
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white tracking-widest uppercase opacity-80">
                  Baking…
                </span>
              </div>
            </div>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight">Bakers Gallery</h1>
          <p className="font-chalk text-caramel-light text-xl mt-1">Indapur's Favorite Oven & Café</p>

          <button
            onClick={onDismiss}
            className="mt-8 px-6 py-2 rounded-full border border-cream/30 text-xs tracking-wider uppercase text-cream/70 hover:text-cream hover:border-cream transition"
          >
            Enter Bakery →
          </button>
        </div>
      );
    }

    /* ============================================================
       2. TOP NAVBAR
       ============================================================ */
    function Navbar({
      darkMode,
      setDarkMode,
      soundEnabled,
      setSoundEnabled,
      customerProfile,
      onOpenProfile,
      cartCount,
      onOpenCart,
      cartBounce,
      favoritesCount,
      onShowFavorites,
    }) {
      return (
        <header className="sticky top-0 z-40 bg-cream/95 dark:bg-night-bg/95 backdrop-blur-md border-b border-espresso/10 dark:border-night-border transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-2xl sm:text-3xl">🎂</span>
              <div>
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-espresso dark:text-cream leading-tight">
                  Bakers <span className="text-caramel font-normal italic">Gallery</span>
                </h1>
                <p className="text-[10px] text-espresso/60 dark:text-cream/50 -mt-0.5 tracking-wider font-medium">
                  INDAPUR · EST. 2020
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm bg-espresso/5 dark:bg-night-surface hover:bg-espresso/10 text-espresso dark:text-cream transition"
                title={soundEnabled ? 'Mute Chimes' : 'Unmute Chimes'}
              >
                {soundEnabled ? '🔔' : '🔕'}
              </button>

              {/* Day / Night Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm bg-espresso/5 dark:bg-night-surface hover:bg-espresso/10 text-espresso dark:text-cream transition"
                title={darkMode ? 'Switch to Morning Café' : 'Switch to Evening Café'}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/917972385812?text=Hello%20Bakers%20Gallery,%20I%20have%20an%20inquiry%20regarding%20orders!"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-600/10 text-green-700 dark:text-green-400 font-medium text-xs hover:bg-green-600/20 transition"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </a>

              {/* Customer Profile Pill */}
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-espresso/5 dark:bg-night-surface hover:bg-caramel/15 text-espresso dark:text-cream font-medium text-xs border border-espresso/10 dark:border-night-border transition"
                title="My Profile & Saved Orders"
              >
                <span className="text-sm">👤</span>
                <span className="max-w-[80px] sm:max-w-[120px] truncate">
                  {customerProfile.name ? customerProfile.name.split(' ')[0] : 'My Details'}
                </span>
              </button>

              {/* Cart Button */}
              <button
                id="header-cart-btn"
                onClick={onOpenCart}
                className={\`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-caramel hover:bg-caramel-dark text-white font-semibold text-xs sm:text-sm shadow-cozy transition-transform duration-200 \${
                  cartBounce ? 'scale-110 shadow-glow-caramel' : ''
                }\`}
              >
                <span>🛒</span>
                <span className="hidden sm:inline">Tray</span>
                <span className="w-5 h-5 rounded-full bg-white text-espresso font-bold text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </header>
      );
    }

    /* ============================================================
       3. HERO SECTION (ATMOSPHERIC BAKERY VIBE)
       ============================================================ */
    function HeroSection({ onExploreMenu, onViewSpecials }) {
      return (
        <section className="relative overflow-hidden bg-espresso text-cream pt-12 pb-16 sm:pt-20 sm:pb-24">
          {/* Ambient Background Bakery Image */}
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1800&q=80"
              alt="Warm bakery ovens in Indapur"
              className="w-full h-full object-cover scale-105"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/80 to-cream dark:via-night-bg/80 dark:to-night-bg"></div>
          </div>

          {/* Floating Bakery Icons */}
          <div className="absolute top-8 left-6 text-2xl opacity-40 animate-float pointer-events-none">🎂</div>
          <div className="absolute bottom-12 left-1/4 text-xl opacity-30 animate-float-delayed pointer-events-none">🥐</div>
          <div className="absolute top-16 right-10 text-3xl opacity-35 animate-float pointer-events-none">🍕</div>
          <div className="absolute bottom-8 right-1/4 text-2xl opacity-40 animate-float-delayed pointer-events-none">🥤</div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 text-caramel-light text-xs font-semibold uppercase tracking-widest mb-4">
              <span>🌾</span> Fresh from the Oven in Indapur
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Where Every Celebration <br />
              <span className="font-chalk text-caramel-light text-4xl sm:text-6xl md:text-7xl font-normal block sm:inline">
                Tastes Sweeter
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-cream/80 max-w-xl mx-auto font-light leading-relaxed">
              Indulge in fresh cream designer cakes, artisan pizzas, crispy burgers, and Indapur's thickest cold coffee.
              Baked with passion at SNR Shopping Centre.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-sm shadow-glow-caramel transition transform hover:-translate-y-0.5"
              >
                Explore Full Menu (80+ Treats) ↓
              </button>
              <button
                onClick={onViewSpecials}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-cream font-semibold text-sm border border-cream/20 backdrop-blur-sm transition"
              >
                Today's Specials Board ⭐
              </button>
            </div>

            {/* Quick Cafe Info Pills */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-cream/70 max-w-2xl mx-auto">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">⭐ 4.2 Rating (112+ Reviews)</div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">⏰ 9:00 AM – 8:30 PM Everyday</div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">🛵 Fast Delivery Across Indapur</div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">💬 WhatsApp Live Kitchen</div>
            </div>
          </div>
        </section>
      );
    }

    /* ============================================================
       4. CHALKBOARD TODAY'S SPECIALS
       ============================================================ */
    function ChalkboardSpecials({ specials, onSelectItem, onQuickAdd }) {
      return (
        <section id="specials-section" className="relative -mt-6 sm:-mt-10 max-w-6xl mx-auto px-4 z-20">
          <div className="chalkboard-bg text-cream rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-caramel/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-cream/15 pb-4">
              <div>
                <span className="font-chalk text-caramel-light text-xl tracking-wide">Oven Fresh Today!</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  Chef's Daily Showcase
                </h2>
              </div>
              <p className="text-xs text-cream/60 max-w-xs font-mono">
                Handcrafted in small batches every morning. When they're gone, they're gone!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {specials.map((spec) => (
                <div
                  key={spec.id}
                  className="bg-white/5 hover:bg-white/10 border border-cream/15 rounded-2xl p-4 transition duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-3">
                      <CafeImage
                        src={spec.image}
                        alt={spec.name}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-caramel text-white shadow z-10">
                        {spec.badge}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline gap-2 mb-1.5">
                      <h3 className="font-serif text-lg font-bold group-hover:text-caramel-light transition">
                        {spec.name}
                      </h3>
                      <span className="font-bold text-caramel text-base whitespace-nowrap">{fmt(spec.price)}</span>
                    </div>

                    <p className="text-xs text-cream/70 font-light line-clamp-2 mb-4 leading-relaxed">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-cream/10">
                    <button
                      onClick={() => onSelectItem(spec)}
                      className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-center transition"
                    >
                      Customize
                    </button>
                    <button
                      onClick={(e) => onQuickAdd(spec, e)}
                      className="px-4 py-2 rounded-xl bg-caramel hover:bg-caramel-dark text-white text-xs font-bold transition flex items-center gap-1 shadow"
                    >
                      <span>+</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    /* ============================================================
       5. CATEGORY TABS & FILTER BAR
       ============================================================ */
    function CategoryTabs({
      categories,
      activeCategory,
      onSelectCategory,
      searchQuery,
      setSearchQuery,
      activeFilter,
      setActiveFilter,
    }) {
      return (
        <div className="space-y-4">
          {/* Search Input & Filter Chips */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/40 dark:text-cream/40">🔍</span>
              <input
                type="text"
                placeholder="Search cakes, pizza, coffee, burgers…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white dark:bg-night-card border border-espresso/10 dark:border-night-border text-xs sm:text-sm text-espresso dark:text-cream placeholder:text-espresso/40 dark:placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-caramel shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-espresso/40 dark:text-cream/40 hover:text-espresso"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'veg', label: '🌱 Pure Veg' },
                { id: 'non-veg', label: '🍗 Non-Veg' },
                { id: 'bestsellers', label: '⭐ Bestsellers' },
                { id: 'budget', label: '💰 Under ₹100' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={\`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition \${
                    activeFilter === f.id
                      ? 'bg-espresso dark:bg-cream text-cream dark:text-espresso shadow'
                      : 'bg-white dark:bg-night-card text-espresso/70 dark:text-cream/70 border border-espresso/10 dark:border-night-border hover:bg-espresso/5'
                  }\`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 14 Category Scroll Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-espresso/10 dark:border-night-border">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className={\`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 \${
                    isActive
                      ? 'bg-caramel text-white shadow-glow-caramel scale-105'
                      : 'bg-white/80 dark:bg-night-card text-espresso/80 dark:text-cream/80 border border-espresso/8 dark:border-night-border hover:bg-cream-dark'
                  }\`}
                >
                  <span className="text-base">{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    /* ============================================================
       6. FOOD MENU CARD
       ============================================================ */
    function MenuCard({ item, isFav, onToggleFav, onSelect, onQuickAdd }) {
      return (
        <div className="bg-white dark:bg-night-card rounded-2xl overflow-hidden border border-espresso/8 dark:border-night-border shadow-cozy hover:shadow-cozy-lg transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
          {/* Card Top: Real Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-cream-soft dark:bg-night-surface cursor-pointer" onClick={onSelect}>
            <CafeImage
              src={item.image}
              alt={item.name}
              className="w-full h-full group-hover:scale-108 transition-transform duration-500"
            />

            {/* Favorite button */}
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
              className={\`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition \${
                isFav ? 'bg-red-500 text-white shadow-md scale-110' : 'bg-white/80 text-espresso/60 hover:text-red-500'
              }\`}
            >
              {isFav ? '❤️' : '🤍'}
            </button>

            {/* Dietary dot & tags */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
              <span
                className={\`w-4 h-4 rounded-sm border-2 flex items-center justify-center bg-white/95 \${
                  item.veg ? 'border-green-600' : 'border-red-600'
                }\`}
                title={item.veg ? 'Pure Vegetarian' : 'Contains Egg / Chicken'}
              >
                <span className={\`w-2 h-2 rounded-full \${item.veg ? 'bg-green-600' : 'bg-red-600'}\`}></span>
              </span>
              {item.tags && item.tags[0] && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-espresso/80 text-cream backdrop-blur-sm">
                  {item.tags[0]}
                </span>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-semibold text-caramel uppercase tracking-wider">
                  {item.category.replace('-', ' ')}
                </span>
                <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                  ★ {item.rating || '4.8'}
                </span>
              </div>

              <h3
                onClick={onSelect}
                className="font-serif text-sm sm:text-base font-bold text-espresso dark:text-cream cursor-pointer hover:text-caramel transition line-clamp-1"
              >
                {item.name}
              </h3>

              <p className="text-[11px] text-espresso/60 dark:text-cream/60 font-light line-clamp-2 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Price & Add Action */}
            <div className="mt-3.5 pt-2.5 border-t border-espresso/8 dark:border-night-border flex items-center justify-between gap-2">
              <div>
                <span className="font-extrabold text-base sm:text-lg text-espresso dark:text-cream">{fmt(item.price)}</span>
                <span className="text-[9px] text-espresso/40 dark:text-cream/40 block -mt-1">{item.calories}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={onSelect}
                  className="px-2.5 py-1.5 rounded-xl bg-espresso/5 dark:bg-night-surface hover:bg-espresso/10 text-espresso dark:text-cream text-[11px] font-medium transition"
                  title="Customize options"
                >
                  Options
                </button>
                <button
                  onClick={onQuickAdd}
                  className="w-8 h-8 rounded-xl bg-caramel hover:bg-caramel-dark text-white flex items-center justify-center font-bold text-base shadow transition transform active:scale-95"
                  title="Quick Add to Tray"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ============================================================
       7. ITEM CUSTOMIZATION MODAL
       ============================================================ */
    function ItemModal({ item, onClose, onAddToCart }) {
      // Cake options
      const isCake = item.isCake || item.category === 'cakes';
      const [weight, setWeight] = useState('0.5 kg (Half Kg)');
      const [cakeMessage, setCakeMessage] = useState('');

      // Food / Drink options
      const [size, setSize] = useState('Regular');
      const [extraCheese, setExtraCheese] = useState(false);
      const [mealUpgrade, setMealUpgrade] = useState(false);
      const [sweetness, setSweetness] = useState('100%');
      const [specialNote, setSpecialNote] = useState('');
      const [qty, setQty] = useState(1);

      // Price calculation
      let calculatedUnitPrice = item.price;
      if (isCake) {
        if (weight.includes('1 kg')) calculatedUnitPrice = item.price * 2 - 50; // Discounted full kg
        if (weight.includes('2 kg')) calculatedUnitPrice = item.price * 4 - 150;
      } else {
        if (size === 'Large') calculatedUnitPrice += 30;
        if (extraCheese) calculatedUnitPrice += 35;
        if (mealUpgrade) calculatedUnitPrice += 70;
      }
      const calculatedTotalPrice = calculatedUnitPrice * qty;

      const handleAdd = (e) => {
        const customized = {
          id: item.id,
          name: item.name,
          image: item.image,
          basePrice: item.price,
          unitPrice: calculatedUnitPrice,
          totalPrice: calculatedTotalPrice,
          qty,
          veg: item.veg,
          options: isCake
            ? { weight, cakeMessage: cakeMessage.trim(), note: specialNote.trim() }
            : { size, extraCheese, mealUpgrade, sweetness, note: specialNote.trim() },
        };
        onAddToCart(customized, e);
      };

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-night-card text-espresso dark:text-cream rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-black transition"
            >
              ✕
            </button>

            {/* Top Photo */}
            <div className="relative aspect-[16/10] overflow-hidden shrink-0">
              <CafeImage src={item.image} alt={item.name} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-caramel text-white shadow">
                  {item.category.replace('-', ' ').toUpperCase()}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  {item.name}
                </h2>
              </div>
            </div>

            {/* Scrollable Customization Form */}
            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              <p className="text-xs text-espresso/70 dark:text-cream/70 leading-relaxed font-light">
                {item.desc}
              </p>

              {/* Cake Specific: Weight Selection */}
              {isCake ? (
                <>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-2">
                      Select Cake Weight
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['0.5 kg (Half Kg)', '1 kg (Standard)', '2 kg (Celebration)'].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWeight(w)}
                          className={\`py-2.5 px-2 rounded-xl text-xs font-semibold border transition text-center \${
                            weight === w
                              ? 'bg-caramel text-white border-caramel shadow-sm'
                              : 'bg-espresso/5 dark:bg-night-surface border-espresso/10 dark:border-night-border hover:bg-espresso/10'
                          }\`}
                        >
                          {w.split(' ')[0]} {w.split(' ')[1]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name on Cake */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-1">
                      Message / Name on Cake (Free)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Happy Birthday Aarav! ❤️"
                      value={cakeMessage}
                      onChange={(e) => setCakeMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs focus:ring-2 focus:ring-caramel focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                /* Drink / Savory Options */
                <>
                  {item.category.includes('coffee') || item.category.includes('shakes') || item.category.includes('hot') ? (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-2">
                        Serving Size
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'Regular', desc: 'Standard Glass' },
                          { id: 'Large', desc: '+₹30 Jumbo Glass' },
                        ].map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSize(s.id)}
                            className={\`p-2.5 rounded-xl text-xs font-semibold border text-left transition \${
                              size === s.id
                                ? 'bg-caramel text-white border-caramel shadow-sm'
                                : 'bg-espresso/5 dark:bg-night-surface border-espresso/10 dark:border-night-border hover:bg-espresso/10'
                            }\`}
                          >
                            <div>{s.id}</div>
                            <div className="text-[10px] opacity-80 font-normal">{s.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-2">
                        Add-ons & Upgrades
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-3 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs cursor-pointer">
                          <span>🧀 Extra Molten Cheese (+₹35)</span>
                          <input
                            type="checkbox"
                            checked={extraCheese}
                            onChange={(e) => setExtraCheese(e.target.checked)}
                            className="w-4 h-4 accent-caramel rounded"
                          />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs cursor-pointer">
                          <span>🍟 Make it a Combo (+₹70 Fries & Cold Drink)</span>
                          <input
                            type="checkbox"
                            checked={mealUpgrade}
                            onChange={(e) => setMealUpgrade(e.target.checked)}
                            className="w-4 h-4 accent-caramel rounded"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-1">
                  Special Notes to Chef
                </label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, extra tissue, pack separately"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs focus:ring-2 focus:ring-caramel focus:outline-none"
                />
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between pt-2 border-t border-espresso/10 dark:border-night-border">
                <span className="text-xs font-bold uppercase tracking-wider text-espresso/70 dark:text-cream/70">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-espresso/5 dark:bg-night-surface px-3 py-1.5 rounded-full border border-espresso/10 dark:border-night-border">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-6 h-6 rounded-full bg-white dark:bg-night-card shadow flex items-center justify-center font-bold text-xs"
                  >
                    –
                  </button>
                  <span className="font-bold text-sm min-w-[20px] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-6 h-6 rounded-full bg-white dark:bg-night-card shadow flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Add Bar */}
            <div className="p-4 bg-cream-soft dark:bg-night-surface border-t border-espresso/10 dark:border-night-border flex items-center justify-between gap-3 shrink-0">
              <div>
                <span className="text-[10px] text-espresso/60 dark:text-cream/60 uppercase tracking-wider block">Total Price</span>
                <span className="text-xl font-extrabold text-caramel">{fmt(calculatedTotalPrice)}</span>
              </div>
              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-sm shadow-glow-caramel transition flex items-center gap-2"
              >
                <span>Add to Bakery Tray</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    /* ============================================================
       8. CART DRAWER
       ============================================================ */
    function CartDrawer({ isOpen, onClose, cart, setCart, onProceedCheckout }) {
      const [promoCode, setPromoCode] = useState('');
      const [discount, setDiscount] = useState(0);
      const [promoError, setPromoError] = useState('');
      const [orderType, setOrderType] = useState('dine-in'); // dine-in, takeaway, delivery

      const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.totalPrice, 0), [cart]);

      const applyPromo = () => {
        const code = promoCode.trim().toUpperCase();
        if (code === 'BAKERS10') {
          setDiscount(Math.round(subtotal * 0.1));
          setPromoError('');
        } else if (code === 'INDAPUR20') {
          if (subtotal >= 300) {
            setDiscount(Math.round(subtotal * 0.2));
            setPromoError('');
          } else {
            setPromoError('INDAPUR20 applies to orders over ₹300');
          }
        } else {
          setPromoError('Invalid coupon code. Try BAKERS10');
        }
      };

      const finalTotal = Math.max(0, subtotal - discount);

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 flex justify-end bg-espresso/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-night-card text-espresso dark:text-cream w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-left">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-espresso/10 dark:border-night-border flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold">Your Bakery Tray</h2>
                <p className="text-xs text-espresso/60 dark:text-cream/60">
                  {cart.length === 0 ? 'Empty tray' : \`\${cart.reduce((s, i) => s + i.qty, 0)} freshly picked items\`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-espresso/5 dark:bg-night-surface flex items-center justify-center font-bold text-sm hover:bg-espresso/10 transition"
              >
                ✕
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="text-5xl mb-3">🧺</div>
                  <h3 className="font-serif text-lg font-bold">Your Tray is Empty</h3>
                  <p className="text-xs text-espresso/60 dark:text-cream/60 mt-1 max-w-xs mx-auto">
                    Fill it with fresh cakes, hot pizzas, golden pastries and cold coffee!
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-cream-soft/50 dark:bg-night-surface border border-espresso/8 dark:border-night-border"
                  >
                    <CafeImage src={item.image} alt={item.name} className="w-14 h-14 rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm truncate">{item.name}</h4>
                      <p className="text-[10px] text-espresso/60 dark:text-cream/60 truncate">
                        {item.options?.weight || item.options?.size || 'Standard'}
                        {item.options?.cakeMessage ? \` · "\${item.options.cakeMessage}"\` : ''}
                      </p>
                      <p className="text-xs font-bold text-caramel mt-0.5">{fmt(item.totalPrice)}</p>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 bg-white dark:bg-night-card px-2.5 py-1 rounded-full border border-espresso/10 dark:border-night-border">
                      <button
                        onClick={() => {
                          if (item.qty === 1) {
                            setCart(cart.filter((_, i) => i !== idx));
                          } else {
                            const next = [...cart];
                            next[idx].qty -= 1;
                            next[idx].totalPrice = next[idx].unitPrice * next[idx].qty;
                            setCart(next);
                          }
                        }}
                        className="font-bold text-xs text-espresso/70 hover:text-red-500"
                      >
                        –
                      </button>
                      <span className="font-bold text-xs min-w-[14px] text-center">{item.qty}</span>
                      <button
                        onClick={() => {
                          const next = [...cart];
                          next[idx].qty += 1;
                          next[idx].totalPrice = next[idx].unitPrice * next[idx].qty;
                          setCart(next);
                        }}
                        className="font-bold text-xs text-espresso/70 hover:text-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Checkout Section */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-espresso/10 dark:border-night-border bg-cream-soft/60 dark:bg-night-surface space-y-3 shrink-0">
                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (try BAKERS10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-night-card border border-espresso/10 dark:border-night-border text-xs uppercase font-mono"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-1.5 rounded-xl bg-espresso dark:bg-cream text-cream dark:text-espresso text-xs font-bold"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
                {discount > 0 && <p className="text-[11px] text-green-600 font-semibold">✅ Discount applied: -{fmt(discount)}</p>}

                {/* Subtotal & Total */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-espresso/70 dark:text-cream/70">Subtotal</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Promo Savings</span>
                      <span>-{fmt(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-green-600">
                    <span>Oven Packing & Delivery</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold pt-2 border-t border-espresso/10 dark:border-night-border">
                    <span className="font-serif">Grand Total</span>
                    <span className="text-caramel">{fmt(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={onProceedCheckout}
                  className="w-full py-3.5 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-sm shadow-glow-caramel transition flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span>({fmt(finalTotal)}) →</span>
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    /* ============================================================
       9. CHECKOUT MODAL (UNPREFILLED & SAVES DETAILS)
       ============================================================ */
    function CheckoutModal({ cart, customerProfile, onSaveProfile, onClose, onOrderSuccess }) {
      // Load saved details from customerProfile prop or directly from localStorage
      const savedProfile = useMemo(() => {
        return (customerProfile && (customerProfile.name || customerProfile.phone))
          ? customerProfile
          : loadSavedCustomerProfile();
      }, [customerProfile]);

      const [name, setName] = useState(savedProfile.name || '');
      const [phone, setPhone] = useState(cleanIndianMobile(savedProfile.phone || ''));
      const [orderType, setOrderType] = useState(savedProfile.orderType || 'dine-in'); // 'dine-in', 'takeaway', 'delivery'
      const [tableNo, setTableNo] = useState(savedProfile.table || '');
      const [deliveryAddress, setDeliveryAddress] = useState(savedProfile.address || '');
      const [specialNote, setSpecialNote] = useState('');
      const [payMethod, setPayMethod] = useState('upi'); // 'upi', 'cash'
      const [saveForNextTime, setSaveForNextTime] = useState(true);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [errors, setErrors] = useState({});

      const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

      // Automatically sync savedProfile whenever customerProfile updates
      useEffect(() => {
        if (savedProfile) {
          if (savedProfile.name && !name) setName(savedProfile.name);
          if (savedProfile.phone && !phone) setPhone(cleanIndianMobile(savedProfile.phone));
          if (savedProfile.address && !deliveryAddress) setDeliveryAddress(savedProfile.address);
          if (savedProfile.table && !tableNo) setTableNo(savedProfile.table);
          if (savedProfile.orderType) setOrderType(savedProfile.orderType);
        }
      }, [savedProfile]);

      // Form Validation
      const validate = () => {
        const errs = {};
        if (!name.trim() || name.trim().length < 2) {
          errs.name = 'Please enter your full name (at least 2 characters)';
        }
        
        const cleanedPhone = cleanIndianMobile(phone);
        if (!cleanedPhone) {
          errs.phone = 'Mobile number is required';
        } else if (cleanedPhone.length !== 10) {
          errs.phone = `Must be 10 digits (currently ${cleanedPhone.length} digits)`;
        } else if (!/^[6-9]/.test(cleanedPhone)) {
          errs.phone = 'Indian mobile number must start with 6, 7, 8, or 9';
        }

        if (orderType === 'dine-in' && !tableNo.trim()) {
          errs.tableNo = 'Please enter your Table number (e.g. Table 4)';
        }
        if (orderType === 'delivery' && (!deliveryAddress.trim() || deliveryAddress.trim().length < 6)) {
          errs.deliveryAddress = 'Please enter your complete delivery address in Indapur';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
      };

      const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        const updatedProfile = {
          name: name.trim(),
          phone: cleanIndianMobile(phone),
          address: deliveryAddress.trim(),
          table: tableNo.trim(),
          orderType,
        };

        // Automatically save customer details immediately to localStorage & state
        if (saveForNextTime) {
          saveCustomerProfile(updatedProfile);
          onSaveProfile(updatedProfile);
        }

        const orderId = 'BG-' + Math.floor(1000 + Math.random() * 9000);
        const orderData = {
          id: orderId,
          name: updatedProfile.name,
          phone: updatedProfile.phone,
          orderType,
          table: orderType === 'dine-in' ? updatedProfile.table : undefined,
          address: orderType === 'delivery' ? updatedProfile.address : undefined,
          note: specialNote.trim(),
          items: cart,
          total,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          payMethod,
        };

        // Save order to history immediately in localStorage
        try {
          const rawHistory = localStorage.getItem('bakers_order_history');
          const history = rawHistory ? JSON.parse(rawHistory) : [];
          localStorage.setItem('bakers_order_history', JSON.stringify([orderData, ...history]));
        } catch (err) {}

        // Send to backend order API (which sends WhatsApp Cloud API alert)
        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
          });
        } catch (err) {}

        setTimeout(() => {
          setIsSubmitting(false);
          onOrderSuccess(orderData);
        }, 600);
      };

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-night-card text-espresso dark:text-cream rounded-3xl max-w-md w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-espresso/5 dark:bg-night-surface flex items-center justify-center font-bold text-sm"
            >
              ✕
            </button>

            <span className="text-xs font-bold uppercase tracking-widest text-caramel">Step 2 of 2 · Fresh Checkout</span>
            <h2 className="font-serif text-2xl font-bold mt-0.5">Order from Bakers Gallery</h2>
            <p className="text-xs text-espresso/60 dark:text-cream/60">
              Please enter your details. We will prepare your order hot and fresh!
            </p>

            {/* Saved Profile Fast-Fill Banner */}
            {savedProfile && savedProfile.name && (
              <div className="mt-4 p-3 rounded-2xl bg-caramel/10 border border-caramel/25 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-espresso dark:text-cream block">
                    ✨ Saved Details: {savedProfile.name}
                  </span>
                  <span className="text-[10px] text-espresso/60 dark:text-cream/60">
                    {savedProfile.phone ? \`+91 \${savedProfile.phone}\` : ''} {savedProfile.table ? \`· Table \${savedProfile.table}\` : ''} {savedProfile.address ? \`· \${savedProfile.address}\` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setName(savedProfile.name || '');
                    setPhone(cleanIndianMobile(savedProfile.phone || ''));
                    if (savedProfile.table) setTableNo(savedProfile.table);
                    if (savedProfile.address) setDeliveryAddress(savedProfile.address);
                    if (savedProfile.orderType) setOrderType(savedProfile.orderType);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-caramel text-white font-bold text-xs shadow hover:bg-caramel-dark transition"
                >
                  Apply Saved
                </button>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="mt-5 space-y-4">
              {/* Order Type Toggle */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dine-in', label: '🪑 Dine-In' },
                    { id: 'takeaway', label: '🛍️ Takeaway' },
                    { id: 'delivery', label: '🛵 Delivery' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setOrderType(t.id);
                        if (t.id === 'dine-in' && !tableNo && savedProfile.table) setTableNo(savedProfile.table);
                        if (t.id === 'delivery' && !deliveryAddress && savedProfile.address) setDeliveryAddress(savedProfile.address);
                      }}
                      className={\`py-2 rounded-xl text-xs font-semibold border transition text-center \${
                        orderType === t.id
                          ? 'bg-caramel text-white border-caramel shadow-sm'
                          : 'bg-espresso/5 dark:bg-night-surface border-espresso/10 dark:border-night-border'
                      }\`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Name */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Patil"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  className={\`w-full px-3.5 py-2.5 rounded-xl bg-espresso/5 dark:bg-night-surface border text-xs focus:ring-2 focus:ring-caramel focus:outline-none \${
                    errors.name ? 'border-red-500' : 'border-espresso/10 dark:border-night-border'
                  }\`}
                />
                {errors.name && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-caramel">
                    Mobile Number (10 digits) *
                  </label>
                  {phone.length > 0 && (
                    <span className={\`text-[10px] font-mono \${cleanIndianMobile(phone).length === 10 ? 'text-green-600 font-bold' : 'text-espresso/40 dark:text-cream/40'}\`}>
                      {cleanIndianMobile(phone).length}/10 digits
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-2.5 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs font-bold text-espresso/60 flex items-center select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => {
                      const cleaned = cleanIndianMobile(e.target.value);
                      setPhone(cleaned);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    className={\`flex-1 px-3.5 py-2.5 rounded-xl bg-espresso/5 dark:bg-night-surface border text-xs focus:ring-2 focus:ring-caramel focus:outline-none font-mono \${
                      errors.phone ? 'border-red-500' : 'border-espresso/10 dark:border-night-border'
                    }\`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.phone}</p>}
              </div>

              {/* Table No for Dine-In */}
              {orderType === 'dine-in' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-1">
                    Table Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs focus:ring-2 focus:ring-caramel focus:outline-none"
                  />
                  {errors.tableNo && <p className="text-[11px] text-red-500 mt-1">{errors.tableNo}</p>}
                </div>
              )}

              {/* Address for Delivery */}
              {orderType === 'delivery' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-1">
                    Delivery Address in Indapur *
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Flat 302, Green Valley Apartments, Near Nagar Parishad, Indapur"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs focus:ring-2 focus:ring-caramel focus:outline-none"
                  />
                  {errors.deliveryAddress && <p className="text-[11px] text-red-500 mt-1">{errors.deliveryAddress}</p>}
                </div>
              )}

              {/* Special Note */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-1">
                  Order Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Make it spicy, Birthday candles needed"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs focus:ring-2 focus:ring-caramel focus:outline-none"
                />
              </div>

              {/* SAVE DETAILS CHECKBOX */}
              <div className="p-3 rounded-2xl bg-caramel/10 border border-caramel/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-espresso dark:text-cream block">
                    💾 Save my details for next order
                  </span>
                  <span className="text-[10px] text-espresso/60 dark:text-cream/60">
                    Fast 1-tap checkout on your next visit
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={saveForNextTime}
                  onChange={(e) => setSaveForNextTime(e.target.checked)}
                  className="w-5 h-5 accent-caramel rounded cursor-pointer"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-caramel block mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-2xl border border-espresso/10 dark:border-night-border bg-espresso/5 dark:bg-night-surface cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📱</span>
                      <div>
                        <span className="text-xs font-bold block">UPI / Online QR (Instant)</span>
                        <span className="text-[10px] text-espresso/60 dark:text-cream/60">GPay, PhonePe, Paytm (7972385812@upi)</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={payMethod === 'upi'}
                      onChange={() => setPayMethod('upi')}
                      className="accent-caramel"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-2xl border border-espresso/10 dark:border-night-border bg-espresso/5 dark:bg-night-surface cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💵</span>
                      <div>
                        <span className="text-xs font-bold block">Cash on Delivery / Pay at Counter</span>
                        <span className="text-[10px] text-espresso/60 dark:text-cream/60">Pay when your order arrives</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={payMethod === 'cash'}
                      onChange={() => setPayMethod('cash')}
                      className="accent-caramel"
                    />
                  </label>
                </div>
              </div>

              {/* UPI Quick Copy Card if selected */}
              {payMethod === 'upi' && (
                <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-green-700 dark:text-green-400 block">UPI ID: 7972385812@upi</span>
                    <span className="text-[10px] text-espresso/60 dark:text-cream/60">Bakers Gallery · Indapur</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('7972385812@upi');
                      alert('UPI ID copied to clipboard: 7972385812@upi');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-green-600 text-white font-bold text-[10px]"
                  >
                    Copy UPI
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-sm shadow-glow-caramel transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Order to Kitchen…</span>
                ) : (
                  <>
                    <span>Confirm & Send Order</span>
                    <span>({fmt(total)}) →</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      );
    }

    /* ============================================================
       10. CUSTOMER PROFILE & SAVED ORDERS DRAWER
       ============================================================ */
    function CustomerProfileDrawer({ customerProfile, onSaveProfile, orderHistory, onReorder, onClearProfile, onClose }) {
      const [isEditing, setIsEditing] = useState(false);
      const [editName, setEditName] = useState(customerProfile.name || '');
      const [editPhone, setEditPhone] = useState(cleanIndianMobile(customerProfile.phone || ''));
      const [editAddress, setEditAddress] = useState(customerProfile.address || '');
      const [editTable, setEditTable] = useState(customerProfile.table || '');
      const [phoneError, setPhoneError] = useState('');

      useEffect(() => {
        setEditName(customerProfile.name || '');
        setEditPhone(cleanIndianMobile(customerProfile.phone || ''));
        setEditAddress(customerProfile.address || '');
        setEditTable(customerProfile.table || '');
      }, [customerProfile, isEditing]);

      const handleSave = (e) => {
        e.preventDefault();
        const cleaned = cleanIndianMobile(editPhone);
        if (cleaned && !isValidIndianMobile(cleaned)) {
          setPhoneError('Please enter a valid 10-digit mobile number starting with 6-9');
          return;
        }
        setPhoneError('');
        const updated = {
          ...customerProfile,
          name: editName.trim(),
          phone: cleaned,
          address: editAddress.trim(),
          table: editTable.trim(),
        };
        saveCustomerProfile(updated);
        onSaveProfile(updated);
        setIsEditing(false);
      };

      const totalSpent = orderHistory.reduce((sum, o) => sum + (o.total || 0), 0);

      return (
        <div className="fixed inset-0 z-50 flex justify-end bg-espresso/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-night-card text-espresso dark:text-cream w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-left">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-espresso/10 dark:border-night-border flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold">My Saved Details</h2>
                <p className="text-xs text-espresso/60 dark:text-cream/60">
                  Manage your information & past orders
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-espresso/5 dark:bg-night-surface flex items-center justify-center font-bold text-sm hover:bg-espresso/10 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-cream-soft dark:bg-night-surface border border-espresso/10 dark:border-night-border relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-caramel text-white font-serif text-xl font-bold flex items-center justify-center shadow">
                      {customerProfile.name ? customerProfile.name[0].toUpperCase() : '👤'}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base">
                        {customerProfile.name || 'Guest Customer'}
                      </h3>
                      <p className="text-xs text-espresso/60 dark:text-cream/60 font-mono">
                        {customerProfile.phone ? \`+91 \${customerProfile.phone}\` : 'No phone saved yet'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs text-caramel font-semibold hover:underline"
                  >
                    {isEditing ? 'Cancel' : '✏️ Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-3 pt-3 border-t border-espresso/10 dark:border-night-border">
                    <div>
                      <label className="text-[11px] font-bold text-caramel block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-night-card border border-espresso/10 dark:border-night-border text-xs"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-caramel">10-Digit Mobile Number</label>
                        {editPhone.length > 0 && (
                          <span className={\`text-[10px] font-mono \${cleanIndianMobile(editPhone).length === 10 ? 'text-green-600 font-bold' : 'text-espresso/40 dark:text-cream/40'}\`}>
                            {cleanIndianMobile(editPhone).length}/10
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1.5">
                        <span className="px-2.5 py-1.5 rounded-xl bg-espresso/5 dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs font-bold text-espresso/60 flex items-center select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={(e) => {
                            const cleaned = cleanIndianMobile(e.target.value);
                            setEditPhone(cleaned);
                            setPhoneError('');
                          }}
                          className={\`flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-night-card border text-xs font-mono \${
                            phoneError ? 'border-red-500' : 'border-espresso/10 dark:border-night-border'
                          }\`}
                        />
                      </div>
                      {phoneError && <p className="text-[10px] text-red-500 mt-1 font-medium">{phoneError}</p>}
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-caramel block mb-1">Default Delivery Address (Indapur)</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-night-card border border-espresso/10 dark:border-night-border text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-caramel block mb-1">Preferred Dine-in Table (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Table 4"
                        value={editTable}
                        onChange={(e) => setEditTable(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-night-card border border-espresso/10 dark:border-night-border text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-caramel text-white font-bold text-xs shadow hover:bg-caramel-dark transition"
                    >
                      Save Profile
                    </button>
                  </form>
                ) : (
                  <div className="space-y-1.5 text-xs pt-2 border-t border-espresso/10 dark:border-night-border text-espresso/80 dark:text-cream/80">
                    <p>📍 <span className="font-medium">Address:</span> {customerProfile.address || 'Not specified'}</p>
                    <p>🪑 <span className="font-medium">Preferred Table:</span> {customerProfile.table || 'None'}</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-espresso/5 dark:bg-night-surface border border-espresso/8 dark:border-night-border">
                  <span className="text-xl font-bold font-serif text-caramel block">{orderHistory.length}</span>
                  <span className="text-[11px] text-espresso/60 dark:text-cream/60">Orders Placed</span>
                </div>
                <div className="p-3 rounded-2xl bg-espresso/5 dark:bg-night-surface border border-espresso/8 dark:border-night-border">
                  <span className="text-xl font-bold font-serif text-caramel block">{fmt(totalSpent)}</span>
                  <span className="text-[11px] text-espresso/60 dark:text-cream/60">Lifetime Spent</span>
                </div>
              </div>

              {/* Saved Past Orders */}
              <div>
                <h4 className="font-serif text-base font-bold mb-3 flex items-center justify-between">
                  <span>Order History</span>
                  <span className="text-xs font-normal text-espresso/60 dark:text-cream/60">
                    {orderHistory.length} recorded
                  </span>
                </h4>

                {orderHistory.length === 0 ? (
                  <div className="p-6 text-center rounded-2xl bg-espresso/5 dark:bg-night-surface border border-dashed border-espresso/20 dark:border-night-border">
                    <p className="text-xs text-espresso/60 dark:text-cream/60">
                      No orders placed yet. Your first order will appear right here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orderHistory.map((order, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white dark:bg-night-surface border border-espresso/10 dark:border-night-border shadow-sm space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-xs text-caramel font-mono">#{order.id}</span>
                            <span className="text-[10px] text-espresso/50 dark:text-cream/50 ml-2">
                              {order.date} · {order.time}
                            </span>
                          </div>
                          <span className="text-xs font-bold">{fmt(order.total)}</span>
                        </div>

                        <p className="text-[11px] text-espresso/70 dark:text-cream/70 line-clamp-1">
                          {order.items.map((i) => \`\${i.name} ×\${i.qty}\`).join(', ')}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-espresso/5 dark:border-night-border">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-green-600">
                            ● Completed ({order.orderType})
                          </span>
                          <button
                            onClick={() => onReorder(order)}
                            className="px-3 py-1 rounded-lg bg-caramel/15 hover:bg-caramel/25 text-caramel font-bold text-[11px] transition"
                          >
                            🔁 Re-Order All
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Data */}
              <div className="pt-4 text-center">
                <button
                  onClick={onClearProfile}
                  className="text-xs text-red-500/80 hover:text-red-600 transition"
                >
                  🗑️ Clear Saved Details from Device
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ============================================================
       11. LIVE ORDER TRACKING SCREEN (4-STEP TIMELINE)
       ============================================================ */
    function OrderTracker({ order, onClose }) {
      const [step, setStep] = useState(1);

      useEffect(() => {
        const t1 = setTimeout(() => setStep(2), 3500);
        const t2 = setTimeout(() => setStep(3), 7500);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }, []);

      const steps = [
        { title: 'Order Confirmed', desc: 'Received at Bakers Gallery kitchen', icon: '🧾' },
        { title: 'Baking & Extraction', desc: 'Fresh oven heating & preparation', icon: '♨️' },
        { title: 'Quality Plating & Packaging', desc: 'Carefully packaged with love', icon: '🧁' },
        { title: 'Ready for You!', desc: order.orderType === 'delivery' ? 'Out for delivery in Indapur' : 'Ready at Bakers Gallery Counter', icon: '🛵' },
      ];

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/80 backdrop-blur-md animate-fade-in overflow-hidden">
          {/* Confetti particles */}
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float pointer-events-none"
              style={{
                left: \`\${Math.random() * 100}%\`,
                top: \`-20px\`,
                width: \`\${6 + Math.random() * 8}px\`,
                height: \`\${6 + Math.random() * 8}px\`,
                backgroundColor: ['#C68B59', '#7A9E7E', '#E8B4A0', '#FFF6E9', '#3B2A20'][i % 5],
                animationDelay: \`\${Math.random() * 2}s\`,
                animationDuration: \`\${2.5 + Math.random() * 2}s\`,
              }}
            />
          ))}

          <div className="bg-white dark:bg-night-card text-espresso dark:text-cream rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center">
            {/* Animated Cake / Oven Icon */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-caramel/10 flex items-center justify-center text-4xl animate-bounce">
              🎂
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-caramel">Live Kitchen Status</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1">Your Order is Baking</h2>
            <p className="font-chalk text-xl text-caramel-light mt-1">
              Order #{order.id} · {order.name} ({order.orderType.toUpperCase()})
            </p>

            {/* Timeline */}
            <div className="my-6 text-left space-y-4">
              {steps.map((s, idx) => {
                const isDone = idx < step;
                const isCurrent = idx === step;
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={\`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors \${
                        isDone
                          ? 'bg-green-600 text-white'
                          : isCurrent
                          ? 'bg-caramel text-white shadow-glow-caramel animate-pulse'
                          : 'bg-espresso/10 dark:bg-night-surface text-espresso/40 dark:text-cream/40'
                      }\`}
                    >
                      {isDone ? '✓' : s.icon}
                    </div>
                    <div>
                      <h4 className={\`text-xs sm:text-sm font-bold \${isCurrent ? 'text-caramel font-serif text-base' : ''}\`}>
                        {s.title}
                      </h4>
                      <p className="text-[11px] text-espresso/60 dark:text-cream/60">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Estimated Prep Clock */}
            <div className="p-3 rounded-2xl bg-cream-soft dark:bg-night-surface border border-espresso/10 dark:border-night-border text-xs mb-5 flex items-center justify-between">
              <span>⏱️ Estimated Preparation:</span>
              <span className="font-bold text-caramel">
                {step === 3 ? 'Ready Right Now!' : '~10-12 minutes'}
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  const text = \`🛒 *Order #\${order.id} from Bakers Gallery*\n👤 Customer: \${order.name}\n📞 Phone: \${order.phone}\n📍 Type: \${order.orderType.toUpperCase()}\n\${order.table ? \`🪑 Table: \${order.table}\n\` : ''}\${order.address ? \`🏠 Address: \${order.address}\n\` : ''}💰 Total: \${fmt(order.total)}\n\n*Items Ordered:*\n\${order.items.map((x, i) => \`\${i + 1}. \${x.name} ×\${x.qty} = \${fmt(x.totalPrice)}\`).join('\\n')}\`;
                  window.open(\`https://wa.me/917972385812?text=\${encodeURIComponent(text)}\`, '_blank');
                }}
                className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2"
              >
                <span>💬 Send Order Copy to Bakers Gallery on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-espresso/5 dark:bg-night-surface hover:bg-espresso/10 text-espresso dark:text-cream font-semibold text-xs transition"
              >
                Back to Bakery Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    /* ============================================================
       12. MOBILE BOTTOM NAVIGATION BAR
       ============================================================ */
    function BottomBar({ cartCount, onOpenCart, onOpenMenu, onOpenProfile, customerName }) {
      return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-night-card/95 backdrop-blur-md border-t border-espresso/10 dark:border-night-border px-4 py-2 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-0.5 text-espresso/70 dark:text-cream/70 hover:text-caramel"
          >
            <span className="text-lg">🏠</span>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={onOpenMenu}
            className="flex flex-col items-center gap-0.5 text-espresso/70 dark:text-cream/70 hover:text-caramel"
          >
            <span className="text-lg">📜</span>
            <span className="text-[10px] font-medium">Menu</span>
          </button>
          <button
            id="floating-cart-btn"
            onClick={onOpenCart}
            className="flex flex-col items-center gap-0.5 relative text-caramel font-bold"
          >
            <div className="relative">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-caramel text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px]">Tray</span>
          </button>
          <button
            onClick={onOpenProfile}
            className="flex flex-col items-center gap-0.5 text-espresso/70 dark:text-cream/70 hover:text-caramel"
          >
            <span className="text-lg">👤</span>
            <span className="text-[10px] font-medium">{customerName ? customerName.split(' ')[0] : 'Profile'}</span>
          </button>
        </nav>
      );
    }

    /* ============================================================
       13. FOOTER
       ============================================================ */
    function Footer({ onShowSpecial }) {
      return (
        <footer className="bg-espresso text-cream pt-14 pb-12 border-t border-espresso-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🎂</span>
                <span className="font-serif text-2xl font-bold tracking-tight">Bakers Gallery</span>
              </div>
              <p className="text-sm text-cream/70 max-w-sm leading-relaxed mb-4">
                Indapur's destination for fresh designer cream cakes, hand-tossed artisan pizzas, crispy burgers, and chilled thick cold coffee.
              </p>
              <p className="font-chalk text-xl text-caramel-light">
                "Baking happiness in Indapur every single morning."
              </p>
            </div>

            {/* Hours & Contact */}
            <div>
              <h4 className="font-serif text-base font-bold text-caramel-light mb-3">Baking Hours</h4>
              <ul className="text-xs space-y-2 text-cream/80">
                <li><span className="font-semibold text-cream">Monday – Sunday:</span> 9:00 AM – 8:30 PM</li>
                <li><span className="font-semibold text-cream">Cakes:</span> Made fresh to order daily</li>
                <li className="pt-2 text-green-400 font-medium">● Dine-In · Takeaway · Doorstep Delivery</li>
              </ul>
            </div>

            {/* Location & UPI */}
            <div>
              <h4 className="font-serif text-base font-bold text-caramel-light mb-3">Find Bakers Gallery</h4>
              <p className="text-xs text-cream/80 leading-relaxed mb-3">
                📍 SNR Shopping Centre, In front of Nagar Parishad, Ground Floor, Indapur, Maharashtra 413106<br />
                📞 +91 79723 85812<br />
                📱 UPI ID: 7972385812@upi
              </p>
              <div className="flex gap-3 text-lg">
                <a href="https://wa.me/917972385812" target="_blank" rel="noreferrer" className="hover:text-caramel transition">💬</a>
                <a href="https://maps.app.goo.gl/yUUTsAW4sf99iCycA" target="_blank" rel="noreferrer" className="hover:text-caramel transition">🗺️</a>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 border-t border-cream/10 text-center text-xs text-cream/50 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Bakers Gallery Indapur. All rights reserved.</p>
            <p className="font-chalk text-sm text-caramel-light">Made with ❤️ and freshly ground oven magic.</p>
          </div>
        </footer>
      );
    }

    // Mount React App
    const rootElement = document.getElementById('root');
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  </script>
</body>
</html>`;

// Write to both brew-and-bloom/index.html and root index.html
fs.writeFileSync(path.join(__dirname, 'brew-and-bloom/index.html'), html, 'utf8');
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');

console.log('✅ Successfully compiled Bakers Gallery app to brew-and-bloom/index.html & index.html');
