
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Calendar, Clock, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CalendarPage = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-care-text">Calendar</h1>
            <p className="text-care-text-light mt-1">Schedule and manage your appointments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-care-primary hover:bg-care-primary-dark">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendar View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="care-center min-h-[400px] text-care-text-light">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-care-primary/50" />
                  <h3 className="text-lg font-medium mb-2">Calendar Coming Soon</h3>
                  <p>Full calendar functionality will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Client Meeting - Mary Johnson", time: "2:00 PM", date: "Today" },
                  { title: "Facility Tour - Sunrise Manor", time: "10:00 AM", date: "Tomorrow" },
                  { title: "Assessment Visit - Robert Wilson", time: "3:30 PM", date: "Dec 25" }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-care-primary/10 rounded-lg">
                    <div>
                      <h4 className="font-medium text-care-text">{event.title}</h4>
                      <p className="text-sm text-care-text-light">{event.date} at {event.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default CalendarPage;
