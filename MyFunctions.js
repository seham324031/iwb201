$(document).ready(function() {
    $(".show-det").change(function() { 
        $(this).closest('tr').next('.det').toggle(); 
    });
    $("#go").click(function() { 
        if($(".sel:checked").length > 0) {
            $("#f-box").show(); 
        } else {
            alert("الرجاء اختيار سيارة واحدة على الأقل"); 
        }
    });
    $("#order-f").submit(function(e) {
        e.preventDefault();
        const nameRegex = /^[\u0600-\u06FF\s]+$|^$/; 
        const natIdRegex = /^(0[1-9]|1[0-4])\d{9}$/; 
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; 
        const mobileRegex = /^09[345689]\d{7}$|^$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^$/; 
        let fullName = $("#nm").val().trim();
        let natId = $("#acc").val().trim();
        let startDate = $("#dt").val().trim();
        let endDate = $("#dtt").val().trim();
        let mobile = $("#ph").val().trim();
        let email = $("#aacc").val().trim();
        if(natId === "") {
            alert("الرقم الوطني حقل إلزامي!");
            return;
        }
        if(startDate === "") {
            alert("تاريخ بداية التأجير حقل إلزامي!");
            return;
        }
        if(endDate === "") {
            alert("تاريخ نهاية التأجير حقل إلزامي!");
            return;
        }
        if(!nameRegex.test(fullName)) { 
            alert("الاسم الكامل يجب أن يكون أحرف هجائية عربية فقط."); 
            return; 
        }
        if(!natIdRegex.test(natId)) { 
            alert("الرقم الوطني يجب أن يكون 11 خانة ويبدأ برمز محافظة صحيح من 01 إلى 14."); 
            return; 
        }
        if(!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            alert("تاريخ التأجير يجب أن يكون بالصيغة الصحيحة yyyy-mm-dd.");
            return;
        }
        let start = new Date(startDate);
        let end = new Date(endDate);
        if(end <= start) {
            alert("يجب أن يكون تاريخ نهاية التأجير لاحقاً لتاريخ البداية.");
            return;
        }
        if(!mobileRegex.test(mobile)) { 
            alert("رقم الموبايل غير صحيح، يجب أن يطابق شبكتي Syriatel و MTN."); 
            return; 
        }
        if(!emailRegex.test(email)) {
            alert("البريد الإلكتروني غير صحيح.");
            return;
        }
        let timeDiff = end.getTime() - start.getTime();
        let rentalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let total = 0;
        let carsList = "";
        $(".sel:checked").each(function() {
            let carName = $(this).data("name");
            let priceStr = $(this).data("price").toString().replace(/\./g, '').replace('$', '');
            let carPrice = parseInt(priceStr) || 0;
            total += carPrice * rentalDays;
            carsList += "- " + carName + " (السعر اليومي: " + carPrice + "$)\n";
        });
        let discountInfo = "";
        if(rentalDays > 10) {
            let discount = total * 0.05;
            total = total - discount;
            discountInfo = "\nتم تطبيق خصم 5% لتجاوز مدة التأجير 10 أيام.";
        }
        alert("تفاصيل الطلب بنجاح:\n\n" +
              "السيارات المختارة:\n" + carsList + "\n" +
              "عدد أيام التأجير: " + rentalDays + " أيام\n" +
              "المبلغ الإجمالي: " + total + " $" + discountInfo);
    });
});