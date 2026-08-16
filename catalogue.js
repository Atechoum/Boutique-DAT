/* ============================================================================
   D.A.T. — Catalogue produits de la boutique
   Chargé sur toutes les pages boutique, avant shop.js.
   ============================================================================ */
window.DAT_CATALOGUE = {

  /* ---------- Capsules Café (gamme Lavazza FIRMA) ---------- */
  capsules: [
    {
      id:'milano',
      image:'images/capsule-milano.jpg',
      kicker:'100% Arabica · Torréfaction douce',
      name:'Milano',
      desc:'Un espresso rond et délicat, inspiré des flèches du Duomo. L\u2019élégance discrète de la capitale lombarde, tasse après tasse.',
      formats:[ {label:'Boîte de 48 capsules'} ]
    },
    {
      id:'napoli',
      image:'images/capsule-napoli.jpg',
      kicker:'Assemblage traditionnel · Torréfaction intense',
      name:'Napoli',
      desc:'Un espresso corsé à la crema généreuse, dans la pure tradition du café napolitain, pour un réveil plein de caractère.',
      formats:[ {label:'Boîte de 48 capsules'} ]
    },
    {
      id:'roma',
      image:'images/capsule-roma.jpg',
      kicker:'Assemblage équilibré · Torréfaction moyenne',
      name:'Roma',
      desc:'Un espresso rond et généreux, à l\u2019image de la ville éternelle. Un classique intemporel pour toutes les pauses.',
      formats:[ {label:'Boîte de 48 capsules'} ]
    },
    {
      id:'torino',
      image:'images/capsule-torino.jpg',
      kicker:'100% Arabica · Torréfaction douce',
      name:'Torino',
      desc:'Un espresso élégant et velouté, hommage à la capitale historique du café italien et de ses grands cafés.',
      formats:[ {label:'Boîte de 48 capsules'} ]
    },
    {
      id:'torino-lungo',
      image:'images/capsule-torino-lungo.jpg',
      kicker:'100% Arabica · Format Lungo',
      name:'Torino Lungo',
      desc:'Une tasse plus longue et tout en douceur, pour une pause café qui prend son temps.',
      formats:[ {label:'Boîte de 48 capsules'} ]
    },
    {
      id:'decafeine',
      kicker:'Sans caféine · Torréfaction douce',
      name:'Décaféiné',
      desc:'Tout l\u2019arôme de l\u2019espresso italien, sans caféine. Idéal pour les pauses en fin de journée.',
      formats:[ {label:'Boîte de 48 capsules'} ]
    }
  ],

  /* ---------- Boissons Gourmandes ---------- */
  boissons: [
    {
      id:'cappuccino',
      kicker:'Café & lait en poudre',
      name:'Cappuccino',
      desc:'Un café onctueux à la mousse de lait généreuse, prêt en une capsule pour une pause gourmande.',
      formats:[ {label:'Boîte de 50 capsules'}, {label:'Boîte de 100 capsules'} ]
    },
    {
      id:'chocolat-chaud',
      kicker:'Boisson chocolatée',
      name:'Chocolat Chaud',
      desc:'Une boisson chocolatée onctueuse et réconfortante, pour varier les plaisirs à la machine.',
      formats:[ {label:'Boîte de 50 capsules'}, {label:'Boîte de 100 capsules'} ]
    },
    {
      id:'latte-macchiato',
      kicker:'Café & lait',
      name:'Latte Macchiato',
      desc:'Un café tout en douceur, avec une belle couche de mousse de lait, pour une pause gourmande en milieu de journée.',
      formats:[ {label:'Boîte de 50 capsules'}, {label:'Boîte de 100 capsules'} ]
    },
    {
      id:'the-earl-grey',
      kicker:'Infusion',
      name:'Thé Earl Grey',
      desc:'Une infusion parfumée à la bergamote, pour varier les plaisirs entre deux cafés.',
      formats:[ {label:'Boîte de 50 capsules'}, {label:'Boîte de 100 capsules'} ]
    }
  ],

  /* ---------- Accessoires ---------- */
  accessoires: [
    {
      id:'kit-detartrage',
      kicker:'Entretien machine',
      name:'Kit de détartrage',
      desc:'Kit de détartrage recommandé tous les 3 mois pour préserver les performances et la durée de vie de votre machine Lavazza FIRMA.',
      formats:[ {label:'Unité'} ]
    },
    {
      id:'filtre-eau',
      kicker:'Entretien machine',
      name:'Filtre à eau machine',
      desc:'Filtre à eau compatible, à remplacer tous les 2 mois pour préserver le goût de vos cafés et la longévité de la machine.',
      formats:[ {label:'Unité'} ]
    },
    {
      id:'tasses-espresso',
      kicker:'Accessoire',
      name:'Tasses espresso LAVAZZA FIRMA',
      desc:'Lot de 6 tasses à espresso siglées Lavazza FIRMA, pour un service soigné en salle de pause.',
      formats:[ {label:'Lot de 6 tasses'} ]
    },
    {
      id:'support-capsules',
      kicker:'Rangement',
      name:'Support à capsules',
      desc:'Support de rangement pour 33 capsules, pratique et compact, à poser à côté de votre machine.',
      formats:[ {label:'Unité'} ]
    }
  ]
};
