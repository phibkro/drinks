import json

# Load JSON data from files
with open('seedDrinks.json') as f:
    drinks_data = json.load(f)['data']

with open('seedIngredients.json') as f:
    ingredients_data = json.load(f)['data']

with open('seedMeasures.json') as f:
    measures_data = json.load(f)['data']

# Generate SQL insert statements
sql_statements = []

# Insert data into the Drink table
sql_statements.append('-- Insert data into the Drink table')
for drink in drinks_data:
    sql_statements.append(
        f"""INSERT INTO Drink (id, name, instructions, alcoholic, imageUrl, glass) VALUES 
        ({drink['id']}, "{drink['name'].replace('"', '""')}", "{drink['instructions'].replace('"', '""')}", {int(drink['alcoholic'])}, "{drink['imageUrl'].replace('"', '""')}", "{drink['glass'].replace('"', '""')}");"""
    )

# Insert data into the Ingredient table
sql_statements.append('\n-- Insert data into the Ingredient table')
for ingredient in ingredients_data:
    sql_statements.append(
        f"""INSERT INTO Ingredient (id, name) VALUES ({ingredient['id']}, "{ingredient['name'].replace('"', '""')}");"""
    )

# Insert data into the Measure table
sql_statements.append('\n-- Insert data into the Measure table')
for measure in measures_data:
    sql_statements.append(
        f"""INSERT INTO Measure (drinkId, ingredientId, measure) VALUES 
        ({measure['drinkId']}, {measure['ingredientId']}, "{measure['measure'].replace('"', '""')}");"""
    )

# Write SQL statements to a file
with open('seed.sql', 'w') as f:
    f.write('\n'.join(sql_statements))

print('SQL script generated successfully.')