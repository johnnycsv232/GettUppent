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
  | 'cancelled'    // Service cancelled
  | 'past_due';    // Subscription payment failed

export type SubscriptionStatus = 
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'unpaid';

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
  
  // Subscription (for recurring tiers: t1, t2, vip)
  stripeSubscriptionId?: string;
  subscriptionStatus?: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  
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
  stripeInvoiceId?: string;
  stripeSubscriptionId?: string;
  
  // Details
  description: string;
  tier: ClientTier;
  
  // Timestamps
  createdAt: Date;
  paidAt?: Date;
}

// ============================================
// PAYMENT HISTORY (All Transactions)
// ============================================

export type PaymentType = 
  | 'one_time'       // Single purchase
  | 'subscription'   // Recurring payment
  | 'refund';        // Refund issued

export type PaymentStatus =
  | 'succeeded'
  | 'pending'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export interface Payment {
  id: string;
  clientId: string;
  
  // Transaction Details
  amount: number;
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  
  // Stripe Integration
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
  stripeInvoiceId?: string;
  stripeSubscriptionId?: string;
  
  // Refund Details (if applicable)
  refundedAmount?: number;
  refundReason?: string;
  
  // Metadata
  description: string;
  tier?: ClientTier;
  metadata?: Record<string, string>;
  
  // Timestamps
  createdAt: Date;
  updatedAt?: Date;
}

// ============================================
// SUBSCRIPTION (Stripe Subscription Tracking)
// ============================================

export interface Subscription {
  id: string;
  clientId: string;
  
  // Stripe Integration
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  stripePriceId: string;
  
  // Status
  status: SubscriptionStatus;
  tier: ClientTier;
  
  // Billing Period
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  
  // Financial
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
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
    name: 'GettUpp Pilot Night',
    description: 'Test the engine before you commit. One week. Full production. Zero risk.',
    tier: 'pilot',
    price: 34500,  // $345
    features: [
      '1 On-Site Content Shoot',
      '30 High-End Edited Photos',
      '72h Delivery Turnaround',
      'Social Strategy Audit',
    ],
  },
  t1: {
    name: 'GettUpp Tier 1',
    description: 'Consistent content for growing venues',
    tier: 't1',
    price: 44500,  // $445/mo
    features: [
      '2 Shoots per Month',
      '60 Edited Photos',
      '72h Delivery',
      'Private Gallery Access',
      'Monthly Strategy Call',
    ],
  },
  t2: {
    name: 'GettUpp Tier 2',
    description: 'Dominate your feed with premium content',
    tier: 't2',
    price: 69500,  // $695/mo
    features: [
      '4 Shoots per Month',
      '120 Edited Photos',
      '48h Delivery',
      'Private Gallery Access',
      'Bi-Weekly Strategy Calls',
      'Priority Scheduling',
    ],
  },
  vip: {
    name: 'GettUpp VIP',
    description: 'Full-service content domination for elite venues',
    tier: 'vip',
    price: 99500,  // $995/mo
    features: [
      'Unlimited Shoots',
      'Unlimited Photos',
      '24h Delivery',
      'Dedicated Photographer',
      'Weekly Strategy Sessions',
      'Same-Day Edits Available',
      'GettUpp Girls Integration',
      'Exclusive Event Coverage',
    ],
  },
};
