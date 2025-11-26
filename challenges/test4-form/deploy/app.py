from flask import Flask, render_template_string

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Challenge 4</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background: rgba(0,0,0,0.3);
            padding: 40px;
            border-radius: 10px;
        }
        input, button {
            padding: 10px;
            margin: 10px;
            font-size: 1em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Challenge 4 - Formulaire</h1>
        <p>Mot de passe secret : <strong>admin123</strong></p>
        <form action="/secret" method="GET">
            <input type="text" name="password" placeholder="Password">
            <button type="submit">Valider</button>
        </form>
    </div>
</body>
</html>
"""

SECRET = """
<!DOCTYPE html>
<html>
<head>
    <title>Secret</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background: rgba(0,0,0,0.3);
            padding: 40px;
            border-radius: 10px;
        }
        .flag {
            background: #D53F8C;
            padding: 20px;
            border-radius: 5px;
            font-size: 1.5em;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ Bravo !</h1>
        <div class="flag">ACE{test_challenge_4}</div>
    </div>
</body>
</html>
"""

@app.route('/')
def index():
    return HTML

@app.route('/secret')
def secret():
    return SECRET

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
