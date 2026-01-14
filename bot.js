/**
 * @file bot.js
 * @description المساعد الشخصي الذكي لشركة أندروميدا - يعتمد على ملف السياسات المركزي
 * @dependency company_policy.js (v4.1.0)
 * @author Andromeda Tech Team
 */

// محاكاة استيراد ملف الإعدادات (في الواقع سيكون require)
const SYSTEM_CONFIG = require('./company_policy');

class AndromedaAssistant {
  constructor(userContext) {
    this.user = userContext; // { id, name, role, department }
    this.config = SYSTEM_CONFIG;
    this.roleHierarchy = this._buildRoleHierarchy();
  }

  /**
   * بناء خريطة التوارث للأدوار لضمان أن المدير يرى ما يراه الموظف
   * @private
   */
  _buildRoleHierarchy() {
    const roles = this.config.access_control.roles;
    const hierarchy = {};

    // دالة تكرارية لجلب كل الأدوار الموروثة
    const getInheritedRoles = (roleKey) => {
      const role = roles[roleKey];
      if (!role) return [];
      let inherited = role.inherits || [];
      role.inherits.forEach(r => {
        inherited = [...inherited, ...getInheritedRoles(r)];
      });
      return [...new Set(inherited)];
    };

    Object.keys(roles).forEach(key => {
      hierarchy[key] = [key, ...getInheritedRoles(key)];
    });

    return hierarchy;
  }

  /**
   * التحقق من الصلاحية: هل يمتلك المستخدم الدور المطلوب أو دوراً أعلى منه؟
   */
  hasAccess(requiredRole) {
    const userRoles = this.roleHierarchy[this.user.role] || [];
    return userRoles.includes(requiredRole);
  }

  /**
   * المعالج الرئيسي للأسئلة
   * @param {string} intent - نوع السؤال (finance, hr, governance, tech, shareholder)
   * @param {object} query - تفاصيل السؤال
   */
  ask(intent, query = {}) {
    const userLang = this.user.lang || 'ar'; // اللغة الافتراضية
    const responses = this.config.i18n.translations;

    console.log(`\n🤖 [Bot]: معالجة الطلب للمستخدم: ${this.user.name} (${this.user.role})...`);

    try {
      switch (intent) {
        case 'IDENTIFY':
          return this.handleIdentification();
        
        case 'SHAREHOLDER_INFO':
          return this.handleShareholderQuery();

        case 'FINANCE_LIMIT':
          return this.handleFinanceLimit(query.amount);

        case 'HR_POLICY':
          return this.handleHRQuery(query.topic);

        case 'GOVERNANCE_ACCESS':
          return this.handleGovernanceQuery();

        default:
          return "عذراً، لم أفهم نوع الطلب.";
      }
    } catch (error) {
      return `🛑 تم رفض الوصول أو حدث خطأ: ${error.message}`;
    }
  }

  // ============================================================
  // 1. معالج التعريف (يعرف الموظف بنفسه وصلاحياته)
  // ============================================================
  handleIdentification() {
    const roleDef = this.config.access_control.roles[this.user.role];
    const dept = this.config.organization.departments.find(d => d.id === this.user.department);
    
    let response = `أهلاً بك، ${this.user.name}.\n`;
    response += `📌 منصبك: ${roleDef.label.ar}\n`;
    response += `🏢 القسم: ${dept ? dept.name.ar : 'غير محدد'}\n`;
    
    if (this.hasAccess('shareholder')) {
      response += `💼 حالة خاصة: تم التعرف عليك كـ "مساهم/مالك".\n`;
    }
    
    return response;
  }

  // ============================================================
  // 2. معالج المساهمين (Shareholders) - قراءة من قسم الحوكمة
  // ============================================================
  handleShareholderQuery() {
    // 1. التحقق الأمني: هل المستخدم مساهم أصلاً؟
    if (!this.hasAccess('shareholder')) {
      throw new Error("عذراً، هذه البيانات متاحة للمساهمين فقط.");
    }

    // 2. البحث عن بياناته في مصفوفة المساهمين
    // نفترض أن الـ ID للمستخدم يطابق الـ ID في البنية أو البريد الإلكتروني
    // هنا سنستخدم محاكاة البحث بالاسم أو الدور
    const shareholderData = this.config.governance.shareholders.find(s => 
      s.email === this.user.email || s.id === this.user.id
    );

    if (!shareholderData) {
      return "أنت تملك صلاحية مساهم، لكن لم أجد بياناتك المالية في السجل الحالي.";
    }

    // 3. جلب الصلاحيات الخاصة من access_control
    const capabilities = this.config.access_control.roles.shareholder.capabilities;

    let response = `📊 **ملف المساهم الخاص بك**:\n`;
    response += `- الاسم المسجل: ${shareholderData.name.ar}\n`;
    response += `- نسبة الملكية: ${shareholderData.percent}%\n`;
    response += `- عدد الأسهم: ${shareholderData.shares.toLocaleString()}\n`;
    response += `- حقوق التصويت: ${capabilities.voting ? "✅ فعال" : "❌ غير فعال"}\n`;
    
    // التحقق من صلاحية طلب جمعية (Logic Helper from config)
    const canRequestMeeting = this.config.helpers.canRequestAssembly({ 
      roles: ['shareholder'], 
      ownership_percentage: shareholderData.percent / 100 
    });

    response += `- صلاحية طلب عقد جمعية: ${canRequestMeeting ? "متاح (نسبتك تتجاوز 5%)" : "غير متاح"}`;

    return response;
  }

