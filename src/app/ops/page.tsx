import { getAllKnowledge, getKnowledgeByDomain } from '@/lib/knowledge';
import { KnowledgeSearch } from '@/components/KnowledgeSearch';
import { Clock, AlertTriangle, TrendingUp, FileText, Zap, ChevronRight } from 'lucide-react';

export default function OpsDashboard() {
  const allData = getAllKnowledge();
  
  // Extract specific nodes for widgets
  const shotClockRule = allData.find(n => n.sub_topic === 'connectsphere_shotclock');
  const editKpi = allData.find(n => n.sub_topic === 'edit_minutes_per_photo');
  
  // Get all SOPs for the "Quick Links" section
  const recentSops = getKnowledgeByDomain('operations')
    .filter(n => n.knowledge_type === 'procedure' || n.knowledge_type === 'checklist')
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0B0B0D] p-8">
      <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">Ops Command</h1>
          <p className="text-gray-500">System Status: All Systems Go</p>
        </div>
        <KnowledgeSearch data={allData} />
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* WIDGET: SHOTCLOCK STATUS */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-brand-pink" />
              ShotClock Monitor
            </h3>
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">ACTIVE</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
              <span className="text-sm text-gray-300">The Night Owl (Tier 2)</span>
              <span className="font-mono font-bold text-brand-gold">T-14:20</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
              <span className="text-sm text-gray-300">Roxy's Cabaret (Pilot)</span>
              <span className="font-mono font-bold text-white">T-46:00</span>
            </div>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-xs text-gray-500">
              <span className="font-bold text-gray-400">Rule:</span> {shotClockRule?.content}
            </p>
          </div>
        </div>

        {/* WIDGET: KPI TRACKER */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-brand-gold" />
              Efficiency Metrics
            </h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-white">1.8</span>
            <span className="mb-1 text-sm text-gray-400">min/photo</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[70%] bg-brand-gold"></div>
          </div>
          <p className="mt-2 text-xs text-green-400">
            Currently beating target ({editKpi?.content.split(';')[0]})
          </p>
        </div>

        {/* WIDGET: QUICK ACTIONS */}
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1D] p-6">
           <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-blue-400" />
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 hover:bg-white/10">
              <FileText className="mb-2 h-6 w-6 text-gray-400" />
              <span className="text-xs font-semibold text-gray-300">New SOW</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 hover:bg-white/10">
              <AlertTriangle className="mb-2 h-6 w-6 text-brand-pink" />
              <span className="text-xs font-semibold text-gray-300">Log Issue</span>
            </button>
          </div>
        </div>

        {/* SECTION: RECENT SOPs */}
        <div className="col-span-full mt-6">
          <h3 className="mb-4 text-lg font-bold text-white">Active Procedures</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {recentSops.map(sop => (
              <div key={sop.id} className="group cursor-pointer rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-gold">{sop.sub_topic.replace(/_/g, ' ')}</span>
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-white" />
                </div>
                <p className="mt-1 text-sm text-gray-400">{sop.context}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
