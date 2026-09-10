/* TAX MASTER — interactivity (vanilla, lightweight) */
(function(){
  'use strict';

  // ============ ICONS ============
  function renderIcons(){
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  document.addEventListener('DOMContentLoaded', renderIcons);
  window.addEventListener('load', renderIcons);

  // ============ YEAR ============
  document.addEventListener('DOMContentLoaded', function(){
    var y = document.getElementById('yr');
    if (y) y.textContent = new Date().getFullYear();
  });

  // ============ NAV SCROLL / MOBILE ============
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var mob = document.getElementById('navMobile');

  window.addEventListener('scroll', function(){
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }, {passive:true});

  if (burger && mob) {
    burger.addEventListener('click', function(){
      var open = mob.hasAttribute('hidden') ? false : true;
      if (open) { mob.setAttribute('hidden',''); burger.setAttribute('aria-expanded','false'); }
      else      { mob.removeAttribute('hidden'); burger.setAttribute('aria-expanded','true'); }
    });
    mob.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mob.setAttribute('hidden','');
        burger.setAttribute('aria-expanded','false');
      });
    });
  }

  // ============ SERVICE FINDER ============
  var finderData = {
    individual: {
      title: "For individuals",
      lede:  "Salaried, retired or homemaker — we handle your taxes end-to-end.",
      icon:  "user",
      items: [
        { i:"receipt-indian-rupee", t:"ITR Filing",         s:"Annual return, all forms", h:"itr-filing-bangalore.html" },
        { i:"trending-up",          t:"Tax Planning",       s:"Old vs new regime, savings", h:"income-tax-consultant-bangalore.html" },
        { i:"percent",              t:"TDS Refund",         s:"Claim excess TDS deducted", h:"tax-consultant-bangalore.html" },
        { i:"file-warning",         t:"Tax Notice Help",    s:"Respond confidently", h:"tax-consultant-bangalore.html" },
        { i:"landmark",             t:"Capital Gains",      s:"Property, shares, mutual funds", h:"income-tax-consultant-bangalore.html" },
        { i:"file-key",             t:"PAN / Aadhaar",      s:"Corrections & linking", h:"tax-consultant-bangalore.html" }
      ]
    },
    professional: {
      title: "For salaried professionals",
      lede:  "IT engineers, doctors, teachers, consultants — file smart and save more.",
      icon:  "briefcase-business",
      items: [
        { i:"receipt-indian-rupee", t:"ITR-1 / ITR-2",      s:"Salary + house property + capital gains", h:"itr-filing-bangalore.html" },
        { i:"trending-up",          t:"Tax Regime Advice",  s:"Which regime saves you more", h:"income-tax-consultant-bangalore.html" },
        { i:"gift",                 t:"HRA & Deductions",   s:"80C, 80D, HRA optimisation", h:"income-tax-consultant-bangalore.html" },
        { i:"globe-2",              t:"Foreign Income",     s:"RSU/ESPP, foreign assets, DTAA", h:"income-tax-consultant-bangalore.html" },
        { i:"file-warning",         t:"Notice Response",    s:"143(1), 139(9), 148 handling", h:"tax-consultant-bangalore.html" },
        { i:"wallet",               t:"Advance Tax",        s:"Timely instalments", h:"income-tax-consultant-bangalore.html" }
      ]
    },
    freelancer: {
      title: "For freelancers & consultants",
      lede:  "44ADA presumptive scheme, GST, invoicing — sorted.",
      icon:  "laptop",
      items: [
        { i:"file-text",            t:"ITR-4 / 44ADA",      s:"Presumptive taxation for professionals", h:"itr-filing-bangalore.html" },
        { i:"file-check-2",         t:"GST Registration",   s:"When you cross the threshold", h:"gst-registration-bangalore.html" },
        { i:"repeat",               t:"GST Return Filing",  s:"GSTR-1 & 3B every month/quarter", h:"gst-return-filing-bangalore.html" },
        { i:"globe-2",              t:"Foreign Clients",    s:"LUT, export invoices, FIRC", h:"gst-consultant-bangalore.html" },
        { i:"calculator",           t:"Bookkeeping",        s:"Clean books, clean tax", h:"accounting-services-bangalore.html" },
        { i:"wallet",               t:"Advance Tax",        s:"Quarterly planning", h:"income-tax-consultant-bangalore.html" }
      ]
    },
    business: {
      title: "For business owners",
      lede:  "Proprietors, partnerships and companies — one team for every filing.",
      icon:  "building-2",
      items: [
        { i:"file-check-2",         t:"GST Compliance",     s:"Registration, returns, notices", h:"gst-consultant-bangalore.html" },
        { i:"receipt-indian-rupee", t:"Business ITR",       s:"ITR-3, ITR-5, ITR-6", h:"itr-filing-bangalore.html" },
        { i:"calculator",           t:"Accounting",         s:"Books, ledgers, financials", h:"accounting-services-bangalore.html" },
        { i:"percent",              t:"TDS Compliance",     s:"Deduction, deposit, filing", h:"accounting-services-bangalore.html" },
        { i:"shield-check",         t:"ROC / MCA Filings",  s:"Annual compliance for companies", h:"business-registration-bangalore.html" },
        { i:"users-round",          t:"Payroll Support",    s:"PF, ESI, PT, TDS on salary", h:"accounting-services-bangalore.html" }
      ]
    },
    startup: {
      title: "Starting a business",
      lede:  "Choose the right structure and launch cleanly — we handle every step.",
      icon:  "rocket",
      items: [
        { i:"building-2",           t:"Company Registration", s:"Private Limited / OPC", h:"business-registration-bangalore.html" },
        { i:"link-2",               t:"LLP Registration",     s:"Ideal for services & professionals", h:"business-registration-bangalore.html" },
        { i:"users-round",          t:"Partnership Firm",     s:"Deed drafting & registration", h:"business-registration-bangalore.html" },
        { i:"factory",              t:"MSME / Udyam",         s:"Government benefits & subsidies", h:"business-registration-bangalore.html" },
        { i:"file-check-2",         t:"GST Registration",     s:"Get your GSTIN quickly", h:"gst-registration-bangalore.html" },
        { i:"utensils",             t:"FSSAI License",        s:"For food-related businesses", h:"business-registration-bangalore.html" }
      ]
    }
  };

  var finderPanel = document.getElementById('finder-panel');
  var finderTabs = document.querySelectorAll('.finder__tab');

  function renderFinder(key){
    var d = finderData[key];
    if (!d || !finderPanel) return;
    var html = ''
      + '<div class="finder__lede">'
      +   '<div class="finder__lede-icon"><i data-lucide="'+d.icon+'"></i></div>'
      +   '<div class="finder__lede-copy"><h3>'+d.title+'</h3><p>'+d.lede+'</p></div>'
      + '</div>'
      + '<div class="finder__grid">'
      +   d.items.map(function(it){
            return '<a class="finder__item" href="'+(it.h || '#consult')+'">'
              +      '<span class="finder__item-icon"><i data-lucide="'+it.i+'"></i></span>'
              +      '<span><span class="finder__item-title">'+it.t+'</span><span class="finder__item-sub">'+it.s+'</span></span>'
              +    '</a>';
          }).join('')
      + '</div>';
    finderPanel.innerHTML = html;
    renderIcons();
  }

  finderTabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      finderTabs.forEach(function(t){
        t.classList.remove('is-active');
        t.setAttribute('aria-selected','false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected','true');
      renderFinder(tab.getAttribute('data-target'));
    });
  });

  document.addEventListener('DOMContentLoaded', function(){ renderFinder('individual'); });

  // ============ DOCUMENT CHECKLIST ============
  var docsData = {
    itr: {
      title: "Documents for ITR filing",
      lede:  "Typical documents. Actual requirements depend on your income sources.",
      items: [
        "PAN card & Aadhaar card",
        "Form 16 / Form 16A (from employer or deductor)",
        "Bank account details (all savings & current accounts)",
        "Interest certificates from banks / post office",
        "Rent receipts if claiming HRA",
        "Home-loan interest & principal statement",
        "Investment proofs (80C, 80D, ELSS, insurance, NPS)",
        "Capital gains statements (shares, mutual funds, property)",
        "Details of any other income (freelance, rental, etc.)"
      ]
    },
    gstreg: {
      title: "Documents for GST registration",
      lede:  "For proprietors, partnerships and companies. Additional docs may apply.",
      items: [
        "PAN of business / proprietor",
        "Aadhaar of proprietor / partners / directors",
        "Passport-size photograph",
        "Business address proof (electricity bill / rent agreement)",
        "NOC from property owner (if rented)",
        "Bank account details / cancelled cheque",
        "Partnership deed / Certificate of Incorporation",
        "Digital Signature (DSC) — for LLP / Company",
        "Board resolution / authorisation letter"
      ]
    },
    gstret: {
      title: "Documents for GST return filing",
      lede:  "Monthly / quarterly filings depending on your scheme.",
      items: [
        "GSTIN & login credentials",
        "Sales invoices for the period",
        "Purchase invoices & expense bills",
        "Debit / credit notes issued",
        "Import & export invoices, if any",
        "Bank statement (for reconciliation)",
        "E-way bill records, if applicable",
        "Previous return copy (for reconciliation)"
      ]
    },
    bizreg: {
      title: "Documents for business registration",
      lede:  "Applies to Pvt Ltd, LLP, Partnership, Proprietorship — varies by structure.",
      items: [
        "PAN & Aadhaar of promoters / partners",
        "Passport-size photographs",
        "Address proof (Aadhaar / Passport / DL / Voter ID)",
        "Recent utility bill / bank statement",
        "Registered office address proof",
        "NOC from property owner (if rented)",
        "Digital Signature (DSC) of directors / partners",
        "Proposed company / LLP name options (2–3)"
      ]
    },
    acc: {
      title: "Documents for accounting & bookkeeping",
      lede:  "Ongoing engagement — shared monthly or as generated.",
      items: [
        "Bank statements (all business accounts)",
        "Sales invoices & bills issued",
        "Purchase bills & expense receipts",
        "Payroll register / salary sheets",
        "Loan statements & EMI details",
        "Fixed asset purchase invoices",
        "GST returns filed (for reconciliation)",
        "Previous year's financials (for opening balances)"
      ]
    },
    tds: {
      title: "Documents for TDS filing",
      lede:  "Quarterly TDS returns for employers and deductors.",
      items: [
        "TAN of the deductor",
        "Details of deductees (PAN, name, amount)",
        "Nature of payment (salary, contract, rent, etc.)",
        "Challan copies of TDS deposited",
        "TDS challan-cum-statement (26QB / 26QC), if applicable",
        "Previous quarter's TDS return copy"
      ]
    }
  };

  var docsPanel = document.getElementById('docs-panel');
  var docsOpts = document.querySelectorAll('.docs__opt');

  function renderDocs(key){
    var d = docsData[key];
    if (!d || !docsPanel) return;
    docsPanel.innerHTML = ''
      + '<h3 class="docs__title">'+d.title+'</h3>'
      + '<p class="docs__lede">'+d.lede+'</p>'
      + '<ul class="docs__list">'
      +   d.items.map(function(x){ return '<li><i data-lucide="check"></i><span>'+x+'</span></li>'; }).join('')
      + '</ul>'
      + '<div class="docs__note"><i data-lucide="info"></i><span>Exact requirements can vary case-to-case. Share your situation on WhatsApp and we\'ll send a tailored checklist.</span></div>';
    renderIcons();
  }

  docsOpts.forEach(function(o){
    o.addEventListener('click', function(){
      docsOpts.forEach(function(x){ x.classList.remove('is-active'); x.setAttribute('aria-selected','false'); });
      o.classList.add('is-active');
      o.setAttribute('aria-selected','true');
      renderDocs(o.getAttribute('data-target'));
    });
  });

  document.addEventListener('DOMContentLoaded', function(){ renderDocs('itr'); });

  // ============ FORM ============
  var form = document.getElementById('consultForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // basic validation
      if (!form.checkValidity()) { form.reportValidity(); return; }
      // Simulate submission (no backend). Also offer WhatsApp handoff.
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var svc = (data.get('service') || '').toString();
      var date = (data.get('date') || '').toString();
      var time = (data.get('time') || '').toString();
      var msg = (data.get('message') || '').toString();
      var waMsg = encodeURIComponent(
        'Hello TAX MASTER, I would like to book a consultation.\n' +
        (name ? ('Name: '+name+'\n') : '') +
        (phone ? ('Phone: '+phone+'\n') : '') +
        (svc ? ('Service: '+svc+'\n') : '') +
        (date ? ('Preferred date: '+date+'\n') : '') +
        (time ? ('Preferred time: '+time+'\n') : '') +
        (msg ? ('Note: '+msg+'\n') : '')
      );
      form.reset();
      if (success) {
        success.hidden = false;
        success.querySelector('span').textContent = "We'll reach out shortly. Opening WhatsApp for instant reply…";
      }
      // small delay so user sees confirmation before WhatsApp opens
      setTimeout(function(){
        window.open('https://wa.me/919945231507?text='+waMsg, '_blank', 'noopener');
      }, 600);
    });
  }

  // ============ HERO SLIDES (auto-scroll, lazy-load 2/3) ============
  document.addEventListener('DOMContentLoaded', function(){
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;

    // Lazy-load the deferred backgrounds ~1s after first paint
    function loadDeferred(){
      slides.forEach(function(s){
        var url = s.getAttribute('data-bg');
        if (url) {
          var img = new Image();
          img.onload = function(){ s.style.backgroundImage = "url('" + url + "')"; };
          img.src = url;
          s.removeAttribute('data-bg');
        }
      });
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadDeferred, {timeout: 1500});
    } else {
      setTimeout(loadDeferred, 1200);
    }

    // Respect reduced motion — skip auto-rotation
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    var i = 0;
    var DUR = 6000; // 6s per slide
    var timer = null;

    function advance(){
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }

    function start(){ stop(); timer = setInterval(advance, DUR); }
    function stop(){ if (timer) { clearInterval(timer); timer = null; } }

    // wait 3s before first advance so LCP finishes cleanly
    setTimeout(start, 3000);

    // Pause when tab hidden — saves CPU/battery
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) stop(); else start();
    });
  });

  // ============ SCROLL-DRIVEN MOTION ============
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- 1. Reveal on scroll (basic) ----
  document.addEventListener('DOMContentLoaded', function(){
    var targets = document.querySelectorAll('.section, .hero__card, .step, .why__cell, .review, .strip__item, .founder__cell, .founder__sig, .founder__lede, .location__map, .location__body');
    targets.forEach(function(t){ t.classList.add('reveal'); });

    // directional variants
    document.querySelectorAll('.founder__lede, .location__body').forEach(function(el){ el.classList.add('reveal--left'); });
    document.querySelectorAll('.location__map').forEach(function(el){ el.classList.add('reveal--right'); });

    if (!('IntersectionObserver' in window) || reduceMotion) {
      targets.forEach(function(t){ t.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function(t){ io.observe(t); });
  });

  // ---- 2. Stagger reveal for card grids ----
  document.addEventListener('DOMContentLoaded', function(){
    var groups = document.querySelectorAll('.services, .steps, .why, .reviews, .strip, .footer__col ul, .footer__contact, .finder__grid, .founder__grid');
    groups.forEach(function(g){
      g.classList.add('stagger');
      Array.prototype.forEach.call(g.children, function(child, i){
        child.style.setProperty('--i', i);
      });
    });
    if (!('IntersectionObserver' in window) || reduceMotion) {
      groups.forEach(function(g){ g.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold:.1, rootMargin:'0px 0px -40px 0px' });
    groups.forEach(function(g){ io.observe(g); });
  });

  // ---- 3. Hero title line-by-line reveal ----
  document.addEventListener('DOMContentLoaded', function(){
    var t = document.querySelector('.hero__title');
    if (!t || reduceMotion) return;

    // Wrap each direct child (text nodes + <em>) in a split-line span for staggered rise
    // We split by inner nodes (keeps <em> intact as one unit) and by word chunks for text nodes.
    var frag = document.createDocumentFragment();
    var words = [];
    Array.prototype.forEach.call(t.childNodes, function(node){
      if (node.nodeType === 3) {
        // text node — split by word
        node.nodeValue.split(/(\s+)/).forEach(function(w){
          if (!w) return;
          if (/^\s+$/.test(w)) { words.push(document.createTextNode(w)); return; }
          var wrap = document.createElement('span');
          wrap.className = 'split-word';
          var inner = document.createElement('span');
          inner.className = 'split-line';
          inner.textContent = w;
          wrap.appendChild(inner);
          words.push(wrap);
        });
      } else if (node.nodeType === 1) {
        // keep <em> as a single unit but wrap
        var wrap = document.createElement('span');
        wrap.className = 'split-word';
        var inner = document.createElement('span');
        inner.className = 'split-line';
        // clone the element's HTML into inner
        inner.appendChild(node.cloneNode(true));
        wrap.appendChild(inner);
        words.push(wrap);
      }
    });
    t.innerHTML = '';
    words.forEach(function(w){ t.appendChild(w); });
    // assign indexes
    Array.prototype.forEach.call(t.querySelectorAll('.split-line'), function(el, i){
      el.style.setProperty('--i', i);
    });
    // fire on load
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ t.classList.add('split-in'); });
    });
  });

  // ---- 4. Scroll progress bar under nav ----
  (function(){
    if (reduceMotion) return;
    var bar = document.createElement('div');
    bar.className = 'scrollbar';
    document.body.appendChild(bar);
    var ticking = false;
    function update(){
      var h = document.documentElement;
      var scroll = h.scrollTop || document.body.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      var p = height > 0 ? Math.min(Math.max(scroll / height, 0), 1) : 0;
      bar.style.setProperty('--sp', p.toFixed(4));
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, {passive:true});
    update();
  })();

  // ---- 5. Subtle parallax on selected elements ----
  document.addEventListener('DOMContentLoaded', function(){
    if (reduceMotion) return;
    // Hero card gets a gentle upward drift; hero glows drift too
    var targets = [
      { el: document.querySelector('.hero__card'),   strength: -18 },
      { el: document.querySelector('.hero__glow--a'), strength: -60 },
      { el: document.querySelector('.hero__glow--b'), strength:  40 }
    ].filter(function(t){ return t.el; });
    targets.forEach(function(t){
      t.el.setAttribute('data-parallax','');
      t.el.style.setProperty('--parallax-strength', t.strength + 'px');
    });
    var ticking = false;
    function update(){
      var vh = window.innerHeight || 800;
      targets.forEach(function(t){
        var r = t.el.getBoundingClientRect();
        // p goes -1 (just below viewport) → 0 (centered) → 1 (just above)
        var center = r.top + r.height/2;
        var p = 1 - (center / vh); // 0 at bottom, 1 at top
        // clamp softly
        p = Math.max(-0.6, Math.min(1.2, p));
        t.el.style.setProperty('--p', p.toFixed(4));
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, {passive:true});
    window.addEventListener('resize', update);
    update();
  });

  // ---- 6. Nav active-section tracking ----
  document.addEventListener('DOMContentLoaded', function(){
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
    if (!links.length) return;
    var map = {};
    links.forEach(function(a){
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = { link: a, section: sec };
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var id = e.target.id;
        if (!map[id]) return;
        if (e.isIntersecting) {
          links.forEach(function(l){ l.classList.remove('is-current'); });
          map[id].link.classList.add('is-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    Object.keys(map).forEach(function(k){ io.observe(map[k].section); });
  });

  // ---- 7. Live "Open now / Closed" indicator (Asia/Kolkata) ----
  (function(){
    var el = document.querySelector('.topbar__inner');
    var dot = document.querySelector('.topbar__dot');
    var label = el ? el.querySelector('span:nth-of-type(2)') : null;
    if (!el || !dot || !label) return;
    function refresh(){
      // IST hours regardless of user TZ
      var now = new Date();
      var utc = now.getTime() + now.getTimezoneOffset() * 60000;
      var ist = new Date(utc + 5.5 * 3600 * 1000);
      var day = ist.getDay(); // 0 Sun .. 6 Sat
      var hour = ist.getHours() + ist.getMinutes()/60;
      var openNow = (day >= 1 && day <= 6) && (hour >= 9 && hour < 21);
      if (openNow) {
        dot.style.background = '#4ADE80';
        dot.style.boxShadow = '0 0 0 4px rgba(74,222,128,.18)';
        label.textContent = 'Open now · Mon–Sat · 9:00 AM – 9:00 PM';
      } else {
        dot.style.background = '#F59E0B';
        dot.style.boxShadow = '0 0 0 4px rgba(245,158,11,.18)';
        label.textContent = 'Currently closed · Opens Mon–Sat · 9:00 AM';
      }
    }
    refresh();
    setInterval(refresh, 60 * 1000);
  })();

})();
