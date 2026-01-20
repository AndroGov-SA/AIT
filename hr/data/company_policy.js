/**
 * ==========================================
 * Andromeda IT Company - Board Portal Policy Database
 * @file board/data/company_policy.js
 * @version 4.0.0 - Real Data Integration
 * @description Comprehensive company policy with actual Andromeda IT data
 * ==========================================
 */

const CompanyPolicy = {
  
  // ==========================================
  // 1. COMPANY INFORMATION
  // ==========================================
  
  company: {
    nameAr: 'شركة اندروميدا لتقنية المعلومات',
    nameEn: 'Andromeda Information Technology Company',
    crNumber: '1010987654',
    taxNumber: '300123456789003',
    established: '2015-03-15',
    website: 'https://andromeda-it.com',
    fiscalYearEnd: '12-31',
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
  // 2. CAPITAL STRUCTURE (REAL DATA)
  // ==========================================
  
  capital: {
    amount: 6000000,
    currency: "SAR",
    sharesCount: 600000,
    shareValue: 10,
    status: "fully_paid"
  },

  // ==========================================
  // 3. SHAREHOLDERS (REAL DATA - 11 SHAREHOLDERS)
  // ==========================================
  
  shareholders: [
    { 
      id: "SH_001", 
      name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, 
      percent: 35, 
      shares: 210000, 
      type: "Individual", 
      voting: true, 
      email: "alcaseer@gmail.com", 
      proxy: { ar: "وائل السحيباني", en: "Wael Al-Suhaibani" } 
    },
    { 
      id: "SH_002", 
      name: { ar: "هشام بن محمد السحيباني", en: "Hesham Al-Sohaibani" }, 
      percent: 10, 
      shares: 60000, 
      type: "Individual", 
      voting: true, 
      email: "hesham@androomeda.com", 
      proxy: null 
    },
    { 
      id: "SH_003", 
      name: { ar: "وائل بن محمد السحيباني", en: "Wael Al-Suhaibani" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "w961@live.com", 
      proxy: null 
    },
    { 
      id: "SH_004", 
      name: { ar: "هيثم بن محمد السحيباني", en: "Haitham Al-Suhaibani" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "hmsasis@gmail.com", 
      proxy: null 
    },
    { 
      id: "SH_005", 
      name: { ar: "منصور بن حسن اليامي", en: "Mansour Al-Yami" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "myami@androomeda.com", 
      proxy: null 
    },
    { 
      id: "SH_006", 
      name: { ar: "إبراهيم بن حمد السكيتي", en: "Ibrahim Al-Skeiti" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "ihskaity@gmail.com", 
      proxy: null 
    },
    { 
      id: "SH_007", 
      name: { ar: "صالح بن عبدالله الوهيبي", en: "Saleh Al-Wahibi" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "saaw4466@yahoo.com", 
      proxy: null 
    },
    { 
      id: "SH_008", 
      name: { ar: "عبدالله بن علي الفريجي", en: "Abdullah Al-Fariji" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "a_furaiji@hotmail.com", 
      proxy: null 
    },
    { 
      id: "SH_009", 
      name: { ar: "عبدالله بن محمد الحواس", en: "Abdullah Al-Hawas" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "amh400@gmail.com", 
      proxy: null 
    },
    { 
      id: "SH_010", 
      name: { ar: "شركة بيجي المحدودة", en: "BG LTD Company" }, 
      percent: 15, 
      shares: 90000, 
      type: "Entity", 
      voting: true, 
      email: "saleh@bgtech.com", 
      proxy: { ar: "صالح السحيباني", en: "Saleh Al-Suhaibani" } 
    },
    { 
      id: "SH_011", 
      name: { ar: "أحمد بن سليمان الجاسر", en: "Ahmed Al-Jasser" }, 
      percent: 5, 
      shares: 30000, 
      type: "Individual", 
      voting: true, 
      email: "ahmed.jasser@gmail.com", 
      proxy: null 
    }
  ],

  // ==========================================
  // 4. USERS & EMPLOYEES (REAL DATA)
  // ==========================================
  
  users: [
    // Board & Executives
    { 
      id: "USR_000", 
      name: { ar: "عبدالله الحواس", en: "Abdullah Al-Hawas" }, 
      title: { ar: "رئيس مجلس الإدارة", en: "Chairman of the Board" }, 
      dept: "DEP_EXEC", 
      role: "chairman", 
      email: "amh400@gmail.com", 
      isExecutive: false, 
      isShareholder: true,
      avatar: "https://ui-avatars.com/api/?name=Abdullah+AlHawas&background=FB4747&color=fff"
    },
    { 
      id: "USR_001", 
      name: { ar: "هشام السحيباني", en: "Hesham Al-Sohaibani" }, 
      title: { ar: "الرئيس التنفيذي ونائب رئيس المجلس", en: "CEO & Board Vice Chairman" }, 
      dept: "DEP_EXEC", 
      role: "ceo", 
      additionalRoles: ["vice_chairman"], 
      email: "hesham@androomeda.com", 
      isExecutive: true, 
      isShareholder: true,
      avatar: "../photo/ceo.jpeg"
    },
    { 
      id: "USR_002", 
      name: { ar: "محمد البخيتي", en: "Mohammed Al-Bukheiti" }, 
      title: { ar: "المدير المالي", en: "Chief Financial Officer (CFO)" }, 
      dept: "DEP_FIN", 
      role: "cfo", 
      email: "mtahir@androomeda.com", 
      isExecutive: true,
      avatar: "https://ui-avatars.com/api/?name=Mohammed+AlBukheiti&background=4267B2&color=fff"
    },
    { 
      id: "BRD_003", 
      name: { ar: "أحمد السحيباني", en: "Ahmed Al-Suhaibani" }, 
      title: { ar: "عضو مجلس الإدارة وعضو لجنة المراجعة", en: "Board & Audit Member" }, 
      dept: "DEP_EXEC", 
      role: "board_member", 
      additionalRoles: ["audit_committee_member"], 
      email: "a.s.alsuhaibani@microtec.com.sa", 
      isExecutive: false, 
      isShareholder: true,
      avatar: "https://ui-avatars.com/api/?name=Ahmed+AlSuhaibani&background=10B981&color=fff"
    },
    { 
      id: "USR_005", 
      name: { ar: "منصور اليامي", en: "Mansour Al-Yami" }, 
      title: { ar: "المدير الإداري وعضو المجلس", en: "CAO / Board Member" }, 
      dept: "DEP_HR", 
      role: "cao", 
      additionalRoles: ["board_member"], 
      email: "myami@androomeda.com", 
      isExecutive: true, 
      isShareholder: true,
      avatar: "https://ui-avatars.com/api/?name=Mansour+AlYami&background=F59E0B&color=fff"
    },
    
    // Managers & Directors
    { 
      id: "USR_004", 
      name: { ar: "أيمن المغربي", en: "Ayman Al-Maghrabi" }, 
      title: { ar: "مسؤول الحوكمة والمخاطر والالتزام / أمين سر المجلس", en: "GRCO / Board Secretary" }, 
      dept: "DEP_GRC", 
      role: "grc_officer", 
      email: "amaghrabi@androomeda.com", 
      isExecutive: false, 
      avatar: "../photo/grc.png" 
    },
    { 
      id: "USR_020", 
      name: { ar: "محمد أختر", en: "Muhammad Akhtar" }, 
      title: { ar: "مدير التطوير", en: "Director of Development" }, 
      dept: "DEP_TECH", 
      role: "director", 
      email: "makhtar@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Muhammad+Akhtar&background=8B5CF6&color=fff"
    },
    { 
      id: "USR_009", 
      name: { ar: "مشاعل الهديان", en: "Meshail Al-Hadyan" }, 
      title: { ar: "مسؤول الأمن السيبراني الوطني", en: "NCSO" }, 
      dept: "DEP_TECH", 
      role: "ncso", 
      email: "malhadyan@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Meshail+AlHadyan&background=EC4899&color=fff"
    },
    { 
      id: "USR_007", 
      name: { ar: "نواف الصحابي", en: "Nawaf Al-Sahabi" }, 
      title: { ar: "مدير حسابات العملاء", en: "Customer Accounts Manager" }, 
      dept: "DEP_SUPPORT", 
      role: "manager", 
      email: "nalsahabi@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Nawaf+AlSahabi&background=14B8A6&color=fff"
    },
    { 
      id: "USR_006", 
      name: { ar: "د. وعد حسين", en: "Dr. Waad Hussein" }, 
      title: { ar: "المشرف الطبي", en: "Medical Supervisor" }, 
      dept: "DEP_MED", 
      role: "manager", 
      email: "whussain@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Waad+Hussein&background=F43F5E&color=fff"
    },
    
    // Team Leads & Coordinators
    { 
      id: "USR_015", 
      name: { ar: "رند الحوراني", en: "Rand Al-Hourani" }, 
      title: { ar: "قائد الفريق التقني", en: "Technical Team Lead" }, 
      dept: "DEP_TECH", 
      role: "team_lead", 
      email: "rhourani@androomeda.com", 
      isTeamLead: true,
      avatar: "https://ui-avatars.com/api/?name=Rand+AlHourani&background=A855F7&color=fff"
    },
    { 
      id: "USR_003", 
      name: { ar: "هادي أحمد", en: "Hadi Ahmed" }, 
      title: { ar: "منسق المشتريات والدعم الإداري", en: "Purchasing & Admin Support Coordinator" }, 
      dept: "DEP_HR", 
      role: "coordinator", 
      email: "hadi@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Hadi+Ahmed&background=06B6D4&color=fff"
    },
    
    // Specialists & Support
    { 
      id: "USR_008", 
      name: { ar: "الحسين الحميدي", en: "Al-Hussain Al-Humaidi" }, 
      title: { ar: "أخصائي دعم تقني", en: "Technical Support Specialist" }, 
      dept: "DEP_SUPPORT", 
      role: "specialist", 
      email: "alhussien@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=AlHussain+AlHumaidi&background=84CC16&color=fff"
    },
    { 
      id: "USR_010", 
      name: { ar: "مها الحزان", en: "Maha Al-Hazzan" }, 
      title: { ar: "أخصائية تسويق رقمي", en: "Digital Marketing Specialist" }, 
      dept: "DEP_SALES", 
      role: "specialist", 
      email: "mhizan@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Maha+AlHazzan&background=F472B6&color=fff"
    },
    { 
      id: "USR_014", 
      name: { ar: "عبدالله الجبير", en: "Abdullah Al-Jubeir" }, 
      title: { ar: "دعم مكتبي", en: "Office Support" }, 
      dept: "DEP_HR", 
      role: "support", 
      email: "ajubeir@androomeda.com",
      avatar: "https://ui-avatars.com/api/?name=Abdullah+AlJubeir&background=64748B&color=fff"
    },
    
    // Teams & Vacant Positions
    { 
      id: "USR_023", 
      name: { ar: "فريق المطورين", en: "Software Developers Team" }, 
      title: { ar: "فريق المطورين", en: "Software Developers Team" }, 
      dept: "DEP_TECH", 
      role: "employee", 
      email: "SDT@androomeda.com", 
      isGroup: true,
      avatar: "https://ui-avatars.com/api/?name=Dev+Team&background=6366F1&color=fff"
    },
    { 
      id: "USR_011", 
      name: { ar: "شاغر", en: "Vacant" }, 
      title: { ar: "مدير المبيعات", en: "Sales Manager" }, 
      dept: "DEP_SALES", 
      role: "manager", 
      email: "SalesManager@androomeda.com", 
      status: "inactive",
      avatar: "https://ui-avatars.com/api/?name=Vacant&background=94A3B8&color=fff"
    },
    
    // Committee Members (External)
    { 
      id: "COMM_01", 
      name: { ar: "محمد العنزي", en: "Mohammed Al-Enezi" }, 
      title: { ar: "رئيس لجنة المراجعة", en: "Audit Committee Chairman" }, 
      dept: "DEP_AUDIT", 
      role: "audit_committee_chair", 
      email: "mohammedmansour.socpa@gmail.com", 
      isExternal: true,
      avatar: "https://ui-avatars.com/api/?name=Mohammed+AlEnezi&background=059669&color=fff"
    },
    { 
      id: "COMM_02", 
      name: { ar: "عادل سعسع", en: "Adel Sasa" }, 
      title: { ar: "عضو لجنة المراجعة", en: "Audit Committee Member" }, 
      dept: "DEP_AUDIT", 
      role: "audit_committee_member", 
      email: "adel.sasa1@gmail.com", 
      isExternal: true,
      avatar: "https://ui-avatars.com/api/?name=Adel+Sasa&background=0891B2&color=fff"
    },
    
    // Auditors
    { 
      id: "AUD_INT", 
      name: { ar: "المدقق الداخلي", en: "Internal Auditor" }, 
      title: { ar: "المدقق الداخلي", en: "Internal Auditor" }, 
      dept: "DEP_AUDIT", 
      role: "auditor", 
      email: "InternalAudit@androomeda.com", 
      isExternal: false,
      avatar: "https://ui-avatars.com/api/?name=Internal+Auditor&background=7C3AED&color=fff"
    },
    { 
      id: "AUD_EXT", 
      name: { ar: "المدقق الخارجي", en: "External Auditor" }, 
      title: { ar: "المدقق الخارجي (KPMG/EY)", en: "External Auditor (KPMG/EY)" }, 
      dept: "DEP_AUDIT", 
      role: "auditor", 
      email: "ExternalAudit@androomeda.com", 
      isExternal: true,
      avatar: "https://ui-avatars.com/api/?name=External+Auditor&background=DC2626&color=fff"
    },
    
    // Shareholders (Users with shareholder role only)
    { id: "SH_USER_001", name: { ar: "ورثة محمد بن صالح السحيباني", en: "Heirs of Mohammed Al-Suhaibani" }, title: { ar: "مساهم رئيسي", en: "Major Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "alcaseer@gmail.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Heirs&background=F97316&color=fff" },
    { id: "SH_USER_003", name: { ar: "وائل بن محمد السحيباني", en: "Wael Al-Suhaibani" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "w961@live.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Wael&background=EAB308&color=fff" },
    { id: "SH_USER_004", name: { ar: "هيثم بن محمد السحيباني", en: "Haitham Al-Suhaibani" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "hmsasis@gmail.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Haitham&background=84CC16&color=fff" },
    { id: "SH_USER_006", name: { ar: "إبراهيم بن حمد السكيتي", en: "Ibrahim Al-Skeiti" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "ihskaity@gmail.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Ibrahim&background=22C55E&color=fff" },
    { id: "SH_USER_007", name: { ar: "صالح بن عبدالله الوهيبي", en: "Saleh Al-Wahibi" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "saaw4466@yahoo.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Saleh&background=14B8A6&color=fff" },
    { id: "SH_USER_008", name: { ar: "عبدالله بن علي الفريجي", en: "Abdullah Al-Fariji" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "a_furaiji@hotmail.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Abdullah&background=06B6D4&color=fff" },
    { id: "SH_USER_010", name: { ar: "شركة بيجي المحدودة", en: "BG LTD Company" }, title: { ar: "مساهم (شركة)", en: "Shareholder (Entity)" }, dept: "DEP_EXEC", role: "shareholder", email: "saleh@bgtech.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=BG+LTD&background=3B82F6&color=fff" },
    { id: "SH_USER_011", name: { ar: "أحمد بن سليمان الجاسر", en: "Ahmed Al-Jasser" }, title: { ar: "مساهم", en: "Shareholder" }, dept: "DEP_EXEC", role: "shareholder", email: "ahmed.jasser@gmail.com", isShareholder: true, avatar: "https://ui-avatars.com/api/?name=Ahmed&background=8B5CF6&color=fff" }
  ],

  // ==========================================
  // 5. USER ROLES MAPPING (REAL DATA)
  // ==========================================
  
  userRolesMap: [
    // أيمن المغربي - 5 أدوار
    { 
      userId: "USR_004", 
      contexts: [
        { context: "system", role: "sys_admin", label: { ar: "إدارة النظام", en: "System Administration" }, isPrimary: true },
        { context: "board", role: "board_secretary", label: { ar: "مجلس الإدارة", en: "Board of Directors" } },
        { context: "audit_committee", role: "audit_committee_secretary", label: { ar: "لجنة المراجعة", en: "Audit Committee" } },
        { context: "shareholders", role: "investor_relations", label: { ar: "علاقات المساهمين", en: "Investor Relations" } },
        { context: "governance", role: "grc_officer", label: { ar: "الحوكمة والالتزام", en: "GRC" } }
      ]
    },
    // هشام السحيباني
    { 
      userId: "USR_001", 
      contexts: [
        { context: "executive", role: "ceo", label: { ar: "الإدارة التنفيذية", en: "Executive Management" }, isPrimary: true },
        { context: "board", role: "vice_chairman", label: { ar: "مجلس الإدارة", en: "Board of Directors" } },
        { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_002" }
      ]
    },
    // عبدالله الحواس
    { 
      userId: "USR_000", 
      contexts: [
        { context: "board", role: "chairman", label: { ar: "مجلس الإدارة", en: "Board of Directors" }, isPrimary: true },
        { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_009" }
      ]
    },
    // منصور اليامي
    { 
      userId: "USR_005", 
      contexts: [
        { context: "executive", role: "cao", label: { ar: "الإدارة التنفيذية", en: "Executive Management" }, isPrimary: true },
        { context: "board", role: "board_member", label: { ar: "مجلس الإدارة", en: "Board of Directors" } },
        { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_005" }
      ]
    },
    // أحمد السحيباني
    { 
      userId: "BRD_003", 
      contexts: [
        { context: "board", role: "board_member", label: { ar: "مجلس الإدارة", en: "Board of Directors" }, isPrimary: true },
        { context: "audit_committee", role: "audit_committee_member", label: { ar: "لجنة المراجعة", en: "Audit Committee" } },
        { context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_011" }
      ]
    },
    // محمد العنزي
    { 
      userId: "COMM_01", 
      contexts: [
        { context: "audit_committee", role: "audit_committee_chair", label: { ar: "لجنة المراجعة", en: "Audit Committee" }, isPrimary: true }
      ]
    },
    // عادل سعسع
    { 
      userId: "COMM_02", 
      contexts: [
        { context: "audit_committee", role: "audit_committee_member", label: { ar: "لجنة المراجعة", en: "Audit Committee" }, isPrimary: true }
      ]
    },
    // Shareholders Mapping
    { userId: "SH_USER_001", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_001", isPrimary: true }] },
    { userId: "SH_USER_003", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_003", isPrimary: true }] },
    { userId: "SH_USER_004", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_004", isPrimary: true }] },
    { userId: "SH_USER_006", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_006", isPrimary: true }] },
    { userId: "SH_USER_007", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_007", isPrimary: true }] },
    { userId: "SH_USER_008", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_008", isPrimary: true }] },
    { userId: "SH_USER_010", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_010", isPrimary: true }] },
    { userId: "SH_USER_011", contexts: [{ context: "shareholders", role: "shareholder", label: { ar: "المساهمين", en: "Shareholders" }, shareholderId: "SH_011", isPrimary: true }] }
  ],

  // ==========================================
  // 6. GOVERNANCE (REAL DATA)
  // ==========================================
  
  governance: {
    board: {
      totalSeats: 4,
      termYears: 4,
      currentTermStart: "2025-01-01",
      currentTermEnd: "2029-01-01",
      minMeetingsPerYear: 4
    },
    quorum: {
      OGA: { firstMeeting: 25, secondMeeting: 0, decisionThreshold: 50 },
      EGA: { firstMeeting: 50, secondMeeting: 25, thirdMeeting: 0, decisionThreshold: 66.6 },
      Board: { minMembers: 3, decisionThreshold: 51 }
    },
    remuneration: {
      currency: "SAR",
      boardMeetingFee: 2000,
      auditCommitteeFee: 1500,
      secretaryFee: 1000,
      annualCapPerMember: 500000,
      travelPolicy: "Business Class for non-residents"
    },
    committees: [
      { 
        id: "COMM_AUDIT", 
        name: { ar: "لجنة المراجعة", en: "Audit Committee" }, 
        required: true, 
        minMembers: 3,
        chair: "COMM_01",
        members: ["COMM_01", "COMM_02", "BRD_003"],
        secretary: "USR_004"
      }
    ],
    policies: {
      codeOfConduct: { version: '2.1', lastUpdated: '2025-01-01' },
      conflictOfInterest: { version: '2.0', lastUpdated: '2025-12-10' },
      disclosure: { version: '2.0', lastUpdated: '2025-11-20' },
      remuneration: { version: '1.8', lastUpdated: '2025-10-05' }
    }
  },

  // ==========================================
  // 7. COMPANY ACTIVITIES (REAL DATA)
  // ==========================================
  
  activities: [
    { code: "432134", name: { ar: "تركيب وصيانة الأجهزة الأمنية", en: "Security Systems Installation & Maintenance" }, category: "Security" },
    { code: "451030", name: { ar: "مزادات السيارات والمعدات", en: "Vehicle & Equipment Auctions" }, category: "Auctions" },
    { code: "464956", name: { ar: "البيع بالجملة للأجهزة والمعدات والمستلزمات الطبية", en: "Wholesale of Medical Equipment & Supplies" }, category: "Medical" },
    { code: "465101", name: { ar: "البيع بالجملة للحواسيب ومستلزماتها يشمل بيع الطابعات وأحبارها", en: "Wholesale of Computers & Accessories" }, category: "Sales" },
    { code: "465102", name: { ar: "البيع بالجملة للبرمجيات ويشمل الاستيراد", en: "Wholesale of Software (Including Import)" }, category: "Sales" },
    { code: "465933", name: { ar: "البيع بالجملة للأجهزة الأمنية", en: "Wholesale of Security Devices" }, category: "Security" },
    { code: "465934", name: { ar: "البيع بالجملة للمعدات والتجهيزات الأمنية (للمنافسات الحكومية فقط)", en: "Wholesale of Security Equipment (Government Tenders Only)" }, category: "Security" },
    { code: "469061", name: { ar: "البيع بالجملة لأجهزة ولوازم الكيماويات والمختبرات", en: "Wholesale of Lab Chemicals & Equipment" }, category: "Medical" },
    { code: "474110", name: { ar: "البيع بالتجزئة للحواسيب وملحقاتها يشمل الطابعات وأحبارها", en: "Retail of Computers & Accessories" }, category: "Retail" },
    { code: "474152", name: { ar: "بيع البرمجيات غير المعدة بناء على الطلب", en: "Retail of Off-the-Shelf Software" }, category: "IT" },
    { code: "477336", name: { ar: "البيع بالتجزئة للأجهزة الأمنية", en: "Retail of Security Devices" }, category: "Security" },
    { code: "479940", name: { ar: "المزادات في غير المحلات", en: "Non-Store Auctions" }, category: "Auctions" },
    { code: "620102", name: { ar: "تصميم وبرمجة البرمجيات الخاصة", en: "Custom Software Development" }, category: "IT" },
    { code: "682010", name: { ar: "الوساطة العقارية", en: "Real Estate Brokerage" }, category: "RealEstate" },
    { code: "682044", name: { ar: "المزادات العقارية", en: "Real Estate Auctions" }, category: "RealEstate" },
    { code: "731013", name: { ar: "تقديم خدمات تسويقية نيابةً عن الغير", en: "Marketing Services on Behalf of Others" }, category: "Marketing" },
    { code: "749036", name: { ar: "أنشطة خدمات استشارات في مجال تنظيم الأجهزة الطبية", en: "Consulting for Medical Device Regulation" }, category: "Medical" },
    { code: "869027", name: { ar: "مراكز الخدمات الطبية المنزلية", en: "Home Healthcare Centers" }, category: "Medical" },
    { code: "869037", name: { ar: "مراكز الرعاية عن بعد والطب الإتصالي", en: "Telehealth Centers" }, category: "Medical" }
  ],

  // ==========================================
  // 8. MEETINGS & MINUTES
  // ==========================================
  
  meetings: [
    {
      id: 'BOD-2026-03',
      title: { ar: 'اجتماع مجلس الإدارة الثالث', en: 'Third Board Meeting' },
      date: '2026-03-15',
      time: '10:00',
      type: 'in-person',
      status: 'scheduled',
      location: { ar: 'مقر الشركة الرئيسي', en: 'Company Headquarters' }
    },
    {
      id: 'BOD-2026-02',
      title: { ar: 'اجتماع مجلس الإدارة الثاني', en: 'Second Board Meeting' },
      date: '2026-02-22',
      time: '19:30',
      type: 'in-person',
      status: 'scheduled'
    },
    {
      id: 'BOD-2026-01',
      title: { ar: 'اجتماع مجلس الإدارة الأول', en: 'First Board Meeting' },
      date: '2026-01-20',
      time: '13:00',
      type: 'remote',
      status: 'completed',
      attendanceRate: 0.89,
      decisions: 5
    }
  ],

  // ==========================================
  // 9. FINANCIAL PERFORMANCE
  // ==========================================
  
  financialPerformance: {
    currentQuarter: {
      period: 'Q4 2025',
      revenue: 5200000,
      expenses: 3350000,
      netProfit: 1850000,
      profitMargin: 35.6,
      ebitda: 2100000,
      ebitdaMargin: 40.4
    },
    
    kpis: {
      revenueGrowth: 12.5,
      profitGrowth: 18.2,
      debtToEquity: 0.32,
      currentRatio: 2.1
    }
  },

  // ==========================================
  // 10. HELPER FUNCTIONS
  // ==========================================
  
  getUserById(id) {
    return this.users.find(u => u.id === id);
  },

  getUserByEmail(email) {
    return this.users.find(u => u.email === email);
  },

  getShareholderById(id) {
    return this.shareholders.find(s => s.id === id);
  },

  getBoardMembers() {
    return this.users.filter(u => 
      ['chairman', 'vice_chairman', 'board_member'].includes(u.role) ||
      u.additionalRoles?.includes('board_member') ||
      u.additionalRoles?.includes('vice_chairman')
    );
  },

  getExecutives() {
    return this.users.filter(u => u.isExecutive === true);
  },

  getShareholderUsers() {
    return this.users.filter(u => u.isShareholder === true);
  },

  getUserContexts(userId) {
    const mapping = this.userRolesMap.find(m => m.userId === userId);
    return mapping ? mapping.contexts : [];
  },

  getMeetingById(id) {
    return this.meetings.find(m => m.id === id);
  },

  getUpcomingMeetings() {
    const today = new Date();
    return this.meetings.filter(m => 
      m.status === 'scheduled' && new Date(m.date) >= today
    );
  },

  getCompletedMeetings() {
    return this.meetings.filter(m => m.status === 'completed');
  },

  getShareholderStatistics() {
    return {
      totalShareholders: this.shareholders.length,
      individualShareholders: this.shareholders.filter(s => s.type === 'Individual').length,
      entityShareholders: this.shareholders.filter(s => s.type === 'Entity').length,
      totalShares: this.capital.sharesCount,
      largestShareholder: this.shareholders.reduce((max, s) => s.percent > max.percent ? s : max)
    };
  }
};

// Make available globally
if (typeof window !== 'undefined') {
  window.CompanyPolicy = CompanyPolicy;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompanyPolicy;
}

console.log('✅ Andromeda Board Company Policy Data Loaded Successfully (v4.0.0)');
