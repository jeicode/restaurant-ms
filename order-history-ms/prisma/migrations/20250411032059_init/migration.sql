-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('VALIDATING_INGREDIENTS', 'WAITING_FOR_INGREDIENTS', 'PREPARING', 'DELIVERED');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "PurchaseHistory" (
    "id" SERIAL NOT NULL,
    "recipeToPrepare" INTEGER NOT NULL,
    "ingredientToPurchase" INTEGER NOT NULL,
    "quantityPurchased" INTEGER NOT NULL,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "published" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PurchaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderHistory" (
    "id" SERIAL NOT NULL,
    "listRecipes" INTEGER[],
    "ingredientId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'VALIDATING_INGREDIENTS',
    "published" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id")
);
