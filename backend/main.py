from fastapi.responses import FileResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, HTTPException
import pandas as pd
import io
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # during dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files allowed")
    
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    return {
        "columns": list(df.columns),
        "rows": df.head(5).to_dict(orient="records")
    }

@app.post("/analyze")
async def analyze(
    option: str = Query(..., description="Type of analysis"),
    file: UploadFile = File(...)
):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    if option == "correlation":
        result = df.corr().round(5).to_dict()  # round to 5 decimals
    elif option == "variance":
        result = df.var().round(5).to_dict()
    elif option == "missing":
        result = df.isnull().mean().mul(100).round(5).to_dict()
    else:
        result = {"error": "Invalid option"}

    return {"result": result}


@app.post("/report/pdf")
async def generate_pdf_report(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))

    # Output file path
    filename = f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    
    # PDF document
    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()
    elements = []

    # Title
    elements.append(Paragraph("📊 DataLens Report", styles["Title"]))
    elements.append(Spacer(1, 20))

    # Dataset summary
    elements.append(Paragraph("Dataset Summary:", styles["Heading2"]))
    summary_data = [["Rows", len(df)], ["Columns", len(df.columns)]]
    elements.append(Table(summary_data))
    elements.append(Spacer(1, 20))

    # Example: missing values %
    elements.append(Paragraph("Missing Value Analysis:", styles["Heading2"]))
    missing = df.isnull().mean().mul(100).round(2).to_dict()
    missing_data = [[col, f"{val}%"] for col, val in missing.items()]
    elements.append(Table(missing_data))

    # Build PDF
    doc.build(elements)

    return FileResponse(filename, media_type="application/pdf", filename=filename)
