# QueryBee – Interactive CSV Data Analysis Platform 🐝📊

**QueryBee** is a no-code platform for CSV data analysis, visualization, and reporting.  
Upload your CSV files, select columns, perform targeted analysis, clean data with preprocessing, and export comprehensive reports — all without writing code.

---

## 🚀 Project Overview

Most existing data analysis tools:

- Run EDA on the entire dataset, wasting resources.
- Show only raw metrics without plain-language insights.
- Require coding for preprocessing and cleaning.

**QueryBee solves these problems** by providing:

- Targeted column-based analysis.
- Human-readable alerts and recommendations.
- Built-in preprocessing wizard.
- Model-aware insights (feature importance, leakage detection).
- Export-ready reports in PDF and Excel formats.

---

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)  
- **Language**: TypeScript + React 18  
- **Styling**: Tailwind CSS + shadcn/ui (Radix-based components)  
- **Charts**: Recharts / Chart.js  

### Backend
- **Framework**: FastAPI (Python)  
- **Libraries**: Pandas, NumPy, SciPy, Scikit-learn, Matplotlib, Seaborn  
- **Reports**: ReportLab (PDF), Pandas ExcelWriter (Excel)  
- **Storage**: In-memory / Redis for scalability
  
---

## ✨ Features & Workflow

### 🔼 Step 1: Dataset Upload
- Upload CSV via drag-and-drop (≤10MB).
- Auto-detect columns and data types.
- Preview dataset in-browser.

### 📊 Step 2: Custom Analysis
- Correlation (Pearson/Spearman)  
- Covariance  
- Variance per variable  
- Outlier detection (IQR/Z-score)  
- Missing data percentage  
- Distribution analysis (skewness, kurtosis)

### 📈 Step 3: Insights & Visualizations
- **Plain-Language Alerts**  
  - Example: `"Age and Salary are 94% positively correlated."`  
  - Example: `"Column 'CustomerID' has 97% missing values."`
- **Visualizations**: Correlation heatmap, boxplots, histograms, scatter plots

### 🛠️ Step 4: Preprocessing Wizard
- Imputation: mean / median / mode  
- Scaling: MinMaxScaler, StandardScaler  
- Feature selection: remove low variance columns  
- Download cleaned dataset  

### 🤖 Step 5: Model-Centric Insights
- Select target column → run feature importance (Linear Regression, Random Forest).  
- Detect data leakage risks.  

### 📑 Step 6: Report Export
- PDF & Excel export including:  
  - Dataset summary  
  - Selected metrics  
  - Visualizations  
  - Preprocessing actions applied  

