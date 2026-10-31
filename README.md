# Bimasha Jayathunga — Portfolio

A plain HTML/CSS/JS site. No build step, no frameworks. Open `index.html` in a browser to preview.

## Files

| File | What it is |
|---|---|
| `index.html` | All the text and page sections. Each section starts with a `<!-- ===== NAME ===== -->` comment. |
| `style.css` | All the design. Colours and fonts are at the very top. |
| `script.js` | Dark/light toggle, typing effect, copy buttons, contact form. Easy settings at the top. |
| `assets/profile.jpg` | Profile photo. |
| `assets/Bimasha_Jayathunga_CV.pdf` | The CV the "Download CV" buttons give out. |

## Common changes

**Change the photo**
Replace `assets/profile.jpg` with a new photo using the same file name. A square photo with the face in the middle works best.

**Update the CV**
Replace `assets/Bimasha_Jayathunga_CV.pdf` with the new PDF using the same file name.

**Change the typing words in the hero** ("I'm a Full Stack Developer…")
Open `script.js` and edit the `typingRoles` list at the top.

**Change any text** (bio, job, projects, education)
Open `index.html`, find the section by its comment, and edit the text between the tags.

**Add a project**
In `index.html`, go to the PROJECTS section. Copy one whole `<article class="card"> … </article>` block, paste it below the others and change the text.
- To change the cover colour, edit the two colours in `--cv:linear-gradient(135deg,#E0892F,#7A3A0E)` and the matching `--ca` colour.

**Change the colours of the whole site**
Open `style.css`. The first `:root { … }` block holds the light-mode colours; the two blocks right after it hold the dark-mode colours. Change `--brand`, `--brand-2`, `--gold`, `--hero-a` and `--hero-b`.

**Change the orbit technologies**
In `index.html`, find the TECH ORBIT section. Each technology is a `<span class="chip-in">Name</span>`. The `--a:…deg` value is its position around the circle. Add `hot` to the class for a dark highlighted pill.

**Add a Facebook link**
In the CONTACT section, replace `https://www.facebook.com/` with the real profile URL, or delete that `<a>` line.

## Deploying on Netlify

Upload the whole folder (or drag it into Netlify). The contact form works automatically through Netlify Forms; messages appear under **Forms** in the Netlify dashboard.
