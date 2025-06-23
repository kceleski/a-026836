
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Plus, Calendar, Clock, User, Phone, MapPin } from 'lucide-react';

const TasksPage = () => {
  // Mock task data
  const tasks = [
    {
      id: 1,
      title: "Follow up with Dorothy Williams",
      type: "Phone Call",
      priority: "High",
      dueDate: "2024-01-16",
      dueTime: "10:00 AM",
      client: "Dorothy Williams",
      status: "Scheduled",
      description: "Discuss facility tour feedback and next steps"
    },
    {
      id: 2,
      title: "Facility tour at Sunrise Senior Living",
      type: "Facility Tour",
      priority: "Medium",
      dueDate: "2024-01-16",
      dueTime: "2:00 PM",
      client: "Robert Johnson",
      status: "Scheduled",
      description: "Tour memory care unit with family"
    },
    {
      id: 3,
      title: "Complete assessment for Margaret Davis",
      type: "Assessment Visit",
      priority: "Low",
      dueDate: "2024-01-17",
      dueTime: "11:00 AM",
      client: "Margaret Davis",
      status: "In Progress",
      description: "Conduct care level assessment at home"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'task-priority-low';
      case 'Medium': return 'task-priority-medium';
      case 'High': return 'task-priority-high';
      case 'Urgent': return 'task-priority-urgent';
      default: return 'task-priority-medium';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'client-status-prospective';
      case 'In Progress': return 'client-status-active';
      case 'Completed': return 'client-status-placed';
      case 'Cancelled': return 'client-status-inactive';
      default: return 'client-status-prospective';
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Task Management"
        description="Manage your daily tasks and client interactions"
        onTitleChange={() => {}}
        onDescriptionChange={() => {}}
        icon={<CheckSquare className="h-6 w-6" />}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar View
            </Button>
            <Button size="sm" className="care-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        }
      />

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Today's Tasks</p>
                <p className="text-2xl font-bold text-care-primary">8</p>
              </div>
              <CheckSquare className="h-8 w-8 text-care-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Completed</p>
                <p className="text-2xl font-bold text-care-success">5</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-care-success/20 flex items-center justify-center">
                <CheckSquare className="h-4 w-4 text-care-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Pending</p>
                <p className="text-2xl font-bold text-care-warning">3</p>
              </div>
              <Clock className="h-8 w-8 text-care-warning/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">This Week</p>
                <p className="text-2xl font-bold text-care-info">24</p>
              </div>
              <Calendar className="h-8 w-8 text-care-info/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card className="care-dashboard-card">
        <CardHeader>
          <CardTitle className="text-care-text">Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border border-care-primary/10 rounded-lg p-4 hover:bg-care-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-care-text">{task.title}</h3>
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </span>
                      <span className={getStatusColor(task.status)}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-care-text-light mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-care-text-light">
                        <Calendar className="h-4 w-4" />
                        <span>{task.dueDate} at {task.dueTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-care-text-light">
                        <User className="h-4 w-4" />
                        <span>{task.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-care-text-light">
                        <CheckSquare className="h-4 w-4" />
                        <span>{task.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="care-button-primary">
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default TasksPage;
