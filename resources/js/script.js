// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate the box when it comes into view
gsap.from(".cookie-2", {
  y: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".cookie-2",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
