export function getFoodFromApi(code) {
  const url = `https://world.openfoodfacts.org/api/v0/produit/${code}`;

  return fetch(url).then(response => response.json()).catch(error => console.error(`je passe error${error}`));
}

export function writeFoodDataToApi(code, name) {
  const url = `https://world.openfoodfacts.org/cgi/product_jqm2.pl?code=${code}&product_name_fr=${name}`;

  return fetch(url).then(response => response.json()).catch(error => console.error(error));
}

export function writeFoodDataToApiWithImage(path, code) {
  // eslint-disable-next-line no-undef
  const body = new FormData();
  const extension = path.split('.').pop();
  body.append('imgupload_front', { uri: path, type: `image/${extension}`, name: 'image' });
  body.append('code', code);
  body.append('imagefield', 'front');

  return fetch('https://world.openfoodfacts.org/cgi/product_image_upload.pl', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function searchFoodByName(name, page) {
  const url = `https://fr.openfoodfacts.org/cgi/search.pl?search_simple=1&json=1&action=process&fields=image_front_url,product_name_fr,code,ingredients_text_fr,nutriments,nutrition_grades,categories_hierarchy,brands,quantity,image_ingredients_url,image_nutrition_url&search_terms=${name}&page=${page}`;
  return fetch(url).then(response => response.json()).catch(error => console.error(`je passe error${error}`));
}
