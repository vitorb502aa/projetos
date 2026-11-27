"""Gera um único arquivo HTML com todo o MedQuest (usado na versão publicada).
Uso: python3 medquest/build_single.py saida.html"""
import pathlib, sys
root = pathlib.Path(__file__).parent
scripts = ["data.js", "data-extra.js", "core.js", "online.js", "materials.js", "games.js", "screens.js"]
css = (root / "css/style.css").read_text()
js = "\n".join((root / "js" / s).read_text() for s in scripts)
assert "</script" not in js.lower()
html = f"""<title>MedQuest</title>
<meta name="theme-color" content="#0b1220">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap" rel="stylesheet">
<style>
{css}
</style>
<div id="app"></div>
<script>
{js}
</script>
"""
pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "medquest-single.html").write_text(html)
print(len(html), "bytes")
