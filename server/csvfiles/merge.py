import csv

original_file = "wikimedia_images.csv"
new_urls_file = "plants_names.csv"
output_file = "merged_output.csv"

plants = {}

def parse_urls(raw):
    if not raw:
        return []

    raw = raw.strip()

    # Remove wrapping quotes repeatedly
    while raw.startswith('"') and raw.endswith('"'):
        raw = raw[1:-1].strip()

    return [u.strip() for u in raw.split(",") if u.strip()]

# Read original
with open(original_file, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        plant = row["plantName"].strip()
        plants[plant] = set(parse_urls(row.get("urls", "")))

# Read new
with open(new_urls_file, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        plant = row["plantName"].strip()
        new_urls = parse_urls(row.get("urls", ""))

        if plant not in plants:
            plants[plant] = set()

        plants[plant].update(new_urls)

# Write output
with open(output_file, "w", newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["plantName", "urls"], quoting=csv.QUOTE_MINIMAL)
    writer.writeheader()

    for plant, urls in plants.items():
        combined = ",".join(urls)
        print(f"{plant}: {len(urls)} URLs")  # DEBUG LINE
        writer.writerow({
            "plantName": plant,
            "urls": combined
        })

print("Done ✔")