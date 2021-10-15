const quoteForm = document.querySelector("#quote");
const containerForm = document.querySelector(".box__form");

function Insurance(mark, year, type) {
	(this.mark = mark), (this.year = year), (this.type = type);
}

Insurance.prototype.quoteInsurance = function () {
	// Cost per brand
	let mark;
	let price;
	const base = 2000;
	switch (this.mark) {
		case "1":
			mark = "Asian";
			price = base * 1.05;
			break;
		case "2":
			mark = "American";
			price = base * 1.15;
			break;
		case "3":
			mark = "European";
			price = base * 1.35;
			break;
		default:
			break;
	}

	// Cost per year (3%)
	const differenceYear = new Date().getFullYear() - this.year;
	price -= (differenceYear * 3 * price) / 100;

	// Cost per type (Basic(30%), Complete(50%))
	if (this.type === "Basic") {
		price *= 1.3;
	} else if (this.type === "Complete") {
		price *= 1.5;
	}

	const response = {
		mark: mark,
		year: this.year,
		type: this.type,
		price: price,
	};
	return response;
};

function UI() {}

// Show years
UI.prototype.completeOptions = () => {
	const max = new Date().getFullYear(),
		min = max - 15;

	const selectYear = document.querySelector("#year");
	for (let i = max; i > min; i--) {
		const option = document.createElement("option");
		option.textContent = i;

		selectYear.appendChild(option);
	}
};

UI.prototype.showMessage = (message) => {
	const titleContainer = document.querySelector(".box__title h1");

	titleContainer.textContent = message;
	titleContainer.parentElement.classList.add("error");

	setTimeout(() => {
		titleContainer.textContent = "QUOTE YOUR CAR INSURANCE";
		titleContainer.parentElement.classList.remove("error");
	}, 1500);
};

UI.prototype.showPrice = (object) => {
	// Save html for back
	const containerHTML = containerForm.innerHTML;
	containerForm.innerHTML = "";

	// Change title
	const titleContainer = document.querySelector(".box__title h1");
	titleContainer.textContent = "TOTAL";
	titleContainer.parentElement.classList.add("total");

	// Show object
	const paragraph = document.createElement("p");
	paragraph.className = "box__result";
	paragraph.innerHTML = `<strong>Mark: </strong>${object.mark}<br>
	<strong>Year:</strong>${object.year}<br>
	<strong>Type:</strong>${object.type}<br>
	<strong>Price:</strong>$ ${object.price}`;

	// Button back
	const btnBack = document.createElement("a");
	btnBack.className = "box__btn-back";
	btnBack.href = "index.html";
	btnBack.textContent = "Back";

	containerForm.appendChild(paragraph);
	containerForm.appendChild(btnBack);
};

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
	ui.completeOptions();
	quoteForm.addEventListener("submit", validateForm);
});

function validateForm(e) {
	e.preventDefault();

	const selectMark = document.querySelector("#mark").value;
	const selectYear = document.querySelector("#year").value;
	const type = document.querySelector('input[name="type"]:checked').value;

	if (selectMark === "" || selectYear === "" || type === "") {
		ui.showMessage("FILL IN ALL THE FIELDS");
		return;
	}

	// Show total
	const newInsurance = new Insurance(selectMark, selectYear, type);
	// Return total with object
	const insurance = newInsurance.quoteInsurance();
	ui.showPrice(insurance);
}
