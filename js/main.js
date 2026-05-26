// ========== 加载动画 ==========
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  // 模拟加载完成
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.add('loaded');
    initParticles();
  }, 1800);
});

// ========== 粒子背景 ==========
function initParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  const particleCount = 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // 随机位置
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // 随机大小
    const size = Math.random() * 2 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // 随机动画延迟
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';

    // 随机透明度
    particle.style.opacity = Math.random() * 0.2 + 0.1;

    particlesContainer.appendChild(particle);
  }
}

// ========== 导航栏滚动效果 ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // 添加/移除 scrolled 类
  navbar.classList.toggle('scrolled', currentScroll > 50);

  // 导航栏隐藏/显示
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  navbar.style.transition = 'transform 0.3s var(--ease-out)';

  lastScroll = currentScroll;
});

// ========== 移动端菜单切换 ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// 点击菜单链接后关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========== 导航高亮当前板块 ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollY = window.scrollY + 200;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ========== 滚动显示动画 ==========
const revealElements = document.querySelectorAll('.role-card, .timeline-item, .project-card, .tool-category, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// 为元素添加交错动画延迟
const staggerElements = document.querySelectorAll('.role-card, .timeline-item, .project-card, .tool-category');
staggerElements.forEach((el, index) => {
  const parent = el.parentElement;
  const siblings = Array.from(parent.children);
  const siblingIndex = siblings.indexOf(el);
  el.style.transitionDelay = `${siblingIndex * 0.1}s`;
});

// ========== 平滑滚动 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== 视差效果（仅桌面端） ==========
if (window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Hero 背景视差
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // 粒子视差
    const particles = document.querySelector('.particles');
    if (particles) {
      particles.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
}

// ========== 图片懒加载 ==========
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// ========== 数字递增动画 ==========
function animateNumbers() {
  const numbers = document.querySelectorAll('.stat-number');

  numbers.forEach(number => {
    const text = number.textContent;
    const hasPlus = text.includes('+');
    const target = parseInt(text);

    if (isNaN(target)) return;

    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      number.textContent = hasPlus ? current + '+' : current;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        number.textContent = text;
      }
    }

    requestAnimationFrame(updateNumber);
  });
}

// 当统计区域可见时触发动画
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(animateNumbers, 300);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

// ========== 鼠标跟随效果（仅桌面端） ==========
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      width: 32px;
      height: 32px;
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, opacity 0.15s ease, width 0.3s ease, height 0.3s ease;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    }

    .cursor-dot {
      width: 4px;
      height: 4px;
      background: var(--color-accent);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    }

    .custom-cursor.hover {
      width: 48px;
      height: 48px;
      border-color: rgba(0, 255, 136, 0.3);
    }

    .cursor-dot.hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    .custom-cursor.clicking {
      transform: translate(-50%, -50%) scale(0.9);
    }
  `;
  document.head.appendChild(style);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 立即更新小点位置
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // 悬停效果
  const hoverElements = document.querySelectorAll('a, button, .project-card, .role-card, .tool-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });

  // 点击效果
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });
}

// ========== 滚动进度条 ==========
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

const progressStyle = document.createElement('style');
progressStyle.textContent = `
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--color-gradient-1);
    z-index: 10001;
    transition: width 0.1s ease;
  }
`;
document.head.appendChild(progressStyle);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ========== 卡片倾斜效果 ==========
if (window.innerWidth > 768) {
  const cards = document.querySelectorAll('.role-card, .project-card, .tool-category');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ========== 文字渐显动画 ==========
function animateTextOnScroll() {
  const textElements = document.querySelectorAll('.about-text, .timeline-desc, .project-desc, .role-desc, .skill-desc');

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        textObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  textElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out)';
    textObserver.observe(el);
  });
}

// 页面加载后初始化文字动画
window.addEventListener('load', () => {
  setTimeout(animateTextOnScroll, 500);
});

// ========== 滚动时元素发光效果 ==========
function addGlowOnScroll() {
  const glowElements = document.querySelectorAll('.section-title, .name-cn, .contact-heading');

  const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.2)';
        setTimeout(() => {
          entry.target.style.textShadow = 'none';
        }, 800);
        glowObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  glowElements.forEach(el => {
    el.style.transition = 'text-shadow 0.5s ease';
    glowObserver.observe(el);
  });
}

// 页面加载后初始化发光效果
window.addEventListener('load', () => {
  setTimeout(addGlowOnScroll, 1000);
});

console.log('孙子童个人网站已加载完成 - 增强版');
