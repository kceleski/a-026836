
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Search, Filter, UserPlus, Phone, Mail, MapPin } from 'lucide-react';

const ClientsPage = () => {
  // Mock client data for demonstration
  const clients = [
    {
      id: 1,
      name: "Dorothy Williams",
      age: 78,
      status: "Active",
      careLevel: "Assisted Living",
      budget: "$3,500-4,000",
      location: "North Miami",
      lastContact: "2024-01-15",
      phone: "(305) 555-0123",
      email: "dorothy.w@email.com"
    },
    {
      id: 2,
      name: "Robert Johnson",
      age: 82,
      status: "Prospective",
      careLevel: "Memory Care",
      budget: "$5,000-6,000",
      location: "Coral Gables",
      lastContact: "2024-01-14",
      phone: "(305) 555-0124",
      email: "rob.johnson@email.com"
    },
    {
      id: 3,
      name: "Margaret Davis",
      age: 75,
      status: "Placed",
      careLevel: "Independent Living",
      budget: "$2,500-3,000",
      location: "Aventura",
      lastContact: "2024-01-10",
      phone: "(305) 555-0125",
      email: "margaret.d@email.com"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'client-status-active';
      case 'Prospective': return 'client-status-prospective';
      case 'Placed': return 'client-status-placed';
      case 'Inactive': return 'client-status-inactive';
      default: return 'client-status-active';
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Client Management"
        description="Manage your senior care clients and their information"
        onTitleChange={() => {}}
        onDescriptionChange={() => {}}
        icon={<Users className="h-6 w-6" />}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="care-button-primary">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        }
      />

      {/* Client Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Total Clients</p>
                <p className="text-2xl font-bold text-care-primary">24</p>
              </div>
              <Users className="h-8 w-8 text-care-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Active</p>
                <p className="text-2xl font-bold text-care-success">18</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-care-success/20 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-care-success"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Prospective</p>
                <p className="text-2xl font-bold text-care-info">4</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-care-info/20 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-care-info"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Placed</p>
                <p className="text-2xl font-bold text-care-primary">2</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-care-primary/20 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-care-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card className="care-dashboard-card">
        <CardHeader>
          <CardTitle className="text-care-text">Client Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="border border-care-primary/10 rounded-lg p-4 hover:bg-care-accent/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-care-text">{client.name}</h3>
                      <span className="text-sm text-care-text-light">Age {client.age}</span>
                      <span className={getStatusColor(client.status)}>
                        {client.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-care-text-light">Care Level</p>
                        <p className="text-care-text font-medium">{client.careLevel}</p>
                      </div>
                      <div>
                        <p className="text-care-text-light">Budget Range</p>
                        <p className="text-care-text font-medium">{client.budget}</p>
                      </div>
                      <div>
                        <p className="text-care-text-light">Preferred Location</p>
                        <p className="text-care-text font-medium">{client.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-care-text-light">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {client.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
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

export default ClientsPage;
