$('.interactive-menu-button a').click(function() {
    $(this).toggleClass('active');
  });
  
  var scroll = new SmoothScroll('a[href*="#"]');
  
  
  $('.more-btn').click(function() {
    $('#hiden-gallery').toggleClass('hide');
    $('#hiden-gallery').toggleClass('open');
    if ( $('#hiden-gallery').is( ".open" ) ) {
      $(".more-btn-inside").text("Show Less.");
    }else {
      $(".more-btn-inside").text("Show More.");
    }
  });
  
  
  
  
  
  function slickify(){
    $('.blog-slider').slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
              breakpoint: 991,
              settings: "unslick"
          }
        ] 
    });
    $(".slick-next").text("");
    $(".slick-next").addClass("icofont-long-arrow-right");
    $(".slick-prev").text("");
    $(".slick-prev").addClass("icofont-long-arrow-left");
  }
  
  slickify();
  $(window).resize(function(){
    var $windowWidth = $(window).width();
    if ($windowWidth > 991) {
        slickify(); 
        $('#blog-btn').addClass('hide-me');  
    }else if($windowWidth < 991) {
      $('#blog-btn').removeClass('hide-me');
    }
  });
  
  $('#blog-btn').click(function() {
    $('.hiden-blog').toggleClass('hide-blog');
    $('.hiden-blog').toggleClass('open-blog');
    if ( $('.hiden-blog').is( ".open-blog" ) ) {
      $("#blog-btn").text("Show Less.");
    }else {
      $("#blog-btn").text("Show More.");
    }
  });
  
  
  
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
  
  const nav = document.querySelector('#navbar');
  let navTop = nav.offsetTop;
  
  function fixedNav() {
    if (window.scrollY >= navTop) {    
      nav.classList.add('fixed');
    } else {
      nav.classList.remove('fixed');    
    }
  }
  
  window.addEventListener('scroll', fixedNav);
  
  //Get the button:
  mybutton = document.getElementById("myBtn");
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
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
  
  