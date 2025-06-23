
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Phone, Mail, MapPin, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactsPage = () => {
  const contacts = [
    {
      name: "Mary Johnson",
      type: "Client",
      phone: "(555) 123-4567",
      email: "mary.johnson@email.com",
      location: "Springfield, IL",
      status: "Active"
    },
    {
      name: "Sunrise Manor",
      type: "Facility",
      phone: "(555) 987-6543",
      email: "info@sunrisemanor.com",
      location: "Chicago, IL",
      status: "Partner"
    },
    {
      name: "Robert Wilson",
      type: "Client",
      phone: "(555) 456-7890",
      email: "r.wilson@email.com",
      location: "Aurora, IL",
      status: "Prospective"
    }
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-care-text">Contacts</h1>
            <p className="text-care-text-light mt-1">Manage your client and facility contacts</p>
          </div>
          <Button className="bg-care-primary hover:bg-care-primary-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-care-text-light h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Contacts Grid */}
        <div className="grid gap-4">
          {contacts.map((contact, index) => (
            <Card key={index} className="care-dashboard-card hover:border-care-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-care-text">{contact.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'Active' ? 'client-status-active' :
                        contact.status === 'Partner' ? 'client-status-placed' :
                        'client-status-prospective'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-care-text-light mb-3">{contact.type}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-care-primary" />
                        <span className="text-care-text">{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-care-primary" />
                        <span className="text-care-text">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-care-primary" />
                        <span className="text-care-text">{contact.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-care-text-light">Total Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">186</div>
              <p className="text-xs text-care-text-light">Active relationships</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-care-text-light">Facility Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">42</div>
              <p className="text-xs text-care-text-light">Trusted facilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-care-text-light">Recent Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-care-text">23</div>
              <p className="text-xs text-care-text-light">This week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactsPage;
