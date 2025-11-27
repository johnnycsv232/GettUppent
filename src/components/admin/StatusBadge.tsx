'use client';

type StatusType = 
  | 'pending' | 'active' | 'completed' | 'cancelled' | 'archived'  // Client statuses
  | 'scheduled' | 'confirmed' | 'in_progress' | 'delivered'        // Shoot statuses
  | 'Pending' | 'Contacted' | 'Qualified' | 'Booked' | 'Declined'; // Lead statuses

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md';
}

const statusStyles: Record<string, string> = {
  // Client/General
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  archived: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  
  // Shoots
  scheduled: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  in_progress: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  delivered: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  
  // Leads (capitalized)
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Booked: 'bg-green-500/10 text-green-400 border-green-500/20',
  Declined: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const style = statusStyles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border capitalize ${style} ${sizeClasses}`}
    >
      {status.replace('_', ' ')}
    </span>
  );
}
