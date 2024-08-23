import { config } from "../../constant";

export const fetchTags = async () => {
	const url = `${config.API_URL}/api/tags/`;
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		if (response.ok) {
			const data = result.map((tag) => {
				return {
					value: tag.data.id,
					label: tag.data.name,
				};
			});
			return data;
		} else {
			console.error("Error fetching tags:", result);
			return [];
		}
	} catch (error) {
		console.error("Error fetching tags:", error);
		return [];
	}
};
