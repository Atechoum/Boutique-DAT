/* ============================================================================
   D.A.T. — Authentification client (Supabase)
   Chargé sur toutes les pages, après supabase-config.js et le SDK Supabase.
   Expose window.DAT_AUTH avec les fonctions utilisées par les pages du site.
   ============================================================================ */
(function(){
  var configured = !!(window.SUPABASE_URL && window.SUPABASE_ANON_KEY
    && window.SUPABASE_URL.indexOf('VOTRE_') !== 0
    && window.SUPABASE_ANON_KEY.indexOf('VOTRE_') !== 0);

  var client = null;
  if(configured && window.supabase){
    client = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }

  var NOT_CONFIGURED_MSG = "La création de compte n'est pas encore activée sur ce site : le projet Supabase n'a pas été configuré (voir SETUP-COMPTE-CLIENT.md).";

  async function signUp(email, password, meta){
    if(!client) return { error: { message: NOT_CONFIGURED_MSG } };
    return await client.auth.signUp({
      email: email,
      password: password,
      options: { data: meta || {} }
    });
  }

  async function signIn(email, password){
    if(!client) return { error: { message: NOT_CONFIGURED_MSG } };
    return await client.auth.signInWithPassword({ email: email, password: password });
  }

  async function signOut(){
    if(!client) return { error: null };
    return await client.auth.signOut();
  }

  async function getSession(){
    if(!client) return null;
    var res = await client.auth.getSession();
    return res && res.data ? res.data.session : null;
  }

  async function getProfile(userId){
    if(!client) return null;
    var res = await client.from('profiles').select('*').eq('id', userId).single();
    return res && !res.error ? res.data : null;
  }

  async function updateProfile(userId, fields){
    if(!client) return { error: { message: NOT_CONFIGURED_MSG } };
    return await client.from('profiles').update(fields).eq('id', userId);
  }

  async function saveOrder(userId, order){
    if(!client) return { error: { message: NOT_CONFIGURED_MSG } };
    return await client.from('commandes').insert({
      user_id: userId,
      panier: order.panier,
      adresse_livraison: order.adresse_livraison,
      message: order.message || null
    });
  }

  async function getOrders(userId){
    if(!client) return [];
    var res = await client.from('commandes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    return res && !res.error ? res.data : [];
  }

  window.DAT_AUTH = {
    isConfigured: configured,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getSession: getSession,
    getProfile: getProfile,
    updateProfile: updateProfile,
    saveOrder: saveOrder,
    getOrders: getOrders
  };

  /* --------------------------------------------------------------------
     Mise à jour de l'icône "Mon compte" dans la navbar, sur toutes les pages
     -------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', async function(){
    var label = document.getElementById('account-label');
    if(!label) return;
    if(!configured){ return; }
    var session = await getSession();
    if(session && session.user){
      var profile = await getProfile(session.user.id);
      var first = (profile && profile.nom) ? profile.nom.split(' ')[0] : 'Mon compte';
      label.textContent = first;
    }
  });
})();
