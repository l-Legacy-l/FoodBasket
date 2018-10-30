export function getFoodFromApi(code)
{
    const url = 'https://ssl-api.openfoodfacts.org/api/v0/produit/'
    + code

    return fetch(url).then((response) => response.json()).catch((error)
    => console.error(error))

}