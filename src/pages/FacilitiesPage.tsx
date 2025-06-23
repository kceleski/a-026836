
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Plus, Search, Filter, MapPin, Phone, Mail, Star } from 'lucide-react';

const FacilitiesPage = () => {
  // Mock facility data
  const facilities = [
    {
      id: 1,
      name: "Sunrise Senior Living",
      type: "Assisted Living",
      location: "Coral Gables, FL",
      phone: "(305) 555-0200",
      email: "info@sunrise-cg.com",
      rating: 4.8,
      capacity: 120,
      available: 8,
      monthlyRate: "$3,500-5,200",
      amenities: ["Memory Care", "Dining", "Activities", "Transportation"]
    },
    {
      id: 2,
      name: "Golden Years Memory Care",
      type: "Memory Care",
      location: "Miami Beach, FL",
      phone: "(305) 555-0201",
      email: "contact@goldenyears.com",
      rating: 4.9,
      capacity: 60,
      available: 3,
      monthlyRate: "$5,800-7,200",
      amenities: ["Specialized Care", "Therapy", "Secure Unit", "Family Support"]
    },
    {
      id: 3,
      name: "Oceanview Skilled Nursing",
      type: "Skilled Nursing",
      location: "Key Biscayne, FL",
      phone: "(305) 555-0202",
      email: "admissions@oceanview.com",
      rating: 4.6,
      capacity: 150,
      available: 12,
      monthlyRate: "$8,000-12,000",
      amenities: ["24/7 Nursing", "Rehabilitation", "Medical Care", "Therapy"]
    }
  ];

  const getFacilityTypeColor = (type: string) => {
    switch (type) {
      case 'Assisted Living': return 'facility-assisted-living';
      case 'Memory Care': return 'facility-memory-care';
      case 'Skilled Nursing': return 'facility-skilled-nursing';
      default: return 'facility-assisted-living';
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Facility Directory"
        description="Browse and manage senior care facilities in your network"
        onTitleChange={() => {}}
        onDescriptionChange={() => {}}
        icon={<Building2 className="h-6 w-6" />}
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
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </div>
        }
      />

      {/* Facility Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Total Facilities</p>
                <p className="text-2xl font-bold text-care-primary">45</p>
              </div>
              <Building2 className="h-8 w-8 text-care-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="care-dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-care-text-light">Available Beds</p>
                <p className="text-2xl font-bold text-care-success">127</p>
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
                <p className="text-sm text-care-text-light">Partner Facilities</p>
                <p className="text-2xl font-bold text-care-info">38</p>
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
                <p className="text-sm text-care-text-light">Avg Rating</p>
                <p className="text-2xl font-bold text-care-warning">4.7</p>
              </div>
              <Star className="h-8 w-8 text-care-warning/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Facility List */}
      <Card className="care-dashboard-card">
        <CardHeader>
          <CardTitle className="text-care-text">Facility Network</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {facilities.map((facility) => (
              <div key={facility.id} className="border border-care-primary/10 rounded-lg p-6 hover:bg-care-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-care-text">{facility.name}</h3>
                      <span className={getFacilityTypeColor(facility.type)}>
                        {facility.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-care-warning fill-current" />
                        <span className="text-sm font-medium text-care-text">{facility.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-care-text-light mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{facility.location}</span>
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-care-text-light">Monthly Rate</p>
                    <p className="text-care-text font-medium">{facility.monthlyRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-care-text-light">Capacity</p>
                    <p className="text-care-text font-medium">{facility.capacity} beds</p>
                  </div>
                  <div>
                    <p className="text-sm text-care-text-light">Available</p>
                    <p className="text-care-success font-medium">{facility.available} beds</p>
                  </div>
                  <div>
                    <p className="text-sm text-care-text-light">Contact</p>
                    <p className="text-care-text font-medium">{facility.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-care-text-light mb-2">Amenities & Services</p>
                  <div className="flex flex-wrap gap-2">
                    {facility.amenities.map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-care-primary/10 text-care-primary text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
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

export default FacilitiesPage;
