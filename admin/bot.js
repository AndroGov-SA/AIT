(function() {
    const chatWindow = document.getElementById('chat-window');
    const fab = document.getElementById('chat-fab');
    const closeBtn = document.getElementById('close-chat-btn');
    const sendBtn = document.getElementById('send-btn');
    const input = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Toggle Visibility
    function toggleChat() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) input.focus();
    }

    if(fab) fab.addEventListener('click', toggleChat);
    if(closeBtn) closeBtn.addEventListener('click', toggleChat);

    // Sending Messages
    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        input.value = '';
        showTyping();

        // Simulate AI Delay
        setTimeout(() => {
            removeTyping();
            const response = getAIResponse(text);
            appendMessage(response, 'bot');
        }, 1200);
    }

    if(sendBtn) sendBtn.addEventListener('click', sendMessage);
    if(input) input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            input.value = btn.getAttribute('data-q');
            sendMessage();
        });
    });

    // Helper: Append Message
    function appendMessage(html, sender) {
        const div = document.createElement('div');
        div.className = `chat-bubble ${sender}`;
        div.innerHTML = html;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Helper: Typing Animation
    function showTyping() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typing-indicator');
        if (el) el.remove();
    }

    // --- قاعدة المعرفة الخاصة بالبوت (Governance Knowledge Base) ---
    function getAIResponse(query) {
        const q = query.toLowerCase();
        
        // 1. استفسارات النصاب والجمعيات (من النظام الأساس)
        if (q.includes('نصاب') || q.includes('حضور')) {
            return `وفقاً للنظام الأساسي:<br>
            - <b>الجمعية العادية:</b> تتطلب حضور مساهمين يمثلون <b>25%</b> من رأس المال على الأقل.<br>
            - <b>الجمعية غير العادية:</b> تتطلب حضور <b>50%</b> من رأس المال.<br>
            هل تود معرفة موعد الجمعية القادمة؟`;
        }
        
        // 2. استفسارات الامتثال والمخاطر (من الداشبورد)
        if (q.includes('امتثال') || q.includes('نسبة')) {
            return `نسبة الامتثال الحالية هي <b class="text-green-600">92%</b>.<br>للوصول إلى 100%، يرجى استكمال تحديث "بيانات السجل التجاري" وإغلاق الملاحظات المعلقة.`;
        }

        // 3. استفسارات المهام (من قائمة المهام)
        if (q.includes('مهام') || q.includes('عاجل')) {
            return `لديك 3 مهام تشغيلية، أهمها:<br>
            1. اعتماد <b>سياسة المكافآت</b> (تاريخ الاستحقاق: 01/02/2026).<br>
            2. مراجعة تقرير الرواتب من الموارد البشرية.`;
        }

        // 4. استفسارات الملكية (من الرسم البياني وسجل المساهمين)
        if (q.includes('ورثة') || q.includes('مساهم') || q.includes('مالك')) {
            return `أكبر الملاك هم <b>ورثة محمد السحيباني</b> بنسبة 35% (210,000 سهم).<br>يليهم هشام السحيباني بنسبة 10%.`;
        }

        // 5. استفسارات الصلاحيات
        if (q.includes('صلاحي') || q.includes('أمين')) {
            return `بصفتك <b>أمين السر</b>، لديك صلاحية تحرير المحاضر، متابعة التواقيع، وحفظ سجلات الشركة الرسمية.`;
        }

        // الرد الافتراضي
        return `عذراً، لم أفهم استفسارك بدقة.<br>يمكنك سؤالي عن: <b>النصاب، الامتثال، كبار المساهمين، أو المهام العاجلة</b>.`;
    }
})();
