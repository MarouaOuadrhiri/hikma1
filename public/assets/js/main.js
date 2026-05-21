(function($) {
    "use strict";
  
    const $documentOn = $(document);
    const $windowOn = $(window);
  
    $documentOn.ready( function() {
  
      //>> Mobile Menu Js Start <<//
      $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "1199",
        meanExpand: ['<i class="far fa-plus"></i>'],
    });
  
    $('#mobile-menus').meanmenu({
        meanMenuContainer: '.mobile-menus',
        meanScreenWidth: "1920",
        meanExpand: ['<i class="far fa-plus"></i>'],
      });
      
      //>> Sidebar Toggle Js Start <<//
      $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
        $(".offcanvas__info").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");
      });
      $(".sidebar__toggle").on("click", function () {
        $(".offcanvas__info").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");
      });
  
      //>> Body Overlay Js Start <<//
      $(".body-overlay").on("click", function () {
        $(".offcanvas__area").removeClass("offcanvas-opened");
        $(".df-search-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
      });
  

    /* ================================
     Back To Top Button Js Start
    ================================ */

  // Function to toggle back-to-top button visibility
    function toggleBackTop() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            $("#back-top").addClass("show");
        } else {
            $("#back-top").removeClass("show");
        }
    }

    // On scroll
    $windowOn.on('scroll', function() {
        toggleBackTop();
    });

    // On document ready, force hide the button
    $(document).ready(function() {
        $("#back-top").removeClass("show");
    });

    // On click
    $documentOn.on('click', '#back-top', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    
      //>> Sticky Header Js Start <<//
  
      $windowOn.on("scroll", function () {
        if ($(this).scrollTop() > 250) {
          $("#header-sticky").addClass("sticky");
        } else {
          $("#header-sticky").removeClass("sticky");
        }
      });      
      
      //>> Video Popup Start <<//
      $(".img-popup").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });

      $(".img-popup2").magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
  
      $(".video-popup").magnificPopup({
        type: "iframe",
        callbacks: {},
      });
  
     
      //>> Wow Animation Start <<//
      new WOW().init();
  
       //>> Nice Select Start <<//
        $('select').niceSelect();

      // circle-progress
        if ($(".circle-bar").length) {
        $(".circle-bar").each(function () {
            let $this = $(this);
            let value = $this.data("percent") || 0.99;

            $this.circleProgress({
            value: value,
            size: 150,
            thickness: 10,
            fill: { color: "#fff" },
            emptyFill: "rgba(255,255,255,0.2)"
            }).on("circle-animation-progress", function (event, progress, stepValue) {
            $(this).find("strong").html(Math.round(stepValue * 100) + "%");
            });

            $this.append("<strong></strong>");
        });
        }


      //>> Hero Slider Start <<//
       var swiper = new Swiper(".hero-slider", {
        loop: true,
        autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        },
        speed: 800,
        effect: "slide", // left theke asbe
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".dot-number",
            clickable: true,
            renderBullet: function(index, className) {
                const dotContent = document.querySelectorAll(
                    ".dot-number .dot-num"
                );
                return `
            <span class="${className}">
                ${dotContent[index]?.outerHTML || ""}
            </span>
        `;
            },
        },
  });

   //>> Image Slider Start <<//
      var swiper = new Swiper(".image-slider", {
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
          el: ".dot-number",
          clickable: true,
          renderBullet: function(index, className) {
              const dotContent = document.querySelectorAll(
                  ".dot-number .dot-num"
              );
              return `
          <span class="${className}">
              ${dotContent[index]?.outerHTML || ""}
          </span>
        `;
            },
        },
      speed: 800,
      effect: "slide",
      on: {
        slideChangeTransitionStart: function () {
          document.querySelectorAll('.hero-image img').forEach(img => {
            img.classList.remove('animate__fadeInUp'); 
          });
        },
        slideChangeTransitionEnd: function () {
          let activeImg = document.querySelector('.swiper-slide-active .hero-image img');
          if(activeImg){
            activeImg.classList.add('animate__animated', 'animate__fadeInUp');
          }
        }
      }
    });

      //>>Testimonial Slider Start <<//
      if($('.testimonial-slider').length > 0) {
        const TestimonialSlider = new Swiper(".testimonial-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                1199: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1,
                }, 
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }

      // Create mask divs for each wrapper
		
        document.querySelectorAll(".tp-clip-anim").forEach(wrapper => {
        const img = wrapper.querySelector(".tp-anim-img[data-animate='true']");
        if (!img) return;
        const url = img.src;

        // ensure wrapper position relative
        wrapper.style.position = "relative";

        // IntersectionObserver
        const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
        wrapper.querySelectorAll(".mask").forEach(m => m.remove());

            // Create 9 masks
            for (let i = 0; i < 9; i++) {
                const mask = document.createElement("div");
                mask.className = `mask mask-${i + 1}`;
                Object.assign(mask.style, {
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    inset: "0"
                });
                wrapper.appendChild(mask);
            }

            // observer stop
            obs.unobserve(entry.target);
        }
    });
        }, { threshold: 0.2 });

        observer.observe(wrapper);
        });

      //>> Gt Brand Slider Start <<//
      if($('.brand-slider').length > 0) {
        const BrandSlider = new Swiper(".brand-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
          
            breakpoints: {
                1199: {
                    slidesPerView: 5,
                },
                991: {
                    slidesPerView: 4,
                },
                767: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }

      //>> Service Slider Start <<//
      if($('.service-slider').length > 0) {
        const ServiceSlider = new Swiper(".service-slider", {
            spaceBetween: 0,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
           pagination: {
                el: ".service-dot",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }

      //>> Testimonial Slider Start <<//
      if($('.testimonial-slider-2').length > 0) {
        const TestimonialSlider2 = new Swiper(".testimonial-slider-2", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
          
            breakpoints: {
                1199: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }

       //>> Test Slider Start <<//
      if($('.test-slider').length > 0) {
        const TestSlider = new Swiper(".test-slider", {
            direction: "vertical",
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
          
            breakpoints: {
                1199: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }

       //>> Visa Slider Start <<//
       if($('.visa-slider').length > 0) {
        const VisaSlider = new Swiper(".visa-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
          
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 4,
                },
                991: {
                    slidesPerView: 3,
                },
                767: {
                    slidesPerView: 2,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }


       //>> Visa Slider Start <<//
       if($('.testimonial-slider-3').length > 0) {
        const TestimonialSlider3 = new Swiper(".testimonial-slider-3", {
            spaceBetween: 30,
            speed: 1300,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
          
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            breakpoints: {
                1199: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1,
                },
                575: {
                    slidesPerView: 1,
                },
                0: {
                    slidesPerView: 1,
                },
            },
        });
      }

    //>> Service-item Hover Image Show Slider Start <<//
    const serviceItems = document.querySelectorAll(".service-item");
    serviceItems.forEach((item) => {  
    const imageHover = item.querySelector(".image-hover");

    item.addEventListener("mousemove", (event) => {
        const rect = item.getBoundingClientRect();
        const dx = event.clientX - rect.left;
        const dy = event.clientY - rect.top;
        imageHover.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
        // imageHover.style.transform = `translate(${dx}px, ${dy}px) rotate(28.57deg)`;
        imageHover.style.opacity = "1";
        imageHover.style.visibility = "visible";
    });

    item.addEventListener("mouseleave", () => {
        imageHover.style.opacity = "0";
        imageHover.style.visibility = "hidden";
    });
    });

      /* ================================
       Custom Accordion Js Start
    ================================ */
		$(".accordion-single .header-area").on("click", function () {
			if ($(this).closest(".accordion-single").hasClass("active")) {
				$(this).closest(".accordion-single").removeClass("active");
				$(this).next(".content-area").slideUp();
			} else {
				$(".accordion-single").removeClass("active");
				$(this).closest(".accordion-single").addClass("active");
				$(".content-area").not($(this).next(".content-area")).slideUp();
				$(this).next(".content-area").slideToggle();
			}
		});

    //>> Counter Js Start <<//
    $(window).on("scroll", function () {
    $(".odometer").each(function () {
      var el = $(this);
      if (el.offset().top < $(window).scrollTop() + $(window).height()) {
        if (!el.hasClass("counted")) {
          el.addClass("counted");
          el.html(el.attr("data-count"));
        }
      }
    });
  });


    /* ==================================================
    Image Scale
    ================================================== */
    var width = $(window).width();
    if (width > 1023) {
        if (document.querySelectorAll(".image-scale-animation").length > 0) {

            // plugin register করতে হবে একবার শুরুতেই
            gsap.registerPlugin(ScrollTrigger);

            var step1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".image-scale-animation",
                    scrub: 4,
                    start: "top 100%",
                    end: "bottom 70%",
                },
            });

            step1.from(".image-scale-animation .image-scale-animation-item", {
                scale: 0.1,
                duration: 2, // অতিরিক্ত বড় duration দরকার নেই
            });
            step1.to(".image-scale-animation .image-scale-animation-item", {
                scale: 1,
                duration: 1.5,
                transformOrigin: "center bottom",
            });
        }
    }

/* ==================================================
    GSAP Image Reveal
  ================================================== */

/* ==================================================
    GSAP Fade Up
  ================================================== */
  let fadeArray_items = document.querySelectorAll(".fade-up-anim");
  if (fadeArray_items.length > 0) {
      gsap.registerPlugin(ScrollTrigger);

      const fadeArray = gsap.utils.toArray(".fade-up-anim");
      fadeArray.forEach((item) => {
          let fade_direction = item.getAttribute("data-direction") || "bottom";
          let fade_offset = parseInt(item.getAttribute("data-offset")) || 50;
          let duration_value = parseFloat(item.getAttribute("data-duration")) || 1.15;
          let delay_value = parseFloat(item.getAttribute("data-delay")) || 0.15;
          let ease_value = item.getAttribute("data-ease") || "power2.out";
          let onscroll_value = item.getAttribute("data-on-scroll") || 1;

          let animation_settings = {
              opacity: 0,
              ease: ease_value,
              duration: duration_value,
              delay: delay_value,
          };

          if (fade_direction === "top") animation_settings['y'] = -fade_offset;
          if (fade_direction === "left") animation_settings['x'] = -fade_offset;
          if (fade_direction === "bottom") animation_settings['y'] = fade_offset;
          if (fade_direction === "right") animation_settings['x'] = fade_offset;

          if (onscroll_value == 1) {
              animation_settings['scrollTrigger'] = {
                  trigger: item,
                  start: 'top 85%',
              };
          }

          gsap.from(item, animation_settings);
      });
  }

/* ==================================================
    Smooth Scroll (Lenis)
  ================================================== */
  // Check if gsap and SplitText exist
if (typeof gsap !== "undefined" && typeof SplitText !== "undefined") {
  const splitTextEl = document.querySelector(".split-text-right");

  if (splitTextEl) { // শুধুমাত্র এলিমেন্ট থাকলে
    gsap.registerPlugin(SplitText, ScrollTrigger);

    let split = new SplitText(splitTextEl, { type: "chars,words" });

    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: splitTextEl,
        start: "top 80%", 
        toggleActions: "play none none reverse"
      }
    });
  }
}



 /* ==================================================
		Smooth Scroll
   ================================================== */
    const header = document.querySelector('.sticky');
    const headerHeight = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]:not([data-bs-toggle="tab"])').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const id = el.getAttribute('href')?.slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (target) {
                const offsetTop = target.offsetTop - headerHeight; 
                lenis.scrollTo(offsetTop, { duration: 1.2 });
            }
        });
    });


    /* ==================================================
		Mounth Year
   ================================================== */
    const monthYear = document.getElementById("month-year");
    const datesContainer = document.getElementById("dates");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentDate = new Date(2025, 7); 
    let selectedDateDiv = null; // 

    function renderCalendar(date) {
        if (!monthYear || !datesContainer) return; 

        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        monthYear.textContent = `${monthNames[month]} ${year}`;

        datesContainer.innerHTML = "";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let blanks = firstDay === 0 ? 6 : firstDay - 1;
        for (let i = 0; i < blanks; i++) {
            const emptyDiv = document.createElement("div");
            datesContainer.appendChild(emptyDiv);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = d;

            // Highlight specific dates (example)
            if (year === 2025 && month === 7 && [25,26,27].includes(d)) {
                dayDiv.classList.add("highlight");
            }

            // ✅ Click event for selecting date
            dayDiv.addEventListener("click", () => {
                // Remove previous active
                if (selectedDateDiv) {
                    selectedDateDiv.classList.remove("active-date");
                }
                // Add active to current
                dayDiv.classList.add("active-date");
                selectedDateDiv = dayDiv;
            });

            datesContainer.appendChild(dayDiv);
        }
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
            selectedDateDiv = null; // reset selection on month change
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
            selectedDateDiv = null; // reset selection on month change
        });
    }

    // First render
    if (monthYear && datesContainer) {
        renderCalendar(currentDate);
    }


    }); // End Document Ready Function

     //>> Counterup Start <<//
     
     

    //>> Search Start <<//
     if ($(".search-toggler").length) {
        $(".search-toggler").on("click", function(e) {
            e.preventDefault();
            $(".search-popup").toggleClass("active");
            $("body").toggleClass("locked");
        });
    }

    //>> MouseCursor Start <<//
    if ($(".mouseCursor").length > 0) {
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n,
                        i = 0,
                        o = !1;
                    (window.onmousemove = function(s) {
                        o ||
                            (t.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (e.style.transform =
                                "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                            (n = s.clientY),
                            (i = s.clientX);
                    }),
                    $("body").on(
                            "mouseenter",
                            "button, a, .cursor-pointer",
                            function() {
                                e.classList.add("cursor-hover"),
                                    t.classList.add("cursor-hover");
                            }
                        ),
                        $("body").on(
                            "mouseleave",
                            "button, a, .cursor-pointer",
                            function() {
                                ($(this).is("a", "button") &&
                                    $(this).closest(".cursor-pointer").length) ||
                                (e.classList.remove("cursor-hover"),
                                    t.classList.remove("cursor-hover"));
                            }
                        ),
                        (e.style.visibility = "visible"),
                        (t.style.visibility = "visible");
                }
            }
        }
        itCursor();
    }
    
   function loader() {
    $windowOn.on('load', function() {
        // Animate loader off screen
        $(".preloader").addClass('loaded');
        $(".preloader").delay(200).fadeOut();
    });
}

    loader();

    //>> Contact Form Submission Start <<//
    if ($("#contact-form1").length) {
        $("#contact-form1").on("submit", function(e) {
            e.preventDefault();
            var form = $(this);
            var actionUrl = form.attr('action');
            
            var submitBtn = form.find('button[type="submit"]');
            var originalBtnText = submitBtn.html();
            submitBtn.html('SENDING... <i class="fa-solid fa-spinner fa-spin"></i>').prop('disabled', true);

            var payload = {
                name: form.find('input[id="name331"]').val(),
                email: form.find('input[id="email11"]').val(),
                phone: form.find('input[id="name22"]').val(),
                address: form.find('input[id="name24"]').val(),
                date: form.find('input[id="name25"]').val(),
                message: form.find('textarea[name="message"]').val()
            };

            $.ajax({
                type: "POST",
                url: actionUrl,
                data: JSON.stringify(payload),
                contentType: "application/json",
                success: function(response) {
                    if(response.success) {
                        alert(response.message);
                        form[0].reset();
                    } else {
                        alert(response.message || "An error occurred. Please try again.");
                    }
                },
                error: function(err) {
                    var msg = err.responseJSON && err.responseJSON.message ? err.responseJSON.message : 'Oops! Something went wrong.';
                    alert(msg);
                },
                complete: function() {
                    submitBtn.html(originalBtnText).prop('disabled', false);
                }
            });
        });
    }
  
  })(jQuery); // End jQuery