from flask import Flask, render_template_string

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Challenge 5</title>
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
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Challenge 5 - Calcul</h1>
        <p>Résolvez : <strong>42 + 58 = ?</strong></p>
        <p>Accédez à <code>/answer/VOTRE_REPONSE</code></p>
        <p>Exemple : /answer/100</p>
    </div>
</body>
</html>
"""

@app.route('/')
def index():
    return HTML

@app.route('/answer/<int:num>')
def answer(num):
    if num == 100:
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Correct!</title>
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
                    background: #fc10ca;
                    padding: 20px;
                    border-radius: 5px;
                    font-size: 1.5em;
                    font-family: monospace;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>✅ Correct !</h1>
                <div class="flag">ACE{test_challenge_5}</div>
            </div>
        </body>
        </html>
        """
    return "<h1>❌ Incorrect</h1><p>Réessayez...</p>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
