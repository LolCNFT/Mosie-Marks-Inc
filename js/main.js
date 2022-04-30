
  //CARDS//
  const cards = document.querySelectorAll('.cards');
  
  const setClasses = () => {
      const classes = ['left3', 'left2', 'left', 'active', 'right3', 'right2', 'right'];
      cards.forEach((card, index) => card.classList.add(classes[index]))
  }
  
  
  const changePositions = (e) => {
      const clickedCard = e.currentTarget
      const activeCard = document.querySelector('.cards.active')
      if(clickedCard.classList.contains('active')) return;
      const classesFrom = e.currentTarget.className
      const classesTo = activeCard.className
      clickedCard.className = classesTo
      activeCard.className = classesFrom
  
    
  }
  
  
  cards.forEach((card) => {
      card
          .addEventListener('click', changePositions)
  })
  
  setClasses();
  
  
  
  //modal
  
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";
  
  for (const el of openEls) {
    el.addEventListener("click", function() {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
    });
  }
  
  for (const el of closeEls) {
    el.addEventListener("click", function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }
  
  document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });
  
  document.addEventListener("keyup", e => {
    // if we press the ESC
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });
  
  //sticky menu
  
  // const nav = document.querySelector('#navbar');
  // let navTop = nav.offsetTop;
  // const navbar = getElementById('#nav-bk');
  // function fixedNav() {
  //   if (window.scrollY >= navTop) {    
  //     nav.classList.add('fixed');
  //     navbar.classList.add('navbar-bk');
  //   } else {
  //     nav.classList.remove('fixed');
  //     navbar.classList.remove('navbar-bk');
  //   }
  // }
  
  // window.addEventListener('scroll', fixedNav);
  if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
  }
  var myNav = document.getElementById("nav");

  // window.onscroll = function() {
  //   "use strict";
  //   if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
  //     myNav.classList.add("scroll");
  //     myNav.classList.remove("navbar");
  //   } else {
  //     myNav.classList.remove("scroll");
  //   }
  // };
  //Get the button:
  mybutton = document.getElementById("myBtn");
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      mybutton.style.display = "block";
      myNav.classList.add("scroll");
    } else {
      mybutton.style.display = "none";
      myNav.classList.remove("scroll");
    }
  }
  
  // // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
  //faq
  let question = document.querySelectorAll(".question");
  
  question.forEach(question => {
    question.addEventListener("click", event => {
      const activee = document.querySelector(".question.activee");
      if(activee && activee !== question ) {
        activee.classList.toggle("activee");
        activee.nextElementSibling.style.maxHeight = 0;
      }
      question.classList.toggle("activee");
      const answer = question.nextElementSibling;
      if(question.classList.contains("activee")){
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = 0;
      }
    })
  })
  
/*////////////////////////////////////Cursor////////////////////////////////*/

const cursor = document.createElement('div')
const child = document.createElement('div')

const cursorDefaultStyle = `
    width: 28px;
    height: 28px;
    border-radius: 9999px;
    border: 2px solid #e100ff00;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 0; left: '0';
    transition: 150ms;
    pointer-events: none;

`

const childDefaultStyle = `
    // width: 8px;
    // height: 8px;
    // border-radius: 50%;
    // background-color: #FF0080;
    // position: fixed;
    // top: 0; left: '0';
    // transform: translate(-50%, -50%);
    // transition: 100ms;
    // pointer-events: none;
`

cursor.style.cssText = cursorDefaultStyle
child.style.cssText = childDefaultStyle

document.body.appendChild(cursor)
document.body.appendChild(child)

let isActived = false

window.addEventListener('mousemove', (event) => {
    if (isActived) return

    cursor.style.top = child.style.top = `${event.clientY}px`
    cursor.style.left = child.style.left = `${event.clientX}px`
})

const onHover = document.querySelectorAll('.onHover')
const fixed = (event, getTransition) => {
    event.stopPropagation()
    isActived = true
    const element = event.currentTarget
    const { width, height, top, left } = element.getBoundingClientRect()

    const style = window.getComputedStyle(element)
    const borderRadius = style.getPropertyValue('border-radius')
    const transition = style.getPropertyValue('transition')

    cursor.style.cssText = `
            ${cursorDefaultStyle}
            width: ${width}px;
            height: ${height}px;
            border-radius: ${borderRadius};
            top: ${top}px;
            left: ${left}px;
            transform: translate(0, 0);
            border-color: #E100FF;
            ${(getTransition) ? `transition: ${transition};`: ''}
        `

    child.style.cssText = `
            ${childDefaultStyle}
            display: none
        `
}

