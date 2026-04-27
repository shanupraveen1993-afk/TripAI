from flask import Flask, render_template, request, redirect, url_for, session, flash
from functools import wraps
import hashlib, os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-in-prod")

# ── Demo user store (replace with a real DB) ──────────────────────────────────
def _hash(pw: str) -> str:
    return hashlib.sha256(pw.encode()).hexdigest()

USERS = {
    "demo@tripai.com": _hash("password123"),
}

# ── Auth guard ────────────────────────────────────────────────────────────────
def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user" not in session:
            flash("Please sign in to continue.", "error")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return wrapper

# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/")
@login_required
def index():
    return render_template("index.html")

@app.route("/tripai")
def tripai():
    return render_template("tripai.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if "user" in session:
        return redirect(url_for("index"))

    if request.method == "POST":
        email    = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        remember = bool(request.form.get("remember"))

        if email in USERS and USERS[email] == _hash(password):
            session.permanent = remember
            session["user"] = email
            flash(f"Welcome back, {email}!", "success")
            return redirect(url_for("index"))

        flash("Invalid email or password.", "error")

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    flash("You've been signed out.", "success")
    return redirect(url_for("login"))

@app.route("/register")
def register():
    # Placeholder — wire up a real registration form as needed
    return "<h2 style='font-family:sans-serif;padding:40px'>Registration coming soon. <a href='/login'>Back to login</a></h2>"

@app.route("/forgot-password")
def forgot_password():
    return "<h2 style='font-family:sans-serif;padding:40px'>Password reset coming soon. <a href='/login'>Back to login</a></h2>"

# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
