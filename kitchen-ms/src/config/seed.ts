import { orm } from "./orm";


const ingredientsData = [
  { id: 1, name: 'lemon' },
  { id: 2, name: 'potato' },
  { id: 3, name: 'rice' },
  { id: 4, name: 'ketchup' },
  { id: 5, name: 'lettuce' },
  { id: 6, name: 'onion' },
  { id: 7, name: 'cheese' },
  { id: 8, name: 'meat' },
  { id: 9, name: 'chicken' }
];

const recipesData = [
  { id: 1, name: 'Ultimate Mixed Bowl' },
  { id: 2, name: 'Cheesy Rice Bowl' },
  { id: 3, name: 'Chicken Caesar Salad' },
  { id: 4, name: 'Grilled Meat and Potato' },
  { id: 5, name: 'Rice with Ketchup' },
  { id: 6, name: 'All-Inclusive Recipe' }  // Receta 6 con todos los ingredientes
];
const quantities: any = {
  1: [1, 2, 1, 3, 2, 1, 1, 2, 3], // Receta 1 (Ultimate Mixed Bowl)
  2: [2, 1, 2, 2, 1, 1, 3, 1, 2], // Receta 2 (Cheesy Rice Bowl)
  3: [1, 1, 3, 1, 2, 2, 1, 3, 2], // Receta 3 (Chicken Caesar Salad)
  4: [3, 1, 2, 3, 1, 1, 2, 4, 1], // Receta 4 (Grilled Meat and Potato)
  5: [1, 3, 1, 4, 2, 1, 2, 1, 3], // Receta 5 (Rice with Ketchup)
  6: [2, 2, 2, 2, 2, 2, 2, 2, 2], // Receta 6 (All-Inclusive Recipe)
};

async function main() {

  const existIngredients = await orm.ingredient.findMany();
  if (existIngredients.length > 0) return;
  // Crear relaciones entre recetas e ingredientes con cantidades definidas
  await orm.ingredient.createMany({
    data: ingredientsData,
  });
  const recipeIngredientsData = recipesData.flatMap((recipe) =>
    ingredientsData.map((ingredient, i) => ({
      recipeId: recipe.id,
      ingredientId: ingredient.id,
      quantity: quantities[recipe.id][i]
    }))
  );

   // Crear recetas
   await orm.recipe.createMany({
    data: recipesData,
  });

  // Insertar relaciones entre recetas e ingredientes
  await orm.recipeIngredient.createMany({
    data: recipeIngredientsData
  });

}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await orm.$disconnect();
  });
