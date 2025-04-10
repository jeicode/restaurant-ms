/*
  Warnings:

  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- DropIndex
DROP INDEX "Ingredient_id_key";

-- DropIndex
DROP INDEX "Recipe_id_key";

-- AlterTable
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_IngredientToRecipe";

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
