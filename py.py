import PyPDF2

file_path = f'./resumate/files/input/Analytics - Siddharth Goel.pdf'

with open(file_path, "rb") as pdf_file:
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    res_data = pdf_reader.pages[0].extract_text()
    print(res_data)
