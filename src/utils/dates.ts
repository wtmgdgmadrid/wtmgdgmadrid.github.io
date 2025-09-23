// Convierte una fecha en español tipo "10 de Septiembre 2025" a Date
export function parseSpanishDate(dateStr) {
	const meses = [
		"enero", "febrero", "marzo", "abril", "mayo", "junio",
		"julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
	];
	const regex = /^(\d{1,2}) de ([a-zA-Z]+) (\d{4})$/i;
	const match = dateStr.match(regex);
	if (!match) return null;
	const day = parseInt(match[1], 10);
	const month = meses.findIndex(m => m.toLowerCase() === match[2].toLowerCase());
	const year = parseInt(match[3], 10);
	if (month === -1) return null;
	return new Date(year, month, day);
}

// Devuelve true si la fecha es pasada respecto a hoy
export function isPastEvent(dateStr) {
	const date = parseSpanishDate(dateStr);
	if (!date) return false;
	const now = new Date();
	// Ignora la hora, compara solo fecha
	return date.setHours(0,0,0,0) < now.setHours(0,0,0,0);
}
