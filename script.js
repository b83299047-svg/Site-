let isLogin = false;

// تغییر بین ورود و ثبت‌نام
function toggleForm() {
    const title = document.getElementById("formTitle");
    const btn = document.getElementById("submitBtn");
    const msg = document.getElementById("msg");

    isLogin = !isLogin;

    if (isLogin) {
        title.textContent = "ورود";
        btn.textContent = "ورود";
        msg.textContent = "";
    } else {
        title.textContent = "ثبت‌نام";
        btn.textContent = "ثبت‌نام";
        msg.textContent = "";
    }
}

// ثبت‌نام یا ورود
function register() {
    const fullname = document.getElementById("fullname").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if (!mobile || !password) {
        msg.textContent = "لطفاً همه فیلدها را پر کنید.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isLogin) {
        // ورود
        const user = users.find(u => u.mobile === mobile && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "profile.html";
        } else {
            msg.textContent = "شماره موبایل یا رمز اشتباه است.";
        }
    } else {
        // ثبت‌نام
        if (users.find(u => u.mobile === mobile)) {
            msg.textContent = "این شماره قبلاً ثبت شده است.";
            return;
        }

        const newUser = { fullname, mobile, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        msg.textContent = "ثبت‌نام با موفقیت انجام شد!";
        setTimeout(() => window.location.href = "profile.html", 800);
    }
}

// صفحه پروفایل
if (window.location.pathname.includes("profile.html")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "index.html";
    } else {
        document.getElementById("userName").textContent = user.fullname || "کاربر";
        document.getElementById("userMobile").textContent = user.mobile;
    }
}

// خروج از حساب
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// صفحه مدیریت
// تابع بررسی رمز ادمین
function checkAdmin() {
    const adminPass = document.getElementById("1234").value;

    if (adminPass === "1234") {
        // رمز درسته، کاربران رو نشون بده
        const users = JSON.parse(localStorage.getItem("users")) || [];
        let html = "<h3>لیست کاربران ثبت‌نام‌شده:</h3><ul>";
        users.forEach(u => {
            html += <li>${u.fullname} - ${u.mobile}</li>;
        });
        html += "</ul>";
        document.getElementById("userList").innerHTML = html;
    } else {
        // رمز اشتباه
        document.getElementById("userList").innerHTML = "<p style='color:red'>رمز اشتباه است!</p>";
    }
}


