import json
from collections import defaultdict

# Load JSON data from file
with open('seedMeasures.json') as f:
    data = json.load(f)

# Dictionary to count occurrences of each (ingredientId, drinkId) pair
pair_count = defaultdict(int)
measures = defaultdict(list)

# Count occurrences and store measures with line numbers
for line_number, entry in enumerate(data['data'], start=1):
    pair = (entry['ingredientId'], entry['drinkId'])
    pair_count[pair] += 1
    measures[pair].append((entry['measure'], line_number))

# Find and print pairs that occur more than once
for pair, count in pair_count.items():
    if count > 1:
        print(f"IngredientId: {pair[0]}, DrinkId: {pair[1]}")
        for measure, line_number in measures[pair]:
            print(f"  Measure: {measure} (Line: {line_number})")