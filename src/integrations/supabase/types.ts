export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      children: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          gender: string | null
          id: string
          points: number | null
          stars: number | null
          streak: number | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          gender?: string | null
          id?: string
          points?: number | null
          stars?: number | null
          streak?: number | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          points?: number | null
          stars?: number | null
          streak?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          child_id: string
          completed_at: string | null
          enrolled_at: string
          id: string
          program_id: string
          progress: number | null
          status: string | null
        }
        Insert: {
          child_id: string
          completed_at?: string | null
          enrolled_at?: string
          id?: string
          program_id: string
          progress?: number | null
          status?: string | null
        }
        Update: {
          child_id?: string
          completed_at?: string | null
          enrolled_at?: string
          id?: string
          program_id?: string
          progress?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          child_id: string
          created_at: string
          id: string
          is_completed: boolean | null
          lesson_date: string
          lesson_time: string
          material_url: string | null
          program_id: string | null
          recording_url: string | null
          title: string
          tutor_name: string | null
          zoom_link: string | null
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          is_completed?: boolean | null
          lesson_date: string
          lesson_time: string
          material_url?: string | null
          program_id?: string | null
          recording_url?: string | null
          title: string
          tutor_name?: string | null
          zoom_link?: string | null
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          is_completed?: boolean | null
          lesson_date?: string
          lesson_time?: string
          material_url?: string | null
          program_id?: string | null
          recording_url?: string | null
          title?: string
          tutor_name?: string | null
          zoom_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_child_relationships: {
        Row: {
          child_id: string
          created_at: string
          id: string
          parent_email: string
        }
        Insert: {
          child_id: string
          created_at?: string
          id?: string
          parent_email: string
        }
        Update: {
          child_id?: string
          created_at?: string
          id?: string
          parent_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "parent_child_relationships_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_credits: {
        Row: {
          credits_balance: number
          credits_used: number
          id: string
          last_updated: string
          parent_email: string
        }
        Insert: {
          credits_balance?: number
          credits_used?: number
          id?: string
          last_updated?: string
          parent_email: string
        }
        Update: {
          credits_balance?: number
          credits_used?: number
          id?: string
          last_updated?: string
          parent_email?: string
        }
        Relationships: []
      }
      payment_history: {
        Row: {
          amount_cents: number
          child_id: string | null
          credits_purchased: number
          id: string
          invoice_url: string | null
          parent_email: string
          payment_date: string
          plan_id: string | null
          status: string
        }
        Insert: {
          amount_cents: number
          child_id?: string | null
          credits_purchased: number
          id?: string
          invoice_url?: string | null
          parent_email: string
          payment_date?: string
          plan_id?: string | null
          status?: string
        }
        Update: {
          amount_cents?: number
          child_id?: string | null
          credits_purchased?: number
          id?: string
          invoice_url?: string | null
          parent_email?: string
          payment_date?: string
          plan_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_history_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          created_at: string
          credits_required: number
          description: string | null
          duration_weeks: number | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          credits_required?: number
          description?: string | null
          duration_weeks?: number | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          credits_required?: number
          description?: string | null
          duration_weeks?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          credits_per_period: number
          description: string | null
          features: string[] | null
          id: string
          name: string
          period_months: number | null
          price_cents: number
        }
        Insert: {
          created_at?: string
          credits_per_period: number
          description?: string | null
          features?: string[] | null
          id?: string
          name: string
          period_months?: number | null
          price_cents: number
        }
        Update: {
          created_at?: string
          credits_per_period?: number
          description?: string | null
          features?: string[] | null
          id?: string
          name?: string
          period_months?: number | null
          price_cents?: number
        }
        Relationships: []
      }
      teacher_programs: {
        Row: {
          completed_at: string | null
          id: string
          program_id: string
          status: Database["public"]["Enums"]["program_status"] | null
          teacher_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          program_id: string
          status?: Database["public"]["Enums"]["program_status"] | null
          teacher_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          program_id?: string
          status?: Database["public"]["Enums"]["program_status"] | null
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_programs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_email: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "parent" | "student" | "teacher"
      program_status: "incomplete" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "parent", "student", "teacher"],
      program_status: ["incomplete", "in_progress", "completed"],
    },
  },
} as const
