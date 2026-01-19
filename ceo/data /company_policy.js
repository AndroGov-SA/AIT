/**
 * Andromeda IT Company Policy Database
 * @file ceo/data/company_policy.js
 */

const CompanyPolicy = {
  
  // ==========================================
  // COMPANY INFORMATION
  // ==========================================
  
  company: {
    nameAr: 'شركة أندروميدا لتقنية المعلومات',
    nameEn: 'Andromeda Information Technology Company',
    crNumber: '1010987654',
    taxNumber: '300123456789003',
    established: '2015-03-15',
    capital: 10000000,
    headquarters: {
      ar: 'الرياض، المملكة العربية السعودية',
      en: 'Riyadh, Saudi Arabia'
    },
    industry: {
      ar: 'تقنية المعلومات والحلول الرقمية',
      en: 'Information Technology & Digital Solutions'
    }
  },

  // ==========================================
  // GOVERNANCE POLICIES
  // ==========================================
  
  governance: {
    
    boardComposition: {
      totalSeats: 7,
      independent: 4,
      executive: 2,
      nonExecutive: 1,
      term: 3, // years
      meetingsPerYear: 6
    },

    committees: [
      {
        id: 'AUDIT_COM',
        name: { ar: 'لجنة المراجعة', en: 'Audit Committee' },
        members: 3,
        chair: 'سارة المطيري',
        responsibilities: [
          { ar: 'الإشراف على نظام الرقابة الداخلية', en: 'Oversee internal control system' },
          { ar: 'مراجعة القوائم المالية', en: 'Review financial statements' },
          { ar: 'التوصية بتعيين المراجع الخارجي', en: 'Recommend external auditor' }
        ]
      },
      {
        id: 'NOM_COM',
        name: { ar: 'لجنة الترشيحات والمكافآت', en: 'Nomination & Remuneration Committee' },
        members: 3,
        chair: 'فهد الغامدي',
        responsibilities: [
          { ar: 'اقتراح سياسات المكافآت', en: 'Propose remuneration policies' },
          { ar: 'ترشيح أعضاء مجلس الإدارة', en: 'Nominate board members' },
          { ar: 'تقييم أداء المجلس', en: 'Evaluate board performance' }
        ]
      },
      {
        id: 'EXEC_COM',
        name: { ar: 'اللجنة التنفيذية', en: 'Executive Committee' },
        members: 4,
        chair: 'هشام السحيباني',
        responsibilities: [
          { ar: 'متابعة تنفيذ الاستراتيجية', en: 'Monitor strategy execution' },
          { ar: 'اتخاذ القرارات العاجلة', en: 'Make urgent decisions' },
          { ar: 'الموافقة على الاستثمارات الكبرى', en: 'Approve major investments' }
        ]
      }
    ],

    codeOfConduct: {
      version: '2.1',
      lastUpdated: '2025-01-01',
      keyPrinciples: [
        { ar: 'النزاهة والشفافية', en: 'Integrity and Transparency' },
        { ar: 'المساءلة والمسؤولية', en: 'Accountability and Responsibility' },
        { ar: 'العدالة والمساواة', en: 'Fairness and Equality' },
        { ar: 'احترام القوانين', en: 'Respect for Laws' }
      ]
    },

    conflictOfInterest: {
      policy: {
        ar: 'يجب على جميع الأعضاء الإفصاح عن أي تضارب محتمل في المصالح',
        en: 'All members must disclose any potential conflicts of interest'
      },
      disclosureRequired: true,
      approvalAuthority: 'Board of Directors'
    }
  },

  // ==========================================
  // DELEGATION OF AUTHORITY (DOA)
  // ==========================================
  
  doa: {
    ceo: {
      position: 'Chief Executive Officer',
      limits: {
        financialApproval: 500000,
        contractSigning: 1000000,
        hiring: 'All levels below C-Suite',
        strategicDecisions: 'With Board approval for major initiatives'
      },
      authorities: [
        { ar: 'الموافقة على النفقات حتى 500 ألف ريال', en: 'Approve expenses up to 500K SAR' },
        { ar: 'توقيع العقود حتى مليون ريال', en: 'Sign contracts up to 1M SAR' },
        { ar: 'التوظيف لجميع المستويات تحت C-Suite', en: 'Hire all levels below C-Suite' },
        { ar: 'اتخاذ القرارات التشغيلية اليومية', en: 'Make daily operational decisions' }
      ]
    },
    
    cfo: {
      position: 'Chief Financial Officer',
      limits: {
        financialApproval: 200000,
        contractSigning: 300000,
        budgetAdjustment: 100000
      },
      authorities: [
        { ar: 'الموافقة على النفقات المالية حتى 200 ألف', en: 'Approve financial expenses up to 200K' },
        { ar: 'إعداد الميزانية السنوية', en: 'Prepare annual budget' },
        { ar: 'الإشراف على التدقيق الداخلي', en: 'Oversee internal audit' }
      ]
    },

    cto: {
      position: 'Chief Technology Officer',
      limits: {
        financialApproval: 150000,
        technologyDecisions: 'Full authority within budget',
        vendorSelection: 'With CFO approval for >100K'
      },
      authorities: [
        { ar: 'اختيار التقنيات والأنظمة', en: 'Select technologies and systems' },
        { ar: 'الموافقة على المشاريع التقنية', en: 'Approve technical projects' },
        { ar: 'إدارة فرق التطوير', en: 'Manage development teams' }
      ]
    }
  },

  // ==========================================
  // STRATEGIC OBJECTIVES (2026-2028)
  // ==========================================
  
  strategy: {
    vision: {
      ar: 'أن نكون الشركة الرائدة في الحلول التقنية المتكاملة بالمملكة',
      en: 'To be the leading provider of integrated technology solutions in the Kingdom'
    },
    
    mission: {
      ar: 'تقديم حلول تقنية مبتكرة تساعد عملاءنا على تحقيق التحول الرقمي',
      en: 'Deliver innovative technology solutions that enable our clients\' digital transformation'
    },

    strategicGoals: [
      {
        id: 'SG01',
        title: { ar: 'النمو المالي', en: 'Financial Growth' },
        target: { ar: 'زيادة الإيرادات بنسبة 25% سنوياً', en: 'Increase revenue by 25% annually' },
        kpis: [
          { metric: 'Revenue Growth', target: '25%', current: '12.5%' },
          { metric: 'Net Profit Margin', target: '60%', current: '57%' }
        ]
      },
      {
        id: 'SG02',
        title: { ar: 'التميز التشغيلي', en: 'Operational Excellence' },
        target: { ar: 'تحسين الكفاءة التشغيلية بنسبة 30%', en: 'Improve operational efficiency by 30%' },
        kpis: [
          { metric: 'Project On-Time Delivery', target: '95%', current: '87.5%' },
          { metric: 'Customer Satisfaction', target: '90%', current: '85%' }
        ]
      },
      {
        id: 'SG03',
        title: { ar: 'الابتكار والتطوير', en: 'Innovation & Development' },
        target: { ar: 'إطلاق 5 منتجات جديدة سنوياً', en: 'Launch 5 new products annually' },
        kpis: [
          { metric: 'New Products Launched', target: '5', current: '2' },
          { metric: 'R&D Investment', target: '15%', current: '10%' }
        ]
      }
    ]
  },

  // ==========================================
  // RISK MANAGEMENT FRAMEWORK
  // ==========================================
  
  riskManagement: {
    framework: {
      ar: 'إطار إدارة المخاطر المؤسسية (ERM)',
      en: 'Enterprise Risk Management Framework (ERM)'
    },
    
    riskAppetite: {
      financial: 'Medium',
      operational: 'Low',
      strategic: 'Medium-High',
      reputational: 'Very Low'
    },

    riskCategories: [
      { id: 'FIN', name: { ar: 'مخاطر مالية', en: 'Financial Risks' } },
      { id: 'OPR', name: { ar: 'مخاطر تشغيلية', en: 'Operational Risks' } },
      { id: 'STR', name: { ar: 'مخاطر استراتيجية', en: 'Strategic Risks' } },
      { id: 'CYB', name: { ar: 'مخاطر سيبرانية', en: 'Cyber Risks' } },
      { id: 'REG', name: { ar: 'مخاطر امتثال تنظيمي', en: 'Regulatory Risks' } }
    ],

    keyRisks: [
      {
        id: 'R001',
        category: 'STR',
        title: { ar: 'المنافسة الشديدة', en: 'Intense Competition' },
        impact: 'High',
        probability: 'High',
        mitigation: { ar: 'الاستثمار في الابتكار والتميز', en: 'Invest in innovation and differentiation' }
      },
      {
        id: 'R002',
        category: 'CYB',
        title: { ar: 'الهجمات السيبرانية', en: 'Cyber Attacks' },
        impact: 'Very High',
        probability: 'Medium',
        mitigation: { ar: 'تطبيق بروتوكولات أمنية متقدمة', en: 'Implement advanced security protocols' }
      },
      {
        id: 'R003',
        category: 'OPR',
        title: { ar: 'نقص المواهب التقنية', en: 'Talent Shortage' },
        impact: 'High',
        probability: 'High',
        mitigation: { ar: 'برامج تطوير وتدريب الكوادر', en: 'Talent development and training programs' }
      }
    ]
  },

  // ==========================================
  // COMPLIANCE REQUIREMENTS
  // ==========================================
  
  compliance: {
    regulations: [
      {
        id: 'REG001',
        name: { ar: 'نظام الشركات السعودي', en: 'Saudi Companies Law' },
        authority: 'Ministry of Commerce',
        lastReview: '2025-01-15',
        status: 'Compliant'
      },
      {
        id: 'REG002',
        name: { ar: 'نظام حماية البيانات الشخصية', en: 'Personal Data Protection Law' },
        authority: 'SDAIA',
        lastReview: '2025-01-10',
        status: 'Compliant'
      },
      {
        id: 'REG003',
        name: { ar: 'ضوابط الأمن السيبراني', en: 'Cybersecurity Controls' },
        authority: 'NCA',
        lastReview: '2024-12-20',
        status: 'In Progress'
      }
    ],

    certifications: [
      { name: 'ISO 27001', status: 'Active', expiry: '2026-06-30' },
      { name: 'ISO 9001', status: 'Active', expiry: '2026-03-15' },
      { name: 'SOC 2 Type II', status: 'In Progress', expected: '2026-04-30' }
    ]
  },

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================
  
  getCompanyInfo() {
    return this.company;
  },

  getGovernancePolicies() {
    return this.governance;
  },

  getDOA(position) {
    return this.doa[position.toLowerCase()] || null;
  },

  getStrategicPlan() {
    return this.strategy;
  },

  getRiskFramework() {
    return this.riskManagement;
  },

  getComplianceStatus() {
    return this.compliance;
  }
};

// Make available globally
window.CompanyPolicy = CompanyPolicy;
