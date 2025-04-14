document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector('.hero-main');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Remove observer if you want the animation to run only once
      }
    });
  }, { threshold: 0.1 });

  if (heroSection) {
    observer.observe(heroSection);
  }
});

// wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  const showDivs = document.querySelectorAll(".show-div");

  const options = {
    threshold: 0.2 // trigger when 20% visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        // activate title first
        if(entry.target.classList.contains("title")){
          entry.target.classList.add("active");

          // delay observing show-divs slightly after title animates in
          setTimeout(() => {
            showDivs.forEach((div, index) => {
              setTimeout(() => {
                div.classList.add("active");
              }, index * 300); // stagger effect 300ms between each
            });
          }, 500); // 500ms delay after title animates
        }
        observer.unobserve(entry.target); // stop observing once active
      }
    });
  }, options);

  // observe title
  observer.observe(title);
});
// Select elements
const fourthDiv = document.querySelector(".fourth-div");
const title = fourthDiv.querySelector(".title");
const showDivs = fourthDiv.querySelectorAll(".show-div");

// Intersection Observer setup
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class to container
        fourthDiv.classList.add("active");

        // Animate title
        title.style.transitionDelay = "0.2s";

        // Animate show-divs one after another
        showDivs.forEach((div, index) => {
          div.style.transitionDelay = `${0.4 + index * 0.3}s`;
        });

        // Stop observing once done
        observer.unobserve(fourthDiv);
      }
    });
  },
  { threshold: 0.2 }
);

// Start observing
observer.observe(fourthDiv);


document.addEventListener("DOMContentLoaded", () => {
  const fifthDiv = document.querySelector(".fifth-div");
  const leftBtn = fifthDiv.querySelector('.left-div .left');
  const rightBtn = fifthDiv.querySelector('.left-div .right');
  const bodies = fifthDiv.querySelectorAll('.left-div .body');
  let current = 0;
  let intervalId;

  // Update active slide
  function updateCarousel(index) {
    bodies.forEach((body, i) => {
      body.classList.remove('active');
      if (i === index) body.classList.add('active');
    });
  }

  // Button navigation
  if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
      current = (current - 1 + bodies.length) % bodies.length;
      updateCarousel(current);
    });

    rightBtn.addEventListener('click', () => {
      current = (current + 1) % bodies.length;
      updateCarousel(current);
    });
  }

  // Function to start the auto-slide
  function startAutoSlide() {
    if (!intervalId) { // Only start if not already running
      intervalId = setInterval(() => {
        current = (current + 1) % bodies.length;
        updateCarousel(current);
      }, 5000);
    }
  }

  // Stop auto-slide
  function stopAutoSlide() {
    clearInterval(intervalId);
    intervalId = null;
  }

  // Intersection Observer for .fifth-div
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAutoSlide();
        runFifthDivAnimations(); // optional: trigger other animations
      } else {
        stopAutoSlide();
      }
    });
  }, { threshold: 0.3 }); // trigger when 30% visible

  observer.observe(fifthDiv);

  // Optional animation trigger for other parts inside fifth-div
  function runFifthDivAnimations() {
    const leftHeader = fifthDiv.querySelector('.left-div .header');
    const rightDiv = fifthDiv.querySelector('.right-div');
    const bodies = fifthDiv.querySelectorAll('.left-div .body');

    leftHeader.classList.add('animate-slide-up');
    setTimeout(() => {
      rightDiv.classList.add('animate-slide-up');
    }, 200);
    bodies.forEach((body, i) => {
      setTimeout(() => {
        body.classList.add('animate-slide-up');
      }, 300 + i * 150);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector('.carousel1-inner');
  const items = document.querySelectorAll('.carousel1-item');
  let currentIndex = 0;
  const totalItems = items.length;
  const intervalDuration = 2000; // Active class shifts every 2000ms

  // Center the active item by translating the inner container.
  function centerActive() {
    const activeItem = items[currentIndex];
    const carouselWidth = document.querySelector('.carousel1').offsetWidth;
    // Calculate the offset: item offsetLeft - half the carousel width + half item width
    const leftOffset = activeItem.offsetLeft - (carouselWidth / 2) + (activeItem.offsetWidth / 2);
    carouselInner.style.transform = `translateX(-${leftOffset}px)`;
  }
  
  // Center the first (initially active) item on load
  centerActive();
  
  function nextSlide() {
    // Remove the active class from the current item
    items[currentIndex].classList.remove("active");
    // Advance to the next index, looping back to zero at the end
    currentIndex = (currentIndex + 1) % totalItems;
    // Add the active class to the new item
    items[currentIndex].classList.add("active");
    // Center the new active item
    centerActive();
  }
  
  // Shift slides on an interval
  setInterval(nextSlide, intervalDuration);
  
  // Re-center the active slide on window resize
  window.addEventListener("resize", centerActive);
});

document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(".sixth-div .carousel1-inner");
  const originalItems = document.querySelectorAll(".sixth-div .carousel1-item");
  const itemWidth = originalItems[0].offsetWidth + 42; // Include gap between items
  const itemsInView = 5; // Number of items visible in the carousel
  const cloneCount = 2; // Number of times items are cloned for infinite scrolling
  let allItems = [...originalItems]; // Array to hold all items (original + cloned)
  let currentIndex = 0; // Index of the currently active item

  // Set carousel width based on the number of items in view
  carouselInner.style.width = `${itemWidth * itemsInView}px`;

  // Clone items to create an infinite loop effect
  function cloneItems() {
    for (let c = 0; c < cloneCount; c++) {
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true); // Clone the item
        carouselInner.appendChild(clone); // Append the clone to the carousel
        allItems.push(clone); // Add the clone to the allItems array
      });
    }
  }
  cloneItems();

  // Update the active class for the current item
  function updateActiveItem(index) {
    allItems.forEach((item, i) => {
      item.classList.toggle("active", i === index); // Add 'active' class to the current item
    });
  }

  // Center the active item in the carousel
  function centerActiveItem() {
    const activeItem = allItems[currentIndex];
    const leftOffset =
      activeItem.offsetLeft - window.innerWidth / 2 + activeItem.offsetWidth / 2;
    carouselInner.style.transition = "transform 0.5s ease-in-out"; // Smooth transition
    carouselInner.style.transform = `translateX(-${leftOffset}px)`; // Center the active item
  }

  // Move to the next item in the carousel
  function moveToNextItem() {
    currentIndex = (currentIndex + 1) % allItems.length; // Increment index and loop back if necessary
    updateActiveItem(currentIndex);
    centerActiveItem();
  }

  // Reset the carousel for infinite scrolling
  function resetCarousel() {
    if (currentIndex >= allItems.length - originalItems.length) {
      carouselInner.style.transition = "none"; // Disable transition for instant reset
      currentIndex = 0; // Reset index to the first item
      centerActiveItem();
      setTimeout(() => {
        carouselInner.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
      }, 50);
    }
  }

  // Automatically move the carousel at regular intervals
  const autoMoveInterval = setInterval(() => {
    moveToNextItem();
    resetCarousel();
  }, 2000); // Move every 2 seconds

  // Adjust carousel on window resize
  window.addEventListener("resize", () => {
    carouselInner.style.width = `${itemWidth * itemsInView}px`; // Recalculate width
    centerActiveItem(); // Re-center the active item
  });

  // Handle swipe gestures for touch devices
  let startX = 0;
  let isDragging = false;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX; // Record the starting touch position
    isDragging = true;
    carouselInner.style.transition = "none"; // Disable transition during drag
  }

  function handleTouchMove(event) {
    if (!isDragging) return;
    const currentX = event.touches[0].clientX;
    const translateX = currentX - startX;
    carouselInner.style.transform = `translateX(${translateX}px)`; // Move carousel based on touch
  }

  function handleTouchEnd() {
    isDragging = false;
    const movedBy = carouselInner.style.transform.match(/-?\d+/)[0]; // Extract translateX value
    if (movedBy < -50 && currentIndex < allItems.length - 1) {
      moveToNextItem(); // Swipe left
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex--; // Swipe right
      updateActiveItem(currentIndex);
      centerActiveItem();
    } else {
      centerActiveItem(); // Snap back to the current item
    }
  }

  // Add event listeners for touch gestures
  carouselInner.addEventListener("touchstart", handleTouchStart);
  carouselInner.addEventListener("touchmove", handleTouchMove);
  carouselInner.addEventListener("touchend", handleTouchEnd);

  // Initialize the first active item
  updateActiveItem(currentIndex);
  centerActiveItem();
});

