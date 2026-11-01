/* ============================================================
   EASY SETTINGS — edit these values
   ============================================================ */
var CONFIG = {
  // Words that type out after "I'm a" in the hero
  typingRoles: ['Full Stack Developer', 'Software Engineer', 'Backend Developer', 'Web Developer'],
  // Shown if the contact form can't send
  email: 'bimashajayy@gmail.com'
};

/* ---------- site behaviour (no need to edit below) ---------- */
(function() {
  var root = document.documentElement,
    mq = matchMedia('(prefers-color-scheme: dark)'),
    tb = document.getElementById('theme-toggle');

  function dark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : mq.matches
  }

  function paint() {
    document.body.classList.toggle('is-dark', dark());
    tb.setAttribute('aria-label', dark() ? 'Switch to light mode' : 'Switch to dark mode')
  }
  try {
    var s = localStorage.getItem('bj-theme');
    if (s) root.setAttribute('data-theme', s)
  } catch (e) {}
  paint();
  if (mq.addEventListener) mq.addEventListener('change', paint);
  tb.addEventListener('click', function() {
    var n = dark() ? 'light' : 'dark';
    root.setAttribute('data-theme', n);
    try {
      localStorage.setItem('bj-theme', n)
    } catch (e) {}
    paint()
  });

  var roles = CONFIG.typingRoles,
    ri = 0,
    el = document.getElementById('rot');
  if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var txt = roles[0],
      del = false;
    (function tick() {
      if (!del) {
        if (el.textContent.length < txt.length) {
          el.textContent = txt.slice(0, el.textContent.length + 1);
          return setTimeout(tick, 70)
        }
        del = true;
        return setTimeout(tick, 1800)
      }
      if (el.textContent.length > 0) {
        el.textContent = el.textContent.slice(0, -1);
        return setTimeout(tick, 35)
      }
      del = false;
      ri = (ri + 1) % roles.length;
      txt = roles[ri];
      setTimeout(tick, 250);
    })();
  }

  var form = document.getElementById('contact-form'),
    st = document.getElementById('f-status'),
    sb = document.getElementById('f-send');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var body = new URLSearchParams(new FormData(form)).toString();
    sb.disabled = true;
    st.className = 'ct-status';
    st.textContent = 'Sending…';
    fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
      })
      .then(function(r) {
        if (!r.ok) throw 0;
        st.className = 'ct-status ok';
        st.textContent = 'Thanks! Your message was sent.';
        form.reset()
      })
      .catch(function() {
        st.className = 'ct-status err';
        st.textContent = "Couldn't send. Please email " + CONFIG.email + " instead."
      })
      .then(function() {
        sb.disabled = false
      });
  });

  document.querySelectorAll('[data-copy]').forEach(function(b) {
    b.addEventListener('click', function() {
      var t = document.getElementById(b.dataset.copy);
      var done = function() {
        b.textContent = 'Copied';
        setTimeout(function() {
          b.textContent = 'Copy'
        }, 1600)
      };
      var fb = function() {
        var r = document.createRange();
        r.selectNodeContents(t);
        var s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        b.textContent = 'Selected'
      };
      try {
        navigator.clipboard.writeText(t.textContent).then(done, fb)
      } catch (e) {
        fb()
      }
    });
  });
