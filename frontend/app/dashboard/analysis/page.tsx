"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileSpreadsheet,
  Upload,
  BarChart3,
  TrendingUp,
  Brain,
  Download,
  Play,
  CheckCircle,
  Loader2,
  Eye,
  Settings,
  AlertTriangle,
  Target,
  Activity,
  PieChart,
  Zap,
  Lightbulb,
  RefreshCw,
  Database,
  Gauge,
} from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { useState } from "react"

export default function AnalysisPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [analysisTypes, setAnalysisTypes] = useState<string[]>(["correlation"])
  const [fileError, setFileError] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const mockColumns = [
    { name: "date", type: "datetime", sample: "2024-01-15", missing: "0%" },
    { name: "revenue", type: "numeric", sample: "45,230", missing: "2%" },
    { name: "marketing_spend", type: "numeric", sample: "12,500", missing: "0%" },
    { name: "customers", type: "numeric", sample: "1,234", missing: "5%" },
    { name: "region", type: "categorical", sample: "North America", missing: "1%" },
    { name: "product_category", type: "categorical", sample: "Electronics", missing: "0%" },
  ]

  const analysisOptions = [
    {
      id: "correlation",
      title: "Correlation Analysis",
      description: "Calculate Pearson/Spearman correlation matrix",
      icon: BarChart3,
      category: "relationships",
    },
    {
      id: "covariance",
      title: "Covariance Analysis",
      description: "Calculate covariance matrix and variable relationships",
      icon: Activity,
      category: "relationships",
    },
    {
      id: "outliers",
      title: "Outlier Detection",
      description: "Apply IQR/Z-score methods to identify anomalies",
      icon: Target,
      category: "quality",
    },
    {
      id: "variance",
      title: "Variance Analysis",
      description: "Calculate variance per variable, identify low variance features",
      icon: Gauge,
      category: "quality",
    },
    {
      id: "missing",
      title: "Missing Data Check",
      description: "Calculate missing value percentage per column",
      icon: Database,
      category: "quality",
    },
    {
      id: "distribution",
      title: "Distribution Analysis",
      description: "Calculate skewness & kurtosis, check normality",
      icon: PieChart,
      category: "statistical",
    },
  ]

  const validateFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      return "File size exceeds 10MB limit"
    }
    if (!file.name.toLowerCase().endsWith(".csv")) {
      return "Invalid file format. Please upload a CSV file"
    }
    return null
  }

  const handleFileUpload = (file: File) => {
    const error = validateFile(file)
    if (error) {
      setFileError(error)
      setSelectedFile(null)
    } else {
      setFileError(null)
      setSelectedFile(file.name)
      setCurrentStep(2)
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisResults({
        correlation: analysisTypes.includes("correlation")
          ? {
              strongestCorr: 0.94,
              weakestCorr: 0.12,
              highCorrelations: ["revenue vs marketing_spend (0.94)", "customers vs revenue (0.87)"],
            }
          : null,
        outliers: analysisTypes.includes("outliers")
          ? {
              totalOutliers: 23,
              percentage: 1.9,
              affectedColumns: ["revenue", "marketing_spend"],
            }
          : null,
        missing: analysisTypes.includes("missing")
          ? {
              totalMissing: 67,
              worstColumn: "customers (5%)",
              cleanColumns: 4,
            }
          : null,
        variance: analysisTypes.includes("variance")
          ? {
              lowVarianceFeatures: ["region"],
              highVarianceFeatures: ["revenue", "marketing_spend"],
            }
          : null,
        recommendations: [
          {
            type: "High Correlation Found",
            message: "Revenue and marketing_spend are 94% correlated - consider removing one for model efficiency",
            priority: "high",
            action: "Remove redundant variables",
          },
          {
            type: "Missing Values Detected",
            message: "Customers column has 5% missing values - consider imputation or removal",
            priority: "medium",
            action: "Apply data cleaning",
          },
          {
            type: "Low Variance Feature",
            message: "Region column has <1% variance - may not be useful for analysis",
            priority: "low",
            action: "Consider feature removal",
          },
        ],
      })
      setCurrentStep(4)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Data Analysis</h1>
            <p className="text-muted-foreground">
              Upload, validate, and analyze your CSV data with AI-powered insights
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 4 && <div className={`w-8 h-0.5 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Step 1: File Upload with Validation */}
            {currentStep === 1 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5 text-primary" />
                    <span>Upload & Validate CSV File</span>
                  </CardTitle>
                  <CardDescription>
                    Upload your CSV file. We'll validate format, size, and auto-detect column types.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {fileError && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{fileError}</AlertDescription>
                      </Alert>
                    )}

                    {/* Upload Zone */}
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <FileSpreadsheet className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Drop your CSV file here</h3>
                      <p className="text-muted-foreground mb-2">Maximum file size: 10MB</p>
                      <p className="text-xs text-muted-foreground mb-4">Supported format: .csv with headers</p>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                    </div>

                    {/* Recent Files */}
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Recent Files</h4>
                      <div className="space-y-2">
                        {[
                          { name: "sales_data.csv", size: "2.3 MB", date: "2 hours ago", status: "valid" },
                          { name: "customer_behavior.csv", size: "1.8 MB", date: "1 day ago", status: "valid" },
                          { name: "marketing_roi.csv", size: "945 KB", date: "3 days ago", status: "valid" },
                        ].map((file, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                              selectedFile === file.name ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => {
                              setSelectedFile(file.name)
                              setFileError(null)
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <FileSpreadsheet className="w-5 h-5 text-primary" />
                              <div>
                                <div className="font-medium text-foreground">{file.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {file.size} • {file.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {file.status}
                              </Badge>
                              {selectedFile === file.name && <CheckCircle className="w-5 h-5 text-primary" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={() => setCurrentStep(2)} disabled={!selectedFile}>
                        Continue to Column Selection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Enhanced Column Selection */}
            {currentStep === 2 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <span>Column Selection & Data Preview</span>
                  </CardTitle>
                  <CardDescription>
                    Review auto-detected data types and select columns for analysis. Check data quality metrics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* File Info with Validation Results */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <FileSpreadsheet className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium text-foreground">{selectedFile}</div>
                            <div className="text-sm text-muted-foreground">
                              1,234 rows • 6 columns detected • Headers found
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">Validated</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-foreground">Missing Data</div>
                          <div className="text-muted-foreground">2.1% overall</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-foreground">Numeric Columns</div>
                          <div className="text-muted-foreground">4 detected</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-foreground">Data Quality</div>
                          <div className="text-primary font-medium">Good</div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Column Selection */}
                    <div>
                      <h4 className="font-medium text-foreground mb-4">Available Columns</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {mockColumns.map((column, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                            <Checkbox
                              id={column.name}
                              checked={selectedColumns.includes(column.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedColumns([...selectedColumns, column.name])
                                } else {
                                  setSelectedColumns(selectedColumns.filter((col) => col !== column.name))
                                }
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <Label htmlFor={column.name} className="font-medium text-foreground">
                                  {column.name}
                                </Label>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {column.type}
                                  </Badge>
                                  <Badge
                                    variant={column.missing === "0%" ? "secondary" : "destructive"}
                                    className="text-xs"
                                  >
                                    {column.missing} missing
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">Sample: {column.sample}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Back
                      </Button>
                      <Button onClick={() => setCurrentStep(3)} disabled={selectedColumns.length < 2}>
                        Continue ({selectedColumns.length} columns selected)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Enhanced Analysis Configuration */}
            {currentStep === 3 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Analysis Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Select multiple analysis types and configure parameters. Choose from 6 different analysis methods.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium text-foreground mb-4 block">
                        Analysis Types (Select Multiple)
                      </Label>

                      {/* Relationship Analysis */}
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-primary" />
                          <span>Relationship Analysis</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {analysisOptions
                            .filter((opt) => opt.category === "relationships")
                            .map((type) => (
                              <div
                                key={type.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                  analysisTypes.includes(type.id)
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:bg-muted/50"
                                }`}
                                onClick={() => {
                                  if (analysisTypes.includes(type.id)) {
                                    setAnalysisTypes(analysisTypes.filter((t) => t !== type.id))
                                  } else {
                                    setAnalysisTypes([...analysisTypes, type.id])
                                  }
                                }}
                              >
                                <div className="flex items-center space-x-3 mb-2">
                                  <type.icon className="w-5 h-5 text-primary" />
                                  <h5 className="font-medium text-foreground">{type.title}</h5>
                                </div>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Data Quality Analysis */}
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                          <Database className="w-4 h-4 text-primary" />
                          <span>Data Quality Analysis</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {analysisOptions
                            .filter((opt) => opt.category === "quality")
                            .map((type) => (
                              <div
                                key={type.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                  analysisTypes.includes(type.id)
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:bg-muted/50"
                                }`}
                                onClick={() => {
                                  if (analysisTypes.includes(type.id)) {
                                    setAnalysisTypes(analysisTypes.filter((t) => t !== type.id))
                                  } else {
                                    setAnalysisTypes([...analysisTypes, type.id])
                                  }
                                }}
                              >
                                <div className="flex items-center space-x-3 mb-2">
                                  <type.icon className="w-5 h-5 text-primary" />
                                  <h5 className="font-medium text-foreground">{type.title}</h5>
                                </div>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Statistical Analysis */}
                      <div>
                        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                          <PieChart className="w-4 h-4 text-primary" />
                          <span>Statistical Analysis</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {analysisOptions
                            .filter((opt) => opt.category === "statistical")
                            .map((type) => (
                              <div
                                key={type.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                  analysisTypes.includes(type.id)
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:bg-muted/50"
                                }`}
                                onClick={() => {
                                  if (analysisTypes.includes(type.id)) {
                                    setAnalysisTypes(analysisTypes.filter((t) => t !== type.id))
                                  } else {
                                    setAnalysisTypes([...analysisTypes, type.id])
                                  }
                                }}
                              >
                                <div className="flex items-center space-x-3 mb-2">
                                  <type.icon className="w-5 h-5 text-primary" />
                                  <h5 className="font-medium text-foreground">{type.title}</h5>
                                </div>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Selected Analysis Summary */}
                    <div>
                      <Label className="text-base font-medium text-foreground mb-3 block">
                        Selected Analysis ({analysisTypes.length})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {analysisTypes.map((type) => {
                          const option = analysisOptions.find((opt) => opt.id === type)
                          return (
                            <Badge key={type} variant="secondary" className="flex items-center space-x-1">
                              {option && <option.icon className="w-3 h-3" />}
                              <span>{option?.title}</span>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    {/* Selected Columns Summary */}
                    <div>
                      <Label className="text-base font-medium text-foreground mb-3 block">Selected Columns</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedColumns.map((column) => (
                          <Badge key={column} variant="secondary">
                            {column}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Analysis Parameters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="confidence">Confidence Level</Label>
                        <Select defaultValue="95">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="90">90%</SelectItem>
                            <SelectItem value="95">95%</SelectItem>
                            <SelectItem value="99">99%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="method">Analysis Method</Label>
                        <Select defaultValue="auto">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto-detect</SelectItem>
                            <SelectItem value="pearson">Pearson</SelectItem>
                            <SelectItem value="spearman">Spearman</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep(2)}>
                        Back
                      </Button>
                      <Button onClick={handleAnalyze} disabled={isAnalyzing || analysisTypes.length === 0}>
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Running {analysisTypes.length} Analysis Types...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Analysis ({analysisTypes.length} types)
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Comprehensive Results */}
            {currentStep === 4 && analysisResults && (
              <div className="space-y-6">
                {/* Analysis Summary */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Analysis Complete</span>
                    </CardTitle>
                    <CardDescription>
                      {analysisTypes.length} analysis types completed with{" "}
                      {analysisResults.recommendations?.length || 0} recommendations generated.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {analysisResults.correlation && (
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-primary">
                            {analysisResults.correlation.strongestCorr}
                          </div>
                          <div className="text-sm text-muted-foreground">Strongest Correlation</div>
                        </div>
                      )}
                      {analysisResults.outliers && (
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-destructive">
                            {analysisResults.outliers.totalOutliers}
                          </div>
                          <div className="text-sm text-muted-foreground">Outliers Detected</div>
                        </div>
                      )}
                      {analysisResults.missing && (
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-secondary">
                            {analysisResults.missing.totalMissing}
                          </div>
                          <div className="text-sm text-muted-foreground">Missing Values</div>
                        </div>
                      )}
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-accent">
                          {analysisResults.recommendations?.length || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Recommendations</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {analysisResults.recommendations && (
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <span>Smart Recommendations Engine</span>
                      </CardTitle>
                      <CardDescription>
                        AI-powered insights and actionable recommendations for your data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResults.recommendations.map((rec: any, index: number) => (
                          <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                            <div
                              className={`w-3 h-3 rounded-full mt-2 ${
                                rec.priority === "high"
                                  ? "bg-destructive"
                                  : rec.priority === "medium"
                                    ? "bg-primary"
                                    : "bg-secondary"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {rec.type}
                                </Badge>
                                <Badge
                                  variant={
                                    rec.priority === "high"
                                      ? "destructive"
                                      : rec.priority === "medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {rec.priority} priority
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground mb-2">{rec.message}</p>
                              <Button size="sm" variant="outline">
                                <Zap className="w-3 h-3 mr-1" />
                                {rec.action}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Enhanced Visualizations */}
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Interactive Dashboard</CardTitle>
                    <CardDescription>Visual charts, correlation heatmaps, scatter plots, and box plots</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="correlation" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="correlation">Correlation</TabsTrigger>
                        <TabsTrigger value="outliers">Outliers</TabsTrigger>
                        <TabsTrigger value="distribution">Distribution</TabsTrigger>
                        <TabsTrigger value="missing">Missing Data</TabsTrigger>
                        <TabsTrigger value="variance">Variance</TabsTrigger>
                      </TabsList>

                      <TabsContent value="correlation" className="mt-6">
                        <div className="bg-muted/30 rounded-lg p-8 text-center">
                          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">Correlation Heatmap</p>
                          <p className="text-sm text-muted-foreground">High correlations flagged above 90%</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="outliers" className="mt-6">
                        <div className="bg-muted/30 rounded-lg p-8 text-center">
                          <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">Box Plots with Outlier Highlighting</p>
                          <p className="text-sm text-muted-foreground">23 outliers detected (1.9%)</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="distribution" className="mt-6">
                        <div className="bg-muted/30 rounded-lg p-8 text-center">
                          <PieChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">Distribution Plots & Histograms</p>
                          <p className="text-sm text-muted-foreground">Skewness and normality analysis</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="missing" className="mt-6">
                        <div className="bg-muted/30 rounded-lg p-8 text-center">
                          <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">Missing Data Summary</p>
                          <p className="text-sm text-muted-foreground">Percentage missing per column</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="variance" className="mt-6">
                        <div className="bg-muted/30 rounded-lg p-8 text-center">
                          <Gauge className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-2">Variance Analysis Report</p>
                          <p className="text-sm text-muted-foreground">Low variance features identified</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span>Bonus Features</span>
                    </CardTitle>
                    <CardDescription>Advanced model simulation and preprocessing recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          <h4 className="font-medium text-foreground">Model Simulation</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Run basic linear regression and view performance metrics
                        </p>
                        <Button size="sm" variant="outline">
                          <Play className="w-3 h-3 mr-1" />
                          Run Simulation
                        </Button>
                      </div>

                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <RefreshCw className="w-5 h-5 text-primary" />
                          <h4 className="font-medium text-foreground">Preprocessing Wizard</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Get suggestions for normalization, encoding, and feature selection
                        </p>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Open Wizard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(1)
                      setAnalysisResults(null)
                      setSelectedFile(null)
                      setSelectedColumns([])
                      setAnalysisTypes(["correlation"])
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    New Analysis
                  </Button>
                  <div className="flex space-x-3">
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Save Analysis
                    </Button>
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Analysis Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: "Upload File", completed: currentStep > 1 },
                    { step: "Select Columns", completed: currentStep > 2 },
                    { step: "Configure Analysis", completed: currentStep > 3 },
                    { step: "View Results", completed: currentStep === 4 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {item.completed ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 border border-muted-foreground rounded-full" />
                      )}
                      <span className={`text-sm ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Analysis Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">Include at least 2 numeric columns for correlation analysis</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">Larger datasets (1000+ rows) provide more reliable insights</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">Clean data with minimal missing values works best</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
