
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { BarChart3, TrendingUp, Users, Building2, CheckSquare, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsPage = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-care-text">Analytics</h1>
          <p className="text-care-text-light mt-1">Track your performance and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="care-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-care-text-light">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-care-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">142</div>
              <p className="text-xs text-care-success">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="care-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-care-text-light">Active Placements</CardTitle>
              <Building2 className="h-4 w-4 text-care-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">24</div>
              <p className="text-xs text-care-success">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="care-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-care-text-light">Tasks Completed</CardTitle>
              <CheckSquare className="h-4 w-4 text-care-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">89</div>
              <p className="text-xs text-care-success">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="care-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-care-text-light">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-care-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">$12,450</div>
              <p className="text-xs text-care-success">+22% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Client Placements Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="care-center min-h-[300px] text-care-text-light">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-care-primary/50" />
                  <h3 className="text-lg font-medium mb-2">Charts Coming Soon</h3>
                  <p>Interactive charts will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-care-text-light">Conversion Rate</span>
                  <span className="text-care-text font-medium">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-care-text-light">Client Satisfaction</span>
                  <span className="text-care-text font-medium">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-care-text-light">Average Response Time</span>
                  <span className="text-care-text font-medium">2.3 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-care-text-light">Task Completion Rate</span>
                  <span className="text-care-text font-medium">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AnalyticsPage;
