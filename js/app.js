const quoteForm = document.querySelector("#quote");
const containerForm = document.querySelector(".box__form");

function Insurance(mark, year, type) {
	(this.mark = mark), (this.year = year), (this.type = type);
}

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
	}
}
