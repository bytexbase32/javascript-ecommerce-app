
async function getProducts() {
    try {
        const response = await fetch("./data/products.json");

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export {getProducts};