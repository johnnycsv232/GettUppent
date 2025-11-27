/**
 * GettUpp OS - Core Data Types
 * 
 * This file defines the TypeScript interfaces for all business entities
 * used throughout the application.
 */

// ============================================
// CLIENT (Paying Customers)
// ============================================

export type ClientStatus = 
  | 'pending'      // Converted from lead, awaiting payment
  | 'active'       // Paid and in service
  | 'completed'    // All deliverables delivered
  | 'cancelled';   // Service cancelled

export type ClientTier = 
  | 'pilot'        // Introductory package
  | 't1'           // Tier 1 - Basic
  | 't2'           // Tier 2 - Standard
  | 'vip';         // VIP - Premium

export interface Client {
  id: string;
  // Contact Information
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  
  // Business Relationship
  tier: ClientTier;
  status: ClientStatus;
  
  // Financial
  amountPaid: number;
  stripeCustomerId?: string;
  stripePaymentIntentId?: string;
  
  // Source Tracking
  leadId?: string;  // Original lead ID if converted
  source: string;   // How they found us
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  convertedAt?: Date;  // When converted from lead
  
  // Notes
  notes?: string;
}

// ============================================
// SHOOT (Photo Sessions)
// ============================================

export type ShootStatus = 
  | 'scheduled'    // Date set, not yet occurred
  | 'confirmed'    // Client confirmed attendance
  | 'in_progress'  // Currently happening
  | 'completed'    // Shoot done, pending delivery
  | 'delivered'    // All deliverables sent
  | 'cancelled';   // Session cancelled

export type ShootType = 
  | 'pilot'
  | 'standard'
  | 'premium'
  | 'vip';

export interface Shoot {
  id: string;
  clientId: string;
  
  // Scheduling
  type: ShootType;
  status: ShootStatus;
  scheduledDate: Date;
  location?: string;
  duration: number;  // In minutes
  
  // Deliverables
  totalImages: number;
  deliveredImages: number;
  deliveryDeadline?: Date;
  
  // Team
  photographerId?: string;
  photographerName?: string;
  
  // Notes
  notes?: string;
  clientNotes?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// ============================================
// LEAD (Pilot Intake Submissions)
// ============================================

export type LeadStatus = 
  | 'new'          // Just submitted
  | 'contacted'    // We reached out
  | 'qualified'    // Good fit, interested
  | 'converted'    // Became a client
  | 'disqualified' // Not a fit
  | 'lost';        // Didn't convert

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  
  status: LeadStatus;
  source: string;
  
  // Intake responses
  goals?: string;
  budget?: string;
  timeline?: string;
  
  // Tracking
  notes?: string;
  assignedTo?: string;
  
  // Conversion
  convertedToClientId?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// INVOICE (Payment Records)
// ============================================

export type InvoiceStatus = 
  | 'draft'        // Not yet sent
  | 'sent'         // Sent to client
  | 'paid'         // Payment received
  | 'cancelled'    // Invoice cancelled
  | 'refunded';    // Payment refunded

export interface Invoice {
  id: string;
  clientId: string;
  
  // Financial
  amount: number;
  currency: string;
  status: InvoiceStatus;
  
  // Stripe Integration
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  
  // Details
  description: string;
  tier: ClientTier;
  
  // Timestamps
  createdAt: Date;
  paidAt?: Date;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================
// Stripe Product Configuration
// ============================================

export interface StripeProduct {
  name: string;
  description: string;
  tier: ClientTier;
  price: number;  // In cents
  features: string[];
}

export const STRIPE_PRODUCTS: Record<ClientTier, StripeProduct> = {
  pilot: {
    name: 'GettUpp Pilot',
    description: 'Introductory photo session - Perfect for first-timers',
    tier: 'pilot',
    price: 29900,  // $299
    features: [
      '1-hour photo session',
      '10 edited digital images',
      'Online gallery access',
      '48-hour turnaround',
    ],
  },
  t1: {
    name: 'GettUpp Tier 1',
    description: 'Basic package for emerging creators',
    tier: 't1',
    price: 59900,  // $599
    features: [
      '2-hour photo session',
      '25 edited digital images',
      'Online gallery access',
      '1 outfit change',
      '7-day turnaround',
    ],
  },
  t2: {
    name: 'GettUpp Tier 2',
    description: 'Standard package for serious creators',
    tier: 't2',
    price: 99900,  // $999
    features: [
      '3-hour photo session',
      '50 edited digital images',
      'Online gallery access',
      '3 outfit changes',
      'Location scouting',
      '5-day turnaround',
    ],
  },
  vip: {
    name: 'GettUpp VIP',
    description: 'Premium package for professional creators',
    tier: 'vip',
    price: 199900,  // $1999
    features: [
      'Full-day photo session (8 hours)',
      '100+ edited digital images',
      'Private online gallery',
      'Unlimited outfit changes',
      'Multiple locations',
      'Video content included',
      'Priority 3-day turnaround',
      'Dedicated account manager',
    ],
  },
};
