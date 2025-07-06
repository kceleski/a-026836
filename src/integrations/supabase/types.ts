export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_agencies: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      agent_conversations: {
        Row: {
          agent_id: string
          client_id: string | null
          conversation_data: Json | null
          created_at: string | null
          facility_id: string | null
          id: string
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          client_id?: string | null
          conversation_data?: Json | null
          created_at?: string | null
          facility_id?: string | null
          id?: string
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          client_id?: string | null
          conversation_data?: Json | null
          created_at?: string | null
          facility_id?: string | null
          id?: string
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "agent_senior_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_conversations_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "agent_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_facilities: {
        Row: {
          address: string
          amenities: string[] | null
          available_beds: number | null
          base_cost: number | null
          capacity: number | null
          care_types: string[] | null
          city: string
          created_at: string | null
          description: string | null
          email: string | null
          facility_type: string
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          photos: string[] | null
          rating: number | null
          state: string
          updated_at: string | null
          website: string | null
          zip_code: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          available_beds?: number | null
          base_cost?: number | null
          capacity?: number | null
          care_types?: string[] | null
          city: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          facility_type: string
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          photos?: string[] | null
          rating?: number | null
          state: string
          updated_at?: string | null
          website?: string | null
          zip_code: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          available_beds?: number | null
          base_cost?: number | null
          capacity?: number | null
          care_types?: string[] | null
          city?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          facility_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          photos?: string[] | null
          rating?: number | null
          state?: string
          updated_at?: string | null
          website?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      agent_interactions: {
        Row: {
          agent_id: string
          client_id: string | null
          content: string | null
          created_at: string | null
          facility_id: string | null
          follow_up_date: string | null
          follow_up_needed: boolean | null
          id: string
          occurred_at: string | null
          scheduled_at: string | null
          subject: string | null
          type: Database["public"]["Enums"]["interaction_type"]
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          client_id?: string | null
          content?: string | null
          created_at?: string | null
          facility_id?: string | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          occurred_at?: string | null
          scheduled_at?: string | null
          subject?: string | null
          type: Database["public"]["Enums"]["interaction_type"]
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          client_id?: string | null
          content?: string | null
          created_at?: string | null
          facility_id?: string | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          occurred_at?: string | null
          scheduled_at?: string | null
          subject?: string | null
          type?: Database["public"]["Enums"]["interaction_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_interactions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_interactions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "agent_senior_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_interactions_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "agent_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_profiles: {
        Row: {
          agency_id: string | null
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["agent_role"] | null
          updated_at: string | null
        }
        Insert: {
          agency_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["agent_role"] | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["agent_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "agent_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_agency"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agent_agencies"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_senior_clients: {
        Row: {
          address: string | null
          agent_id: string
          budget_max: number | null
          budget_min: number | null
          care_needs: string[] | null
          created_at: string | null
          date_of_birth: string | null
          dietary_restrictions: string[] | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          id: string
          last_name: string
          medical_conditions: string[] | null
          mobility_requirements: string | null
          notes: string | null
          phone: string | null
          preferred_location: string | null
          status: Database["public"]["Enums"]["client_status"] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          agent_id: string
          budget_max?: number | null
          budget_min?: number | null
          care_needs?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          dietary_restrictions?: string[] | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          id?: string
          last_name: string
          medical_conditions?: string[] | null
          mobility_requirements?: string | null
          notes?: string | null
          phone?: string | null
          preferred_location?: string | null
          status?: Database["public"]["Enums"]["client_status"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          agent_id?: string
          budget_max?: number | null
          budget_min?: number | null
          care_needs?: string[] | null
          created_at?: string | null
          date_of_birth?: string | null
          dietary_restrictions?: string[] | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          id?: string
          last_name?: string
          medical_conditions?: string[] | null
          mobility_requirements?: string | null
          notes?: string | null
          phone?: string | null
          preferred_location?: string | null
          status?: Database["public"]["Enums"]["client_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_senior_clients_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tasks: {
        Row: {
          agent_id: string
          client_id: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          facility_id: string | null
          id: string
          is_completed: boolean | null
          priority: Database["public"]["Enums"]["task_priority"] | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          client_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          facility_id?: string | null
          id?: string
          is_completed?: boolean | null
          priority?: Database["public"]["Enums"]["task_priority"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          client_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          facility_id?: string | null
          id?: string
          is_completed?: boolean | null
          priority?: Database["public"]["Enums"]["task_priority"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_tasks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "agent_senior_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "agent_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_embeddings: {
        Row: {
          facility_id: string | null
          id: string
          vector: number[] | null
        }
        Insert: {
          facility_id?: string | null
          id?: string
          vector?: number[] | null
        }
        Update: {
          facility_id?: string | null
          id?: string
          vector?: number[] | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          budget_range: string | null
          conversation_history: Json | null
          created_at: string | null
          id: string
          other_preferences: Json | null
          preferred_location: string | null
          recommended_care_types: string[] | null
          summary: string | null
          user_id: string | null
        }
        Insert: {
          budget_range?: string | null
          conversation_history?: Json | null
          created_at?: string | null
          id?: string
          other_preferences?: Json | null
          preferred_location?: string | null
          recommended_care_types?: string[] | null
          summary?: string | null
          user_id?: string | null
        }
        Update: {
          budget_range?: string | null
          conversation_history?: Json | null
          created_at?: string | null
          id?: string
          other_preferences?: Json | null
          preferred_location?: string | null
          recommended_care_types?: string[] | null
          summary?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      conversation_history: {
        Row: {
          conversation: string | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          conversation?: string | null
          created_at?: string | null
          id?: never
          user_id?: string | null
        }
        Update: {
          conversation?: string | null
          created_at?: string | null
          id?: never
          user_id?: string | null
        }
        Relationships: []
      }
      features: {
        Row: {
          facility_id: string | null
          feature_type: string | null
          id: string
          value: string | null
        }
        Insert: {
          facility_id?: string | null
          feature_type?: string | null
          id?: string
          value?: string | null
        }
        Update: {
          facility_id?: string | null
          feature_type?: string | null
          id?: string
          value?: string | null
        }
        Relationships: []
      }
      google_places_results: {
        Row: {
          business_status: string | null
          created_at: string | null
          formatted_address: string | null
          icon: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          phone_number: string | null
          photos: Json | null
          place_id: string
          plus_code: Json | null
          price_level: number | null
          rating: number | null
          thumbnails: string[] | null
          types: string[] | null
          user_ratings_total: number | null
          website: string | null
        }
        Insert: {
          business_status?: string | null
          created_at?: string | null
          formatted_address?: string | null
          icon?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          phone_number?: string | null
          photos?: Json | null
          place_id: string
          plus_code?: Json | null
          price_level?: number | null
          rating?: number | null
          thumbnails?: string[] | null
          types?: string[] | null
          user_ratings_total?: number | null
          website?: string | null
        }
        Update: {
          business_status?: string | null
          created_at?: string | null
          formatted_address?: string | null
          icon?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          phone_number?: string | null
          photos?: Json | null
          place_id?: string
          plus_code?: Json | null
          price_level?: number | null
          rating?: number | null
          thumbnails?: string[] | null
          types?: string[] | null
          user_ratings_total?: number | null
          website?: string | null
        }
        Relationships: []
      }
      nationwide_facilities: {
        Row: {
          "Abuse Icon": string | null
          "Affiliated Entity ID": string | null
          "Affiliated Entity Name": string | null
          "Average Number of Residents per Day": number | null
          "City/Town": string | null
          "CMS Certification Number (CCN)": string | null
          "Continuing Care Retirement Community": string | null
          "County/Parish": string | null
          "Date First Approved to Provide Medicare and Medicaid Services":
            | string
            | null
          "Health Inspection Rating": number | null
          Latitude: number | null
          "Legal Business Name": string | null
          Location: string | null
          Longitude: number | null
          "Number of Certified Beds": number | null
          "Number of Citations from Infection Control Inspections":
            | string
            | null
          "Number of Facility Reported Incidents": string | null
          "Number of Fines": string | null
          "Number of Substantiated Complaints": string | null
          "Overall Rating": number | null
          "Provider Address": string | null
          "Provider Name": string | null
          "Provider SSA County Code": number | null
          "Provider Type": string | null
          "QM Rating": number | null
          "QM Rating Footnote": string | null
          "Special Focus Status": string | null
          "Staffing Rating": number | null
          State: string | null
          "Telephone Number": number | null
          "Total Amount of Fines in Dollars": string | null
          "Total Number of Penalties": string | null
          UUID: string
          "ZIP Code": number | null
        }
        Insert: {
          "Abuse Icon"?: string | null
          "Affiliated Entity ID"?: string | null
          "Affiliated Entity Name"?: string | null
          "Average Number of Residents per Day"?: number | null
          "City/Town"?: string | null
          "CMS Certification Number (CCN)"?: string | null
          "Continuing Care Retirement Community"?: string | null
          "County/Parish"?: string | null
          "Date First Approved to Provide Medicare and Medicaid Services"?:
            | string
            | null
          "Health Inspection Rating"?: number | null
          Latitude?: number | null
          "Legal Business Name"?: string | null
          Location?: string | null
          Longitude?: number | null
          "Number of Certified Beds"?: number | null
          "Number of Citations from Infection Control Inspections"?:
            | string
            | null
          "Number of Facility Reported Incidents"?: string | null
          "Number of Fines"?: string | null
          "Number of Substantiated Complaints"?: string | null
          "Overall Rating"?: number | null
          "Provider Address"?: string | null
          "Provider Name"?: string | null
          "Provider SSA County Code"?: number | null
          "Provider Type"?: string | null
          "QM Rating"?: number | null
          "QM Rating Footnote"?: string | null
          "Special Focus Status"?: string | null
          "Staffing Rating"?: number | null
          State?: string | null
          "Telephone Number"?: number | null
          "Total Amount of Fines in Dollars"?: string | null
          "Total Number of Penalties"?: string | null
          UUID?: string
          "ZIP Code"?: number | null
        }
        Update: {
          "Abuse Icon"?: string | null
          "Affiliated Entity ID"?: string | null
          "Affiliated Entity Name"?: string | null
          "Average Number of Residents per Day"?: number | null
          "City/Town"?: string | null
          "CMS Certification Number (CCN)"?: string | null
          "Continuing Care Retirement Community"?: string | null
          "County/Parish"?: string | null
          "Date First Approved to Provide Medicare and Medicaid Services"?:
            | string
            | null
          "Health Inspection Rating"?: number | null
          Latitude?: number | null
          "Legal Business Name"?: string | null
          Location?: string | null
          Longitude?: number | null
          "Number of Certified Beds"?: number | null
          "Number of Citations from Infection Control Inspections"?:
            | string
            | null
          "Number of Facility Reported Incidents"?: string | null
          "Number of Fines"?: string | null
          "Number of Substantiated Complaints"?: string | null
          "Overall Rating"?: number | null
          "Provider Address"?: string | null
          "Provider Name"?: string | null
          "Provider SSA County Code"?: number | null
          "Provider Type"?: string | null
          "QM Rating"?: number | null
          "QM Rating Footnote"?: string | null
          "Special Focus Status"?: string | null
          "Staffing Rating"?: number | null
          State?: string | null
          "Telephone Number"?: number | null
          "Total Amount of Fines in Dollars"?: string | null
          "Total Number of Penalties"?: string | null
          UUID?: string
          "ZIP Code"?: number | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          alt_text: string | null
          facility_id: string | null
          id: string
          image_url: string | null
        }
        Insert: {
          alt_text?: string | null
          facility_id?: string | null
          id?: string
          image_url?: string | null
        }
        Update: {
          alt_text?: string | null
          facility_id?: string | null
          id?: string
          image_url?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author: string | null
          content: string | null
          facility_id: string | null
          id: string
          rating: number | null
          title: string | null
        }
        Insert: {
          author?: string | null
          content?: string | null
          facility_id?: string | null
          id?: string
          rating?: number | null
          title?: string | null
        }
        Update: {
          author?: string | null
          content?: string | null
          facility_id?: string | null
          id?: string
          rating?: number | null
          title?: string | null
        }
        Relationships: []
      }
      search_logs: {
        Row: {
          agent_mode: string | null
          id: string
          query: string | null
          session_id: string | null
          timestamp: string | null
        }
        Insert: {
          agent_mode?: string | null
          id?: string
          query?: string | null
          session_id?: string | null
          timestamp?: string | null
        }
        Update: {
          agent_mode?: string | null
          id?: string
          query?: string | null
          session_id?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      search_results: {
        Row: {
          created_at: string | null
          id: string
          results: Json | null
          session_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          results?: Json | null
          session_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          results?: Json | null
          session_id?: string | null
        }
        Relationships: []
      }
      serperapi_raw_results: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          parsing_status: string
          raw_json_data: Json
          user_search_request_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          parsing_status?: string
          raw_json_data: Json
          user_search_request_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          parsing_status?: string
          raw_json_data?: Json
          user_search_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "serpapi_raw_results_user_search_request_id_fkey"
            columns: ["user_search_request_id"]
            isOneToOne: false
            referencedRelation: "user_search_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_search_requests: {
        Row: {
          agent_id: string | null
          created_at: string
          error_message: string | null
          id: string
          search_criteria: Json
          serpapi_query_sent: string | null
          status: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          search_criteria: Json
          serpapi_query_sent?: string | null
          status?: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          search_criteria?: Json
          serpapi_query_sent?: string | null
          status?: string
        }
        Relationships: []
      }
      va_form_21p_534ez: {
        Row: {
          address: string
          assets: number
          claimant_full_name: string
          created_at: string | null
          date_of_death: string
          direct_deposit_account: string
          direct_deposit_routing: string
          email: string
          id: string
          income: number
          marriage_date: string
          number_of_children: number
          phone: string
          place_of_death: string
          relationship: string
          ssn: string
          updated_at: string | null
          veteran_full_name: string
          veteran_ssn: string
        }
        Insert: {
          address: string
          assets: number
          claimant_full_name: string
          created_at?: string | null
          date_of_death: string
          direct_deposit_account: string
          direct_deposit_routing: string
          email: string
          id?: string
          income: number
          marriage_date: string
          number_of_children: number
          phone: string
          place_of_death: string
          relationship: string
          ssn: string
          updated_at?: string | null
          veteran_full_name: string
          veteran_ssn: string
        }
        Update: {
          address?: string
          assets?: number
          claimant_full_name?: string
          created_at?: string | null
          date_of_death?: string
          direct_deposit_account?: string
          direct_deposit_routing?: string
          email?: string
          id?: string
          income?: number
          marriage_date?: string
          number_of_children?: number
          phone?: string
          place_of_death?: string
          relationship?: string
          ssn?: string
          updated_at?: string | null
          veteran_full_name?: string
          veteran_ssn?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_complete_schema: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_locations_by_tags: {
        Args: { input_tags: string[] }
        Returns: {
          id: number
          name: string
          address: string
          tags: string[]
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      interact_with_database: {
        Args: { command: string; params: Json }
        Returns: Json
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_feature_enabled: {
        Args: {
          feature_key: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Returns: boolean
      }
      manage_files_across_projects: {
        Args: {
          action: string
          project_id: number
          file_id: number
          file_data: Json
        }
        Returns: undefined
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      agent_role: "admin" | "agent" | "manager"
      app_role: "user" | "admin"
      client_status: "new" | "active" | "placed" | "inactive"
      interaction_type: "call" | "email" | "meeting" | "note"
      subscription_tier: "free" | "basic" | "premium"
      task_priority: "low" | "medium" | "high"
      task_status: "pending" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_role: ["admin", "agent", "manager"],
      app_role: ["user", "admin"],
      client_status: ["new", "active", "placed", "inactive"],
      interaction_type: ["call", "email", "meeting", "note"],
      subscription_tier: ["free", "basic", "premium"],
      task_priority: ["low", "medium", "high"],
      task_status: ["pending", "in_progress", "completed"],
    },
  },
} as const
