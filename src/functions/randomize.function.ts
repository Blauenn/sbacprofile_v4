export const randomize_length = (min: number, max: number) => {
	if (min > max) {
		[min, max] = [max, min];
}

const randomNumber = Math.random() * (max - min) + min;

return Math.floor(randomNumber);
};