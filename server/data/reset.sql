-- Drop existing tables if they exist
DROP TABLE IF EXISTS Drink;
DROP TABLE IF EXISTS Ingredient;
DROP TABLE IF EXISTS Measure;

-- Create the Drink table
CREATE TABLE Drink (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    instructions TEXT NOT NULL,
    alcoholic INTEGER NOT NULL,
    imageUrl TEXT,
    glass TEXT
);

-- Create the Ingredient table
CREATE TABLE Ingredient (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- Create the Measure table
CREATE TABLE Measure (
    drinkId INTEGER,
    ingredientId INTEGER,
    measure TEXT,
    FOREIGN KEY (drinkId) REFERENCES Drink(id),
    FOREIGN KEY (ingredientId) REFERENCES Ingredient(id)
);