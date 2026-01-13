const POLICY_DATA = {
  "metadata": {
    "version": "3.4.0",
    "last_updated": "2026-01-13",
    "status": "Active",
    "description": "المستودع المركزي لبيانات وسياسات وصلاحيات شركة أندروميدا لتقنية المعلومات"
  },
  "corporate_profile": {
    "identity": {
      "name_ar": "شركة اندروميدا لتقنية المعلومات",
      "name_en": "Andromeda Information Technology Company",
      "type": "Closed Joint Stock Company (CJSC)",
      "cr_number": "1010356267",
      "unified_national_number": "7003339343",
      "headquarters": "Riyadh, Saudi Arabia",
      "establishment_date": "2012-11-28"
    },
    "capital_structure": {
      "authorized_capital": 6000000,
      "paid_up_capital": 6000000,
      "currency": "SAR",
      "number_of_shares": 600000,
      "share_nominal_value": 10,
      "financial_year_start": "01-01",
      "financial_year_end": "12-31"
    }
  },
  "shareholders": [
    { "id": "SH_001", "name": "ورثة محمد بن صالح السحيباني", "percent": 35, "shares": 210000, "voting": true, "email": "alcaseer@gmail.com" },
    { "id": "SH_002", "name": "هشام بن محمد السحيباني", "percent": 10, "shares": 60000, "voting": true, "email": "Hesham@androomeda.com" },
    { "id": "SH_003", "name": "وائل بن محمد السحيباني", "percent": 5, "shares": 30000, "voting": true, "email": "W961@live.com" },
    { "id": "SH_004", "name": "هيثم بن محمد السحيباني", "percent": 5, "shares": 30000, "voting": true, "email": "hmsasis@gmail.com" },
    { "id": "SH_005", "name": "منصور بن حسن اليامي", "percent": 5, "shares": 30000, "voting": true, "email": "myami@androomeda.com" },
    { "id": "SH_006", "name": "إبراهيم بن حمد السكيتي", "percent": 5, "shares": 30000, "voting": true, "email": "ihskaity@gmail.com" },
    { "id": "SH_007", "name": "صالح بن عبدالله الوهيبي", "percent": 5, "shares": 30000, "voting": true, "email": "Saaw4466@yahoo.com" },
    { "id": "SH_008", "name": "عبدالله بن علي الفريجي", "percent": 5, "shares": 30000, "voting": true, "email": "a_furaiji@hotmail.com" },
    { "id": "SH_009", "name": "عبدالله بن محمد الحواس", "percent": 5, "shares": 30000, "voting": true, "email": "amh400@gmail.com" },
    { "id": "SH_010", "name": "شركة بيجي المحدودة", "percent": 15, "shares": 90000, "voting": true, "email": "saleh@bgtech.com" },
    { "id": "SH_011", "name": "احمد بن سليمان الجاسر", "percent": 5, "shares": 30000, "voting": true, "email": "ahmed.jasser@gmail.com" }
  ],
  "activities_isic": [
    { "code": "432134", "name_ar": "تركيب وصيانة الأجهزة الأمنية", "category": "Security" },
    { "code": "451030", "name_ar": "مزادات السيارات والمعدات", "category": "Auctions" },
    { "code": "464956", "name_ar": "البيع بالجملة للأجهزة والمعدات والمستلزمات الطبية", "category": "Medical" },
    { "code": "465101", "name_ar": "البيع بالجملة للحواسيب ومستلزماتها", "category": "Sales" },
    { "code": "465102", "name_ar": "البيع بالجملة للبرمجيات ويشمل الاستيراد", "category": "Sales" },
    { "code": "465933", "name_ar": "البيع بالجملة للأجهزة الأمنية", "category": "Security" },
    { "code": "465934", "name_ar": "البيع بالجملة للمعدات والتجهيزات الأمنية", "category": "Security" },
    { "code": "469061", "name_ar": "البيع بالجملة لأجهزة ولوازم الكيماويات والمختبرات", "category": "Medical" },
    { "code": "474110", "name_ar": "البيع بالتجزئة للحواسيب وملحقاتها", "category": "Retail" },
    { "code": "474152", "name_ar": "بيع البرمجيات غير المعدة بناء على الطلب", "category": "IT" },
    { "code": "477336", "name_ar": "البيع بالتجزئة للأجهزة الأمنية", "category": "Security" },
    { "code": "479940", "name_ar": "المزادات في غير المحلات", "category": "Auctions" },
    { "code": "620102", "name_ar": "تصميم وبرمجة البرمجيات الخاصة", "category": "IT" },
    { "code": "682010", "name_ar": "الوساطة العقارية", "category": "RealEstate" },
    { "code": "682044", "name_ar": "المزادات العقارية", "category": "RealEstate" },
    { "code": "731013", "name_ar": "تقديم خدمات تسويقية نيابةً عن الغير", "category": "Marketing" },
    { "code": "749036", "name_ar": "أنشطة خدمات استشارات في مجال تنظيم الأجهزة الطبية", "category": "Medical" },
    { "code": "869027", "name_ar": "مراكز الخدمات الطبية المنزلية", "category": "Medical" },
    { "code": "869037", "name_ar": "مراكز الرعاية عن بعد والطب الإتصالي", "category": "Medical" }
  ],
  "governance_config": {
    "board_structure": {
      "total_seats": 4,
      "current_term_start": "2025-01-01",
      "current_term_end": "2029-01-01",
      "term_duration_years": 4,
      "min_meetings_per_year": 4
    },
    "quorum_rules": {
      "OGA": { "first_meeting": 25, "second_meeting": 0, "decision_threshold": 50 },
      "EGA": { "first_meeting": 50, "second_meeting": 25, "third_meeting": 0, "decision_threshold": 66.6 },
      "Board": { "min_members": 3, "decision_threshold": 51 }
    },
    "remuneration_policy": {
      "currency": "SAR",
      "board_meeting_fee": 2000,
      "audit_committee_fee": 1500,
      "secretary_fee": 1000,
      "annual_cap_per_member": 500000,
      "travel_policy": "Business Class for non-residents"
    },
    "committees": {
      "Audit": {
        "min_members": 3,
        "is_mandatory": true,
        "members": ["Mohammed Al-Enezi", "Adel Sasa", "Ahmed Al-Suhaibani"],
        "secretary": "Ayman Al-Maghrabi"
      },
      "Remuneration": { "min_members": 3, "is_mandatory": false }
    }
  },
  "organizational_chart": {
    "departments": [
      { "id": "DEP_EXEC", "name": "Executive Management", "manager_id": "USR_001" },
      { "id": "DEP_FIN", "name": "Finance", "manager_id": "USR_002" },
      { "id": "DEP_HR", "name": "Human Resources & Admin", "manager_id": "USR_005" },
      { "id": "DEP_GRC", "name": "Governance, Risk & Compliance", "manager_id": "USR_004" },
      { "id": "DEP_TECH", "name": "Technology & Development", "manager_id": "USR_013" },
      { "id": "DEP_MED", "name": "Medical Services", "manager_id": "USR_006" },
      { "id": "DEP_SALES", "name": "Sales & Marketing", "manager_id": "USR_010" },
      { "id": "DEP_SUPPORT", "name": "Customer Operations & Support", "manager_id": "USR_007" }
    ],
    "users_directory": [
      { "id": "USR_000", "name": "Abdullah Al-Hawas", "title": "Chairman of the Board", "department_id": "DEP_EXEC", "role": "Chairman", "is_executive": false, "email": "amh400@gmail.com" },
      { "id": "USR_001", "name": "Hesham Al-Sohaibani", "title": "CEO & Board Vice Chairman", "department_id": "DEP_EXEC", "role": "CEO", "is_executive": true, "email": "hesham@androomeda.com" },
      { "id": "USR_002", "name": "Mohammed Al-Bukheiti", "title": "Chief Financial Officer (CFO)", "department_id": "DEP_FIN", "role": "CFO", "is_executive": true, "email": "mtahir@androomeda.com" },
      { "id": "USR_003", "name": "Hadi Ahmed", "title": "Purchasing & Admin Support Coordinator", "department_id": "DEP_HR", "role": "Coordinator", "email": "hadi@androomeda.com" },
      { "id": "USR_004", "name": "Ayman Al-Maghrabi", "title": "GRCO / Board Secretary", "department_id": "DEP_GRC", "role": "admin", "is_executive": false, "email": "amaghrabi@androomeda.com" },
      { "id": "USR_005", "name": "Mansour Al-Yami", "title": "CAO / Board Member", "department_id": "DEP_HR", "role": "CAO", "is_executive": true, "email": "myami@androomeda.com" },
      { "id": "USR_006", "name": "Dr. Waad Hussein", "title": "Medical Supervisor", "department_id": "DEP_MED", "role": "Manager", "email": "whussain@androomeda.com" },
      { "id": "USR_007", "name": "Nawaf Al-Sahabi", "title": "Customer Accounts Manager", "department_id": "DEP_SUPPORT", "role": "Manager", "email": "nalsahabi@androomeda.com" },
      { "id": "USR_008", "name": "Al-Hussain Al-Humaidi", "title": "Technical Support Specialist", "department_id": "DEP_SUPPORT", "role": "Specialist", "email": "alhussien@androomeda.com" },
      { "id": "USR_009", "name": "Meshail Al-Hadyan", "title": "NCSO", "department_id": "DEP_TECH", "role": "NCSO", "email": "malhadyan@androomeda.com" },
      { "id": "USR_010", "name": "Maha Al-Hazzan", "title": "Digital Marketing Specialist", "department_id": "DEP_SALES", "role": "Specialist", "email": "mhizan@androomeda.com" },
      { "id": "USR_011", "name": "Vacant", "title": "Sales Manager", "department_id": "DEP_SALES", "role": "Vacant", "email": "SalesManager@androomeda.com" },
      { "id": "USR_014", "name": "Abdullah Al-Jubeir", "title": "Office Support", "department_id": "DEP_HR", "role": "Support", "email": "Ajubeir@androomeda.com" },
      { "id": "USR_015", "name": "Rand Al-Hourani", "title": "Technical Team Lead", "department_id": "DEP_TECH", "role": "Team_Lead", "email": "Rhourani@androomeda.com" },
      { "id": "USR_020", "name": "Muhammad Akhtar", "title": "Director of Development", "department_id": "DEP_TECH", "role": "Director", "email": "Makhtar@androomeda.com" },
      { "id": "USR_023", "name": "Software Developers Team", "title": "Software Developers Team", "department_id": "DEP_TECH", "role": "Team", "email": "SDT@androomeda.com" },
      { "id": "COMM_01", "name": "Mohammed Al-Enezi", "title": "Audit Committee Chairman", "role": "Committee_Member", "email": "mohammedmansour.socpa@gmail.com", "is_executive": false },
      { "id": "COMM_02", "name": "Adel Sasa", "title": "Audit Committee Member", "role": "Committee_Member", "email": "adel.sasa1@gmail.com", "is_executive": false },
      { "id": "BRD_003", "name": "Ahmed Al-Suhaibani", "title": "Board & Audit Member", "role": "Board_Member", "email": "a.s.alsuhaibani@microtec.com.sa", "is_executive": false },
      { "id": "AUD_INT", "name": "Internal Auditor", "title": "Internal Auditor", "role": "Auditor", "email": "InternalAudit@androomeda.com", "is_executive": false },
      { "id": "AUD_EXT", "name": "External Auditor", "title": "External Auditor (KPMG/EY)", "role": "Auditor", "email": "ExternalAudit@androomeda.com", "is_executive": false }
    ]
  },
  "authority_matrix": {
    "roles_definition": {
      "chairman": { "title_ar": "رئيس المجلس", "authority_level": "Sole_Signatory", "description": "يمارس الصلاحيات منفرداً" },
      "vice_chairman": { "title_ar": "نائب رئيس المجلس", "authority_level": "Joint_Signatory", "description": "يمارس الصلاحيات بموافقة من له نفس الصلاحية (توقيع مشترك)" }
    },
    "financial_authority": [
      {
        "transaction_type": "PO_Approval",
        "levels": [
          { "role": "Manager", "limit": 5000, "condition": "Budgeted" },
          { "role": "CFO", "limit": 50000, "condition": "Budgeted" },
          { "role": "CEO", "limit": 1000000, "condition": "Budgeted" },
          { "role": "Board", "limit": -1, "condition": "Unbudgeted or > 1M" }
        ]
      },
      {
        "transaction_type": "Payroll_Approval",
        "levels": [
          { "role": "HR_Manager", "action": "Prepare" },
          { "role": "CFO", "action": "Verify" },
          { "role": "CEO", "action": "Final_Approve" }
        ]
      },
      {
        "transaction_type": "Petty_Cash",
        "levels": [
          { "role": "Direct_Manager", "limit": 1000, "action": "Request" },
          { "role": "CFO", "limit": 5000, "action": "Final_Approve" }
        ]
      },
      {
        "transaction_type": "Contract_Signing",
        "levels": [
          { "role": "CEO", "limit": 1000000, "condition": "Operational Expenses" },
          { "role": "Board", "limit": -1, "condition": "Strategic/Capex > 1M" }
        ]
      }
    ],
    "legal_and_admin_powers": {
      "note": "Extracted from System of Association (Pages 29-61)",
      "powers": [
        { "code": "LEG_001", "category": "Government", "action_ar": "استخراج السجلات التجارية وتجديدها", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "BNK_001", "category": "Banking", "action_ar": "فتح الحسابات البنكية والإيداع والسحب", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "BNK_002", "category": "Banking", "action_ar": "التوقيع على عقود القروض والتسهيلات", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "HR_001", "category": "Human Resources", "action_ar": "استقدام العمالة ونقل الكفالات", "authorized_roles": ["CEO", "CAO"], "execution_type": "Solo" },
        { "code": "R_EST_001", "category": "Real Estate", "action_ar": "بيع وشراء العقارات والأراضي", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "CORP_001", "category": "Corporate", "action_ar": "تأسيس شركات تابعة وتوقيع عقودها", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "JUD_001", "category": "Judicial", "action_ar": "التمثيل القضائي (المرافعة، المدافعة، الصلح)", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "MAR_001", "category": "Marine", "action_ar": "شراء واستيراد وبيع القوارب", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "MAR_002", "category": "Marine", "action_ar": "استخراج وتجديد رخص القوارب وتصاريح الصيد", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" },
        { "code": "INV_001", "category": "Investment", "action_ar": "فتح وإدارة المحافظ الاستثمارية وبيع الأسهم", "authorized_roles": ["CEO", "Chairman"], "execution_type": "Solo" }
      ]
    }
  },
  "operational_policies": {
    "hr_policies": {
      "probation_period": { "min_days": 90, "max_days": 180 },
      "leaves": {
        "annual_balance": { "junior": 21, "senior_5years": 30 },
        "maternity": { "paid_weeks": 12 },
        "paternity": { "paid_days": 3 },
        "bereavement": { "paid_days": 3 }
      }
    },
    "procurement_policies": {
      "rfq_threshold": 5000,
      "min_quotes_required": 3,
      "petty_cash_limit": 5000
    }
  },
  "system_settings": {
    "default_language": "ar",
    "theme_color": "#FB4747",
    "audit_log_retention_days": 3650
  }
};