/* ---------- scroll animations: each section has its own motion ---------- */
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    // [selector, animation, stagger seconds between siblings]
    var plan = [
      ['.head', 'up', 0],
      ['.process .pstep', 'pop', .1],
      ['.orbit-band', 'zoom', 0],
      ['.layers li', 'left', .14],
      ['.bento .cell', 'pop', .09],
      ['.exp-side', 'left', 0],
      ['.exp-main', 'right', .1],
      ['.exp-main li', 'flip', .12],
      ['.feature:not(.flip) .shot', 'left', 0],
      ['.feature:not(.flip) > div:not(.shot)', 'right', .12],
      ['.feature.flip .shot', 'right', 0],
      ['.feature.flip > div:not(.shot)', 'left', .12],
      ['.cards .card', 'tilt', .11],
      ['.step', 'up', .18],
      ['.school', 'up', 0],
      ['.certs', 'up', 0],
      ['.ct-info .ct-card', 'left', .11],
      ['.ct-form', 'right', .15]
    ];
    var io = new IntersectionObserver(function(es) {
      es.forEach(function(e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        el.classList.remove('pre', 'line-pre');
        setTimeout(function() {
          el.classList.remove('rv');
          el.style.removeProperty('--rd')
        }, 1600);
      })
    }, {
      threshold: .15,
      rootMargin: '0px 0px -8% 0px'
    });
    var below = function(el) {
      return el.getBoundingClientRect().top > innerHeight * .92
    };
    plan.forEach(function(p) {
      var seen = new Map();
      document.querySelectorAll(p[0]).forEach(function(el) {
        if (!below(el)) return;
        var n = seen.get(el.parentNode) || 0;
        seen.set(el.parentNode, n + 1);
        el.dataset.a = p[1];
        el.style.setProperty('--rd', Math.min(n * p[2], .9) + 's');
        el.classList.add('rv', 'pre');
        io.observe(el);
      });
    });
    document.querySelectorAll('.path').forEach(function(el) {
      if (below(el)) {
        el.classList.add('line-pre');
        io.observe(el)
      }
    });
  }
  
  /* ---------- skills spotlight + project card tilt (mouse only) ---------- */
  if (!reduce && matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.band-skills .cell').forEach(function(c) {
      c.addEventListener('pointermove', function(e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px')
      });
    });
    document.querySelectorAll('.cards .card:not(.gh)').forEach(function(c) {
      c.addEventListener('pointermove', function(e) {
        var r = c.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - .5,
          y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = 'perspective(900px) rotateX(' + (-y * 7) + 'deg) rotateY(' + (x * 9) + 'deg) translateY(-6px)'
      });
      c.addEventListener('pointerleave', function() {
        c.style.transform = ''
      });
    });
  }

  /* ---------- hero name: split into letters that bounce in ---------- */
  var h1 = document.querySelector('.hero h1');
  if (h1 && !reduce) {
    var n = 0;
    h1.setAttribute('aria-label', h1.textContent);
    [].slice.call(h1.childNodes).forEach(function(node) {
      var isDot = node.nodeType === 1,
        frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function(word) {
        if (!word) return;
        if (/^\s+$/.test(word)) return frag.appendChild(document.createTextNode(word));
        var w = document.createElement('span');
        w.className = 'w' + (isDot ? ' dot' : '');
        w.setAttribute('aria-hidden', 'true');
        word.split('').forEach(function(c) {
          var s = document.createElement('span');
          s.className = 'ch';
          s.style.setProperty('--i', n++);
          s.textContent = c;
          w.appendChild(s)
        });
        frag.appendChild(w)
      });
      h1.replaceChild(frag, node)
    });
  }

  /* ---------- hero particle network (reacts to the mouse) ---------- */
  var cv = document.querySelector('.hero-fx');
  if (cv && cv.getContext && !reduce) {
    var ctx = cv.getContext('2d'),
      hero = cv.parentNode,
      pts = [],
      W = 0,
      H = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2),
      mouse = { x: -999, y: -999 },
      onScreen = true;

    var size = function() {
      var r = hero.getBoundingClientRect();
      if (Math.abs(r.width - W) < 2 && pts.length) return;
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (var i = 0, c = Math.round(Math.min(70, W * H / 11000)); i < c; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.6 + .8 })
      }
    };
    size();
    addEventListener('resize', size);
    hero.addEventListener('pointermove', function(e) {
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top
    });
    hero.addEventListener('pointerleave', function() {
      mouse.x = mouse.y = -999
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(function(es) {
      onScreen = es[0].isIntersecting
    }).observe(hero);

    (function frame() {
      requestAnimationFrame(frame);
      if (!onScreen) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        var mdx = p.x - mouse.x,
          mdy = p.y - mouse.y,
          md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 170 && md > 0) {
          ctx.strokeStyle = 'rgba(240,185,70,' + (1 - md / 170) * .75 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          p.x += mdx / md * .6;
          p.y += mdy / md * .6
        }
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j],
            dx = p.x - q.x,
            dy = p.y - q.y,
            d = dx * dx + dy * dy;
          if (d < 13000) {
            ctx.strokeStyle = 'rgba(255,255,255,' + (1 - d / 13000) * .22 + ')';
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke()
          }
        }
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill()
      }
    })();
  }

  /* ---------- mouse-only extras: portrait tilt, cursor ring, magnetic buttons ---------- */
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var heroEl = document.querySelector('.hero'),
      por = document.querySelector('.portrait');
    if (heroEl && por) {
      heroEl.addEventListener('pointermove', function(e) {
        var r = heroEl.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - .5,
          y = (e.clientY - r.top) / r.height - .5;
        por.style.transform = 'perspective(1000px) rotateY(' + x * 14 + 'deg) rotateX(' + -y * 14 + 'deg)'
      });
      heroEl.addEventListener('pointerleave', function() {
        por.style.transform = ''
      });
    }

    var dot = document.createElement('div'),
      ring = document.createElement('div'),
      cx = -100,
      cy = -100,
      rx = -100,
      ry = -100;
    dot.className = 'cur-dot';
    ring.className = 'cur-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    addEventListener('pointermove', function(e) {
      cx = e.clientX;
      cy = e.clientY;
      dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      document.body.classList.add('cur-on')
    });
    document.addEventListener('mouseleave', function() {
      document.body.classList.remove('cur-on')
    });
    document.addEventListener('pointerover', function(e) {
      ring.classList.toggle('big', !!e.target.closest('a, button, input, textarea, .card, .cell'))
    });
    (function follow() {
      rx += (cx - rx) * .18;
      ry += (cy - ry) * .18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(follow)
    })();

    document.querySelectorAll('.btn, .socials a, .ct-soc a').forEach(function(b) {
      b.addEventListener('pointermove', function(e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * .3 + 'px,' + (e.clientY - r.top - r.height / 2) * .4 + 'px)'
      });
      b.addEventListener('pointerleave', function() {
        b.style.transform = ''
      });
    });
  }

  /* ---------- progress bar + active menu link ---------- */
  var bar = document.querySelector('.progress'),
    navEl = document.querySelector('nav'),
    totop = document.querySelector('.totop'),
    ttProg = document.querySelector('.tt-prog'),
    links = [].slice.call(document.querySelectorAll('.menu a'));
  var secs = links.map(function(a) {
    return document.querySelector(a.getAttribute('href'))
  });
  
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight;
    var p = h > 0 ? scrollY / h : 0;
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
    if (navEl) navEl.classList.toggle('scrolled', scrollY > 10);
    if (totop) totop.classList.toggle('show', scrollY > 600);
    if (ttProg) ttProg.style.strokeDashoffset = 132 * (1 - p);
    var cur = -1;
    secs.forEach(function(s, i) {
      if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i
    });
    links.forEach(function(a, i) {
      a.classList.toggle('active', i === cur)
    });
  }
  addEventListener('scroll', onScroll, {
    passive: true
  });
  onScroll();
})();
