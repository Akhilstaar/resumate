import os
import openai
from dotenv import load_dotenv
import PyPDF2
from pdfminer.high_level import extract_text
from .models import ResumeData

# env 
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
gpt_model = os.getenv("GPT_MODEL")

# gpt_part
system_prompt = "You are a resume parser. Your job will be to extract data from resume into json format as per syntax and instructions given below.\n[output only JSON]\n[Formatting Instructions]\n====================\n{\"name\",\n\"phone_number\",\n\"email\",\n\"github_profile_link\",\n\"linkedin_profile_link\",\n\"field_of_study\",\n\"education\": [{\"degree\", \"institute\", \"year\", \"gpa\"}],\n\"skills\": [],\n\"projects\": [{}],\n\"achievements\",\n\"summary\"}\n====================\n"
def get_resume(user_prompt, temp, output_limit):
    response = openai.ChatCompletion.create(
        model = gpt_model,
        messages = [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        temperature = temp,
        max_tokens = output_limit
    )

    print(response)
    return response.choices[0].message["content"]

# generating usr_input from resume
def generate_prompt(filename, FILEPATH):
    txt = extract_text(FILEPATH)
    PDFFile = open(FILEPATH,'rb')
    PDF = PyPDF2.PdfReader(PDFFile)
    pages = len(PDF.pages)
    key = '/Annots'
    uri = '/URI'
    ank = '/A'

    links = []
    for page in range(pages):
        # print("Current Page: {}".format(page))
        pageSliced = PDF.pages[page]
        pageObject = pageSliced.get_object()
        if key in pageObject.keys():
            ann = pageObject[key]
            for a in ann:
                u = a.get_object()
                if uri in u[ank].keys():
                    links.append(u[ank][uri])
    link = "\n".join(links)

    prompt = txt + "\n" + link
    response = get_resume(prompt, 0.5, 1500)
    ress = '[' + response + ']'

    userdata = ResumeData(uuid=filename, data=ress)
    userdata.save()

    return response