for (const hover of onHover) {
    hover.addEventListener('mousedown', (event) => fixed(event, true))
    hover.addEventListener('mouseup', (event) => fixed(event, true))
    hover.addEventListener('mouseover', (event) => fixed(event, false))
    hover.addEventListener('mouseleave', (event) => {
        isActived = false
        
        cursor.style.cssText = cursorDefaultStyle
        child.style.cssText = childDefaultStyle
    })
}


////////////////////////////slider//////////////////////////////////* */
// Slider(all Slides in a container)
const slider = document.querySelector(".slider")
// All trails 
const trail = document.querySelector(".trail").querySelectorAll("div")

// Transform value
let value = 0
// trail index number
let trailValue = 0
// interval (Duration)
let interval = 4000

// Function to slide forward
const slide = (condition) => {
    // CLear interval
    clearInterval(start)
    // update value and trailValue
    condition === "increase" ? initiateINC() : initiateDEC()
    // move slide
    move(value, trailValue)
    // Restart Animation
    animate()
    // start interal for slides back 
    start = setInterval(() => slide("increase"), interval);
}

// function for increase(forward, next) configuration
const initiateINC = () => {
    // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // increase transform value
    value === 80 ? value = 0 : value += 20
    // update trailValue based on value
    trailUpdate()
}

// function for decrease(backward, previous) configuration
const initiateDEC = () => {
     // Remove active from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // decrease transform value
    value === 0 ? value = 80 : value -= 20
     // update trailValue based on value
    trailUpdate()
}

// function to transform slide 
const move = (S, T) => {
    // transform slider
    slider.style.transform = `translateX(-${S}%)`
    //add active class to the current trail
    trail[T].classList.add("active")
}

const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from(".bg", {x: "-100%", opacity: 0})
  .from(".p", {opacity: 0}, "-=0.3")
  .from(".h1", {opacity: 0, y: "30px"}, "-=0.3")
  .from(".button", {opacity: 0, y: "-40px"}, "-=0.8")
  

// function to restart animation
const animate = () => tl.restart()

// function to update trailValue based on slide value
const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0
    } else if (value === 20) {
        trailValue = 1
    } else if (value === 40) {
        trailValue = 2
    } else if (value === 60) {
        trailValue = 3
    } else {
        trailValue = 4
    }
}   

// Start interval for slides
let start = setInterval(() => slide("increase"), interval)

// Next  and  Previous button function (SVG icon with different classes)
document.querySelectorAll("svg").forEach(cur => {
    // Assign function based on the class Name("next" and "prev")
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"))
})

// function to slide when trail is clicked
const clickCheck = (e) => {
    // CLear interval
    clearInterval(start)
    // remove active class from all trails
    trail.forEach(cur => cur.classList.remove("active"))
    // Get selected trail
    const check = e.target
    // add active class
    check.classList.add("active")

    // Update slide value based on the selected trail
    if(check.classList.contains("box1")) {
        value = 0
    } else if (check.classList.contains("box2")) {
        value = 20
    } else if (check.classList.contains("box3")) {
        value = 40
    } else if (check.classList.contains("box4")) {
        value = 60
    } else {
        value = 80
    }
    // update trail based on value
    trailUpdate()
    // transfrom slide
    move(value, trailValue)
    // start animation
    animate()
    // start interval
    start = setInterval(() => slide("increase"), interval)
}

// Add function to all trails
trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)))

// Mobile touch Slide Section
const touchSlide = (() => {
    let start, move, change, sliderWidth

    // Do this on initial touch on screen
    slider.addEventListener("touchstart", (e) => {
        // get the touche position of X on the screen
        start = e.touches[0].clientX
        // (each slide with) the width of the slider container divided by the number of slides
        sliderWidth = slider.clientWidth/trail.length
    })
    
    // // Do this on touchDrag on screen
    // slider.addEventListener("touchmove", (e) => {
    //     // prevent default function
    //     e.preventDefault()
    //     // get the touche position of X on the screen when dragging stops
    //     move = e.touches[0].clientX
    //     // Subtract initial position from end position and save to change variabla
    //     change = start - move
    // }) //ERROR HERE NOT LETTING SCROLL UP

    const mobile = (e) => {
        // if change is greater than a quarter of sliderWidth, next else Do NOTHING
        change > (sliderWidth/4)  ? slide("increase") : null;
        // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
        (change * -1) > (sliderWidth/4) ? slide("decrease") : null;
        // reset all variable to 0
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    // call mobile on touch end
    slider.addEventListener("touchend", mobile)
})()

//Team
 
