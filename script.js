document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const q1Trigger = document.getElementById("q1-trigger");
    if (q1Trigger) {
        q1Trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const menu = q1Trigger.parentElement.querySelector(".dropdown-menu");
            if (menu) menu.style.display = menu.style.display === "block" ? "none" : "block";
        });
    }
});

// === IntersectionObserver Scroll Reveal ===
document.addEventListener("DOMContentLoaded", () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
        // 无动效或不支持：直接显示
        document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => {
            el.classList.add("is-visible");
        });
        return;
    }

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target); // 只触发一次
            }
        });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => io.observe(el));
});


// ==== 下拉菜单逻辑：延迟消失 + 动画 ====
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".nav-item.dropdown");
    const menu = dropdown.querySelector(".dropdown-menu");

    let hideTimeout = null;

    // 鼠标进入时显示菜单
    dropdown.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        menu.classList.add("open");
    });

    // 鼠标离开时延迟关闭 0.5 秒
    dropdown.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            menu.classList.remove("open");
        }, 500);
    });

    // 确保菜单内部悬停时不会意外关闭
    menu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
    menu.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            menu.classList.remove("open");
        }, 500);
    });

    // 点击触屏兼容：点击 Q1 打开/关闭
    const q1Trigger = document.getElementById("q1-trigger");
    q1Trigger.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.toggle("open");
    });
});

// ==== 下拉菜单逻辑：支持多个菜单的延迟消失 + 动画 ====
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown");

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector(".dropdown-menu");
        let hideTimeout = null;

        // 鼠标进入时显示菜单
        dropdown.addEventListener("mouseenter", () => {
            clearTimeout(hideTimeout);
            menu.classList.add("open");
        });

        // 鼠标离开时延迟关闭 0.5 秒
        dropdown.addEventListener("mouseleave", () => {
            hideTimeout = setTimeout(() => {
                menu.classList.remove("open");
            }, 500);
        });

        // 确保菜单内部悬停时不会意外关闭
        menu.addEventListener("mouseenter", () => clearTimeout(hideTimeout));
        menu.addEventListener("mouseleave", () => {
            hideTimeout = setTimeout(() => {
                menu.classList.remove("open");
            }, 500);
        });

        // 点击触屏兼容：点击主菜单项打开/关闭对应的下拉
        const trigger = dropdown.querySelector("a.no-click");
        if (trigger) {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                menu.classList.toggle("open");
            });
        }
    });
});