# Logo Integration Instructions

## To add your Dental On Location logo:

1. Save your logo image as `logo.png` in the `assets/images/` folder

2. The website is already set up to use the logo. The navigation will automatically display it once the file is in place.

3. If you want to use a different filename or format, update these lines in the HTML files:

### In index.html (line ~40):
```html
<div class="nav-logo">
    <a href="#home">
        <img src="assets/images/logo.png" alt="Dental On Location" class="logo-img">
    </a>
</div>
```

### In pages/patient-forms.html (line ~293):
```html
<div class="nav-logo">
    <a href="../index.html">
        <img src="../assets/images/logo.png" alt="Dental On Location" class="logo-img">
    </a>
</div>
```

## Alternative: Use Text-Based Logo (Currently Active)

The website is currently using a styled text logo that says "Dental On Location" with gradient colors matching your brand (blue and gold). This works well if you prefer not to use an image file.

## Logo Styling

The logo CSS is configured to:
- Display at 50px height
- Scale on hover
- Work responsively on mobile devices
- Match your brand colors (blue #118A96 and gold #B8985F)