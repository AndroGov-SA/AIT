/**
 * AndroGov CEO Data Service
 * @file ceo/js/services/data-service.js
 */

const DataService = (function() {

  // ==========================================
  // SAMPLE DATA
  // ==========================================
  
  const _data = {
    
    // Financial KPIs
    financial: {
      revenue: {
        ytd: 4200000,
        target: 5000000,
        growth: 12.5,
        trend: [3200000, 3500000, 3800000, 4000000, 4200000, 4500000]
      },
      expenses: {
        current: 1800000,
        budget: 3000000,
        saving: -5,
        trend: [1500000, 1600000, 1700000, 1600000, 1800000, 1900000]
      },
      profit: {
        net: 2400000,
        margin: 57,
        growth: 18.2
      }
    },

    // Projects
    projects: {
      active: 8,
      delayed: 1,
      onTrack: 7,
      list: [
        { id: 'PRJ001', name: 'منصة التجارة الإلكترونية', status: 'delayed', progress: 75, risk: 'high' },
        { id: 'PRJ002', name: 'تطوير تطبيق الموبايل', status: 'on-track', progress: 85, risk: 'low' },
        { id: 'PRJ003', name: 'نظام إدارة العملاء', status: 'on-track', progress: 60, risk: 'medium' },
        { id: 'PRJ004', name: 'البنية التحتية السحابية', status: 'on-track', progress: 90, risk: 'low' },
        { id: 'PRJ005', name: 'نظام الموارد البشرية', status: 'on-track', progress: 70, risk: 'low' },
        { id: 'PRJ006', name: 'منصة التحليلات', status: 'on-track', progress: 50, risk: 'medium' },
        { id: 'PRJ007', name: 'نظام إدارة المخزون', status: 'on-track', progress: 80, risk: 'low' },
        { id: 'PRJ008', name: 'بوابة الموردين', status: 'on-track', progress: 65, risk: 'medium' }
      ]
    },

    // Risks
    risks: {
      high: 2,
      medium: 5,
      low: 12,
      list: [
        { id: 'RSK001', title: 'تأخر مشروع التجارة الإلكترونية', level: 'high', impact: 'high', probability: 'high' },
        { id: 'RSK002', title: 'نقص الموارد التقنية', level: 'high', impact: 'high', probability: 'medium' },
        { id: 'RSK003', title: 'تقلبات السوق', level: 'medium', impact: 'medium', probability: 'medium' },
        { id: 'RSK004', title: 'تحديات الامتثال التنظيمي', level: 'medium', impact: 'high', probability: 'low' }
      ]
    },

    // Departments Performance
    departments: [
      { name: 'المبيعات والتسويق', progress: 75, target: 8000000, icon: 'fa-chart-line' },
      { name: 'المنتجات والتقنية', progress: 60, status: 'roadmap', icon: 'fa-code' },
      { name: 'الموارد البشرية', progress: 90, plan: 'hiring', icon: 'fa-users' }
    ],

    // Pending Decisions
    decisions: [
      {
        id: 'DEC001',
        type: 'approval',
        title: 'شراء خوادم جديدة (CFO)',
        description: 'طلب اعتماد شراء خوادم Dell PowerEdge لمركز البيانات',
        amount: 150000,
        requester: 'CFO',
        date: new Date(),
        priority: 'high'
      },
      {
        id: 'DEC002',
        type: 'contract',
        title: 'شراكة استراتيجية (Microsoft)',
        description: 'توقيع مذكرة التفاهم النهائية للتحول الرقمي',
        document: 'MoU_Final_v2.pdf',
        requester: 'CTO',
        date: new Date(Date.now() - 86400000), // Yesterday
        priority: 'urgent'
      }
    ],

    // Board Members
    boardMembers: [
      { id: 'BRD001', name: 'عبدالله السلمان', role: 'رئيس المجلس', status: 'independent' },
      { id: 'BRD002', name: 'هشام السحيباني', role: 'نائب الرئيس', status: 'executive' },
      { id: 'BRD003', name: 'سارة المطيري', role: 'عضو مجلس', status: 'independent' },
      { id: 'BRD004', name: 'فهد الغامدي', role: 'عضو مجلس', status: 'non-executive' }
    ],

    // Shareholders
    shareholders: {
      total: 1000000,
      distribution: [
        { name: 'مستثمرون مؤسسيون', shares: 400000, percentage: 40 },
        { name: 'مستثمرون أفراد', shares: 350000, percentage: 35 },
        { name: 'الإدارة التنفيذية', shares: 150000, percentage: 15 },
        { name: 'صندوق الاستثمار', shares: 100000, percentage: 10 }
      ]
    }
  };

  // ==========================================
  // GETTERS
  // ==========================================
  
  function getFinancialData() {
    return _data.financial;
  }

  function getProjects() {
    return _data.projects;
  }

  function getRisks() {
    return _data.risks;
  }

  function getDepartments() {
    return _data.departments;
  }

  function getPendingDecisions() {
    return _data.decisions;
  }

  function getBoardMembers() {
    return _data.boardMembers;
  }

  function getShareholders() {
    return _data.shareholders;
  }

  // ==========================================
  // SPECIFIC QUERIES
  // ==========================================
  
  function getProjectById(id) {
    return _data.projects.list.find(p => p.id === id);
  }

  function getRiskById(id) {
    return _data.risks.list.find(r => r.id === id);
  }

  function getDelayedProjects() {
    return _data.projects.list.filter(p => p.status === 'delayed');
  }

  function getHighRisks() {
    return _data.risks.list.filter(r => r.level === 'high');
  }

  // ==========================================
  // ACTIONS
  // ==========================================
  
  function approveDecision(id) {
    const decision = _data.decisions.find(d => d.id === id);
    if (decision) {
      decision.status = 'approved';
      decision.approvedAt = new Date();
      console.log('✅ Decision approved:', id);
      return true;
    }
    return false;
  }

  function rejectDecision(id) {
    const decision = _data.decisions.find(d => d.id === id);
    if (decision) {
      decision.status = 'rejected';
      decision.rejectedAt = new Date();
      console.log('❌ Decision rejected:', id);
      return true;
    }
    return false;
  }

  // ==========================================
  // DASHBOARD SUMMARY
  // ==========================================
  
  function getDashboardSummary() {
    return {
      revenue: {
        value: _data.financial.revenue.ytd,
        growth: _data.financial.revenue.growth,
        target: _data.financial.revenue.target,
        progress: (_data.financial.revenue.ytd / _data.financial.revenue.target) * 100
      },
      profit: {
        value: _data.financial.profit.net,
        margin: _data.financial.profit.margin,
        growth: _data.financial.profit.growth
      },
      projects: {
        total: _data.projects.active,
        delayed: _data.projects.delayed,
        onTrack: _data.projects.onTrack
      },
      risks: {
        high: _data.risks.high,
        medium: _data.risks.medium,
        low: _data.risks.low,
        total: _data.risks.high + _data.risks.medium + _data.risks.low
      }
    };
  }

  // ==========================================
  // LOCAL STORAGE SYNC
  // ==========================================
  
  function saveToStorage() {
    localStorage.setItem('ceo_data', JSON.stringify(_data));
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('ceo_data');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(_data, parsed);
    }
  }

  // Auto-load on init
  loadFromStorage();

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  return {
    // Getters
    getFinancialData,
    getProjects,
    getRisks,
    getDepartments,
    getPendingDecisions,
    getBoardMembers,
    getShareholders,
    
    // Specific Queries
    getProjectById,
    getRiskById,
    getDelayedProjects,
    getHighRisks,
    
    // Actions
    approveDecision,
    rejectDecision,
    
    // Summary
    getDashboardSummary,
    
    // Storage
    saveToStorage,
    loadFromStorage
  };

})();

window.DataService = DataService;