window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    setCarouselWidth();
    centerActiveItem();
  }, 200);
});

const items = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");

let currentIndex = 0;

function showSlide(index) {
  items.forEach((item, i) => {
    item.classList.remove("active", "text-slide-in");
    indicators[i].classList.remove("active");
    if (i === index) {
      item.classList.add("active");
      // trigger reflow to restart animation
      void item.offsetWidth;
      item.classList.add("text-slide-in");
      indicators[i].classList.add("active");
    }
  });
  currentIndex = index;
}

prevBtn.addEventListener("click", () => {
  const newIndex = (currentIndex - 1 + items.length) % items.length;
  showSlide(newIndex);
});

nextBtn.addEventListener("click", () => {
  const newIndex = (currentIndex + 1) % items.length;
  showSlide(newIndex);
});

indicators.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    showSlide(i);
  });
});

// Optional: auto-initialize animations on load
showSlide(currentIndex);
let startX = 0;
let endX = 0;
const carouselInner = document.querySelector(".carousel-inner");

carouselInner.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].clientX;
});

carouselInner.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;
  if (Math.abs(diff) > 50) { // threshold to avoid accidental taps
    if (diff < 0) {
      // Swipe Left
      const newIndex = (currentIndex + 1) % items.length;
      showSlide(newIndex);
    } else {
      // Swipe Right
      const newIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(newIndex);
    }
  }
}
const hamburger = document.querySelector(".hamburger-menu");
const mobileNav = document.getElementById("mobileNav");
const closeBtn = mobileNav.querySelector(".close-btn");
const backdrop = document.getElementById("mobileNavBackdrop");

function openMobileNav() {
  mobileNav.classList.add("open");
  backdrop.classList.add("active");
}

function closeMobileNav() {
  mobileNav.classList.remove("open");
  backdrop.classList.remove("active");
}

hamburger.addEventListener("click", openMobileNav);
closeBtn.addEventListener("click", closeMobileNav);
backdrop.addEventListener("click", closeMobileNav);
