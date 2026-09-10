/* TAX MASTER — Expressive layer (motion + color enhancements)
   Runs after app.js. Additive; no overrides required. */
(function(){
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = window.matchMedia && window.matchMedia('(min-width: 900px) and (hover: hover)').matches;

  // ============================================================
  // 1. Cursor spotlight (desktop only)
  // ============================================================
  (function(){
    if (!isDesktop || reduceMotion) return;
    var el = document.createElement('div');
    el.className = 'spotlight';
    document.body.appendChild(el);
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    var tx = x, ty = y;
    var raf = null;
    function tick(){
      // simple lerp toward target for buttery motion
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.setProperty('--x', x + 'px');
      el.style.setProperty('--y', y + 'px');
      if (Math.abs(tx-x) > .5 || Math.abs(ty-y) > .5) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    window.addEventListener('pointermove', function(e){
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX; ty = e.clientY;
      el.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(tick);
    }, {passive:true});
    window.addEventListener('pointerleave', function(){ el.classList.remove('is-on'); });
  })();

  // ============================================================
  // 2. Hero: inject aurora + orbs + stat strip
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    var hero = document.querySelector('.hero');
    var heroBg = hero ? hero.querySelector('.hero__bg') : null;
    if (heroBg && !heroBg.querySelector('.aurora')) {
      // Aurora goes ABOVE the slides but BELOW the veil
      var veil = heroBg.querySelector('.hero__veil');
      var aurora = document.createElement('div');
      aurora.className = 'aurora';
      aurora.innerHTML = '<div class="aurora__layer aurora__layer--a"></div><div class="aurora__layer aurora__layer--b"></div>';
      if (veil) heroBg.insertBefore(aurora, veil);
      else heroBg.appendChild(aurora);

      // Orbs
      var orbs = document.createElement('div');
      orbs.className = 'orbs';
      orbs.innerHTML = '<div class="orb orb--1"></div><div class="orb orb--2"></div><div class="orb orb--3"></div><div class="orb orb--4"></div><div class="orb orb--5"></div>';
      heroBg.appendChild(orbs);
    }

    // Stat strip — inject after hero__trust
    var trust = document.querySelector('.hero__trust');
    if (trust && !document.querySelector('.hero__stats')) {
      var stats = document.createElement('div');
      stats.className = 'hero__stats';
      stats.innerHTML =
        '<div class="hero__stat" style="--stat-accent:var(--emerald)">' +
          '<div class="hero__stat-num" data-count="2020"><span class="cn">2020</span></div>' +
          '<div class="hero__stat-lbl">Established</div>' +
          '<div class="hero__stat-dot"></div>' +
        '</div>' +
        '<div class="hero__stat" style="--stat-accent:var(--saffron)">' +
          '<div class="hero__stat-num"><span class="cn" data-count="6">0</span><em>days/wk</em></div>' +
          '<div class="hero__stat-lbl">Mon–Sat</div>' +
          '<div class="hero__stat-dot"></div>' +
        '</div>' +
        '<div class="hero__stat" style="--stat-accent:var(--plum)">' +
          '<div class="hero__stat-num"><span class="cn" data-count="12">0</span><em>hrs/day</em></div>' +
          '<div class="hero__stat-lbl">9 AM – 9 PM</div>' +
          '<div class="hero__stat-dot"></div>' +
        '</div>' +
        '<div class="hero__stat" style="--stat-accent:var(--teal)">' +
          '<div class="hero__stat-num"><span class="cn" data-count="4">0</span><em>practices</em></div>' +
          '<div class="hero__stat-lbl">Tax · GST · Reg · Acc</div>' +
          '<div class="hero__stat-dot"></div>' +
        '</div>';
      trust.parentNode.insertBefore(stats, trust.nextSibling);
    }
  });

  // ============================================================
  // 2b. Founder section: inject aurora background
  // ============================================================
  function injectFounderAurora(){
    var f = document.getElementById('founder');
    if (!f) return false;
    if (f.querySelector(':scope > .aurora')) return true;
    var aurora = document.createElement('div');
    aurora.className = 'aurora';
    // Explicit positioning + z-index so it sits under content
    aurora.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;';
    aurora.innerHTML = '<div class="aurora__layer aurora__layer--a"></div><div class="aurora__layer aurora__layer--b"></div>';
    // Ensure section positions properly (styles.css already sets .section--dark to relative)
    if (getComputedStyle(f).position === 'static') f.style.position = 'relative';
    // Prepend puts it at the top of the section, before .wrap
    f.prepend(aurora);
    // Ensure the .wrap content stacks above
    var wrap = f.querySelector('.wrap');
    if (wrap && getComputedStyle(wrap).position === 'static'){
      wrap.style.position = 'relative';
      wrap.style.zIndex = '1';
    }
    return true;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFounderAurora);
  } else {
    injectFounderAurora();
  }

  // ============================================================
  // 3. Count-up animation on stat scroll-in
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    var nodes = document.querySelectorAll('.cn[data-count]');
    if (!nodes.length) return;

    function animate(node){
      var target = parseInt(node.getAttribute('data-count'), 10) || 0;
      var isYear = target >= 1900;
      var start = isYear ? Math.max(1980, target - 40) : 0;
      var dur = isYear ? 1400 : 900;
      var startTime = null;
      if (reduceMotion){ node.textContent = target; return; }
      function step(t){
        if (!startTime) startTime = t;
        var p = Math.min(1, (t - startTime) / dur);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - p, 3);
        var v = Math.round(start + (target - start) * eased);
        node.textContent = v;
        if (p < 1) requestAnimationFrame(step);
        else node.textContent = target;
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ animate(e.target); io.unobserve(e.target); }
      });
    }, {threshold:.4});
    nodes.forEach(function(n){ io.observe(n); });
  });

  // ============================================================
  // 4. Marquee: add a reverse row + color chips
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    var band = document.querySelector('.marquee-band');
    if (!band) return;
    var original = band.querySelector('.marquee');
    if (!original) return;

    // Turn a few items in the first row into colored chips
    var items = original.querySelectorAll('.marquee__item');
    var colors = ['c-saffron','c-plum','c-teal','c-emerald'];
    // Pick indices deterministically — one chip per every 4 items
    items.forEach(function(it, i){
      if (i % 4 === 2){
        it.classList.add('is-chip', colors[(i / 4) % colors.length]);
      }
    });

    // Create a mirrored reverse row with different content
    if (!band.querySelector('.marquee--b')){
      var b = document.createElement('div');
      b.className = 'marquee marquee--b';
      var terms = [
        'ITR-1', 'ITR-2', 'ITR-3', 'ITR-4',
        'GSTR-1', 'GSTR-3B', 'GSTR-9',
        'Pvt Ltd', 'LLP', 'OPC', 'Partnership',
        'MSME', 'Udyam', 'FSSAI', 'DSC',
        'Form 16', 'HRA', '80C', '80D', 'NPS'
      ];
      var seq = terms.concat(terms); // duplicate for seamless loop
      var track = document.createElement('div');
      track.className = 'marquee__track marquee__track--reverse';
      seq.forEach(function(t, i){
        var span = document.createElement('span');
        span.className = 'marquee__item';
        span.innerHTML = '<em>' + t + '</em>';
        track.appendChild(span);
        if (i < seq.length - 1){
          var sep = document.createElement('span');
          sep.className = 'marquee__sep';
          sep.textContent = '✦';
          track.appendChild(sep);
        }
      });
      b.appendChild(track);
      band.querySelector('.wrap, .marquee').parentNode.appendChild(b);
    }
  });

  // ============================================================
  // 5. How It Works: gradient progress rail follows scroll
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    var steps = document.querySelector('.steps');
    if (!steps) return;
    // add is-in class when the container enters view (unlocks the rail)
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting) { steps.classList.add('is-in'); io.disconnect(); }
        });
      }, {threshold:.15});
      io.observe(steps);
    } else {
      steps.classList.add('is-in');
    }

    if (reduceMotion) { steps.style.setProperty('--sp', 1); return; }

    var ticking = false;
    function update(){
      var r = steps.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      // start filling when top hits 80% viewport, complete when bottom hits 30%
      var start = vh * 0.8;
      var end   = vh * 0.3;
      var p = (start - r.top) / (start - end + r.height);
      p = Math.max(0, Math.min(1, p));
      steps.style.setProperty('--sp', p.toFixed(4));
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if (!ticking){ requestAnimationFrame(update); ticking = true; }
    }, {passive:true});
    window.addEventListener('resize', update);
    update();
  });

  // ============================================================
  // 6. Docs panel: color-swap accent + soft opacity swap
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    var opts = document.querySelectorAll('.docs__opt');
    var panel = document.getElementById('docs-panel');
    opts.forEach(function(o){
      o.addEventListener('click', function(){
        if (!panel) return;
        panel.classList.add('is-swapping');
        setTimeout(function(){ panel.classList.remove('is-swapping'); }, 180);
      });
    });
  });

  // ============================================================
  // 7. Finder items: assign accent colors after render
  // ============================================================
  (function(){
    // Watch for panel changes — re-tint items each render
    var panel = document.getElementById('finder-panel');
    if (!panel) return;

    function tint(){
      var items = panel.querySelectorAll('.finder__item');
      items.forEach(function(it, i){
        it.setAttribute('data-c', String(i % 6));
      });
    }

    // Initial
    tint();

    // Observe innerHTML changes from renderFinder()
    if ('MutationObserver' in window){
      var mo = new MutationObserver(function(){ tint(); });
      mo.observe(panel, { childList:true, subtree:false });
    }
  })();

  // ============================================================
  // 8. Star index tracking (for staggered testimonial star anim)
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.review__stars').forEach(function(row){
      Array.prototype.forEach.call(row.children, function(star, i){
        star.style.setProperty('--i', i);
      });
    });
  });

  // ============================================================
  // 9. Gborder class for cards (delegated hover already handles paint,
  //    but for the always-on consult form + service cards we add class)
  // ============================================================
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.svc, .why__cell, .step').forEach(function(c){
      c.classList.add('gborder');
    });
  });

})();
