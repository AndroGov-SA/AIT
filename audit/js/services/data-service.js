/**
 * AndroGov Audit Data Service
 * @file audit/js/services/data-service.js
 * @description Provides audit-specific data management
 */

const DataService = (function() {

  // ==========================================
  // AUDIT DATA
  // ==========================================
  
  const _data = {
    
    // Audit Plan
    auditPlan: {
      year: 2026,
      totalTasks: 12,
      completed: 8,
      inProgress: 2,
      scheduled: 2,
      completionRate: 65,
      tasks: [
        {
          id: 'AUD-2026-001',
          department: { ar: 'إدارة المشتريات والعقود', en: 'Procurement & Contracts' },
          period: { ar: 'الربع الأول', en: 'Q1' },
          priority: 'high',
          status: 'in_progress',
          responsible: { ar: 'محمد العنزي', en: 'Mohammed Al-Enezi' },
          progress: 75,
          startDate: '2026-01-15',
          endDate: '2026-03-31'
        },
        {
          id: 'AUD-2026-002',
          department: { ar: 'نظم المعلومات والأمن السيبراني', en: 'IT & Cybersecurity' },
          period: { ar: 'الربع الثاني', en: 'Q2' },
          priority: 'medium',
          status: 'scheduled',
          responsible: { ar: 'سارة الأحمد', en: 'Sarah Al-Ahmad' },
          progress: 0,
          startDate: '2026-04-01',
          endDate: '2026-06-30'
        },
        {
          id: 'AUD-2026-003',
          department: { ar: 'الموارد البشرية', en: 'Human Resources' },
          period: { ar: 'الربع الثاني', en: 'Q2' },
          priority: 'low',
          status: 'scheduled',
          responsible: { ar: 'خالد السالم', en: 'Khaled Al-Salem' },
          progress: 0,
          startDate: '2026-05-01',
          endDate: '2026-06-30'
        }
      ]
    },

    // Observations
    observations: {
      total: 24,
      open: 8,
      closed: 16,
      highRisk: 2,
      mediumRisk: 4,
      lowRisk: 2,
      list: [
        {
          id: 'OBS-2026-001',
          reference: 'AUD-2026-001',
          title: { ar: 'تجاوز صلاحيات التعميد المالي', en: 'Financial Authorization Breach' },
          description: { 
            ar: 'تم اكتشاف أن الموظف المسؤول عن إدخال الموردين هو نفسه المسؤول عن تعميد الدفعات',
            en: 'Employee responsible for vendor registration also authorizes payments'
          },
          department: { ar: 'قسم المشتريات', en: 'Procurement Department' },
          riskLevel: 'high',
          status: 'open',
          severity: 'critical',
          reportedDate: '2026-01-20',
          dueDate: '2026-02-15',
          assignedTo: { ar: 'المدير المالي', en: 'CFO' },
          response: null
        },
        {
          id: 'OBS-2026-002',
          reference: 'AUD-2026-001',
          title: { ar: 'عدم وجود فصل بين المهام', en: 'Lack of Segregation of Duties' },
          description: { 
            ar: 'نقص في الضوابط الرقابية في عمليات الموافقة',
            en: 'Insufficient controls in approval processes'
          },
          department: { ar: 'إدارة المالية', en: 'Finance Department' },
          riskLevel: 'high',
          status: 'open',
          severity: 'major',
          reportedDate: '2026-01-18',
          dueDate: '2026-02-20',
          assignedTo: { ar: 'مدير الإدارة المالية', en: 'Finance Manager' },
          response: { ar: 'قيد المراجعة', en: 'Under Review' }
        },
        {
          id: 'OBS-2025-045',
          reference: 'AUD-2025-012',
          title: { ar: 'ضعف في توثيق الإجراءات', en: 'Weak Documentation Procedures' },
          description: { 
            ar: 'عدم توثيق كافي للعمليات التشغيلية',
            en: 'Insufficient documentation of operational processes'
          },
          department: { ar: 'العمليات', en: 'Operations' },
          riskLevel: 'medium',
          status: 'closed',
          severity: 'minor',
          reportedDate: '2025-12-10',
          closedDate: '2026-01-10',
          assignedTo: { ar: 'مدير العمليات', en: 'Operations Manager' },
          response: { ar: 'تم التنفيذ', en: 'Implemented' }
        }
      ]
    },

    // Risk Assessment
    risks: {
      total: 19,
      high: 2,
      medium: 5,
      low: 12,
      categories: [
        {
          category: { ar: 'المخاطر التشغيلية', en: 'Operational Risks' },
          level: 'medium',
          score: 50,
          trend: 'stable',
          items: 5
        },
        {
          category: { ar: 'المخاطر السيبرانية', en: 'Cyber Risks' },
          level: 'high',
          score: 85,
          trend: 'increasing',
          items: 3
        },
        {
          category: { ar: 'المخاطر المالية', en: 'Financial Risks' },
          level: 'low',
          score: 25,
          trend: 'decreasing',
          items: 4
        },
        {
          category: { ar: 'مخاطر الامتثال', en: 'Compliance Risks' },
          level: 'medium',
          score: 45,
          trend: 'stable',
          items: 7
        }
      ]
    },

    // Compliance Status
    compliance: {
      overallScore: 89,
      frameworks: [
        {
          name: { ar: 'لائحة حوكمة الشركات', en: 'Corporate Governance Regulation' },
          compliance: 95,
          status: 'compliant',
          lastReview: '2026-01-15',
          nextReview: '2026-07-15'
        },
        {
          name: { ar: 'معايير الأمن السيبراني الوطني', en: 'National Cybersecurity Standards' },
          compliance: 82,
          status: 'partial',
          lastReview: '2025-12-20',
          nextReview: '2026-06-20'
        },
        {
          name: { ar: 'قانون مكافحة غسل الأموال', en: 'Anti-Money Laundering Law' },
          compliance: 100,
          status: 'compliant',
          lastReview: '2025-11-10',
          nextReview: '2026-05-10'
        }
      ]
    },

    // Quarterly Reports
    reports: {
      current: 'Q1-2026',
      list: [
        {
          id: 'RPT-Q1-2026',
          quarter: 'Q1',
          year: 2026,
          title: { ar: 'تقرير التدقيق الداخلي - الربع الأول 2026', en: 'Internal Audit Report - Q1 2026' },
          status: 'draft',
          completionDate: null,
          submittedTo: null,
          findings: 5,
          recommendations: 8
        },
        {
          id: 'RPT-Q4-2025',
          quarter: 'Q4',
          year: 2025,
          title: { ar: 'تقرير التدقيق الداخلي - الربع الرابع 2025', en: 'Internal Audit Report - Q4 2025' },
          status: 'final',
          completionDate: '2026-01-10',
          submittedTo: { ar: 'لجنة المراجعة', en: 'Audit Committee' },
          findings: 7,
          recommendations: 12
        }
      ]
    },

    // Department Response Rate
    departmentCompliance: {
      overall: 89,
      departments: [
        { name: { ar: 'المالية', en: 'Finance' }, responseRate: 95, avgResponseTime: 5 },
        { name: { ar: 'المشتريات', en: 'Procurement' }, responseRate: 78, avgResponseTime: 12 },
        { name: { ar: 'الموارد البشرية', en: 'HR' }, responseRate: 92, avgResponseTime: 7 },
        { name: { ar: 'تقنية المعلومات', en: 'IT' }, responseRate: 88, avgResponseTime: 9 }
      ]
    }
  };

  // ==========================================
  // GETTERS
  // ==========================================
  
  function getAuditPlan() {
    return _data.auditPlan;
  }

  function getObservations(filter = null) {
    if (!filter) return _data.observations.list;
    
    return _data.observations.list.filter(obs => {
      if (filter.status && obs.status !== filter.status) return false;
      if (filter.riskLevel && obs.riskLevel !== filter.riskLevel) return false;
      if (filter.department && obs.department.ar !== filter.department && obs.department.en !== filter.department) return false;
      return true;
    });
  }

  function getRisks() {
    return _data.risks;
  }

  function getCompliance() {
    return _data.compliance;
  }

  function getReports() {
    return _data.reports;
  }

  function getDepartmentCompliance() {
    return _data.departmentCompliance;
  }

  // ==========================================
  // SPECIFIC QUERIES
  // ==========================================
  
  function getObservationById(id) {
    return _data.observations.list.find(o => o.id === id);
  }

  function getOpenObservations() {
    return _data.observations.list.filter(o => o.status === 'open');
  }

  function getHighRiskObservations() {
    return _data.observations.list.filter(o => o.riskLevel === 'high' && o.status === 'open');
  }

  function getTaskById(id) {
    return _data.auditPlan.tasks.find(t => t.id === id);
  }

  function getInProgressTasks() {
    return _data.auditPlan.tasks.filter(t => t.status === 'in_progress');
  }

  // ==========================================
  // STATISTICS
  // ==========================================
  
  function getAuditStats() {
    return {
      openObservations: _data.observations.open,
      planCompletion: _data.auditPlan.completionRate,
      ongoingAudits: _data.auditPlan.inProgress,
      departmentCompliance: _data.departmentCompliance.overall,
      highRisks: _data.risks.high,
      complianceScore: _data.compliance.overallScore
    };
  }

  function getRiskSummary() {
    return {
      total: _data.risks.total,
      high: _data.risks.high,
      medium: _data.risks.medium,
      low: _data.risks.low,
      categories: _data.risks.categories
    };
  }

  // ==========================================
  // ACTIONS
  // ==========================================
  
  function closeObservation(id, response) {
    const obs = _data.observations.list.find(o => o.id === id);
    if (obs) {
      obs.status = 'closed';
      obs.closedDate = new Date().toISOString().split('T')[0];
      obs.response = response;
      _data.observations.open--;
      _data.observations.closed++;
      saveToStorage();
      return true;
    }
    return false;
  }

  function updateTaskProgress(id, progress) {
    const task = _data.auditPlan.tasks.find(t => t.id === id);
    if (task) {
      task.progress = progress;
      if (progress === 100) {
        task.status = 'completed';
        _data.auditPlan.completed++;
        _data.auditPlan.inProgress--;
      }
      saveToStorage();
      return true;
    }
    return false;
  }

  function addObservation(observation) {
    const newObs = {
      id: `OBS-${new Date().getFullYear()}-${String(_data.observations.total + 1).padStart(3, '0')}`,
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'open',
      ...observation
    };
    _data.observations.list.unshift(newObs);
    _data.observations.total++;
    _data.observations.open++;
    _data.observations[observation.riskLevel + 'Risk']++;
    saveToStorage();
    return newObs;
  }

  // ==========================================
  // LOCALIZATION HELPERS
  // ==========================================
  
  function getLocalizedData(data, lang = null) {
    const currentLang = lang || (localStorage.getItem('lang') || 'ar');
    
    if (Array.isArray(data)) {
      return data.map(item => localizeItem(item, currentLang));
    } else if (typeof data === 'object' && data !== null) {
      return localizeItem(data, currentLang);
    }
    return data;
  }

  function localizeItem(item, lang) {
    const localized = { ...item };
    
    Object.keys(localized).forEach(key => {
      if (typeof localized[key] === 'object' && localized[key] !== null && !Array.isArray(localized[key])) {
        if (localized[key].ar && localized[key].en) {
          localized[key] = localized[key][lang] || localized[key].ar;
        } else {
          localized[key] = localizeItem(localized[key], lang);
        }
      } else if (Array.isArray(localized[key])) {
        localized[key] = localized[key].map(subItem => 
          typeof subItem === 'object' ? localizeItem(subItem, lang) : subItem
        );
      }
    });
    
    return localized;
  }

  // ==========================================
  // LOCAL STORAGE
  // ==========================================
  
  function saveToStorage() {
    localStorage.setItem('audit_data', JSON.stringify(_data));
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('audit_data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        Object.assign(_data, parsed);
      } catch (e) {
        console.error('Error loading audit data:', e);
      }
    }
  }

  // Auto-load on init
  loadFromStorage();

  // ==========================================
  // PUBLIC API
  // ==========================================
  
  return {
    // Getters
    getAuditPlan,
    getObservations,
    getRisks,
    getCompliance,
    getReports,
    getDepartmentCompliance,
    
    // Specific Queries
    getObservationById,
    getOpenObservations,
    getHighRiskObservations,
    getTaskById,
    getInProgressTasks,
    
    // Statistics
    getAuditStats,
    getRiskSummary,
    
    // Actions
    closeObservation,
    updateTaskProgress,
    addObservation,
    
    // Localization
    getLocalizedData,
    
    // Storage
    saveToStorage,
    loadFromStorage
  };

})();

// Global Exposure
if (typeof window !== 'undefined') {
  window.DataService = DataService;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataService;
}

console.log('✅ Audit DataService Loaded');
