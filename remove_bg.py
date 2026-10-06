import os
from rembg import remove
from PIL import Image

input_path = os.path.join(os.path.dirname(__file__), 'public', 'images', 'hero-profile.jpg')
output_path = os.path.join(os.path.dirname(__file__), 'public', 'images', 'hero-profile-cutout.png')

print(f"Loading image from {input_path}...")
input_image = Image.open(input_path)

print("Removing background...")
output_image = remove(input_image)

print(f"Saving cutout image to {output_path}...")
output_image.save(output_path, "PNG")
print("Done! Background removed successfully.")
