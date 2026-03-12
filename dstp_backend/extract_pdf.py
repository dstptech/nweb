import PyPDF2, sys
path=r"c:\Users\taara\OneDrive\DATA\Desktop\05_DSTP_Folder_Structure.pdf"
reader=PyPDF2.PdfReader(path)
for i,page in enumerate(reader.pages):
    print('--- page %d ---' % (i+1))
    print(page.extract_text())
