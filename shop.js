/* ============================================================================
   D.A.T. — Logique boutique partagée (fiches produits, panier, commande)
   Chargé après catalogue.js sur chaque page boutique.
   ============================================================================ */
window.DAT_SHOP = (function(){
  var cart = [];
  var els = null;
  var currentSession = null;

  function cartKey(item){ return item.productId + '::' + item.formatLabel; }

  function addToCart(item){
    var key = cartKey(item);
    var existing = cart.find(function(c){ return cartKey(c) === key; });
    if(existing){
      existing.qty = Math.min(99, existing.qty + item.qty);
    } else {
      cart.push(item);
    }
    renderCart();
  }

  function removeFromCart(key){
    cart = cart.filter(function(c){ return cartKey(c) !== key; });
    renderCart();
  }

  function cartCount(){
    return cart.reduce(function(sum, c){ return sum + c.qty; }, 0);
  }

  function renderCart(){
    if(!els) return;
    var count = cartCount();
    document.querySelectorAll('[data-cart-badge]').forEach(function(b){
      b.textContent = count;
      b.classList.toggle('zero', count === 0);
    });

    if(cart.length === 0){
      els.items.innerHTML = '<p class="cart-empty">Votre panier est vide. Ajoutez des produits ci-dessous.</p>';
      if(els.checkoutBtn) els.checkoutBtn.style.display = 'none';
      if(els.recapList) els.recapList.innerHTML = '<p class="order-recap-empty">Votre panier est vide pour le moment.</p>';
      if(els.recapField) els.recapField.value = '';
      return;
    }

    els.items.innerHTML = cart.map(function(c){
      return '<div class="cart-item">' +
        '<div>' +
          '<span class="cart-item-name">' + c.name + '</span>' +
          '<span class="cart-item-meta">' + c.formatLabel + ' · quantité ' + c.qty + '</span>' +
          '<button type="button" class="cart-item-remove" data-key="' + cartKey(c) + '">Retirer</button>' +
        '</div>' +
      '</div>';
    }).join('');

    if(els.checkoutBtn) els.checkoutBtn.style.display = 'inline-flex';

    if(els.recapList){
      els.recapList.innerHTML = cart.map(function(c){
        return '<div class="order-recap-item">' +
          '<div>' +
            '<span class="order-recap-item-name">' + c.name + '</span>' +
            '<span class="order-recap-item-meta">' + c.formatLabel + ' · quantité ' + c.qty + '</span>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    if(els.recapField){
      els.recapField.value = cart.map(function(c){
        return '- ' + c.name + ' — ' + c.formatLabel + ' × ' + c.qty;
      }).join('\n');
    }

    els.items.querySelectorAll('.cart-item-remove').forEach(function(btn){
      btn.addEventListener('click', function(){ removeFromCart(btn.getAttribute('data-key')); });
    });
  }

  /* ---------- Rendu d'une grille de fiches produits ---------- */
  function renderProducts(gridId, products){
    var grid = document.getElementById(gridId);
    if(!grid || !products) return;

    products.forEach(function(p){
      var formats = (p.formats && p.formats.length) ? p.formats : [{label:'Unité'}];
      var card = document.createElement('div');
      card.className = 'shop-card';
      card.setAttribute('data-product', p.id);

      var mediaHtml = p.image
        ? '<div class="shop-card-media"><img src="' + p.image + '" alt="' + p.name + ' — D.A.T." loading="lazy"></div>'
        : '';

      var formatControlHtml;
      if(formats.length > 1){
        var formatOptions = formats.map(function(f, i){
          return '<option value="' + i + '">' + f.label + '</option>';
        }).join('');
        formatControlHtml = '<select class="format-select" data-role="format">' + formatOptions + '</select>';
      } else {
        formatControlHtml = '';
      }

      card.innerHTML =
        mediaHtml +
        '<div class="shop-card-body' + (p.image ? '' : ' no-media') + '">' +
          '<span class="kicker">' + p.kicker + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<p class="desc">' + p.desc + '</p>' +
          '<div class="shop-controls">' +
            '<div class="shop-row">' +
              formatControlHtml +
              '<div class="qty-stepper">' +
                '<button type="button" data-role="dec" aria-label="Diminuer la quantité">−</button>' +
                '<input type="number" data-role="qty" value="1" min="1" max="99" aria-label="Quantité">' +
                '<button type="button" data-role="inc" aria-label="Augmenter la quantité">+</button>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="btn btn-gold btn-add" data-role="add">Ajouter au panier</button>' +
          '</div>' +
        '</div>';

      grid.appendChild(card);

      var formatSelect = card.querySelector('[data-role="format"]');
      var qtyInput = card.querySelector('[data-role="qty"]');
      var decBtn = card.querySelector('[data-role="dec"]');
      var incBtn = card.querySelector('[data-role="inc"]');
      var addBtn = card.querySelector('[data-role="add"]');

      function currentFormatLabel(){
        return formatSelect ? formats[parseInt(formatSelect.value, 10)].label : formats[0].label;
      }

      decBtn.addEventListener('click', function(){
        var v = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        qtyInput.value = v;
      });
      incBtn.addEventListener('click', function(){
        var v = Math.min(99, (parseInt(qtyInput.value, 10) || 1) + 1);
        qtyInput.value = v;
      });
      qtyInput.addEventListener('change', function(){
        var v = parseInt(qtyInput.value, 10);
        if(!v || v < 1) v = 1;
        if(v > 99) v = 99;
        qtyInput.value = v;
      });

      addBtn.addEventListener('click', function(){
        var qty = parseInt(qtyInput.value, 10) || 1;
        addToCart({ productId: p.id, name: p.name, formatLabel: currentFormatLabel(), qty: qty });
        var original = addBtn.textContent;
        addBtn.textContent = 'Ajouté ✓';
        addBtn.classList.add('added');
        setTimeout(function(){
          addBtn.textContent = original;
          addBtn.classList.remove('added');
        }, 1200);
      });
    });
  }

  /* ---------- Montage de l'affichage panier (badge, panneau, récapitulatif) ---------- */
  function mountCart(ids){
    els = {
      badge: document.getElementById(ids.badge),
      items: document.getElementById(ids.items),
      checkoutBtn: ids.checkoutBtn ? document.getElementById(ids.checkoutBtn) : null,
      recapList: ids.recapList ? document.getElementById(ids.recapList) : null,
      recapField: ids.recapField ? document.getElementById(ids.recapField) : null
    };
    renderCart();

    var cartToggle = document.getElementById(ids.toggle);
    var cartPanel = document.getElementById(ids.panel);
    if(cartToggle && cartPanel){
      cartToggle.addEventListener('click', function(){
        var open = cartPanel.classList.toggle('open');
        cartToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        var searchPanel = document.getElementById('search-panel');
        if(searchPanel) searchPanel.classList.remove('open');
      });
      document.addEventListener('click', function(e){
        if(!cartPanel.contains(e.target) && e.target !== cartToggle && !cartToggle.contains(e.target)){
          cartPanel.classList.remove('open');
          cartToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ---------- Montage du formulaire de commande ---------- */
  function mountOrderForm(ids){
    var orderForm = document.getElementById(ids.formId);
    var orderStatus = document.getElementById(ids.statusId);
    var orderSubmit = document.getElementById(ids.submitId);
    if(!orderForm) return;

    (async function prefillFromAccount(){
      if(!window.DAT_AUTH || !window.DAT_AUTH.isConfigured) return;
      var session = await window.DAT_AUTH.getSession();
      if(!session || !session.user) return;
      currentSession = session;
      var profile = await window.DAT_AUTH.getProfile(session.user.id);
      var setVal = function(id, val){ var el = document.getElementById(id); if(el && val) el.value = val; };
      if(profile){
        setVal('nom', profile.nom);
        setVal('societe', profile.societe);
        setVal('telephone', profile.telephone);
        setVal('adresse', profile.adresse);
      }
      setVal('email', session.user.email);
      orderStatus.textContent = 'Connecté en tant que ' + session.user.email + ' — vos informations ont été pré-remplies.';
    })();

    orderForm.addEventListener('submit', function(e){
      e.preventDefault();

      if(cart.length === 0){
        orderStatus.textContent = 'Votre panier est vide : ajoutez au moins un produit avant d\u2019envoyer votre commande.';
        return;
      }

      orderSubmit.disabled = true;
      orderSubmit.textContent = 'Envoi en cours…';
      orderStatus.textContent = 'Envoi en cours…';

      var formData = new FormData(orderForm);
      var payload = Object.fromEntries(formData);
      payload.message = (payload.message ? payload.message + '\n\n' : '') + 'Commande :\n' + payload.recapitulatif_commande;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function(res){ return res.json(); })
      .then(async function(data){
        if (data.success) {
          if(currentSession && currentSession.user && window.DAT_AUTH && window.DAT_AUTH.isConfigured){
            try {
              await window.DAT_AUTH.saveOrder(currentSession.user.id, {
                panier: cart,
                adresse_livraison: payload.adresse,
                message: formData.get('message') || null
              });
            } catch(err){ /* l'e-mail est déjà parti, on n'interrompt pas la confirmation */ }
          }
          orderForm.reset();
          cart = [];
          renderCart();
          orderSubmit.textContent = 'Commande envoyée ✓';
          orderStatus.textContent = currentSession
            ? 'Merci, votre commande a bien été envoyée à D.A.T. et ajoutée à votre historique de compte. Nous revenons vers vous sous 48h ouvrées.'
            : 'Merci, votre commande a bien été envoyée à D.A.T. Nous revenons vers vous sous 48h ouvrées pour confirmer la livraison. Créez un compte pour retrouver vos commandes la prochaine fois.';
        } else {
          orderSubmit.disabled = false;
          orderSubmit.textContent = 'Envoyer ma commande';
          orderStatus.textContent = "Une erreur est survenue. Vous pouvez réessayer ou nous contacter directement.";
        }
      })
      .catch(function(){
        orderSubmit.disabled = false;
        orderSubmit.textContent = 'Envoyer ma commande';
        orderStatus.textContent = "Une erreur est survenue. Vous pouvez réessayer ou nous contacter directement.";
      });
    });
  }

  return {
    renderProducts: renderProducts,
    mountCart: mountCart,
    mountOrderForm: mountOrderForm
  };
})();
