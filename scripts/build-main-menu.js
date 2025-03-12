import initializeSave, {storagePossible} from "./manage-saved-data.js";
import launchGame from "./launch-game.js";
import focusIfNeeded from "./focusIfNeeded.js";

const createStar = (obtained)=>{
	const newStar = document.createElement("img");
	newStar.alt="Victory star";
	newStar.src= obtained ? "./assets/full-star.svg":"./assets/star.svg"; // ⭐ ☆
	newStar.style.height="1em";
	return newStar
}

const makeMenuItem = ({level, name, best}) => {
	const menuItem = document.createElement("a");
	menuItem.addEventListener("click", ev=>ev.preventDefault());

	const newOption = document.createElement("button");
	newOption.type="button";
	newOption.classList.add("menu-button");
	newOption.innerText = name
	newOption.addEventListener("click", ()=>{
		launchGame(name)
	})
	menuItem.appendChild(newOption)
	const starContainer = document.createElement("div");
	starContainer.classList.add("centered");
	if (storagePossible) {
		for (let starNumber = 0; starNumber < 3; starNumber++) {
			starContainer.appendChild(createStar(starNumber<best))
		}
	}
	menuItem.appendChild(starContainer);
	return menuItem
}

const buildMainMenu = () => {
	const save = initializeSave();
	main.innerHTML='<nav class="centered col"></nav>';
	heading.innerText = "mathematics";
	const nav = document.querySelector("nav");
	const gamesToProvide = save.filter(({name, best}) => {
		if (!name.includes("lv")) return true
		const lv = Number(name[name.length-1]);
		if (lv === 1) return true
		const previousGameName = name.slice(0, -1) + (lv-1)
		const previousGameInfo = save.find(({name})=>name===previousGameName);
		return !previousGameInfo || previousGameInfo.best > 0 
	})
	const navButtons = gamesToProvide.map(makeMenuItem);
	navButtons.forEach(button => nav.appendChild(button))
	focusIfNeeded(".menu-button");
}

export default buildMainMenu