  // ============================================================
  // 3. معالج الصلاحيات المالية (Finance & Procurement)
  // ============================================================
  handleFinanceLimit(amount) {
    // هذا السؤال يهم المدراء والتنفيذيين
    if (!this.hasAccess('manager')) {
      return "عذراً، الاستعلام عن الصلاحيات المالية متاح للمدراء فما فوق.";
    }

    const authMatrix = this.config.access_control.financial_authority;
    const poAuth = authMatrix.find(a => a.transaction_type === 'PO_Approval');
    
    // البحث عن مستوى المستخدم في مصفوفة الصلاحيات
    // نتحقق من أعلى دور يملكه المستخدم ويطابق المصفوفة
    let myLimit = 0;
    
    // الترتيب من CEO لأسفل
    if (this.hasAccess('ceo')) myLimit = poAuth.levels.find(l => l.role === 'CEO').limit;
    else if (this.hasAccess('cfo')) myLimit = poAuth.levels.find(l => l.role === 'CFO').limit;
    else if (this.hasAccess('manager')) myLimit = poAuth.levels.find(l => l.role === 'Manager').limit;

    if (amount <= myLimit) {
      return `✅ نعم، لديك الصلاحية لاعتماد مبلغ ${amount} ريال. (حدك الأقصى: ${myLimit})`;
    } else {
      return `⚠️ لا، المبلغ ${amount} يتجاوز حد صلاحيتك (${myLimit}). يجب رفع الطلب للمستوى الإداري الأعلى.`;
    }
  }

  // ============================================================
  // 4. معالج الموارد البشرية (HR Policies) - متاح للجميع
  // ============================================================
  handleHRQuery(topic) {
    const policy = this.config.policies.find(p => p.meta.category === 'hr');
    
    if (topic === 'leaves') {
      const section = policy.sections.find(s => s.id === 'sec_leaves');
      // تخصيص الإجابة بناءً على أقدمية الموظف (محاكاة)
      const balance = this.user.years_experience > 5 
        ? section.clauses[0].data_mapping.senior_balance 
        : section.clauses[0].data_mapping.junior_balance;

      return `🏖️ سياسة الإجازات (${section.title.ar}):\n- رصيدك السنوي المستحق هو: ${balance} يوماً.\n- ملاحظة: ${section.clauses[0].content.ar}`;
    }
    
    if (topic === 'probation') {
        const section = policy.sections.find(s => s.id === 'sec_probation');
        return `⏱️ ${section.clauses[0].content.ar}`;
    }

    return "يمكنني إجابتك عن: الإجازات (leaves)، فترة التجربة (probation).";
  }

    // ============================================================
    // 5. معالج الحوكمة والمجلس (Governance)
    // ============================================================
    handleGovernanceQuery() {
        if (!this.hasAccess('board_member') && !this.hasAccess('shareholder') && !this.hasAccess('sys_admin')) {
            throw new Error("بيانات الحوكمة التفصيلية محصورة بالمجلس والمساهمين.");
        }

        const boardConfig = this.config.governance.config.board_structure;
        const committees = this.config.governance.config.board.committees;

        return `🏛️ **لوحة الحوكمة**:\n` +
               `- الدورة الحالية للمجلس: تنتهي في ${boardConfig.current_term_end}\n` +
               `- اللجان الإلزامية: لجنة المراجعة (الحد الأدنى للأعضاء: ${committees.audit.min_members})\n` +
               `- مكافأة الجلسة: ${this.config.governance.config.remuneration_policy.board_meeting_fee} ريال`;
    }
}

// ==========================================
// تجربة البوت (Simulation Scenarios)
// ==========================================

// 1. سيناريو: مساهم (هشام السحيباني) يسأل عن أسهمه
const userShareholder = { 
  id: "SH_002", 
  name: "هشام السحيباني", 
  role: "shareholder", // وأيضاً CEO في الواقع، لكن سنعامله كمساهم هنا
  email: "Hesham@androomeda.com",
  department: "DEP_EXEC"
};
const bot1 = new AndromedaAssistant(userShareholder);
console.log(bot1.ask('IDENTIFY'));
console.log(bot1.ask('SHAREHOLDER_INFO'));

// 2. سيناريو: مدير مالي (محمد البخيتي) يحاول اعتماد فاتورة بـ 60 ألف
const userCFO = {
  id: "USR_002",
  name: "محمد البخيتي",
  role: "cfo",
  department: "DEP_FIN",
  years_experience: 8
};
const bot2 = new AndromedaAssistant(userCFO);
console.log(bot2.ask('IDENTIFY'));
console.log(bot2.ask('FINANCE_LIMIT', { amount: 60000 })); // CFO limit is 50k -> Should fail/warn

// 3. سيناريو: موظف جديد (عبدالله الجبير) يسأل عن الإجازات وبيانات سرية
const userEmployee = {
  id: "USR_014",
  name: "عبدالله الجبير",
  role: "employee",
  department: "DEP_HR",
  years_experience: 1
};
const bot3 = new AndromedaAssistant(userEmployee);
console.log(bot3.ask('HR_POLICY', { topic: 'leaves' })); // Junior balance
console.log(bot3.ask('SHAREHOLDER_INFO')); // Should be denied
