function sliderModule({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	//7 ЗАДАЧА - СЛАЙДЕР

	const currentSlide = document.querySelector(currentCounter),
		slider = document.querySelector(container),
		totalSlides = document.querySelector(totalCounter),
		slides = document.querySelectorAll(slide),
		prevSlideBtn = document.querySelector(prevArrow),
		nextSlideBtn = document.querySelector(nextArrow),
		slidesWrapper = document.querySelector(wrapper),
		slidesField = document.querySelector(field),
		width = window.getComputedStyle(slidesWrapper).width;

	
	let slideIndex = 1;

	
	// РЕАЛИЗАЦИЯ С УРОКА - 2 ВАРИАНТ

	let offset = 0;
	if (slides.length < 10) {
		totalSlides.textContent = `0${slides.length}`;
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		totalSlides.textContent = slides.length;
		currentSlide.textContent = `0${slideIndex}`;
	}

	slidesField.style.width = slides.length * 100 + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const dotsWrapper = document.createElement('ol'),
		dots = [];

	dotsWrapper.classList.add('carousel-indicators');
	slider.append(dotsWrapper);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');

		if (i == 0) {
			dot.style.opacity = 1;
		}
		dotsWrapper.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	nextSlideBtn.addEventListener('click', () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}
		
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	prevSlideBtn.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (event) => {
			const slideTo = event.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;



			if (slides.length < 10) {
				currentSlide.textContent = `0${slideIndex}`;
			} else {
				currentSlide.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = 1;


		});
	});

}

export default sliderModule;