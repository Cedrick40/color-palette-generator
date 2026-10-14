# Color Palette Generator

A static, responsive tool that generates a random set of hex color swatches and lets you copy any code to the clipboard with a click. Built for Task 14 (Color Palette Generator) of my Web Development internship.

**Live page:** https://cedrick40.github.io/color-palette-generator/

## About the project
Each time you press the button, the page creates five random colors and shows them as large swatches with their hex codes. Clicking a swatch copies its code and shows a short "Copied" message at the bottom of the screen.

## Objective
To practice random value generation, the Clipboard API and DOM rendering.

## Tools used
- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## My approach
- **Planning:** I listed the steps first: make a random hex code, repeat it five times, draw the swatches, copy on click, and tell the user it worked.
- **Random hex colors:** A hex color is a number from 0 to 16,777,215 (`0xFFFFFF`). I used `Math.floor(Math.random() * 0x1000000)`, converted it with `toString(16)`, padded it to six digits with `padStart(6, "0")` and added a `#`. The padding matters because a small number such as `255` would otherwise give `ff` instead of `0000FF`.
- **DOM rendering:** A `render()` function clears the palette and builds each swatch with `createElement` and `textContent`, so the page is drawn from the data every time.
- **Clipboard API:** `navigator.clipboard.writeText()` copies the hex code. It only works in a secure context (HTTPS or localhost), so I added a fallback using a hidden textarea and `document.execCommand("copy")` for cases like opening the file directly. The copy is wrapped in `try/catch` so a failure shows a helpful message instead of breaking.
- **Feedback after copying:** A small toast message shows "Copied #XXXXXX" and fades out after about a second and a half. It uses `role="status"` and `aria-live="polite"` so screen readers announce it too.
- **Readable text on any color:** Because the colors are random, I calculate each swatch's brightness from its red, green and blue values and choose dark or white text so the hex code is always readable.
- **Accessibility:** Swatches are real `<button>` elements, so they work with the keyboard (Tab and Enter), have a visible focus outline and carry an `aria-label` such as "Copy color #1D4ED8". The space bar also generates a new palette.
- **Layout and responsive design:** Flexbox lays the five swatches in a row, and the hovered swatch grows slightly. A media query for screens of 700px and below turns the row into stacked bars and makes the button full width.
- **Design:** The interface uses one color family, blue, for the button, text and toast, so the random swatches are the only colors on the page.
- **Testing:** I generated many palettes to check that every code is a valid six-digit hex value, tested copying and pasting into another app, and resized the browser to check the mobile layout.

## Project structure
```
color-palette-generator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome
The result is a clean, responsive palette generator with a generate button, five swatches with hex codes and click-to-copy with visible feedback. This project taught me how a random number becomes a valid hex color, how the Clipboard API works (and why it needs a secure context), and how to render and update elements with the DOM.

## Interview questions
- **How would you generate a random hex color?** Pick a random whole number between 0 and 16,777,215 with `Math.floor(Math.random() * 0x1000000)`, convert it to base 16 with `toString(16)`, pad it to six digits with `padStart(6, "0")` and put a `#` in front.
- **What is the Clipboard API used for?** It lets a web page read from and write to the user's clipboard. `navigator.clipboard.writeText(text)` copies text and returns a Promise. It needs a secure context and, for reading, the user's permission.
- **How can you give the user feedback after copying?** Show a short message such as a toast ("Copied #1D4ED8") that disappears after a moment, change the button text or style, and make it accessible with `aria-live` so screen readers announce it too.

## Credits
Random numbers and clipboard handling follow the MDN documentation for `Math.random` and the Clipboard API. The font is Manrope from Google Fonts.

## Author
Cedrick Niyibikora