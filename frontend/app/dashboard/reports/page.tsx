"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Calendar,
  BarChart3,
  TrendingUp,
  Brain,
  FileSpreadsheet,
  Trash2,
  Share,
  Star,
  Clock,
} from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { useState } from "react"
import Link from "next/link"

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const mockReports = [
    {
      id: 1,
      title: "Sales Performance Q4 Analysis",
      description: "Correlation analysis of sales data with marketing spend and seasonal trends",
      type: "Correlation Analysis",
      date: "2024-01-15",
      insights: 12,
      status: "completed",
      fileSize: "2.3 MB",
      downloadCount: 5,
      starred: true,
      dataset: "sales_data.csv",
    },
    {
      id: 2,
      title: "Customer Behavior Insights",
      description: "Statistical analysis of customer purchase patterns and demographics",
      type: "Statistical Analysis",
      date: "2024-01-12",
      insights: 8,
      status: "completed",
      fileSize: "1.8 MB",
      downloadCount: 3,
      starred: false,
      dataset: "customer_behavior.csv",
    },
    {
      id: 3,
      title: "Marketing ROI Regression",
      description: "Predictive analysis of marketing campaign effectiveness across channels",
      type: "Regression Analysis",
      date: "2024-01-10",
      insights: 15,
      status: "completed",
      fileSize: "3.1 MB",
      downloadCount: 8,
      starred: true,
      dataset: "marketing_roi.csv",
    },
    {
      id: 4,
      title: "Product Performance Review",
      description: "Comprehensive analysis of product sales and customer satisfaction metrics",
      type: "Correlation Analysis",
      date: "2024-01-08",
      insights: 10,
      status: "completed",
      fileSize: "1.5 MB",
      downloadCount: 2,
      starred: false,
      dataset: "product_data.csv",
    },
    {
      id: 5,
      title: "Seasonal Trends Analysis",
      description: "Time series analysis of sales patterns throughout the year",
      type: "Statistical Analysis",
      date: "2024-01-05",
      insights: 6,
      status: "completed",
      fileSize: "2.7 MB",
      downloadCount: 4,
      starred: false,
      dataset: "seasonal_data.csv",
    },
  ]

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case "Correlation Analysis":
        return BarChart3
      case "Regression Analysis":
        return TrendingUp
      case "Statistical Analysis":
        return Brain
      default:
        return BarChart3
    }
  }

  const getAnalysisColor = (type: string) => {
    switch (type) {
      case "Correlation Analysis":
        return "text-primary"
      case "Regression Analysis":
        return "text-secondary"
      case "Statistical Analysis":
        return "text-accent"
      default:
        return "text-primary"
    }
  }

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || report.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Saved Reports</h1>
            <p className="text-muted-foreground">Manage and download your analysis reports</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Badge variant="secondary" className="px-3 py-1">
              {filteredReports.length} reports
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-border mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Correlation Analysis">Correlation Analysis</SelectItem>
                    <SelectItem value="Regression Analysis">Regression Analysis</SelectItem>
                    <SelectItem value="Statistical Analysis">Statistical Analysis</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="insights">Most Insights</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const AnalysisIcon = getAnalysisIcon(report.type)
            const iconColor = getAnalysisColor(report.type)

            return (
              <Card key={report.id} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
                        <AnalysisIcon className={`w-5 h-5 ${iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                          {report.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Report
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share Report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">{report.description}</CardDescription>

                  {/* Report Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-semibold text-foreground">{report.insights}</div>
                      <div className="text-xs text-muted-foreground">Insights</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-semibold text-foreground">{report.downloadCount}</div>
                      <div className="text-xs text-muted-foreground">Downloads</div>
                    </div>
                  </div>

                  {/* Report Metadata */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{report.dataset}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{report.fileSize}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <Card className="border-border border-dashed">
            <CardContent className="pt-12 pb-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || filterType !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't generated any reports yet. Start by creating your first analysis."}
              </p>
              <Link href="/dashboard/analysis">
                <Button>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Create New Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        {filteredReports.length > 0 && (
          <Card className="border-border mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Report Summary</CardTitle>
              <CardDescription>Overview of your analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{filteredReports.length}</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">
                    {filteredReports.reduce((sum, report) => sum + report.insights, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Insights</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">
                    {filteredReports.reduce((sum, report) => sum + report.downloadCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {filteredReports.filter((report) => report.starred).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Starred Reports</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
