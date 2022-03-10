import {getResource} from '../services/servervices';

function cards() {
	//5 ЗАДАЧА - КАРТОЧКИ МЕНЮ
	class Card {
		constructor(src, alt, title, description, price, parentSelector, ...classes) {
			this.alt = alt;
			this.src = src;
			this.title = title;
			this.description = description;
			this.price = price;
			this.transfer = 74;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.changeToRub();
		}
		changeToRub() {
			this.price = this.price * this.transfer;
		}
		render() {
			const item = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__item';
				item.classList.add(this.element);
			} else {
				this.classes.forEach(className => item.classList.add(className));
			}
			item.innerHTML = `
					<img src = ${this.src} alt = ${this.alt}>
					<h3 class = "menu__item-subtitle"> ${this.title}  </h3> 
					<div class = "menu__item-descr"> ${this.description}
					</div>
					<div class = "menu__item-divider"> </div> 
					<div class = "menu__item-price">
					<div class = "menu__item-cost"> Цена: </div> 
					<div class = "menu__item-total"> <span> ${this.price}  </span> руб/день </div> 
					</div> 	
			`;

			this.parent.append(item);
		}
	}

	


	axios.get('http://localhost:3000/menu')
		.then(data => data.data.forEach(({
			img,
			altimg,
			title,
			descr,
			price
		}) => {
			new Card(img, altimg, title, descr, price, '.menu .container').render();
		}));

}

export default cards;