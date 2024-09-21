-- CreateTable
CREATE TABLE "Drink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "alcoholic" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "glass" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Measure" (
    "drinkId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    CONSTRAINT "Measure_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Measure_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "drinkId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "textContent" TEXT NOT NULL,
    CONSTRAINT "Review_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_drinkId_ingredientId_key" ON "Measure"("drinkId", "ingredientId");
