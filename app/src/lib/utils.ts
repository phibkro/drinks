import { CocktailDBResult } from "@/data/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformCocktailDBResult(dbResult: CocktailDBResult) {
  const ingredients = [
    dbResult.strIngredient1,
    dbResult.strIngredient2,
    dbResult.strIngredient3,
    dbResult.strIngredient4,
    dbResult.strIngredient5,
    dbResult.strIngredient6,
    dbResult.strIngredient7,
    dbResult.strIngredient8,
    dbResult.strIngredient9,
    dbResult.strIngredient10,
    dbResult.strIngredient11,
    dbResult.strIngredient12,
    dbResult.strIngredient13,
    dbResult.strIngredient14,
    dbResult.strIngredient15,
  ].filter((value) => typeof value === "string");
  const measures = [
    dbResult.strMeasure1,
    dbResult.strMeasure2,
    dbResult.strMeasure3,
    dbResult.strMeasure4,
    dbResult.strMeasure5,
    dbResult.strMeasure6,
    dbResult.strMeasure7,
    dbResult.strMeasure8,
    dbResult.strMeasure9,
    dbResult.strMeasure10,
    dbResult.strMeasure11,
    dbResult.strMeasure12,
    dbResult.strMeasure13,
    dbResult.strMeasure14,
    dbResult.strMeasure15,
  ].filter((value) => typeof value === "string");
  const drinkDetails = {
    idDrink: dbResult.idDrink,
    strDrink: dbResult.strDrink,
    strDrinkAlternate: dbResult.strDrinkAlternate,
    strTags: dbResult.strTags,
    strVideo: dbResult.strVideo,
    strCategory: dbResult.strCategory,
    strIBA: dbResult.strIBA,
    strAlcoholic: dbResult.strAlcoholic,
    strGlass: dbResult.strGlass,
    strInstructions: dbResult.strInstructions,
    strInstructionsES: dbResult.strInstructionsES,
    strInstructionsDE: dbResult.strInstructionsDE,
    strInstructionsFR: dbResult.strInstructionsFR,
    strInstructionsIT: dbResult.strInstructionsIT,
    strDrinkThumb: dbResult.strDrinkThumb,
    ingredients: ingredients,
    measures: measures,
    strImageSource: dbResult.strImageSource,
    strImageAttribution: dbResult.strImageAttribution,
    strCreativeCommonsConfirmed: dbResult.strCreativeCommonsConfirmed,
    dateModified: dbResult.dateModified,
  };
  return drinkDetails;
}
