import fitz  # PyMuPDF
import io
from PIL import Image

# Open the PDF file
pdf_file = "cv.pdf"
doc = fitz.open(pdf_file)

# Get the first image from the first page
image_found = False
for page_num in range(len(doc)):
    page = doc.load_page(page_num)
    image_list = page.get_images(full=True)
    if image_list:
        xref = image_list[0][0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        
        # Save the image
        image = Image.open(io.BytesIO(image_bytes))
        image.save(open("profile.png", "wb"), "PNG")
        image_found = True
        break

doc.close()

if image_found:
    print("Image extracted successfully and saved as profile.png")
else:
    print("No image found in the PDF.")
