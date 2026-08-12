// ================= LENIS SMOOTH SCROLL =================
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if(targetId === '#') {
            lenis.scrollTo(0, { duration: 3.5, easing: (t) => 1 - Math.pow(1 - t, 4) }); 
        } else {
            const targetElement = document.querySelector(targetId);
            if(targetElement) { lenis.scrollTo(targetElement, { duration: 3.5, easing: (t) => 1 - Math.pow(1 - t, 4) }); }
        }
    });
});

// ================= ANIMATION: DEV FULL-STACK =================
const devDescText = document.getElementById("dev-desc-text");
const devWords = devDescText.innerText.split(" ");
devDescText.innerHTML = "";
devWords.forEach(word => { devDescText.innerHTML += `<span class="scrub-dev-word">${word}</span> `; });

const tlDev = gsap.timeline({
    scrollTrigger: { 
        trigger: "#dev-pin", 
        start: "top top", 
        end: "+=200%", 
        pin: true, 
        scrub: 2
    }
});

tlDev.to(".scrub-dev-word", { opacity: 1, stagger: 0.1, ease: "none" })
     .to(".dev-btn-group", { opacity: 1, duration: 0.5 }, "-=0.2")
     .from(".falling-card", { 
         y: -800, 
         opacity: 0, 
         rotation: () => Math.random() * 30 - 15, 
         duration: 3,  
         stagger: 0.4, 
         ease: "power3.out"
     }, "-=0.5");

// ================= ANIMATION: SOBRE MIM MODERNISTA =================
gsap.set(".img-col", { yPercent: 100 });
gsap.set(".sobre-text-content", { y: 150, opacity: 0 }); 
gsap.set(".sobre-extra-photo", { yPercent: 100 }); 

let mm = gsap.matchMedia();

mm.add("(min-width: 901px)", () => {
    ScrollTrigger.create({
        trigger: "#sobre-modern-pin",
        start: "top 80%", 
        onEnter: () => {
            gsap.to(".img-col", { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" });
        }
    });

    const tlSobre = gsap.timeline({
        scrollTrigger: {
            trigger: "#sobre-modern-pin",
            start: "top top",
            end: "+=800%", 
            pin: true,
            scrub: 1 
        }
    });

    tlSobre.to(".img-col-3", { x: "-6.666vw", width: "40vw", duration: 1, ease: "power3.inOut" }, "collapse")
           .to(".img-col-2", { x: "26.666vw", width: "40vw", duration: 1, ease: "power3.inOut" }, "collapse+=0.1")
           .to(".img-col-1", { x: "60vw", width: "40vw", duration: 1, ease: "power3.inOut" }, "collapse+=0.2")
           .to(".sobre-text-content", { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "collapse+=0.5")
           .to(".sobre-extra-photo", { 
               yPercent: 0, 
               stagger: 1.5, 
               duration: 1.5, 
               ease: "power2.inOut" 
           }, "collapse+=1.8");
});

mm.add("(max-width: 900px)", () => {
    ScrollTrigger.create({
        trigger: "#sobre-modern-pin",
        start: "top 80%",
        onEnter: () => {
            gsap.to(".img-col-1", { yPercent: 0, duration: 1.2, ease: "power4.out" });
        }
    });

    const tlSobreMob = gsap.timeline({
        scrollTrigger: {
            trigger: "#sobre-modern-pin",
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1
        }
    });
    tlSobreMob.to(".sobre-text-content", { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
              .to(".sobre-extra-photo", { 
                  yPercent: 0, 
                  stagger: 1.5, 
                  duration: 1.5, 
                  ease: "power2.inOut" 
              });
});

// ================= ANIMATION: REVEAL GERAL =================
const revealElements = gsap.utils.toArray('.reveal');
revealElements.forEach((elem) => {
    gsap.to(elem, { scrollTrigger: { trigger: elem, start: "top 85%", toggleActions: "play none none reverse" }, y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
});

gsap.to(".timeline-progress", {
    scrollTrigger: { trigger: ".timeline", start: "top center", end: "bottom center", scrub: 1 }, height: "100%", ease: "none"
});

const timelineItems = gsap.utils.toArray('.timeline-item');
timelineItems.forEach((item, index) => {
    const content = item.querySelector('.timeline-content');
    const dot = item.querySelector('.timeline-dot');
    let xOffset = index % 2 === 0 ? -50 : 50; 
    if (window.innerWidth <= 900) xOffset = 50; 

    gsap.fromTo(content, { opacity: 0, x: xOffset }, { scrollTrigger: { trigger: item, start: "top 75%", toggleActions: "play none none reverse" }, opacity: 1, x: 0, duration: 0.8, ease: "power2.out" });
    gsap.fromTo(dot, { opacity: 0, scale: 0 }, { scrollTrigger: { trigger: item, start: "top 75%", toggleActions: "play none none reverse" }, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
});

// ================= ANIMATION: TEXTO DE CONTATO =================
gsap.to(".scrub-contact", {
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",     
        end: "center 50%",    
        scrub: 1              
    },
    opacity: 1,
    stagger: 0.1,
    ease: "none"
});

// ================= IMAGE MODAL (LIGHTBOX) =================
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".modal-close");
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach(item => {
    item.addEventListener("click", function() {
        const img = this.querySelector("img");
        const title = this.querySelector("h3").innerText;
        
        modal.style.display = "flex";
        setTimeout(() => modal.classList.add("show"), 10); 
        
        modalImg.src = img.src;
        captionText.innerHTML = title;
        
        lenis.stop();
    });
});

function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
        lenis.start(); 
    }, 400); 
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", function(e) {
    if (e.target !== modalImg) {
        closeModal();
    }
});