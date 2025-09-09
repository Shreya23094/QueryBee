import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ScatterChart,
  Layers,
  BarChart3,
  LineChart,
  BarChart,
  FileSpreadsheet,
  Plus,
  TrendingUp,
  Clock,
  Download,
  Eye,
  MoreHorizontal,
  Upload,
  Brain,
  Zap,
} from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">Ready to analyze some data today?</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link href="/dashboard/analysis">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
            </Link>
            <Link href="/dashboard/analysis">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Start analyzing your data in seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-24 flex-col space-y-2 bg-transparent w-full">
                      <Layers className="w-6 h-6 text-secondary" />
                      <span>Correlation Analysis</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-24 flex-col space-y-2 bg-transparent w-full">
                      <TrendingUp className="w-6 h-6 text-accent" />
                      <span>Covariance Analysis</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-24 flex-col space-y-2 bg-transparent w-full">
                      <ScatterChart className="w-6 h-6 text-secondary" />
                      <span>Outlier Detection</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-24 flex-col space-y-2 bg-transparent w-full">
                      <LineChart className="w-6 h-6 text-secondary" />
                      <span>Variance Analysis</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-24 flex-col space-y-2 bg-transparent w-full">
                      <BarChart className="w-6 h-6 text-secondary" />
                      <span>Missing Data Check</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard/analysis">
                    <Button variant="outline" className="h-24 flex-col space-y-2 bg-transparent w-full">
                      <BarChart3 className="w-6 h-6 text-secondary" />
                      <span>Distribution Analysis</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Analyses */}
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Analyses</CardTitle>
                  <CardDescription>Your latest data analysis projects</CardDescription>
                </div>
                <Link href="/dashboard/reports">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sales Performance Q4",
                      type: "Correlation Analysis",
                      date: "2 hours ago",
                      status: "Completed",
                      insights: 12,
                    },
                    {
                      name: "Customer Behavior Data",
                      type: "Statistical Analysis",
                      date: "1 day ago",
                      status: "Completed",
                      insights: 8,
                    },
                    {
                      name: "Marketing Campaign ROI",
                      type: "Regression Analysis",
                      date: "3 days ago",
                      status: "Completed",
                      insights: 15,
                    },
                  ].map((analysis, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{analysis.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{analysis.type}</span>
                            <span>•</span>
                            <span>{analysis.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary">{analysis.insights} insights</Badge>
                        <Badge variant="outline" className="text-primary border-primary">
                          {analysis.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Zone */}
            <Card className="border-border border-dashed">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Drop CSV Here</h3>
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop your CSV file to start analyzing</p>
                  <Link href="/dashboard/analysis">
                    <Button size="sm" className="w-full">
                      Choose File
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-border bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">AI Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Your sales data shows a strong correlation with seasonal trends
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">
                      Consider analyzing customer segments for better insights
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">Your data quality has improved by 23% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Analyses</span>
                    <span className="font-medium">8 / 50</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "16%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Storage</span>
                    <span className="font-medium">2.1 GB / 10 GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "21%" }}></div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
