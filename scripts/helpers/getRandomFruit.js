import { fruit } from "../data/constants.js";
import rand from "./rand.js";

const getRandomFruit = () => fruit[rand(fruit.length - 1)];

export default getRandomFruit;
