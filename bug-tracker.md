# Bug Tracker - Dental On Location Website

## 🐛 Current Bugs

### Visual/UI Issues
- [x] **Gray text too dark** - The subtitle text "Bringing comprehensive dental..." and similar gray text throughout the site is too dark and hard to read
  - Location: Hero section subtitle, section subtitles
  - ✅ FIXED: Lightened gray color from `#6C757D` to `#8B95A1`
  - ✅ Added better line-height for improved readability
  - ✅ Enhanced hero subtitle with better contrast

- [x] **Service card icons get cut off** - The overlay icons on service cards (like in "Cleanings" and "Preventive Care") are being cut off at the bottom of the cards
  - Location: Service cards with images
  - ✅ FIXED: Changed card overflow from `hidden` to `visible`
  - ✅ Repositioned icon overlay from `bottom: -30px` to `bottom: 10px`
  - ✅ Added padding-bottom to cards
  - ✅ Added proper border-radius to images

### Text Readability
- [ ] **Text contrast on images** - Some text may still need better contrast on certain background images
  - Location: Various sections with background images
  - Fix: Review and adjust overlay opacity or text shadows as needed

## ✅ Fixed Bugs
- [x] Updated branding from DentaLOL to Dental On Location
- [x] Added text shadows to hero section for better visibility
- [x] Increased overlay opacity for better text contrast
- [x] Added logo styling and navigation updates

## 📝 Notes
- All fixes should maintain responsive design
- Test on mobile devices after fixes
- Ensure accessibility standards are met (WCAG AA contrast ratios)

## Priority Levels
- 🔴 High: Affects core functionality or major visual issues
- 🟡 Medium: Visual improvements that enhance user experience
- 🟢 Low: Minor tweaks and polish

### Current Priority Status:
- 🔴 Gray text contrast issue - High priority (affects readability)
- 🔴 Service card icon cutoff - High priority (visual bug)