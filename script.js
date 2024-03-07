let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".room-slider", {
    spaceBetween: 20,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".gallery-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 10,
    grabCursor:true,
    loop:true,
    centeredSlides:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

let accordions = document.querySelectorAll('.faqs .row .content .box');

accordions.forEach(acco =>{
    acco.onclick = () =>{
        accordions.forEach(subAcco => {subAcco.classList.remove('active')});
        acco.classList.add('active');
    }
})

function handleSubmit(event) {

    // Get references to the form elements
    const checkInDate = document.querySelector('[name="Guest Check-In"]');
    const checkOutDate = document.querySelector('[name="Guest Check-Out"]');

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

    // Convert input dates to Date objects
    const selectedCheckIn = new Date(checkInDate.value);
    const selectedCheckOut = new Date(checkOutDate.value);

    // Validate check-in date:
    if (selectedCheckIn < today) {
        alert("Check-in date cannot be in the past. Please select a current or future date.");
        event.preventDefault(); // Prevent form submission
        return false;
    }

    if (selectedCheckOut < selectedCheckIn) {
        alert("Check-out date cannot be before the check-in date.");
        event.preventDefault(); // Prevent form submission
        return false;
    }

    // Validate check-out date:
    if (selectedCheckOut <= selectedCheckIn) {
        alert("Check-out date must be at least a day greater than the check-in date.");
        event.preventDefault(); // Prevent form submission
        return false;
    }

    event.preventDefault();
    const formElements = event.target.elements; 

    for (let i = 0; i < formElements.length; i++) {
      if (formElements[i].type !== "submit" && !formElements[i].value) { 
        event.preventDefault(); // Stop submission if a field is empty
        alert("Please fill in all required fields.");
        return false; // End form submission
      }
    }
  
    // If all fields are filled, then submit the form as before...
    const formData = new FormData(event.target);

    fetch('https://formspree.io/f/xqkrlkze', {
            method: 'POST',
            body: formData,
            headers: {
            'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccessPopup();
            } else {
                showErrorPopup();
            }
        })
        .catch(error => {
            showErrorPopup();
        });
}



function showSuccessPopup() {
    document.getElementById('successPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    disableScroll(); // Prevent background scrolling
}
  
function hidePopup() {
    document.getElementById('successPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    enableScroll();  // Re-enable scrolling
}
  
function disableScroll() {
    document.body.classList.add('no-scroll');
}
  
function enableScroll() {
    document.body.classList.remove('no-scroll');
}